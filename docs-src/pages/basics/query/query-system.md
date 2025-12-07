---
uid: Basics.Query.SystemQueries
---

# System Queries

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-built-in { visibility: visible; } </style>

This is a very internal spec - you probably don't need this 😉.

System Queries are stored as json in `DesktopModules\ToSic.Sxc\App_Data\system\...`.

## Queries and Parameters

1. `System.Apps` - retrieve all apps  
    **Parameters**
    1. `ZoneId`
1. `System.Attributes` - retrieve all the attributes of a content-type  
    **Parameters**
    1. `ContentTypeName`
1. `System.ContentTypes` - retrieve all content-types  
    **Parameters**
    1. `AppId`
    1. `Scope` - possible values: `Default`, `System.Fields`, etc. but also `*` (new v20.00.09) to get all content-types in all scopes
1. `System.Pages` - retrieve all pages of the current site (v15)  
    **Parameters** _no parameters_
1. `System.Queries` - retrieve all queries  
    **Parameters** _no parameters_
1. `System.QueryInfo` - retrieve all streams and fields of a query  
    **Parameters**
    1. `QueryName`
    1. `StreamName`
<!-- 1. `System.Roles` upon checking v20.00.09 it seems this was never published, but only `UserRoles` -->
1. `System.Scopes`
1. `System.Settings`
1. `System.Sites` (published in v20.00.09) - retrieve all sites  
1. `System.Resources`
1. `System.Users`
1. `System.UserRoles`
1. `System.Zones` - retrieve all zones (published in v20.00.09)  
    **Parameters** _no parameters_

These are also some internal queries, which are not published for general use:

1. `System.BundleDetails` (internal use)
1. `System.EntityPicker` (internal use)
1. `System.Features` (not yet ready for public use, could still change a lot)
1. `System.Licenses` (not yet ready for public use, could still change a lot)
1. `System.MetadataTargetTypes` (not yet ready for public use, could still change a lot)
1. `System.QueryInfo` (primarily for internal use)
1. `System.SettingsEntities` (primarily for internal use)

---

## History

1. Introduced in 2sxc 07.00
1. In added in 2sxc 07.00
1. Params added in 2sxc 10.22
1. Old query names starting with `Eav.Queries.Global` were removed in 2sxc v20

> [!NOTE]
> In v15 the names changed, to simply start with `System.`.
> The old names still work, but you should stop using them.
