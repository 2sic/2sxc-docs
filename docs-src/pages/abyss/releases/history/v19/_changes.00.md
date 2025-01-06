
### 2sxc v19.00 (2024-12-21)

1. 🅰️ Update UI to Angular 19 and Angular Material 19
1. ✅ Finalize Pickers main features
    1. Radio
    1. Checkboxes
    1. Preview Material Icon
    1. Preview SVG
    1. Preview Image (jpg/png)
    1. Configurations: `AppAssets`, `CSS`, `Entity`, `Query`, `CustomList`, `CSV`
    1. Preview features
    1. `Info` `Link` `Tooltip`
1. ✅ New AppAssets DataSource and `System.AppAssets` query to get assets for pickers such as all SVGs in a folder.
1. ✅ Double-Encrypt sensitive data on HTTP-Transport
1. ✅ Ability to switch UI languages (not just content-languages)
1. ✅ GPS Picker enhancements with **my current location** and searching for addresses which were not in the data
1. ✅ Ability to delete a field (column) which had entity-relationships in it (previously SQL stopped you)
1. ✅ New `Toolbar.Audience(...)` API to show it when needed
1. ✅ Improve UI for creating fields for content-types, better dropdowns, longer etc.

Breaking Changes

1. An interface called `ToSic.Sxc.DataSources.IBlockInstance` was removed since it was identical to `ToSic.Eav.DataSource.IDataSource` and should not be used anywhere.

Bugfixes

1. 🐞 Fix: various issues around the Pickers
1. 🐞 Fix: Public forms called a backend endpoint which was protected, and got errors (though it wasn't necessary)

Internal

1. ✅ Refactor toolbar and image/picture objects to use `record`s instead of `class`es in C#
