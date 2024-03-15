---
uid: NetCode.TypedCode.DynamicVsTyped
---

# Dynamic APIs vs. Typed APIs

This page should give show you old/new APIs to make refactoring easier.

> [!TIP]
> 🎓 Best check out the [tutorial QuickRef](https://go.2sxc.org/quickref) which shows all this!

## Show / Output Values from Items

The following example assumes that you have an `dyn` or `itm` object containing various properties such as `Name` or `Birthday`.
The objects themselves could be from the primary items (eg `var dyn = Content;` or `var itm = MyItem;`)
but they could also come from loops, queries, etc.

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `dyn.EntityId` | `itm.Id` | Id of the item
| `dyn.EntityGuid` | `itm.Guid` | GUID of the item
| `dyn.EntityTitle` | `itm.Title` | Title of the item
| `dyn.Name` | `itm.Get("Name")` <br> `itm.Dyn.Name` | value no matter the type
| `dyn.Name` | `itm.String("Name")` | string value
| `dyn.IsGreen` | `itm.Bool("IsGreen")` | boolean value
| `dyn.Birthday` | `itm.DateTime("Birthday")` | date value
| `(dyn.Birthday as DateTime).Year` | `itm.DateTime("Birthday").Year` | year of a date
| `dyn.Weight` | `itm.Int("Weight")` | number value
| `dyn.Weight` | `itm.Double("Weight")` | double value
| `dyn.Weight` | `itm.Float("Weight")` | float value
| `dyn.Weight` | `itm.Decimal("Weight")` | decimal value

Property names are case-insensitive, so `dyn.weight` and `itm.Int("WEIGHT")` will work.

> [!TIP]
> When simply showing data in HTML, the exact type is not super important
> as the Razor engine will convert it to a string anyway.
> The differences become much more important when you want to do a bit more in your code.
>
> This is why it's really ok to just do `@itm.Get("FirstName")`.  
> But `var name = itm.String("FirstName") + " " + itm.String("LastName");` is much better.

TODO: IsDemoItem etc.

## Show/Output Complex Values

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `@Html.Raw(dyn.Description)` | `@itm.Html("Description")` | Show a HTML value with toolbar
| `@Kit.Image.Picture(dyn, "Pic")` | `@itm.Picture("Pic")` | Show an image; auto-resize and toolbar
| `@dyn.Link` | `@itm.Url("Link")` | Show a link, auto-converts `file:72` to url
| `@dyn.Get("Link", convertLinks: false)` | `@itm.String("Link")` | Show link-string without auto-convert
| `AsAdam(dyn as object, "Pic").Files.First()` | `itm.File("Pic")` | Get a file in the field `Pic`
| `AsAdam(dyn as object, "Pic")` | `itm.Folder("Pic")` | Get a folder on the item

## Working with Children and Parents

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `@dyn.Publisher.Name` | `@itm.String("Publisher.Name")` <br> `@itm.Child("Publisher").String("Name")` | Show a child value
| `@(dyn.Authors as IEnumerable<dynamic>).Count()` | `@itm.Children("Authors").Count()` | Show number of children


## Basic Get-Current-Data

These objects/commands get data _belonging_ to this block/instance.

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Content` <br> (`dynamic`) | `MyItem` <br> ([ITypedItem]) | First/main item
| `List` <br> (`IEnumerable<dynamic>`) | `MyItems` <br> ([IEnumerable&lt;ITypedItem&gt;]) | List of all items
| `Header` <br> (`dynamic`) | `MyHeader` <br> ([ITypedItem]) | Header item

> [!NOTE]
> It's important to understand how data-items can _belong_ to the current block.
> Basically any data an editor adds to the current block _belongs_ to it.
> This is different from queried data which doesn't _belong_ to anything.
>
> Example: The images in a gallery-block belong to that gallery instance.
> But the list of all tags don't belong to the gallery instance.

The pairs such as `Content`/`MyItem` will often contain the same data - but not always.

In the old dynamic APIs, `Content` contained the item _belonging_ to the block,
but _only_ if the View was not using a Query.
If the view used a query, `Content` would contain the first item returned by the query.
`MyItem` is different - it always contains the first item _belonging_ to the block.

The same difference applies to `List` vs `MyItems`.


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


## Get Settings and Resources

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Settings` <br> (`dynamic`) | `AllSettings` <br> ([ITypedStack]) | All settings
| `Settings.Color` <br> (`dynamic`) | `AllSettings.String("Color")` <br> (`string`) | Get a color setting
| `Resources` <br> (`dynamic`) | `AllResources` <br> ([ITypedStack]) | All resources
| `Resources.Title` <br> (`dynamic`) | `AllResources.String("Title")` <br> (`string`) | Get a resource
| `App.Settings` <br> (`dynamic`) | `App.Settings` <br> ([ITypedItem]) | App settings
| `App.Settings.Color` <br> (`dynamic`) | `App.Settings.String("Color")` <br> (`string`) | App settings
| `App.Resources` <br> (`dynamic`) | `App.Resources` <br> ([ITypedItem]) | App resources
| `App.Resources.Title` <br> (`dynamic`) | `App.Resources.String("Title")` <br> (`string`) | App resources

> [!TIP]
> The new `AllSettings` and `AllResources` can use paths to deeper values, such as
> `AllSettings.Int("Images.Content.Width)`.
> This is much safer that the old API, which threw an error if an intermediate setting didn't exist.

## Access App Data

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `App` <br> ([IApp]) | `App` <br> ([IAppTyped])
| `App.Data` <br> ([IAppData]) | `App.Data` <br> ([IAppData]) | (same)
| `App.Data["Tags"]` | `App.Data["Tags"]` <br> `App.Data.GetStream("Tags")` | (same) <br> _preferred_
| `App.Query("QName")` | `App.GetQuery("QName")` | new method allows for more parameters
| - | `App.GetQuery("QName", parameters: new { Id = 7 } )` | new only

## Access App and View Folders / URLs

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| - | `App.Folder` <br> ([IFolder]) | new only
| `App.Folder` <br> (`string`) | `App.Folder.Name` <br> (`string`)
| `App.Path` | `App.Folder.Url`
| `App.PhysicalPath` | `App.Folder.PhysicalPath`

TODO

## TOOLBARS

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Edit` | `Kit.Edit` | global `Edit` object is gone
| `Edit.TagToolbar(...)` | `Kit.Toolbar.Default(...)` <br> `Kit.Toolbar.Empty(...).` | global `Edit` object is gone
| `Edit.Toolbar(...)` | `Kit.Toolbar.Default(...)...AsTag()` <br> `Kit.Toolbar.Empty(...)...AsTag()` | global `Edit` object is gone

## Rendering Child Razor Components and Get Code

This is how you call sub-razor files or get helper C# classes:

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `@Html.Partial("file.cshtml)` | `@Html.Partial("file.cshtml)` | (same)
| `@Html.Partial("file.cshtml, new { Sort = "asc" })` | `@Html.Partial("file.cshtml, new { Sort = "asc" })` | (same)
| `var helper = CreateInstance("helper.cs")` | `var helper = GetCode("helper.cs")` |

## Access Model Data from Child Razor

When a razor is called using `Html.Partial(..., new { ... })` it passes parameters to the child razor.

These can be picked up in the child as follows:

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `DynamicModel` <br> (`dynamic`) | `MyModel` <br> ([ITypedModel]) | Model of the child
| `var name = DynamicModel.Name` <br> (`dynamic`) | `var name = MyModel.String("Name")` <br> (`string`)
| `var birthday = DynamicModel.Birthday` <br> (`dynamic`) | `var birthday = MyModel.DateTime("Name")` <br> (`DateTime`)

`MyModel` has many more methods to ensure you can pass type-safe data to the child.
See [MyModel](xref:ToSic.Sxc.Code.ITypedModel)


---


[ITypedItem]: xref:ToSic.Sxc.Data.ITypedItem "ITypedItem"
[IEnumerable&lt;ITypedItem&gt;]: xref:ToSic.Sxc.Data.ITypedItem "IEnumerable<ITypedItem>"
[IContextData]: xref:ToSic.Sxc.Data.IContextData
[IDataStream]: xref:ToSic.Eav.DataSource.IDataStream
[ITypedStack]: xref:ToSic.Sxc.Data.ITypedStack
[ITypedModel]: xref:ToSic.Sxc.Code.ITypedModel
[IApp]: xref:ToSic.Sxc.Apps.IApp
[IAppTyped]: xref:ToSic.Sxc.Apps.IAppTyped
[IAppData]: xref:ToSic.Eav.Apps.IAppData
[IFolder]: xref:ToSic.Sxc.Adam.IFolder
