---
uid: Abyss.Db.SqlSnippets.Index
---

# Database Admin - SQL Snippets

This is just a fairly random collection of useful SQL snippets for 2sxc database admins.

## Batch Delete Old Data

This snippet will delete old entities, keeping only the newest entities of a ContentType.

We sometimes use this with Mobius apps to keep the database size manageable.

Note that it will find the entities based on a specific criteria, and just set the deleted timestamp to be the same as the created timestamp.

### 2sxc 20 and newer

```sql
/*
	Helper Script to clean up lots of Mobius data

	For 2sxc 20 and later
*/

-- Set SimulateOnly to 1 to just test, 0 to run and commit
Declare @SimulateOnly bit = 1;
-- The AppId as found in the management UI
Declare @AppId int = 2981;
-- Keep so many months (skip when processing)
Declare @Months int = 12;
-- The Entity Type we want to change - for 2sxc 19 and below it's usually "SystemProtocol" but you could also have a custom type
Declare @TypeName nvarchar(25) = 'FormData';

-- Figure out the cut-off date
DECLARE @cutOffDate DATE;
SET @cutOffDate = DATEADD(month, -@Months, GETDATE());
Print 'Cut-Off Date: ' + Cast(@cutOffDate as nvarchar);

-- Show Content Types just for visual control
Select Top 100 * from TsDynDataContentType
Where AppId = @AppId
	AND Name = @TypeName
	And TransDeletedId is null

-- Get the ID of the desired Content Type
Declare @SystemProtocolId int;
Select @SystemProtocolId = ContentTypeId from TsDynDataContentType
Where AppId = @AppId
	AND Name = @TypeName
	And TransDeletedId is null

-- Show the ID so we can verify it
Print 'System Protocol / Form Data: ' + Cast(@SystemProtocolId as nvarchar)

-- Show 100 entries to visually be able to check if it's correct
-- You may want to make changes to this to better see the range you care about
Select top 100 * from TsDynDataEntity
Where AppId = @AppId
	AND ContentTypeId = @SystemProtocolId

Begin Transaction

-- ** Newer 2sxc 20+ **
SELECT
	Entities.EntityID
	, dbo.[TsDynDataTransaction].TransactionId
	, dbo.[TsDynDataTransaction].Timestamp
	, Entities.AppId
	, Entities.ContentTypeId
Into #MobiusEntitiesToDelete
FROM
	dbo.TsDynDataEntity As Entities INNER JOIN
	dbo.[TsDynDataTransaction] ON Entities.TransCreatedId = dbo.[TsDynDataTransaction].TransactionId
WHERE 
	(Entities.AppId = @AppId)
	And (Entities.TransDeletedId is null)
	AND (Entities.ContentTypeId = @SystemProtocolId)
	AND (dbo.[TsDynDataTransaction].Timestamp < CONVERT(DATETIME, @cutOffDate, 102))

Update e
Set e.TransDeletedId = e.TransCreatedId
From TsDynDataEntity as e
Join #MobiusEntitiesToDelete as m on m.EntityId = e.EntityId

-- ** Newer 2sxc 20+ **
Select top 100 * from TsDynDataEntity
Where AppId = @AppId
	AND ContentTypeId = @SystemProtocolId

If @SimulateOnly = 1
	-- Undo what we did (during testing)
	Begin
		Print 'Simulate Only, will do Rollback';
		Rollback Transaction
	End
Else
	-- Finalize
	Begin
		Print 'Commit changes';
		Commit Transaction
	End
```

### 2sxc 19 and earlier

```sql
/*
	Helper Script to clean up lots of Mobius data

	For 2sxc 19 and before.
*/

-- Set SimulateOnly to 1 to just test, 0 to run and commit
Declare @SimulateOnly bit = 1;
-- The AppId as found in the management UI
Declare @AppId int = 16;
-- Keep so many months (skip when processing)
Declare @Months int = 6;
-- The Entity Type we want to change - for 2sxc 19 and below it's usually "SystemProtocol" but you could also have a custom type
Declare @TypeName nvarchar(25) = 'SystemProtocol';

-- Figure out the cut-off date
DECLARE @cutOffDate DATE;
SET @cutOffDate = DATEADD(month, -@Months, GETDATE());
Print 'Cut-Off Date: ' + Cast(@cutOffDate as nvarchar);

-- Get the ID of the desired Content Type
Declare @SystemProtocolId int;
Select @SystemProtocolId = AttributeSetId
From ToSIC_EAV_AttributeSets
Where AppId = @AppId
	AND Name = @TypeName
	And ChangeLogDeleted is null

-- Show the ID so we can verify it
Print 'System Protocol / Form Data: ' + Cast(@SystemProtocolId as nvarchar)

-- Show 100 entries to visually be able to check if it's correct
-- You may want to make changes to this to better see the range you care about
Select top 100 * from ToSIC_EAV_Entities
Where AppId = @AppId
	AND AttributeSetID = @SystemProtocolId

Begin Transaction

-- Select all those to be modified; put in Temp table to keep SQL simple
SELECT
	Entities.EntityID
	, dbo.ToSIC_EAV_ChangeLog.ChangeID
	, dbo.ToSIC_EAV_ChangeLog.Timestamp
	, Entities.AppId
	, Entities.AttributeSetID
Into #MobiusEntitiesToDelete
FROM
	dbo.ToSIC_EAV_Entities As Entities INNER JOIN
	dbo.ToSIC_EAV_ChangeLog ON Entities.ChangeLogCreated = dbo.ToSIC_EAV_ChangeLog.ChangeID
WHERE 
	(Entities.AppId = @AppId)
	And (Entities.ChangeLogDeleted is null) -- ADDED
	AND (Entities.AttributeSetID = @SystemProtocolId)
	AND (dbo.ToSIC_EAV_ChangeLog.Timestamp < CONVERT(DATETIME, @cutOffDate, 102))

-- Set deleted to be same as created, so it has a valid deleted timestamp
-- This also makes it easy to undelete, in case we made a mistake
Update e
Set e.ChangeLogDeleted = e.ChangeLogCreated
From dbo.ToSIC_EAV_Entities as e
Join #MobiusEntitiesToDelete as m on m.EntityId = e.EntityId

-- Visuall check if the change made sense
Select top 100 * from ToSIC_EAV_Entities
Where AppId = @AppId
	AND AttributeSetID = @SystemProtocolId

-- Clean up temp data
Drop Table #MobiusEntitiesToDelete

If @SimulateOnly = 1
	-- Undo what we did (during testing)
	Begin
		Print 'Simulate Only, will do Rollback';
		Rollback Transaction
	End
Else
	-- Finalize
	Begin
		Print 'Commit changes';
		Commit Transaction
	End
```

---

## History

* 2025-10-27 created and added Batch-delete sample
