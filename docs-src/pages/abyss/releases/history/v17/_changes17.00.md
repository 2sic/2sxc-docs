
### 2sxc v17.00 (2023-12-23)


1. ✅ DNN: Require CodeDome C# 7.3 to be installed
1. ✅ Docs infrastructure can now be multi-versioned
1. ✅ Show app icon in admin UI
1. ✅ Ctrl+Click on toolbar buttons to open in new tab
1. ✅ Completely refactor internal APIs to do advanced work and save data
1. ✅ Change UI to use Angular 17 (from Angular 14)
1. ✅ Get intellisense to work in VS Code
    1. ✅ Work out best way to do this in VS Code
    1. ✅ Work out best way to hide non-public APIs
    1. ✅ Work out best way to include docs (xml files, nuget, etc.)
1. ✅ Support C# 7.3 in DNN with warning if not installed
1. ✅ System Capabilities Framework for tagging apps which need certain technologies/features
1. ✅ Crazy new compiled typed _shared_ code `/ThisApp/Code` - see [Hot App Code](xref:Guides.HotBuild.Index)
1. ✅ New APIs on Typed Code
    1. `IsPublished`
    1. `Publishing`
      - `Publishing.HasPublished`, `Publishing.HasUnpublished`, `Publishing.HasBoth`
      - `Publishing.GetPublished()`, `Publishing.GetUnpublished()`, `Publishing.GetOpposite()`
