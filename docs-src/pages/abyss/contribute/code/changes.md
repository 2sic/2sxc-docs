---
uid: Abyss.Contribute.Code.Changes
---

# Manual Changes to the Dev Environment

As we improve 2sxc we also adjust DB and Web.Config settings.
In a normal installation this will be automatically done, but if you are working with the dev environment, you may need to do this manually.

## Version 19 to 20

### Web.Config Changes 2025-04-29

Find the following sections in the web config, comment out the old ones and add the new ones:

```xml
<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="System.Buffers" publicKeyToken="cc7b13ffcd2ddd51" />
  <bindingRedirect oldVersion="0.0.0.0-32767.32767.32767.32767" newVersion="4.0.4.0" />
</dependentAssembly>     

<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.Bcl.AsyncInterfaces" publicKeyToken="cc7b13ffcd2ddd51" />
  <bindingRedirect oldVersion="0.0.0.0-32767.32767.32767.32767" newVersion="9.0.0.0" />
  <codeBase version="9.0.0.0" href="bin\2sxc\Microsoft.Bcl.AsyncInterfaces.dll" xmlns="urn:schemas-microsoft-com:asm.v1" />
</dependentAssembly>

<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="Microsoft.IO.RecyclableMemoryStream" publicKeyToken="31bf3856ad364e35" />
  <codeBase version="3.0.1.0" href="bin\Imageflow\Microsoft.IO.RecyclableMemoryStream.dll" />
</dependentAssembly>

<dependentAssembly xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity name="System.Runtime.CompilerServices.Unsafe" publicKeyToken="b03f5f7f11d50a3a" />
  <bindingRedirect oldVersion="0.0.0.0-32767.32767.32767.32767" newVersion="6.0.0.0" />
</dependentAssembly>
```

### DB Changes 2025-04-30 - Get rid of Table ToSIC_EAV_ContextInfo and ToSIC_EAV_AttributesInSets

> [!WARNING]
> Before you do this, create a backup of your DB which you can restore later on.
> Because after doing this, the DB will not be usable in 2sxc 19 any more.

Run this in SQL Server Management Studio to remove the tables `ToSIC_EAV_ContextInfo`, `ToSIC_EAV_AttributesInSets`, etc:

```sql
-- Remove Stored Procedures
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- make sure sql rolls back automatically in case of error.
SET XACT_ABORT ON
GO

-- Preflight check 1: Ensure no AttributeID appears more than once in ToSIC_EAV_AttributesInSets
IF EXISTS (
    SELECT AttributeID
    FROM [dbo].[ToSIC_EAV_AttributesInSets]
    GROUP BY AttributeID
    HAVING COUNT(*) > 1
)
BEGIN
    THROW 50001, 'Preflight check failed: Duplicate AttributeID found in ToSIC_EAV_AttributesInSets. Migration stopped.', 1;
    RETURN;
END
GO

-- Preflight check 2: Remove orphaned Attributes and related data
-- 2.1 Find orphaned AttributeIDs
DECLARE @OrphanedAttributes TABLE (AttributeID INT);
INSERT INTO @OrphanedAttributes (AttributeID)
SELECT a.AttributeID
FROM [dbo].[ToSIC_EAV_Attributes] a
LEFT JOIN [dbo].[ToSIC_EAV_AttributesInSets] ais ON a.AttributeID = ais.AttributeID
WHERE ais.AttributeID IS NULL;

-- 2.2 Find ValueIDs related to orphaned AttributeIDs
DECLARE @OrphanedValueIDs TABLE (ValueID INT);
INSERT INTO @OrphanedValueIDs (ValueID)
SELECT v.ValueID
FROM [dbo].[ToSIC_EAV_Values] v
INNER JOIN @OrphanedAttributes oa ON v.AttributeID = oa.AttributeID;

-- 2.3 Delete from ToSIC_EAV_ValuesDimensions (child of Values)
DELETE vd
FROM [dbo].[ToSIC_EAV_ValuesDimensions] vd
INNER JOIN @OrphanedValueIDs ov ON vd.ValueID = ov.ValueID;

-- 2.4 Delete from ToSIC_EAV_Values (child of Attributes)
DELETE v
FROM [dbo].[ToSIC_EAV_Values] v
INNER JOIN @OrphanedValueIDs ov ON v.ValueID = ov.ValueID;

-- 2.5 Delete from ToSIC_EAV_EntityRelationships (child of Attributes)
DELETE er
FROM [dbo].[ToSIC_EAV_EntityRelationships] er
INNER JOIN @OrphanedAttributes oa ON er.AttributeID = oa.AttributeID;

-- 2.6 Delete orphaned Attributes
DELETE a
FROM [dbo].[ToSIC_EAV_Attributes] a
INNER JOIN @OrphanedAttributes oa ON a.AttributeID = oa.AttributeID;
GO

-- Add new columns to ToSIC_EAV_Attributes if they do not exist yet.
-- These columns will store data previously held in ToSIC_EAV_AttributesInSets.
IF NOT EXISTS (SELECT * FROM sys.columns WHERE Name = 'ContentTypeId' AND Object_ID = OBJECT_ID('ToSIC_EAV_Attributes'))
BEGIN
    ALTER TABLE [dbo].[ToSIC_EAV_Attributes] ADD 
        [ContentTypeId] [int] NOT NULL CONSTRAINT DF_ToSIC_EAV_Attributes_ContentTypeId DEFAULT (0),
        [SortOrder] [int] NOT NULL CONSTRAINT DF_ToSIC_EAV_Attributes_SortOrder DEFAULT (0),
        [IsTitle] [bit] NOT NULL CONSTRAINT DF_ToSIC_EAV_Attributes_IsTitle DEFAULT (0);
END
GO

-- Migrate data from ToSIC_EAV_AttributesInSets to new columns in ToSIC_EAV_Attributes
UPDATE a
SET 
    a.ContentTypeId = ais.AttributeSetID,
    a.SortOrder = ais.SortOrder,
    a.IsTitle = ais.IsTitle
FROM [dbo].[ToSIC_EAV_Attributes] a
INNER JOIN [dbo].[ToSIC_EAV_AttributesInSets] ais
    ON a.AttributeID = ais.AttributeID
GO

-- Add foreign key constraint from ContentTypeId to AttributeSets.AttributeSetID if it does not exist
IF NOT EXISTS (
    SELECT * FROM sys.foreign_keys 
    WHERE name = 'FK_ToSIC_EAV_Attributes_ContentTypeId_ToSIC_EAV_AttributeSets'
)
BEGIN
    ALTER TABLE [dbo].[ToSIC_EAV_Attributes]
    ADD CONSTRAINT FK_ToSIC_EAV_Attributes_ContentTypeId_ToSIC_EAV_AttributeSets
    FOREIGN KEY ([ContentTypeId]) REFERENCES [dbo].[ToSIC_EAV_AttributeSets] ([AttributeSetID]);
END
GO

-- Remove Stored Procedures
DROP PROCEDURE IF EXISTS [dbo].[ToSIC_EAV_ChangeLogSet]
GO

DROP PROCEDURE IF EXISTS [dbo].[ToSIC_EAV_ChangeLogGet]
GO

DROP PROCEDURE IF EXISTS [dbo].[ToSIC_EAV_ChangeLogAdd]
GO

-- Remove Tables
DROP TABLE IF EXISTS [dbo].[ToSIC_EAV_ContextInfo]
GO

DROP TABLE IF EXISTS [dbo].[ToSIC_EAV_AttributesInSets]
GO
```
