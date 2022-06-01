
### Breaking Changes in 2sxc 13.00

#### API Changes that may affect you

1. An old, non-DI feature for Inner Content is being deprecated and will be removed in v14  
    [see instructions](xref:Abyss.Releases.History.V13.StaticRender)
1. An old feature for publishing module _InstanceData_ as JSON is removed  
    [see instructions](xref:Abyss.Releases.History.V13.InstanceData)
1. An old feature to create _DataSources_ is removed  
    [see instructions](xref:Abyss.Releases.History.V13.DataSource)
1. Two old data-conversion features _DataToDictionary_ and _EntitiesToDictionary_ were removed  
    [see instructions](xref:Abyss.Releases.History.V13.Conversion)
1. Some internal functionality which enabled `IEntity` objects to convert links containing `file:...` and `page:...` has been removed. This only affects special deep code calls on `IEntity` and does _not affect `DynamicEntity` objects in Razor
    [see instructions](xref:Abyss.Releases.History.V13.IEntityLinks)
1. The old feature `Eav.Factory.Resolve<T>()` was deprecated and will be removed in v14  
    [see instructions](xref:Abyss.Releases.History.V13.EavFactory)

1. The old feature `BlockDataSource.Cache.GetContentType(...)` was removed
    [see instructions](xref:Abyss.Releases.History.V13.DataSource.Cache)
1. The Dnn Static `ToSic.Sxc.Dnn.Factory` is being deprecated and will be removed in v14
    [see instructions](xref:Abyss.Releases.History.V13.DnnFactory)

#### Major Updates with may affect you

1. The Image Resizer is being replaced with [ImageFlow](https://www.imageflow.io/)
1. The App containing Site-wide settings is changed to `Primary` - previously it used the `Content` app for this. We believe this won't affect many users, as the settings-stack is still very new in v12


Things which probably don't affect anybody

1. SQL changes - minor updates to the Database
1. .net Framework and Dll Updated to Match Dnn 9 Requirements - but still works in Dnn 7.4.2
    1. .net Framework 4.7.2 now required (previously .net Framework 4.5.1)
    1. .net Standard 2.0.3 required (previously .net Standard 1.6)  
    **Important**: This will be referenced in the `web.config` upon installation
    1. Dependency Injection updated to .net core 2.1.1 (previously 1.1)
    1. Newtonsoft.Json updated to v10.0.3 
1. Entity Framework updated to 2.1.1 (previously 1.1) - Oqtane is unmodified and uses 3.1.4
1. Dnn DLLs renamed
    1. `ToSic.Sxc.Dnn.dll` became `ToSic.Sxc.Dnn.Core.dll` for consistency
    1. `ToSic.SexyContent.WebApi.dll` became `ToSic.Sxc.Dnn.WebApi.dll`
    1. `ToSic.SexyContent.Razor.dll` became `ToSic.Sxc.Dnn.Razor.dll`
1. An internal object `ToSic.Eav.Apps.State` was removed


Internal APIs which were removed

1. Static `ToSic.Eav.Data.Builder.AttribBuilder.AddValue(...)`