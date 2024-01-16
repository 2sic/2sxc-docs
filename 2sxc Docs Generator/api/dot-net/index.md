---
uid: ToSic.Home
---

# 2sxc .net API Docs

> [!TIP]
> This that will probably interest you the most:

1. Recommended Base Classes for Razor / C# / Api Controllers
    * [](xref:Custom.Hybrid.RazorTyped) for hybrid Razor
    * [](xref:Custom.Hybrid.ApiTyped) for hybrid WebAPIs
    * [](xref:Custom.Hybrid.CodeTyped) for hybrid shared C# code
    * [](xref:Custom.DataSource.DataSource16) for custom DataSources

2. Most of the Service you'll use on the `Kit` object
    * [Kit of Typed Code](xref:ToSic.Sxc.Services.ServiceKit16) and [Kit of Razor14](xref:ToSic.Sxc.Services.ServiceKit14)
    * [](xref:ToSic.Sxc.Services) - all the services you will usually use
    * [](xref:ToSic.Sxc.Context) - any kind of context, like the current page and url-parameters

3. Most important Data-Objects
    * [](xref:ToSic.Sxc.Data.ITypedItem) - for all the data objects in RazorTyped
    * [](xref:ToSic.Eav.Data) - namespace for all 2sxc Data
    * [](xref:ToSic.Sxc.Adam.IFolder), [](xref:ToSic.Sxc.Adam.IFile) and [](xref:ToSic.Sxc.Adam) for working with files


## Note About Internal APIs

Note also that the real code of EAV/2sxc/Dnn has way more stuff, but that's inofficial.
Please don't use objects that are not documented here.
That allows us to improve the architecture without worrying about breaking your code.
Once we're really sure that certain parts are very final, we'll publish the API docs for those parts.

## Advanced Topics

### Background: Architecture of Eav, Sxc, Dnn

> [!TIP]
> If you really care, please get familiar with the [architecture](xref:Abyss.Architecture.Index) - it helps a 👍🏼


### Programming with DataSources and VisualQuery

All the DataSources are based on [](xref:ToSic.Eav.DataSource.IDataSource)<!-- and most of them are also [](xref:ToSic.Eav.DataSource.IDataSourceTarget)s -->. You can find most of them in [](xref:ToSic.Eav.DataSources) .
