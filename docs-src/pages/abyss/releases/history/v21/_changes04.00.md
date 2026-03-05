
### 2sxc v21.04.00 (2026-03-04)

#### General Enhancements

1. ⚙️ Admin: Ability to click on an entity to see it's relationships ⭐
1. ✏️ Edit UI: Ability to always hide HTML button from normal users (you change the default per system/site) (sponsored)
1. ✏️ Edit UI: Ability to show the HTML button for super-users in Debug mode (sponsored)

#### Minor

1. 🧑🏼‍💻 Code Generator start with auto-generate on changes (WIP)
1. 🧑🏼‍💻 VS Coding experience, work on making it compatible with latest C# in VS Code

#### Bugfixes

1. 🐞 App Export was broken, missing some data (regression, v21.03)
1. 🐞 Visual Query can't edit newly created queries
1. 🐞 Copilot - was broken in v21.03
1. 🪲 Minor visual query certain edge cases
1. 🪲 Minor admin shared fields - definitions were not showing properly
1. 🪲 Minor when in the list-sort dialog, titles from HTML looked off (drop html, ellipsis)

#### Internal and Code Hygiene

1. Rework internal `DataBuilder` to `DataAssembler`
1. 🌪️ DataSources: New internal DataSource `System.GetEntities`
1. Internal object structure for permission-check, now uses new `IServiceWithSetup`
1. Chore: update FAB components to latest version
1. 🌪️ DataSources: Rework public Linking API, improve the [IDataService](xref:ToSic.Sxc.Services.IDataService) with `CreateLink()` and `CombineLinks()`
1. 📖 Improve docs - internal docs + start improving section [C# Razor](xref:NetCode.Index)
