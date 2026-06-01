---
uid: Abyss.Platforms.Oqtane.MultiTenancy
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

# Oqtane Multi-Tenancy and 2sxc

Oqtane supports multiple tenants and sites.
2sxc supports this by mapping each Oqtane site to a 2sxc/EAV **zone**.

This page explains how that mapping works, how to diagnose broken mappings,
and how to repair common problems in separate-database tenant setups.

> [!WARNING]
> The SQL on this page is intended for diagnosis and carefully controlled repair.
> Always create a database backup before changing data manually.
> Do not delete a `TsDynDataZoneId` setting on a production site until you know where the site's 2sxc content is stored.

## Version Notes

2sxc multi-tenant support for Oqtane was stabilized in later Oqtane 6 / 2sxc 21 releases.

Known guidance:

1. Oqtane 6.1.3+ with 2sxc 21.02+ introduced the expected multi-tenant support.
1. For separate-database tenants, use a current 2sxc 21.x build, such as 21.07 or newer, before repairing mappings.

## How Oqtane Multi-Tenancy Works

Oqtane can host multiple tenants.
Tenants can either share the main database or use separate databases.

In a separate-database setup:

1. The main database contains global tenant and alias information.
1. Each tenant database contains its own Oqtane site data.
1. Site IDs start again at `1` in each separate tenant database.
1. An alias in the main database maps the domain to the correct tenant and site.

This means `SiteId = 1` is not globally unique when tenants use separate databases.
Any 2sxc mapping must therefore be resolved in the correct Oqtane tenant context.

## How 2sxc Maps Oqtane Sites

2sxc stores app and content metadata in EAV tables.
In Oqtane, each Oqtane site usually maps to one EAV zone.

The important records are:

| Area | Table | Purpose |
| --- | --- | --- |
| Oqtane site setting | `Setting` | Stores the site's 2sxc zone in `TsDynDataZoneId` |
| 2sxc/EAV zone | `TsDynDataZone` | One 2sxc zone per mapped site |
| 2sxc/EAV apps | `TsDynDataApp` | Contains the Content app and site/primary app for the zone |
| App files | file system | Stored below `2sxc\Tenants\{TenantId}\Sites\{SiteId}` |
| Content files | file system | Stored below `Content\Tenants\{TenantId}\Sites\{SiteId}` |

The file paths use the Oqtane `TenantId` and `SiteId`.
They do not use the 2sxc/EAV `ZoneId`.

Older 2sxc Oqtane versions stored app files directly below:

```text
2sxc\{SiteId}
```

Newer 2sxc Oqtane versions store app files below:

```text
2sxc\Tenants\{TenantId}\Sites\{SiteId}
```

Some older 2sxc 21 builds did not always migrate these folders correctly.
In that case, the database mapping can be correct, but the app files are still in the old folder.

The `Setting` row should look like this:

```text
EntityName = Site
EntityId   = <Oqtane SiteId in the current tenant DB>
SettingName = TsDynDataZoneId
SettingValue = <matching ZoneId in TsDynDataZone in the same DB>
```

For a healthy site, the `SettingValue` must point to a `TsDynDataZone.ZoneId`
which exists in the main or tenant database that 2sxc is currently using.

If the setting is missing on a new site with no 2sxc content yet, that can be normal.
2sxc can create the missing zone mapping when the site is first used.

## Common Broken State

A known broken state can happen when a separate-database tenant site is used with an older 2sxc version before multi-tenancy was supported, resulting in the wrong tenant context.

Example:

```text
Main DB:
ZoneId 5 = sc01.example.com (Site 1)

Tenant DB:
Setting.TsDynDataZoneId = 5
TsDynDataZone has no ZoneId 5
```

The tenant database points to zone `5`, but zone `5` only exists in the main database.

The runtime error usually looks like this:

```text
The given key '5' was not present in the dictionary.
at ToSic.Eav.Apps.Sys.Catalog.AppsCatalog.DefaultAppIdentity(Int32 zoneId)
```

This happens because 2sxc resolves the current site to zone `5`,
then asks EAV for the Content app in zone `5`,
but the active tenant database does not contain that zone.

## Diagnostic SQL

Run these queries against both the main database and the affected tenant database.

### Main Database

```sql
SELECT SiteId, Name, TenantId
FROM Site
ORDER BY SiteId;
```

```sql
SELECT AliasId, TenantId, SiteId, Name, IsDefault
FROM Alias
ORDER BY TenantId, SiteId, AliasId;
```

```sql
SELECT SettingId, EntityName, EntityId AS SiteId, SettingName, SettingValue
FROM Setting
WHERE SettingName IN ('TsDynDataZoneId', 'TsDynDataApp')
ORDER BY EntityName, EntityId, SettingName;
```

```sql
SELECT ZoneId, Name
FROM TsDynDataZone
ORDER BY ZoneId;
```

```sql
SELECT AppId, ZoneId, Name
FROM TsDynDataApp
ORDER BY ZoneId, AppId;
```

### Separate Tenant Database

```sql
SELECT SiteId, Name, TenantId
FROM Site
ORDER BY SiteId;
```

> [!NOTE]
> In separate-database Oqtane setups, the `Alias` table is in the main database only.
> It does not exist in the tenant database.

```sql
SELECT SettingId, EntityName, EntityId AS SiteId, SettingName, SettingValue
FROM Setting
WHERE SettingName IN ('TsDynDataZoneId', 'TsDynDataApp', 'EavZone', 'EavApp')
ORDER BY EntityName, EntityId, SettingName;
```

```sql
SELECT ZoneId, Name
FROM TsDynDataZone
ORDER BY ZoneId;
```

```sql
SELECT AppId, ZoneId, Name
FROM TsDynDataApp
ORDER BY ZoneId, AppId;
```

## How to Interpret the Results

For the affected tenant site, check the row:

```text
SettingName = TsDynDataZoneId
EntityName = Site
EntityId = <affected Oqtane SiteId>
```

Then verify:

1. The `SettingValue` exists as `TsDynDataZone.ZoneId` in the same tenant database.
1. `TsDynDataApp` has a `Default` app in that zone.
1. `TsDynDataApp` has a site/primary app in that zone.
1. The expected app folders exist below `2sxc\Tenants\{TenantId}\Sites\{SiteId}`.

If the setting points to a zone which only exists in the main database,
then the tenant site has a stale or wrong zone mapping.

## Manual Repair Options

Choose the repair based on where the real 2sxc data is.
Do not manually create EAV zones or apps unless you have a migration plan and understand the related EAV tables.

### Case 1: No 2sxc Content to Preserve

This is typical for a clean repro or a new site where adding Content fails immediately.

1. Upgrade to a 2sxc version with the latest Oqtane multi-tenant fixes, such as 21.07 or newer.
1. Backup the affected tenant database.
1. Delete only the stale site-zone mapping in the affected tenant database.
1. Restart Oqtane.
1. Open the affected site and add 2sxc Content again.

Example:

```sql
DELETE FROM Setting
WHERE EntityName = 'Site'
  AND EntityId = 1
  AND SettingName = 'TsDynDataZoneId'
  AND SettingValue = '5';
```

After restart, 2sxc should create a new zone and Content app in the correct tenant database.

### Case 2: Tenant DB Has a Valid Zone, but Setting Points Elsewhere

If the tenant database already contains the correct zone and apps,
update the site setting to point to that local zone.

Example:

```sql
UPDATE Setting
SET SettingValue = '<correct-zone-id>'
WHERE EntityName = 'Site'
  AND EntityId = <site-id>
  AND SettingName = 'TsDynDataZoneId';
```

Restart Oqtane after the change so 2sxc reloads its app catalog.

### Case 3: Existing 2sxc Content Exists in the Wrong Database

Do not delete the setting.

If the real content exists in the main database zone, but the site now runs in a separate tenant database,
this is a migration scenario.
Export/import or migrate the relevant 2sxc/EAV data and files into the tenant database and tenant/site folders.

Only after the content is safely moved should the site mapping be corrected.

### Case 4: App Files Were Not Migrated to the Tenant/Site Folder

In older 2sxc 21 versions, the app files folder migration from the old Oqtane layout to the new tenant-aware layout was not always executed.

Old layout:

```text
[Oqtane.Server]\2sxc\{SiteId}
```

New layout:

```text
[Oqtane.Server]\2sxc\Tenants\{TenantId}\Sites\{SiteId}
```

Typical symptoms:

1. The `TsDynDataZoneId`, `TsDynDataZone`, and `TsDynDataApp` records look correct.
1. The new app folder below `2sxc\Tenants\{TenantId}\Sites\{SiteId}` is missing or empty.
1. The old folder below `2sxc\{SiteId}` still contains the app folders, views, AppCode, or assets.
1. 2sxc shows missing view, missing app file, or AppCode compile errors even though the app exists in the database.

To repair this manually, copy all legacy site folders from the root `2sxc` folder into the new tenant/site structure.
Skip the `Tenants` folder, because that is already the new structure.

For the default tenant, this means:

```text
[Oqtane.Server]\2sxc\*
```

to:

```text
[Oqtane.Server]\2sxc\Tenants\1\Sites\*
```

Repair steps:

1. Upgrade to a current 2sxc version first, such as 21.07 or newer.
1. Stop the Oqtane application.
1. Backup the complete `[Oqtane.Server]\2sxc` folder.
1. Copy all folders except `Tenants` from `2sxc\` to `2sxc\Tenants\1\Sites\`.
1. Start Oqtane again.
1. Open the affected app and verify that views, AppCode, and assets load correctly.

Example:

```cmd
robocopy "D:\Path\To\Oqtane.Server\2sxc" "D:\Path\To\Oqtane.Server\2sxc\Tenants\1\Sites" /E /XD "D:\Path\To\Oqtane.Server\2sxc\Tenants"
```

To preview the copy first, add `/L` to the `robocopy` command.

If the new folder already contains files, compare both folders before copying.
Do not overwrite newer files unless you know the old folder is the correct source.

After the site works, keep the old `2sxc\{SiteId}` folder as a temporary backup.
Remove it only after the tenant/site folder has been verified.

## After Repair

After any manual repair:

1. Restart Oqtane.
1. Open the affected site.
1. Add a 2sxc Content module.
1. Verify that the tenant database now contains a matching `TsDynDataZone` and `TsDynDataApp` records.
1. Verify that new files are created below the expected tenant/site folders.

## Related

* [](xref:Abyss.Platforms.Oqtane.Install)
* [GitHub issue 3666](https://github.com/2sic/2sxc/issues/3666)

---
