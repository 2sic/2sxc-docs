---
uid: NetCode.TypedCode.CompareApis.DataObjects
---

# Built-In Data Object Differences in APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

> [!TIP]
> This is about Data Objects which are automatically available on each Razor / C# file.
>
> So **Content** (old), **MyItem** (new), **Data** (old), **MyData** (new) etc.
>
> It's also about converting between `IEntity` to the `ITypedItem` and `dynamic` objects.


> [!TIP]
> 🎓 Best check out the [tutorial QuickRef](https://go.2sxc.org/quickref) which shows all this!

## What are Built-In Data Objects?

These objects/commands get data _belonging_ to this block/instance.
So when the Razor code loads, these objects are ready and filled with the data of the current block.

> [!NOTE]
> It's important to understand how data-items can _belong_ to the current block.
> Basically any data an editor adds to the current block _belongs_ to it.
> This is different from queried data which doesn't _belong_ to anything.
>
> Example: The images in a gallery-block belong to that gallery instance.
> But the list of all tags don't belong to the gallery instance.

## Overview of Data Objects

| Purpose | Dynamic | Typed | Strong Typed
| --- | --- | --- | ---
| **Get-Current-Data** | `Content` | `MyItem` | `MyItem`
| **Get-Current-List** | `List` | `MyItems` | `MyItems`
| **Get-Current-Header** | `Header` | `MyHeader` | `MyHeader`
| **Get-Current-Data** | `Data` | `MyData` | `MyData`
| **App Object** | `App` | `App` | `App`
| **App Query** | `App.Query` | `App.Query` | `App.Query`
| **App Data** | `App.Data` | `App.Data` | `App.Data`
| **App Resources** | `App.Resources` | `App.Resources` | `App.Resources`
| **App Settings** | `App.Settings` | `App.Settings` | `App.Settings`
| **All Settings** | `Settings` | `AllSettings` | `AllSettings`
| **All Resources** | `Resources` | `AllResources` | `AllResources`
| **Parameters** | `DynamicModel` | `MyModel` | `MyModel` / `Model`


## Basic Get-Current-Data

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Content` <br> (`dynamic`) | `MyItem` <br> ([ITypedItem]) | First/main item
| `List` <br> (`IEnumerable<dynamic>`) | `MyItems` <br> ([IEnumerable&lt;ITypedItem&gt;]) | List of all items
| `Header` <br> (`dynamic`) | `MyHeader` <br> ([ITypedItem]) | Header item

> [!IMPORTANT]
> The pairs such as `Content`/`MyItem` will often contain the same data - but not always.
>
> In the old dynamic APIs, `Content` contained the item _belonging_ to the block,
> but _only_ if the View was not using a Query.
> If the view used a query, `Content` would contain the first item returned by the query.
> `MyItem` is different - it always contains the first item _belonging_ to the block.
>
> The same difference applies to `List` vs `MyItems`.

## Advanced Get-Current-Data

The `MyData` (previously `Data`) object contains all data which was prepared for the current block.
In very basic scenarios you don't need it, as it contain the same data as the `MyItem` (previously `Content`) object and others.

As soon as the View is configured to use a Query, it will instead contain the data returned by the query.

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Data` <br> ([IContextData]) | `MyData` <br> ([IContextData]) | DataSource of query data
| `Data["Tags"]` <br> ([IDataStream]) | `MyData["Tags"]` <br> ([IDataStream]) | `Tags` Stream of query data
| `Data["Tags"]` <br> ([IDataStream]) | `MyData.GetStream("Tags")` <br> ([IDataStream]) | Recommended way to get stream

DataSources and Streams return `IEntity` objects, and you will usually want to convert them to `ITypedItem` (or `dynamic`) objects.
This is done with these APIs:

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `AsDynamic(Data)` | `AsItems(MyData)` | Get list of items in `Default` stream
| `AsDynamic(Data["Tags"])` | `AsItems(MyData.GetStream("Tags"))` | Get list of items in `Tags` stream
| `AsDynamic(Data["Tags"].List.First())` | `AsItem(MyData.GetStream("Tags"))` | Get a single item



---


[ITypedItem]: xref:ToSic.Sxc.Data.ITypedItem "ITypedItem"
[IEnumerable&lt;ITypedItem&gt;]: xref:ToSic.Sxc.Data.ITypedItem "IEnumerable<ITypedItem>"
[IContextData]: xref:ToSic.Sxc.Context.ICmsContext
[IDataStream]: xref:ToSic.Eav.DataSource.IDataStream
