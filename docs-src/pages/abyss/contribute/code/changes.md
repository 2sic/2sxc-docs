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

### DB Changes 2025-04-30 - Get rid of Table ToSIC_EAV_ContextInfo

> [!WARNING]
> Before you do this, create a backup of your DB which you can restore later on.
> Because after doing this, the DB will not be usable in 2sxc 19 any more.

Run this in SQL Server Management Studio to remove the table `ToSIC_EAV_ContextInfo`:

```sql
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
```
