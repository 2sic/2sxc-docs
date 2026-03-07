
### 2sxc v21.05.00 WIP (2026-03-??)

#### General Enhancements

1. 🧑🏼‍💻 VS Code Intellisense - found way to get it to work with latest C# DevKit and improve hints/warnings dramatically

TODO

#### Minor

<!-- 1. 🧑🏼‍💻 Code Generator start with auto-generate on changes (WIP) -->
1. 🧑🏼‍💻 VS Coding experience, work on making it compatible with latest C# in VS Code (improved from 21.04)

#### Bugfixes

1. 🐞 Edit UI: In some cases closing a dialog kept the overlay, so the page needed F5 (regression, v21.03)

<!-- 1. 🐞 App Export was broken, missing some data (regression, v21.03) -->
<!-- 1. 🪲 Minor visual query certain edge cases -->

#### Docs / Tutorials

1. 📖 DNN Module Metadata - new tutorial and demo container
1. 📖 Start improving C# Razor section in docs
1. 📖 Improve internal docs for developers
1. 📖 Docs introduced tiles and also improved title typography
1. 🎓 Tutorial: Many extension samples
1. 🎓 Tutorial: Rework structure to manage tabs (internal)
1. 🎓🐞 Tutorial: Fixed some broken tutorials - some which severely affected the Quick-Reference page

#### Internal and Code Hygiene

1. Rework internal `DataBuilder` to `DataAssembler`
1. 🌪️ DataSources: New internal DataSource `System.GetEntities`
1. Internal object structure for permission-check, now uses new `IServiceWithSetup`
1. Chore: update FAB components to latest version
1. 🌪️ DataSources: Rework public Linking API, improve the [IDataService](xref:ToSic.Sxc.Services.IDataService) with `CreateLink()` and `CombineLinks()`
1. 📖 Improve docs - internal docs + start improving section [C# Razor](xref:NetCode.Index)
