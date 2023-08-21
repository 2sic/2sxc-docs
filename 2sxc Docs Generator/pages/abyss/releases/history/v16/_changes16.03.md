
### Changes in 2sxc 16.03 (2023-08-21)

Enhancements around Typed Code

1. ✅ Typed: rename `RazorPro` to `RazorTyped` etc. #3147
1. ✅ Make all typed objects very strict when checking if fields exist
1. ✅ Add much more helpful info / error when fields not found
1. ✅ Typed: Massively enhanced with strict checks and reduced the possibility of writing code which doesn't do anything
1. ✅ Typed: `ITypedItem` now has a new .Picture(...) method making the code nicer #3135
1. ✅ Typed: `ITypedItem`s can now be mocked #3141 to create alternate data in code when no data exists
1. ✅ Typed: New methods `ContainsKey(...)`, `Keys(...)` #3142
1. ✅ Typed: New methods `IsEmpty(...)` and `IsNotEmpty(...)` #3144
1. ✅ Typed: method `.String(..., scrubHtml)` now also accepts a string containing tags to remove #3146
1. ✅ Typed: If an error occurs, much more information is provided as to how to fix #3143 #3145
1. ✅ Typed Json: now also supports paths, so you can use `Kit.Json.ToTyped(jsonString).Int("Root.Child.Id")`
1. ✅ Typed Json: now also strict using propsRequired by default
1. ✅ Typed: the property `.Dyn` now only exists on `ITypedItem` (entity-based) and not on other wrappers

Other Enhancements

1. ✅ Image Resizer: New `Square` resize settings #3134
1. ✅ Image Resizer: `ImageService` can now also handle `IFile` objects and get the metadata automatically #3140
1. ✅ Web Farm Cache: Updated for v16.02+ (enterprise customers only)
1. ✅ Page Parameters: now support ITyped so you can use MyPage.Parameters.Int("id") and similar

Support for Developers

1. ✅ Errors now highlight the `.cshtml` line which caused the error
1. ✅ Errors on mistyped property names now gives very detailed information about it

DNN / Evoq

1. ✅ Image Resizer: Upgrade to dnn-imageflow 1.2.1 #3130
1. ✅ Newtonsoft internal version in DNN Manifest now matches 13.0.3

Oqtane

1. ✅ Oqtane: Better error when Oqtane in installed without sufficient DB permissions #3128 / #3131
1. ✅ Internal: Code cleanup with warnings new EF-Core #3132
1. ✅ Internal: EF Core QuerySplittingBehavior #3133

Minor Bugfixes

1. 🪲 turnOn failed on AJAX reloads during editing #3127
1. 🪲 Oqtane: Bugfix importing App Assets #3129
1. 🪲 Web Farm Cache: Fix issue which occured on license uploads
1. 🪲 Licenses: fix issue with multiple licenses / names resulting in an `unlicensed` message
