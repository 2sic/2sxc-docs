
### Changes in 2sxc 16.04 (2023-09-05)

Highlight: **UniqueKey**

* ✅ Razor: New `UniqueKey` property (in Typed mode) #3151
* ✅ Razor: New `Kit.Keys.UniqueKeyWith(...)` for unique IDs and working with JS #3152

Images

* ✅ Images: Images in rich wysiwyg mode now are shown nicely after import into other site
* ✅ Images: Dialog-Options to set empty title and not use fallback #3150
* ✅ Images: Enable crop/title dialog for public files, with delayed toolbar and warning-hint #3057
* ✅ Images: Fix Safari bug with small images #2
* ✅ Images: Ability to specify alternate toolbar #3157
* ✅ Images: Ability to specify no toolbar #3158
* ✅ Images: Ability to use Toolbar outside of main picture/img tag using img.Toolbar() #3156
* ✅ Images: Metadata now also has a DescriptionExtended

Razor in **Typed** Mode

* ✅ MyModel: Improve handling fallback / required #3149
* ✅ App.Folder.Url to replace App.Path for clearer APIs
* ✅ App.GetQuery(...) to replace App.Query[name]
* ✅ All ITyped objects now behave strict by default
* ✅ Complete various scenarios for ITyped with unit tests, especially conversion of anonymous and json-based ITyped
* ✅ All ITyped now have APIs for ContainsKey, IsEmpty and IsNotEmpty
* ✅ Razor: Errors now highlight the .cshtml file with a 🎯 emoji
* ~~GetDraft / GetPublished~~ (decided not to implement yet)
* ✅ Override Equality operations - using ITyped.Equals

Oqtane

* 🩸 Improve indexing in Google #3154
* 🩸 Improve pre-render adding JS/CSS
* 🩸 Improve page header changes (title, metadata) using latest Oqtane 4 APIs

Patrons

* 🦸🏽 New feature to better control language fallback sequence (beta) #3159
* 🦸🏽 Improve showing expired features - important when testing a feature for 24h

Bugfixes

* 🪲 Languages: Bug in UI: Some labels and dropdown-labels didn't show in current language #3153
* 🪲 lots of minor bugfixes
