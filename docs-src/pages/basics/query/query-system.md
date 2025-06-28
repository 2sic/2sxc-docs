---
uid: Basics.Query.SystemQueries
---

# System Queries

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-built-in { visibility: visible; } </style>

This is a very internal spec - you probably don't need this 😉.

System Queries are stored as json in `DesktopModules\ToSic.Sxc\App_Data\system\...`.

## Queries and Parameters

> [!NOTE]
> In v15 the names changed, to simply start with `System.`.
> The old names still work, but you should stop using them.

1. `System.Apps` - retrieve all apps  
    **Parameters**
    1. `ZoneId`
1. `System.Attributes` - retrieve all the attributes of a content-type  
    **Parameters**
    1. `ContentTypeName`
1. `System.ContentTypes` - retrieve all content-types  
    **Parameters**
    1. `AppId`
    1. `Scope`
1. `System.Pages` - retrieve all pages of the current site (v15)  
    **Parameters** _no parameters_
1. `System.Queries` - retrieve all queries  
    **Parameters** _no parameters_
1. `System.QueryInfo` - retrieve all streams and fields of a query  
    **Parameters**
    1. `QueryName`
    1. `StreamName`
1. `System.Roles` (BETA v15)
1. `System.Settings` (BETA v15)
1. `System.Resources` (BETA v15)
1. `System.Users` (BETA v15)
1. `System.Zones` - retrieve all zones  
    **Parameters** _no parameters_

---

## History

1. Introduced in 2sxc 07.00
1. In added in 2sxc 07.00
1. Params added in 2sxc 10.22
1. Old query names starting with `Eav.Queries.Global` were removed in 2sxc v20

