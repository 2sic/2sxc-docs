
### 2sxc v17.01 (2024-01-18)

1. Moved almost all internal APIs in the ToSic.Sxc namespace to hidden locations #3189
1. Marked a lot of internal APIs so that they won't appear in IntelliSense
1. ♨️ HotBuild: Improved errors in Razor so the user can better find them #3246
1. ♨️ HotBuild: Improved errors when compiling ThisApp #3247
1. ♨️ HotBuild: Support Editions such as `live` and `staging` with auto-fallback #3248
1. ♨️ Roslyn: Improve error if `@inherits` ends in semicolon #3245
1. ♨️ HotBuild: Show all compiled types in insights
1. ♨️ HotBuild: Minimize exact pre-included namespaces
1. ♨️ HotBuild: Performance Improvements
1. 🟣 Toolbars: Show hover on `layout` button after a delay with module-infos #3251

New Features / Important Improvements

1. `Kit.PageParameters` now has new commands `Toggle(...)`, `Remove(...)` and `Filter(...)` see docs #3241 #3242 #3243
1. 🟣 Toolbars: Tweak Notes can now `delay` and `linger` #3250 docs
1. Create-New File now shows templates for `RazorTyped`, `CodeTyped` and ApiTyped
1. ✏️ App-Management UI now uses a left-menu (experimental)
1. ✏️ Edit-UI: Boolean fields can now be toggled by clicking on the label
1. 🖼️ Resizer: Improve handling of images in virtual-application folders

Bugfixes

1. `ITypedItem.Equals` now works #3213
1. Old Render APIs were broken, which affected News App 4.1.1 and others #3252
1. Fix bug with `UniqueKey` which affected HotSpots App
1. Various minor UI bugfixes related to the entity-picker and dropdowns

### 2sxc v17.01.04

Minor enhancements and bugfixes

1. Image toolbar now shows resize specs 🌟 #3270
1. Toolbar notes now support a `format` = `html` #3271
1. Edit inner-content in accordions for non-website-admins #3234
1. Old Razor base class - `PageData` didn't always work #3260
1. HotBuild now respects additional assemblies from web.config #3272

### 2sxc v17.01.05

minor bugfixes l enhancements including

1. dropdown pills fixed #3269
1. REST Query API fails when used from "outside" #3274
1. page picker in UI is broken in 17.01.04 #3276
1. auto-serialized `ITypedItem` and `IEnumerable<ITypedItem>` #3277
1. refactor an internal old API to init app-objects #3275
1. HotBuild Performance Improvements (locking / caching)
1. HotBuild improve detection when CS files inherit from ThisApp base 1. classes
1. Internal Lookup System Performance Improvements
1. internal work for the new Picker-UI system

### 2sxc v17.01.06

1. Upgrade System.Data.SqlClient #3209
1. TweakButton on dynamic code #3279
1. Edit menu in Dnn fix #3280
1. Bug with dropdowns #3281
1. Export/Import App now includes hidden entities #3282
1. Export/Import App now includes Attribute SysSettings #3283


### 2sxc v17.01.07

1. ajax reload on details-pages eg. blog-post #3287
1. SQL DataSource can't connect #sql #3285
