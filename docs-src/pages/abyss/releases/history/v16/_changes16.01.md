
### Changes in 2sxc 16.01 LTS (2023-05-23)

Various bugfixes + some enhancements.

1. ✅ New [rich WYSIWYG experience](xref:Basics.Data.Fields.String-Wysiwyg-Rich)
1. ✅ Edit-UI can now be opened to only show a few specified fields (feature API not yet public, but used in the new WYSIWYG feature) #3080
1. ✅ New ITypedItem and AsTyped(...) API
1. ✅ New Data.Content and Data.Header objects
1. ✅ IDynamicEntity now has methods like `String(...)`, `Int(...)`, `Bool(...)`, `Date(...)`, `Decimal(...)`, `Double(...)`, `Long(...)`, `DateTime(...)`, `Float(...)` to convert values to the desired type. #3089
1. ✅ Sort-Items UI was enhanced with remove, add, add-existing #3077
1. ✅ DynamicDataSource now supports relationships #3078
1. ✅ DynamicDataSource now shows better errors in Razor on compile issues #3084
1. ✅ Razor now automatically suggests the `insights` button on the toolbar if there are errors #3085
1. ✅ Enhancement: Serializing Entities to JSON now skips `empty` fields such as messages or ephemeral fields
1. ✅ Clean up Formulas code into better SoC @SDV
1. ✅ Clean up ancient documentation which is probably invalid, but still seen by many :(

Dnn / Evoq

1. ✅ Evoq: Better support for list management together with page workflow #3087
1. ✅ Dnn Skin: Adding module to skin using IRenderService now allows editing entities #3092

Oqtane

1. ✅ Enabled full WASM support for Oqtane #3083 (previously only server-rendering worked)
1. 🪲 Improvement on how AJAX reloads work, resolves some reload-errors #3081

Minor Bugfixes

1. 🪲 Two bugfixes related to Formulas v1 - returning date #3088
1. 🪲 XML-Data-Export now works with IsContentAdmin permissions (before it required IsSiteAdmin) #3075
1. 🪲 View list of data now works with IsContentAdmin permissions (before it required IsSiteAdmin)
1. 🪲 Fixed issue with `GetService<ILogService>()` because `ILogService` had been renamed to `ISystemLogService` #3082

