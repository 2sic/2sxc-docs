
### Changes in 2sxc 15.04 (2023-03-22)


1. ✅ Oqtane: Compatibility with Oqtane 15.04
1. ✅ Formula improvements
    1. ✅ Get App or global settings for formulas
    1. ✅ Better support for promises
    1. ✅ Ability to set the value of another field
    1. ✅ Intellisense on Formulas
1. ✅ Cdn remapping to other cdn like cdn.2sxc.org or custom CDN
    1. ✅ Ability to remap all cdn urls to a different url
    1. ✅ New template CDN on <https://cdn.2sxc.org>
    1. ✅ New template repo for anybody that wants to create their own CDN or host on their path <https://github.com/2sxc/cdn.2sxc.org>
1. New APIs for Data Sources finalized
    1. ✅ Public `IDataFactory` API
    1. ✅ Public `IDataSourceFactory` API
    1. ✅ Enhanced `IDataSource` API
    1. ✅ Prototype of live DataSources
1. ✅ Make everything internal immutable
1. ✅ Improve WYSIWYG
    1. ✅ Ability to select which "mode" the editor is in, affecting toolbars
    1. ✅ Allow selected mode to affect other things (like deny image-drop if in text-mode)
    1. ✅ Sections to better align images
    1. ✅ Use classes to determine size instead of styles
    1. ✅ WYSIWYG Images which auto-resize on the server based on size (eg 1/2 of the screen)
1. ✅ New Data Sources and System Queries
    1. ✅ New Data Source `Scopes`
    1. ✅ New Query `Scopes`
    1. ✅ New Data Source `MetadataTargetTypes`
    1. ✅ New Query `MetadataTargetTypes`
    1. ✅ New DataSource `Licenses` - with state
    1. ✅ New Query `Licenses`
    1. ✅ New DataSource `Features` - with state
    1. ✅ New Query `Features`
    1. ✅ New DataSource `Sites`
    1. ✅ New Query `Sites`
    1. ✅ Improve data sources for `Pages`
1. ✅ Query Improvements
    1. ✅ Allow edit/new to be done in a query-selector
    1. ✅ Get query to know if entity can be edited (based on AppId)
    1. ✅ We've renamed the system queries to have a much simpler name such as `System.Sites` which we'll make available to public use soon.
    1. ✅ New LookUp for Settings- and Resources-Stack - to use `Settings` and `Resources`
    1. ✅ Change internal key for `Settings` to `MyConfiguration` to avoid naming conflicts (breaking but probably no impact)
1. ✅ [Custom DataSources - breaking](xref:Abyss.Releases.History.V15.DataSource)
    1. ✅ New `IDataFactory` API
    1. ✅ New `RawEntity` and `IRawEntity` API
    1. ✅ New API for data sources to make data generation easier
    1. ✅ Improved custom DataSources API
    1. ✅ New base class `CustomDataSourceLight`
    1. ✅ New base class `CustomDataSourceAdvanced`
    1. ✅ Error handling is now simpler / more standardized
1. ✅ Jewels
    1. ✅ `CmsContext.View` now has a `Path`, `PathShared`, `PhysicalPath` and `PhysicalPathShared` property
    2. ✅ `Page.Activate(...)` now has a `condition: true` parameter which lets you only activate a feature if a condition is met
    3. ✅ `Page.Parameters` has new `Get(name)` and `Get<type>(name)` and `Get(name, fallback: 7)` APIs to make it easier to work with url parameters
1. ✅ The Toolbar now has a new `Info` button which is used to show an info-bubble to the user or provide a help-link to somewhere. You'll soon see this in our standard apps to inform users about special cases such as "why the toolbar isn't available on demo-data"
1. ✅ Bugs fixes
    1. ✅ 2sxc in DNN Skins on 404 pages <https://github.com/2sic/2sxc/issues/2986>
    1. ✅ Issue with Mobius Forms in v15.03
