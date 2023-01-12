---
uid: Basics.Query.SystemQueries
---

# System Queries

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-built-in { visibility: visible; } </style>

This is a very internal spec - you probably don't need this 😉.

System Queries are stored as json in `DesktopModules\ToSIC_SexyContent\App_Data\system\queries`.

## Queries and Parameters

1. `Eav.Queries.Global.Apps` - retrieve all apps  
    **Parameters**
    1. `ZoneId`
1. `Eav.Queries.Global.Attributes` - retrieve all the attributes of a content-type  
    **Parameters**
    1. `ContentTypeName`
1. `Eav.Queries.Global.ContentTypes` - retrieve all content-types  
    **Parameters**
    1. `AppId`
    1. `Scope`
1. `Eav.Queries.Global.Pages` - retrieve all pages of the current site  
    **Parameters** _no parameters_
1. `Eav.Queries.Global.Queries` - retrieve all queries  
    **Parameters** _no parameters_
1. `Eav.Queries.Global.QueryInfo` - retrieve all streams and fields of a query  
    **Parameters**
    1. `QueryName`
    1. `StreamName`
1. `Eav.Queries.Global.Roles` (BETA v15)
1. `Eav.Queries.Global.Users` (BETA v15)
1. `Eav.Queries.Global.Zones` - retrieve all zones  
    **Parameters** _no parameters_

---

## History

1. Introduced in 2sxc 07.00
1. In added in 2sxc 07.00
1. Params added in 2sxc 10.22

