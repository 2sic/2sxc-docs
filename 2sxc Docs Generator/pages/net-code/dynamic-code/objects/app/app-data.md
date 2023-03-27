---
uid: NetCode.DynamicCode.Objects.App.Data
---
# App.Data / @App.Data Object in Dynamic Code

The `App.Data` object gives you immediate acccess to all data in the app, through the `Data` property. Basically you can use it as follows:


## Get All Data Items of a Content Type

`App.Data["ContentTypeName"]` will give you a [stream](xref:ToSic.Eav.DataSource.IDataStream) of all entities of that type. In most cases you'll use an `AsList(...)` to use it efficiently in loops etc. because most of the razor templating will prefer a [DynamicEntity](xref:NetCode.DynamicData.DynamicEntity) to a pure IEntity-object. Here's an example:

```razor
@foreach(var post in AsList(App.Data["BlogPost"]))
{
    @RenderPage("_list-item.cshtml", new { Post = post })
}
```

_note_: this will give you all items, but you'll have to sort it using LINQ or other mechanisms. If you're not familiar with that, you're better of using `App.Query[...]` (see below). 


## Edit App Data Content-Items

In addition to giving access to all entities in this app, you can also create, edit and delete items using the `App.Data` object. The commands provided are:

1. `App.Data.Create(contentTypeName, values, userName)`
1. `App.Data.Update(entityId, values, userName)`
1. `App.Data.Delete(entityId, userName)`

You can read more about this in the [App Data API Feature](xref:Feat.AppDataApi)


## Create Metadata #todoc


## Read Metadata #todoc


## Demo App and further links #todoc


## History

1. Introduced in 2sxc 05.05
2. Stable since 2sxc 06.00
3. Data-API was introduced in 2sxc 06.05
