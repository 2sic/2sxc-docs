
### Changes in 2sxc 16.02 (2023-07-07)

Major Enhancements

1. ✅ ImageFlow upgraded to version 0.10.0 - thereby making sure it works with FIPS enabled [#3121](https://github.com/2sic/2sxc/issues/3121)
1. ✅ Brand new typed code **Pro** mode
    - `ITypedItem` and `ITyped` interfaces with properties such as `Id`, `Guid` and methods such as `.String(name)`, ...
    - `RazorPro`, `ApiPro`, `CodePro` base classes with completely reworked API such as `AsStack(...)`, `MyPage` or `AllSettings`
    - `ApiPro` now serializes JSON using new defaults which are more common in WebApis (lower-case properties, auto-serialize entities, etc.)

Documentation

1. ✅ Upgraded DocFX from 2.48.1 to 2.67.3 with major improvements to the generated docs
1. ✅ Improved Documentation of all Razor and WebApi base classes!

Support for Developers

1. ✅ Dramatically improved insights with more details and filtering options
1. ✅ Created system to automatically detect and warn about deprecated code - using buttons in the toolbar
1. ✅ Created **CodeHelp** system to guide developers when common coding mistakes were made
1. ✅ New **Obsolete** system collects issues per App and shows them even if the current Razor is not affected
1. ✅ Show **CodeHelp** warnings if a RazorPage doesn't have `@inherits`

Various bugfixes + some enhancements.

1. ✅ Refactored Razor and WebApi base classes to use Composition over Inheritance
1. ✅ RazorBlade upgrade from v4.2.0 to 4.4.0 (also for .net 7 compatibility)
1. ✅ Feature to _not_ show edit-toolbar buttons on HTML coming from Resources
1. ✅ Improve _not_ showing a metadata-toolbar on images which are coming from demo-items

Dnn / Evoq

1. ✅ Downgrade SQL to still work with SQL Server 2012 as people had trouble upgrading [#3120](https://github.com/2sic/2sxc/issues/3120)
1. ✅ Since ImageFlow was upgraded, the following DLLs were also upgraded
    - Imageflow, 0.7.24 -> 0.10.0
    - Imageflow.Net, 0.7.24 -> 0.10.0
    - Imazen.Common, 0.7.7 -> 0.8.1
    - Imazen.HybridCache, 0.7.7 -> 0.8.1
    - Newtonsoft.Json, Version=10.0.0.0 -> 13.0.0.0
1. ✅ As part of the upgrade we also had to upgrade some MS DLLs
    - Microsoft.Bcl.AsyncInterfaces, Version=6.0.0.0 -> 7.0.0.0
    - System.Collections.Immutable, Version=6.0.0.0 -> 7.0.0.0
    - System.Text.Encodings.Web, Version=6.0.0.0 -> 7.0.0.0
    - System.Text.Json, Version=6.0.0.0 -> 7.0.0.2
    - System.Memory, Version=4.0.1.1 -> 4.0.1.2

Oqtane

1. ✅ Oqtane 4.0 Support (with .net 7) [#3123](https://github.com/2sic/2sxc/issues/3123)
1. ✅ Reworked API Middleware to avoid conflicts with OAuth 2

Minor Bugfixes

1. 🪲 Fixed issue with Swiper not being able to add slides [#3108](https://github.com/2sic/2sxc/issues/3108) [#3112](https://github.com/2sic/2sxc/issues/3112)
1. 🪲 Fixed issue with DatePicker in Edge and also added more cultures [#3113](https://github.com/2sic/2sxc/issues/3113)
1. ✅ Changed internal APIs to return RazorBlade `IHtmlTag` objects instead of previously `IHybridHtmlString` [#3098](https://github.com/2sic/2sxc/issues/3098)
