# This is the **2sxc API Documentation**

## Background: Architecture of Eav, Sxc, Dnn

> [!TIP]
> Before you start, please get familiar with the [architecture](xref:Abyss.Architecture.Index) - otherwise you probably won't understand what you see here.

Note also that the real code of EAV/2sxc/Dnn has way more stuff, but that's inofficial. 
Please don't use objects that are not documented here. 
That allows us to improve the architecture without worrying about breaking your code. 
Once we're really sure that certain parts are very final, we'll publish the API docs for those parts. 

> [!TIP]
> We've color and icon coded all the things you might care about. <br>
> * <span class="priority-internal">Internal</span> stuff in subdued <br/>
> * <span class="priority-web"></span> marks things usually used in Razor/WebApi development <br/>
> * <span class="priority-data"></span> marks things related to data processing, usually data sources <br/>
> * <span class="priority-adam"></span> marks ADAM things (automatic Digital Asset Management) <br/>
> * <span class="priority-metadata"></span> marks things related to metadata <br/>

## What You're Probably Looking for

### APIs in Razor Templates and WebApi

1. To create a **Razor** template and want to know what APIs are available, start with [](xref:Custom.Hybrid.Razor12) or [](xref:Custom.Dnn.Razor12). 
	This is because new Razor Components inherits from that, so you'll see all the commannds you get there. 

1. To create a **WebApi** and need to know everything in it, you also want to check the [](xref:Custom.Hybrid.Api12) / [](xref:Custom.Dnn.Api12), because all new WebApi classes inherit that. 

1. To create **Shared C# Code Files** we suggest you use the [](xref:Custom.Hybrid.Code12). 

_Note: Previous versions of 2sxc recommended other base classes, but for the current v12 you should begin using the **Hybrid** versions, as it will also run on Oqtane in future._

### Working with Entities and ADAM Assets

1. If you're working with `DynamicEntity` objects and want to know more about them, check out [](xref:ToSic.Sxc.Data.IDynamicEntity).  
	In very rare cases you also want to know more about the underlying [](xref:ToSic.Eav.Data.IEntity).
1. If you're working with `ADAM` Assets, like from the `AsAdam(...)` command on [](xref:ToSic.Sxc.Data.IDynamicEntity) objects,  
	you'll want to read about [](xref:ToSic.Sxc.Adam.IFolder) and [](xref:ToSic.Sxc.Adam.IFile)

### Programming with DataSources and VisualQuery

All the DataSources are based on [](xref:ToSic.Eav.DataSources.IDataSource) and most of them are also [](xref:ToSic.Eav.DataSources.IDataTarget)s . You can find most of them in [](xref:ToSic.Eav.DataSources) . 

