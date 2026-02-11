
### 2sxc v21.00.00 (2025-12-27)

Note: The Oqtane release had a small bug which was fixed in v21.00.01 on 2026-01-05.

#### Highlights Razor / C# Coding Enhancements

1. ⚙️ New CoPilot Code Generator for **Models** (like TypedItems, but lighter / POCO) v20.00.00
1. 📤 Introduced [ITypedApi](xref:ToSic.Sxc.Code.ITypedApi) and [ITypedApiService](xref:ToSic.Sxc.Services.ITypedApiService) to improve code quality when using 2sxc in skins or outside of DNN. v20.00.03
1. 🔍 `App.GetQuery(...)` now returns an [ITypedQuery](xref:ToSic.Sxc.Data.ITypedQuery) object which also has `GetAll<T>` and `GetOne<T>` just like [App.Data](xref:ToSic.Sxc.Apps.IAppDataTyped) v20.00.03
1. 🪪 New `UserElevation` to determine that caching is enabled/disabled for certain levels v20.00.05
1. 💃🏼 Major: Template Service can now create templated entities. v20.00.09
1. 🧑🏼‍✈️ Data Copilot: Ability to configure in detail what should be generated and how (specify alternate folders, namespaces, etc.) v20.00.09

#### Highlights Edit UI Enhancements

1. 🅰️ Admin UI now supports ctrl+enter in most dialogs to close and save. #TODOC / #TOBLOG
1. 🌍 Language: Experimental feature to also allow translating _to_ the primary language

#### Highlights App Create / Install Enhancements

1. 🥇 Create App experience improved to provide apps from the catalog
1. 🧑🏼‍💻 Install App: Ability to take any app and use it as a template (so give it a new name/GUID) #TODOC

#### Highlights Patron Performance Enhancements

1. 🦸🏼 New Patrons Performance support tier to use all our performance enhancements
1. 🥫🦸🏼 Various performance features with DB can now be fine-tuned in features UI.
1. ⚡ Major performance improvements all over, especially for 🦸🏼 **Patrons Performance**
1. ⚡ Razor Partial Caching introduced (🦸🏼 Patron Performance)
1. ⚡ Razor API `@Configuration.PartialCache(...)` to configure RazorPartialCaching
1. ☢️ Introduce DNN CSHTML compiler caching - major performance boost, especially on startup (🦸🏼 Patron Performance)

#### Highlights Formula Enhancements

1. 🔬 Formula: Introduce `context.user.roles` to let formulas check user roles. v20.00.05
1. 🔬 Formula: Introduce `context.user.isContentEditor` to match latest DNN 10 features. v20.00.05
1. 🔬 Formula: Introduce `context.target.entity.isNew` to let formulas check if an entity is new. v20.00.06
1. 🔬 Formula: Introduce `context.target.entity.isCopy` to let formulas check if an entity is a copy. v20.00.06
1. 🔬 Formula: Edit UI new button to close formula footer v20.00.8

#### Highlights 🧩 App Extensions (NEW v20.00.09)

1. 🧩 Feature to edit extension definition and store in a JSON in the extensions `App_Data`
1. 🧩 System can differentiate between installed extensions and extensions being developed in an App, and provide different actions
1. 🧩 Feature to export an extension incl. extensive infos, file fingerprints, versions, releases
1. 🧩 Feature to install an extension incl. drag & drop
1. 🧩 Feature to check if an installed extension was modified (for safer upgrading)
1. 🧩 Feature to delete an installed extension
1. 🧩 Extension Settings and language Resources
1. 🧩 Extensions can now be installed in multiple editions
1. 🧩 Extensions with input-types and multiple editions will load `staging` if user is developer/host
1. 🧩 Extensions have a lot of properties and links shown in the quick overview, as well as `icon.png`
1. 🧩 Extensions can be installed from app-catalog <https://2sxc.org/en/apps/>
1. 🧩 Extensions can also reference other extensions to bundle together

#### Highlights Query / REST Enhancements

1. 🌪️ Queries and REST: Languages of data now properly matches user language
1. 🌪️ Queries: Published many more System queries which were previously secret, such as `System.ContentTypes`, etc. see [](xref:Basics.Query.SystemQueries)
1. ❤️‍🔥 OData Support WIP
    1. $select support
    1. $filter support for basic filters (`eq`, `ne`, `gt`, `lt`, `ge`, `le`, `startsWith`, `not startsWith`, `contains`, `not contains`)
    1. $orderby support

#### Other Enhancements

1. 🧑🏼‍💻 Finally stabilized and released feature to change `Edition` to switch between `live` and `staging` v20.00.00
1. 🥫⚡ Entire DB Access (read/write) reworked and optimized - this is a major change, but it should not affect any apps. v20.00.04
1. 🥫 DB: Increase SQL timeout because sometimes SQL was sleeping and causing timeouts #3698
1. 🥫 DB: Prepare structure for future undelete
1. Code: Prepare code for future undelete

#### Version Bumps and Other Changes

1. 🅰️ Update UI to Angular 21 and Angular Material 21
1. 🅰️ Update Quick-Dialog to Angular 21 and Angular Material 21

#### Razor / C# Enhancements

1. Minor: Sort attributes on a Content-Type according to sort-priority for easier looping in any code
1. Minor: `IContentTypeAttribute` now has a `InputType` property to easily get the input type without loading the full attribute
1. Minor: `IContentTypeAttribute` now has a `IsEmpty()` extension method to easily detect if an attribute is empty
1. Minor: `IContentTypeAttribute` also has a lot of other extensions such as `IsBoolean()`, `IsDateTime()`, `IsNumber()`, `IsString()`, etc.

#### Bugfixes

1. Internal bug where app-folder was not known if error occurred during data load.

#### Internal and Code Hygiene

1. Switch JS unit testing to VTest - for Eav-UI, 2sxc-ui, inpage, ...
1. Update `System.Diagnostics.DiagnosticSource` to v9.0.11

[!include["Changes"](./_brc00.00.md)]
