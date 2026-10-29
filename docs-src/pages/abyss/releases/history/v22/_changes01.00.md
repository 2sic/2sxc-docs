
### 2sxc v22.01.00 (2026-10-29)

#### Highlights

1. Added a lot more XML Docs for C# APIs (VS Code IntelliSense)
1. Major improvement in data Admin UI for lists containing more than 1000 items or many columns  
    Now the UI will only retrieve the first 1'000 items and only the primary columns,
    allowing the admin to select what he really wants to load so everything is much faster.
1. Preparations to support .net `Microsoft.Extensions.Logging` when using insights (Beta)


#### Raw Entity Conversion APIs 🦴

1. 🦴 Improve raw to Entity conversion by respecting properties which have the attribute `[ContentTypeField(Type = ValueTypes.Object)]`

#### Bugfixes

1. 🐞 Fixed issue saving custom data through API, which sometimes resulted in a DB error because of reuse of DB context
1. 🪲 Bug activating / deactivating features - every toggle reloaded the page
1. 🪲 Minor bug which prevented view-metadata from being edited
1. 🪲 Minor bug searching for features / licenses in Admin-UI


#### Oqtane 🩸

1. 🩸 Ensure that XML Docs are included in distribution
1. 🩸 Update ImageFlow 1.13.1 and .net runtimes for that.
1. 🩸 Ensure XML docs are included in the distribution.
1. 🩸 Shrink Oqtane distribution from ca. 46MB to 30MB thanks to better ImageFlow binaries without debug data.

#### JavaScript

1. Republished npm packages `@2sic/2sxc-typings` - <https://www.npmjs.com/package/@2sic.com/2sxc-typings>
1. Include typed API for fetch commands where the data posted and retrieved are different

#### SysData

1. Finish migration of SysData and dropped SpawnNew (an old, bad idea)
1. Drop almost all cases of `AllowUnknownValueTypes` and replace with the content-type attribute
1. Slim down the code needed for most custom data sources using `override` and primary constructor.

#### Internal and Code Hygiene

1. Slim down DataSources - move logic to handle `any` data to `DataSource16` (originally in `DataSourceCustom`)
1. Further clean up public APIs to hide APIs which should not be used.
1. NPM package for sxc-angular republished with v22, various changes. <https://www.npmjs.com/package/@2sic.com/sxc-angular>
1. Update all .net projects from .net 9 to .net 10 (DNN and Oqtane)
1. Improve code for internal `UrlValues` objects
1. Replace handling of `IResponseMaker`
1. Split state objects from the factory, such as `IUser`, `ISite`, `IModule` etc.
1. Dramatically improve `ContextOf...` incl. `ISxcCurrentContextService` and clarify code paths which prepare and consume. (major)
1. Improve code structure of permission checkers (composition over inheritance)
1. Do composition over inheritance for `XmlExporter` and make for _functional_
1. Prevent delete app which has shared content-types used by other apps
1. Improve Admin-UI when viewing App details, fewer backend calls
1. Drop old `SpawnNew` convention (internal)

