
### 2sxc v20.00.04 (2025-08-04)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.05 has really nice enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Enhancements

1. 🥫⚡ Entire DB Access (read/write) reworked and optimized - this is a major change, but it should not affect any apps.
1. 🥫⚡ Almost all DB access now uses non-tracking Entity-Framework queries, which should improve performance.
1. 🥫⚡ Introduce Parallel data processing on save - imports now 3-10x faster (Patron Performance)
1. 🥫🦸🏼 Various performance features with DB can now be fine-tuned in features UI.
1. 🅰️ App Installer from Template improved
1. 🅰️ App Install new but change name/guid to use existing app as if it's a template
1. 🧑🏼‍💻 Rework SoC `dynamic` code and `Typed` Code - separate Metadata, Files, Folders, Fields to be completely independent
1. 📖 Many UIs now have guidance text when opening the dialog


#### Bugfixes

1. 🐞 Razor / WebApi: `GetService()` was missing parameter `typeName` because in 20.00.04 we thought it's not used.
1. 🐞 Issue creating new Apps in some cases - especially with new name
1. 🐞 Bug initializing App still sometimes created multiple Settings/Resources
1. 🩸 Oqtane: AdamSecurityCheckBasic.CanEditFolder sometimes had a null-ref exception in Oqtane
1. 🐞 Visual Query: Relationship filter - a modified behavior in v20.00.02 was reverted back to original (empty filter value should still filter for empty)
1. 🐞 Exotic feature `Ghost` ContentType hasn't been working for a long time now because name of API parameters changed
1. 🐞 Fix loading data on large apps - relationships were sometimes duplicated in cache
1. 🐞 Admin UI - minor issue showing details of shared fields were wrong in some cases
1. 🪲 Minor: when toggling features the section always collapsed
1. 🪲 Minor: Toggling language always sent 2 API requests


#### Internal Changes

1. Temporary property `.Dyn` was removed from `ITypedItem`
1. Entity Framework projects are now using C# nullable
1. Features can now be in multiple licenses (such an LightSpeed in Patron Perfectionist and Patron Performance)
1. Internal change to `Entity` object to make it fully immutable
1. ☢️ DNN: Improved internal dependency injection on ng-edit UIs
