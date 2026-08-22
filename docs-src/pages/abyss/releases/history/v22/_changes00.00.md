
### 2sxc v22.00.00 (2026-08-??) PREPARING / WIP

#### Highlights

1. 💃🏼 Models API
1. New App Extension **vCard**
1. Linux support for Oqtane
1. Container support for Oqtane
1. Minimum DNN ☢️ now v10.01.00; .net 4.8 (from 4.7.2)
1. Minimum Oqtane ☢️ now v10.02.00 to support multi-language, but we recommend the latest version of Oqtane

#### Models APIs 💃🏼

The Models API was officially released before, but not really communicated,
so we believe it's not used yet.
During our first attempts to use it we determined that it needs some more love, so we reworked it.
This is kind of a breaking change, but we believe it's not used yet, so it should be safe to do.

1. 💃🏼 Introduce `ToModelOptions` for type-name and null-conversion options
1. 💃🏼 Standardize exceptions thrown for better diagnostics, incl. missing empty constructor etc.
1. 💃🏼 Ensure that interface specs are prioritized to concrete implementations if the interface was used in the `ToModel<I>` method
1. 💃🏼 On interfaces which are used for both models and Raw Data, also respect the `Name` of the `[ContentType]` attribute
1. 💃🏼 Change derived class to be on the `IModelFromEntity<Concrete>` instead of the `[Model...]` attribute
1. 💃🏼 Create / test many combinations of `ToModel` / `FirstModel` etc. - also with/without factory
1. 💃🏼 Introduced `IFieldSettingsGeneral`, `IContentTypeDetails`, `IPaging`, `IViewConfiguration` models
1. 💃🏼🧪 Created ca. 500 unit tests
1. 💃🏼📖 Major documentation for models use - still WIP


#### Raw Entity Conversion APIs 🦴

1. 🦴 Created / improved `ContentTypeFromCode` generation system as it's the foundation of type-names for models
1. 🦴 also renamed `[ContentTypeSpecs]` to `[ContentType]` and introduced `[ContentTypeUse]` for referencing other content-types
1. 🦴 Changed base object `RawEntity` to be a record
1. ~~🦴 Created fallback `RawEntityClassic` for class based data - not sure if we'll keep this though~~
1. 🦴 Reworked Object-To Dictionary APIs to reduce the code needed
1. 🦴 Major rework in general...
1. 🦴🧪 Created ca. 400 unit tests
1. 🦴📖 Documentation for this [](xref:NetCode.Data.Coded.ContentTypes) / [](xref:NetCode.Data.Coded.Entities)


#### Other

1. ⚠️ a vCard API extension was removed. We believe it has never been used since v20 where the folders changed, so we don't think this will affect anyone.
1. In addition, a new/separate App Extension **vCard** was created, which is a much better implementation of the same idea.
1. An internal `GetOnce<T>` API was changed to be `LazyGet<T>`

#### Copilot Enhancements ✈️

1. ✈️ Data Copilot should not generate Ephemeral fields
1. ✈️ Data Copilot better detects entity-fields and the expected data type within
1. ✈️ Data Copilot auto-generate models on changes (WIP / BETA) - ATM for changes in ContentType (like name) and for changes in field names

#### App Enhancements

1. Changed all apps to build with Vite

#### Bugfixes

1. 🪲 `MailService` threw exception when not providing attachments
1. 🪲 Compiling code fails to pick up config.json on the fly, so installing Radmin doesn't work until restart
1. 🪲 Bug exporting apps with very long names
1. 🪲 Quick-Dialog had timing issues, so it sometimes didn't appear as expected

#### Toolbars

1. ✏️ Toolbars opening the edit dialog for only an entity-field works now
1. ✏️ Toolbars targeting a entity-field for add-new can now specify the content-type to use for the new entity (`New(contentType: '...')`)
1. ✏️ Improve icon assignment - especially for entity-fields with multiple target types to pick up the right one from the configurations

#### DNN ☢️

1. Performance improvements loading Razor; we discovered a piece of code reviewing all registered assemblies during page load which we could reduce to once per system start.

#### Oqtane 🩸

1. 🩸 Support the new Multi-Language system of Oqtane (note that it's still very buggy, because the Oqtane implementation is buggy)
1. 🩸 Improve ImageFlow in edge cases
1. 🩸 Introduce Linux support (and test on Linux), preparing for container use as well and multi-DB  
    Side effect: Oqtane distribution is now ca. 30MB larger, because it contains all variants of the native DLLs.
    As soon as the Marketplace supports it, we'll create a separate package for Linux and MacOS.
1. 🩸 Introduce multi-DB support for Postgres, MySQL and SqlLite

#### SysData

This is about changing how most of our internal APIs work.
To make them more flexible, we're changing most of them to use DataSources.
This is the list of systems which we changed, but there are way more as we can't list every one.

1. Apps
1. ZoneApps
1. AppLanguages
1. SiteLanguages
1. ZoneLanguages
1. SystemInfo
1. Fields
    1. InputTypes
    1. ReservedNames
    1. SharedFields
    1. Ancestors
    1. Descendants
1. InheritableApps
1. AppStatistics
1. Scopes
1. AppEnhancements
    1. AppSettings
    1. AppResources
    1. AppSettingFields
    1. AppResourceFields
    1. AppMetadata
1. GetEntitiesForAdmin
1. AppWebApiControllers
    1. AppWebApiControllerDetails
    1. AppWebApiControllerEndpoints
1. ContentTypeDetails

#### Internal and Code Hygiene

1. Entity Framework: Disabled MARS (Multiple Action Result Sets)
1. EAV UI: Upgrade to Angular 22
1. Quick-Dialog: Upgrade to Angular 22
1. Improve handling of git dependabot requests
1. Various unit tests in the `$2sxc` ui using Vitest
1. Refactor import/export code
1. Change build of all JS projects to Vite and ESBuild; `$2sxc`, `inpage`, `quick-dialog`, `eav-ui` and more
1. Updated ImageFlow from v2.1.0-RC11 to v2.3.1-RC01


[!include["Breaking Changes"](./_brc00.00.md)]
