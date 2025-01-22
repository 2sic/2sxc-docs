
### 2sxc v19.02 (2025-01-21)

1. ✅ `IUserService` on `Kit.User` #3552 which can get one/all users and all roles of Dnn/Oqtane in the same signature as the `Users` DataSource
1. ✅ better structure for models in `Cms.Users`, `Cms.Pages` etc.
1. ⚠️ Renamed the system query `System.Roles` to `System.UserRoles` - breaking change!

Minor

1. ✅ Ensure that `As<...>` API allows the new model interfaces just like `AsList<...>` #3551
2. 🐞 Bug: previous release a few days ago had an issue exporting Apps - files in the root folder were missing
3. 🐞 Bug: previous release a few days ago had issues saving hidden items - they were visible
4. 🐞 Bug: App name and version did not show in App Admin UI
5. 💪🏼 Cleanup internal APIs on an internal interface `IEntityLight` which is not public. Properties: `Title`, `Attributes` and `this[...]`
