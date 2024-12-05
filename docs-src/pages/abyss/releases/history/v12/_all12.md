
## Version 12


### Changes Version 12.10

1. New [Children](xref:ToSic.Eav.DataSources.Children) DataSource
1. New [Parents](xref:ToSic.Eav.DataSources.Parents) DataSource
1. New [Metadata](xref:ToSic.Eav.DataSources.Metadata) DataSource
1. New [MetadataTargets](xref:ToSic.Eav.DataSources.MetadataTargets) DataSource
1. The [StreamMerge](xref:ToSic.Eav.DataSources.StreamMerge) DataSource got three new out-streams `Distinct`, `And` and `Xor`
1. Moved [IPageService](xref:ToSic.Sxc.Services.IPageService) from previously [ToSic.Sxc.Web](xref:ToSic.Sxc.Web) to [ToSic.Sxc.Services](xref:ToSic.Sxc.Services) but preserving compatibility with old code
1. Moved [IPageService](xref:ToSic.Sxc.Services.IRenderService) from previously [ToSic.Sxc.Web](xref:ToSic.Sxc.Blocks) to [ToSic.Sxc.Services](xref:ToSic.Sxc.Services) but preserving compatibility with old code

[!include["Breaking Changes"](./_brc12.10.md)]

### Changes Version 12.06 LTS

No relevant changes



### Changes Version 12.05

1. Introduced [](xref:ToSic.Sxc.Services.IJsonService) for json serialize/deserialize
1. Introduced [](xref:ToSic.Sxc.Services.IConvertService) for simple data-type conversion, also available on the `Convert` property of Razor12 and Api12
1. Introduced [ToSic.Sxc.Services.ILogService](xref:ToSic.Sxc.Services.ISystemLogService) to log messages to the system (Dnn/Oqtane)
1. Introduced [](xref:ToSic.Sxc.Services.IMailService) to easily send mails cross-platform
1. Introduced [](xref:ToSic.Sxc.Services.ISecureDataService) to use encrypted settings
1. Introduced [](xref:ToSic.Sxc.Services.IRenderService) for inner-content rendering (Oqtane code must use this)
1. Published [](xref:ToSic.Eav.DataFormats.EavLight) to better document simple eav data
1. Published [](xref:ToSic.Eav.DataFormats.EavLight.IConvertToEavLight) as the new standard way to prepare entities for WebAPI serialization.
   This is meant to replace previous code using objects such as `EntitiesToDictionary` or `DataToDictionary` which are now marked as obsolete.
1. New Razor12, Api12 and Code12 Classes now don't support old, obsolete APIs anymore
1. Link.Image now also accepts `parameters` as a parameter
1. Link.Image and Link.To always create safe urls now (spaces are encoded etc.)
1. Link.To and Link.Image now have a parameter `type` which can be `"full"` to ensure domains are always added to links (for use in APIs generating RSS etc.)
1. Update to RazorBlade v3.7
1. Edit.Toolbar now supports `condition` so that toolbars may or may not be created based on a true/false value
1. Link.Image now also accepts a `factor` or `aspectRatio` which is a string like `1:2` or `3/4`
1. `AsDynamic(...)` now also wraps anonymous objects in quite an amazing way
1. Bugfix: lots of small ones

[!include["Breaking Changes"](./_brc12.05.md)]



### Changes Version 12.04 incl 12.03 which was not officially released


1. Settings Stack and Resources Stack added, and the `Settings` / `Resources` object now have this
1. Global `Settings.Images.xxx` settings defined for Content, Screen, Lightbox and Section
1. Global `Settings.Resources.xxx` defined for fancybox3, fancybox4, bootstrap4, bootstrap5
1. Link.Image API created to support predefined sizes/resize modes etc.
1. Created feature where DynamicEntities can browse to sub-items using their identifier (used for `Settings.Images.Content` where `Content` is actually the title of a sub-entity)
1. Added debug-feature for DynamicEntity get
1. String-Dropdown inputs now have a value-key presets option (instead of the key-value which was flaky) and added support for escaping special characters
1. #Oqtane 2.2 support added
1. Introduced Monaco (VS-Code online) editor for beta-testing source-editing

[!include["Breaking Changes"](./_brc12.04.md)]


### Changes Version 12.02

1. Formulas feature finalized
1. DynamicEntityStack object created
1. Hybrid `IPageService` created with `Activate` and similar features
1. `CmsContext` was enhanced with `View` information
1. Content-Type icons can now be stored in the app with an `[App:Path]/image.jpg` style reference
1. Enabled view-configuration to configure search behavior incl. not-to-index or what streams should be indexed
1. `turnOn` created / deployed
1. #Oqtane 2.1 support added in 2sxc 12.02.01


### Changes Version 12.00 Todo
