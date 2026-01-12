
### 2sxc v20.00.00 (2025-06-25)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

#### Highlights

1. ☢️ The module was moved to `/DesktopModules/ToSic.Sxc` and was renamed to `2sxc`
1. 💾 The entire SQL was reorganized - see [](xref:Abyss.Db.ChangesV20) for details.
1. ⚙️ New CoPilot Code Generator for Models (like TypedItems, but lighter / POCO)
1. ❤️‍🩹 Introduced many detections of old code to give guidance to users who must fix old code
1. 🥇 Create App experience improved to provide apps from the catalog
1. 🥇 App Catalog enhanced to manage template apps (which expect to be renamed upon installation) - allowing for more template apps in future
1. 🦸🏼 New Patrons Performance support tier to use all our performance enhancements
1. 📖 Docs improved to better indicate internal APIs

#### Enhancements

1. 💾 Database performance enhancements with new indexes and improved code
1. ✏️ Improved Edit-UI to use in the admin section without saving the entity (for config dialogs which are generated from the schema)
1. ✏️ Improved Toolbar API [.Audience(...)](xref:ToSic.Sxc.Edit.Toolbar.IToolbarBuilder.Audience*) with `everyone: true` and `roleNames` and `denyRoleNames`
1. 👱🏼 User Service with new [.GetCurrentUser()](xref:ToSic.Sxc.Services.IUserService.GetCurrentUser*)
1. ⚡ Lots of internal performance improvements, especially in loading, saving and handling data.
1. 👨🏼‍💻 All 2sxc / EAV code is now C# latest `#nullable` which makes it more robust.
1. 🖼️ When an imported app has [Rich WYSIWYG](xref:Guides.Wysiwyg.Index) content with images, [the links will be auto-corrected upon edit](https://github.com/2sic/2sxc/issues/3645).
1. 🌪️ Visual Query improved with ability to mirror out-streams based on in-streams (for things such as serialization-DataSource etc.)
1. 🪵 New features to reduce logging of loading the system or data of Apps, which creates large logs but are rarely used
1. ✅ Features can now support detailed configuration (used in the new Logging configuration)
1. 🥷🏼 Most internal APIs now clearly moved into `.Sys` namespaces

#### Version Bumps and Other Changes

1. ☢️ Minimum DNN version is now v9.11.02 (previously v9.6.2)
1. 🖼️ Updated ImageFlow (the image resizer) to v2.1.0-RC11 from 2.0.0-Preview8
1. 🅰️ Update UI to Angular 20 and Angular Material 20


#### Bugfixes

1. 🩸 Oqtane fix issue which [broke 2sxc because of changes in Oqtane 6.1.2](https://github.com/2sic/2sxc/issues/3643)
1. 🐞 Fix: DataSource RelationshipFilter accidentally filtered out results when the filter was `""` (blank) instead of not filtering at all
1. 🐞 Fix: Images could not be deleted right after uploading, because image resizer kept the file open on the server
1. 🐞 Fix: When serializing entities with custom configuration, the configuration for the GUID was sometimes ignored
1. 🐞 Fix: Visual Query preview JSON didn't match serialization configuration.

#### Internal and Code Hygiene

1. ✅ Most of the code was reorganized into more DLLs, to better separate concerns and make it easier to maintain / contribute.
1. ✅ All the code for Eav and 2sxc is now C# latest `#nullable` which makes it more robust.
1. ✅ Dropped old .net WebClient and replaced with HttpClient
1. ✅ Cleanup / improvements around logging.
1. ✅ Replaced old .net APIs for encryption with latest (reduce warnings)
1. 🐞 Fix bug which affected developers, where APIs were missing in intellisense because of the `EditorBrowsable` attribute
1. ✅ Improved naming of `IMetadata` from `IMetadataOf`
1. ✅ Completely refactored the `IBlock` implementation and factory for better architecture
1. ✅ Internal API to debug-dump objects was refactored
1. ✅ Introduced new `ServiceBase<TOptions>` for services which need options at startup
1. ✅ Introduced new `SpawnNew()` api and `Generator<TService, TOptions>` for objects expecting a setup.

