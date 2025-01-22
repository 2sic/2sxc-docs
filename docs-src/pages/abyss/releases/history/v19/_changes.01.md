
### 2sxc v19.01 (2025-01-16)

Note: the version was incorrectly released as 19.00.01.

1. ✅ Implemented system to use the `As<...>` API with interfaces, which will automatically find the right class to instantiate
1. ✅ Created new `DataModel` system in the `Models` and `Data.Model` namespace #3543 
1. ✅ Created data model for `IFileModel` and `IFolderModel` which matches the entities returned by the `AppAssets` DataSource
1. ✅ Created data model for `IUserModel` and `IUserRoleModel` which matches entities returned by the `Users` and `UserRoles` DataSource
1. ✅ Renamed `Roles` DataSource to `UserRoles` (could be breaking change for very few users)
1. ✅ Created data model `ISiteModel` which matches data returned by the `Sites` DataSource
1. ✅ created data model `IPageModel` which matches data returned by `Pages` DataSource
1. ✅ Finished the `ICacheService` on `Kit.Cache` #3536
1. ✅ Finished the `AppAssets` Datasource and documented it #3541
1. ✅ New `ToSic.Sxc.Data.Models` with `ModelWithEntity` and `ModelWithItem` base classes
1. ✅ Changed `System.Text.Json` to use .net 9 #3547
1. ✅ Upgraded to Oqtane 6+ so it's only compatible with Oqtane 6.0.1+ now #3548
1. 🅰️ Update Date/Time picker to use Angular Material Time Picker
1. 🩸 Oqtane: Set minimum version to 06.00.01 and minimum .net to 9 because of security warnings

### Minor

1. 🅰️ Fix some inconsistencies in the GPS UI
1. 🅰️ Minor update Google Maps API to latest (was using old API before)
1. ✅ Improved Custom DataSource so you can access the `List` and `GetStream(...)` #3540

### Bugfixes

1. 🐞 Bug: Fix access to global and site settings
1. 🐞🩸 Oqtane bugs with JavaScripts due to changes in Oqtane 6.0 and 6.0.1 - affected `Interactive` mode #3533
1. 🪲 Minor bugfixes in new `AppAssets` DataSource

### Internal Stuff

1. ✅ Refactor internal `Entity`, `Attribute` `Values`, `ContentType` to use `record`
1. ✅ Refactor internal SaveOptions to use `record`
1. ✅ Refactor internal `Entity` to be init-only (where were a few set properties left for legacy reasons)
1. 🏃🏼‍➡️ Start architecture for a Task-system to run things #3545
1. ⚠️ Enhancement in the `Pages` DataSource - property renames `Visible` to `IsNavigation` and `Clickable` to `IsClickable`
1. ⚠️ Enhancement to the `Roles` DataSource - renamed to `UserRoles` - breaking change!
