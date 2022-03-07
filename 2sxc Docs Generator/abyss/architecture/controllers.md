---
uid: Abyss.Architecture.Controllers
---

# EAV / 2sxc Controllers (System Endpoints)

This is a reference of all Controllers (System WebApi Endpoints) in 2sxc/eav. 

> [!WARNING]
> This in not meant for public use, it's here so you understand how things work.
> It's also here to help people [integrating 2sxc/eav with their solution](xref:Abyss.Integration.Index)

## List of System WebApi Controllers

All controllers are implemented using the [proxy/real system](xref:NetCode.Conventions.ProxyControllers), except those were specifically noted. 

| Part  | Route                         | In  | Controller      | Purpose & Notes                           |
| ----- | -------------                 | --- | --------------- | ----------------------------------------- |
| Adam  | `app/[name]/data` [note1]     | Sxc | `Adam`          | REST for ADAM Assets
| Adam  |                               | Oqt | `AppAssets`     | Oqtane only, without proxy/real concept
| Admin |                               | Sxc | `ApiExplorer`   | Analyse App-Level WebApi Controllers
| Admin |                               | Sxc | `App`           | Admin the App itself
| Admin |                               | Sxc | `AppFiles`      | Get files for Code Editor
| Admin |                               | Eav | `AppParts`      | Export/Import of parts of the App
| Admin |                               | Sxc | `Dialog`        | Get settings of dialogs
| Admin |                               | Sxc | `Entity`        | Admin of Entities
| Admin |                               | Eav | `Features`      | Features to the Features-Management dialogs
| Admin |                               | Sxc | `Field`         | Admin of Fields - like get all, create new etc.
| Admin |                               | Eav | `Metadata`      | Admin: Metadata - like get all for a specific target
| Admin |                               | Sxc | `Query`         | Admin: Query - like create new, import/export etc.
| Admin |                               | Sxc | `Type`          | Admin: Content Types
| Admin |                               | Sxc | `View`          | Admin: Views
| Admin |                               | Eav | `Zone`          | Admin: Zone - information about the current Zone (site)
| App   |                               | Oqt | `AppAssets`     | Oqtane only, without proxy/real concept
| App   | `app/[name]/data` [note1]     | Sxc | `AppData`       | REST for App Data/Entities
| App   | `app/[name]/query` [note1]    | Sxc | `AppQuery`      | REST for App Queries
| Cms   |                               | Sxc | `Block`         | Manage Modules on a page
| Cms   |                               | Sxc | `ContentGroup`  | Manage Content-Blocks on a page
| Cms   | `cms/edit`                    | Sxc | `Edit`          | Edit: Edit data / entities (load/save)
| Cms   | `cms/history`                 | Sxc | `History`       | Edit: History of an item incl. restore of a previous version
| Cms   | `cms/list`                    | Sxc | `List`          | In-Page editing of lists
| Sys   | `sys/insights`                | Eav | `Insights`      | Insights debugging
| Sys   | `sys/install`                 | Sxc | `Install`       | Installation of 2sxc on the current system
| Sys   | `sys/license`                 | Eav | `License`       | License / extensions information
| Sys   | `sys/log`                     | Eav | `Log`           | Special logging settings

[note1]: #note-app-data
## Note App Data

Some things have a virtual REST route. This includes

1. Adam files
1. Data / Entities

The route is basically made of multiple parts

`[api-root]/app/[app-identifier]/[topic]/[optional-details]`

We'll document this more in future.




---

## History

1. Documented for v13.03 (March 2022)