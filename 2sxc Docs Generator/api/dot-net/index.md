---
uid: ToSic.Home
---
# This is the **2sxc API Documentation**

This that will probably interest you the most:

* [ToSic.Sxc.Services](xref:ToSic.Sxc.Services) contains services you'll usually use in Razor and WebAPIs
* Your code should inherit base classes from the `Custom` namespace to inherit a rich API of [Dynamic Code](xref:NetCode.DynamicCode.Index)
  * for **Razor** use [Hybrid.Razor12](xref:Custom.Hybrid.Razor12) or [Dnn.Razor12](xref:Custom.Dnn.Razor12)
  * for **WebAPIs** use [Hybrid.Api12](xref:Custom.Hybrid.Api12) / [Dnn.Api12](xref:Custom.Dnn.Api12)
  * for **shared C# code** use [Hybrid.Code12](xref:Custom.Hybrid.Code12)
* If you're interested in data or file-assets, please read about [Dynamic Data](xref:NetCode.Data.Index)
  * you may also care about
    [](xref:ToSic.Sxc.Data.IDynamicEntity),
    [](xref:ToSic.Eav.Data.IEntity)
    as well as the [differences](xref:NetCode.Data.ObjectTypes)
  * or about the
    [ADAM Assets](xref:Basics.Cms.Adam.Index)
    such as [](xref:ToSic.Sxc.Adam.IFolder), [](xref:ToSic.Sxc.Adam.IFile)
    and [.AsAdam(...)](xref:ToSic.Sxc.Code.DynamicCode.AsAdam*)


> [!TIP]
> We've color-coded and icon-coded all the things you might care about. <br>
>
> * <span class="priority-internal">Internal</span> stuff in subdued <br/>
> * <span class="priority-web"></span> marks things usually used in Razor/WebApi development <br/>
> * <span class="priority-data"></span> marks things related to data processing, usually data sources <br/>
> * <span class="priority-adam"></span> marks ADAM things (automatic Digital Asset Management) <br/>
> * <span class="priority-metadata"></span> marks things related to metadata <br/>

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
