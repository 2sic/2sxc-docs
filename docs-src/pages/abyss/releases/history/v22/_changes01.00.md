
### 2sxc v22.01.00 (2026-09-??)

#### Highlights

1. Added a lot more XML Docs for C# APIs (VS Code IntelliSense)

<!-- 1. 💃🏼 Models API
1. New App Extension **vCard**
1. Linux support for Oqtane
1. Container support for Oqtane
1. ImageFlow v2.3.1-RC01 now with new `c=x1,y1,x2,y2` and `c.gravity=x,y` crop option for ImageFlow - see [docs](https://github.com/imazen/imageflow/issues/602)
1. Minimum DNN ☢️ now v10.01.00; .net 4.8 (from 4.7.2)
1. Minimum Oqtane ☢️ now v10.02.00 to support multi-language, but we recommend the latest version of Oqtane -->

#### Models APIs 💃🏼

<!-- The Models API was officially released before, but not really communicated,
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
1. 💃🏼📖 Major documentation for models use - still WIP -->


#### Raw Entity Conversion APIs 🦴

<!-- 1. 🦴 Created / improved `ContentTypeFromCode` generation system as it's the foundation of type-names for models
1. 🦴 also renamed `[ContentTypeSpecs]` to `[ContentType]` and introduced `[ContentTypeUse]` for referencing other content-types
1. 🦴 Changed base object `RawEntity` to be a record
1. ~~🦴 Created fallback `RawEntityClassic` for class based data - not sure if we'll keep this though~~
1. 🦴 Reworked Object-To Dictionary APIs to reduce the code needed
1. 🦴 Major rework in general...
1. 🦴🧪 Created ca. 400 unit tests
1. 🦴📖 Documentation for this [](xref:NetCode.Data.Coded.ContentTypes) / [](xref:NetCode.Data.Coded.Entities) -->


#### Other

<!-- 1. ⚠️ a vCard API extension was removed. We believe it has never been used since v20 where the folders changed, so we don't think this will affect anyone.
1. In addition, a new/separate App Extension **vCard** was created, which is a much better implementation of the same idea.
1. An internal `GetOnce<T>` API was changed to be `LazyGet<T>` -->


#### Copilot Enhancements ✈️

<!-- 1. ✈️ Data Copilot should not generate Ephemeral fields
1. ✈️ Data Copilot better detects entity-fields and the expected data type within
1. ✈️ Data Copilot auto-generate models on changes (WIP / BETA) - ATM for changes in ContentType (like name) and for changes in field names -->

#### App Enhancements

<!-- 1. Changed all apps to build with Vite -->

#### Bugfixes

1. 🐞 Fixed issue saving custom data through API, which sometimes resulted in a DB error because of reuse of DB context
1. 🪲 Bug activating / deactivating features - every toggle reloaded the page


#### Toolbars

<!-- 1. ✏️ Toolbars opening the edit dialog for only an entity-field works now
1. ✏️ Toolbars targeting a entity-field for add-new can now specify the content-type to use for the new entity (`New(contentType: '...')`)
1. ✏️ Improve icon assignment - especially for entity-fields with multiple target types to pick up the right one from the configurations -->

#### DNN ☢️

<!-- 1. Performance improvements loading Razor; we discovered a piece of code reviewing all registered assemblies during page load which we could reduce to once per system start. -->

#### Oqtane 🩸

1. 🩸 Ensure that XML Docs are included in distribution

#### SysData

1. Finish migration of SysData and dropped SpawnNew (an old, bad idea)

#### Internal and Code Hygiene

1. Slim down DataSources - move logic to handle `any` data to `DataSource16` (originally in `DataSourceCustom`)
1. Further clean up public APIs to hide APIs which should not be used.
1. Republished npm packages `@2sic/2sxc-typings` - <https://www.npmjs.com/package/@2sic.com/2sxc-typings>
1. NPM package for sxc-angular republished with v22, various changes. <https://www.npmjs.com/package/@2sic.com/sxc-angular>
