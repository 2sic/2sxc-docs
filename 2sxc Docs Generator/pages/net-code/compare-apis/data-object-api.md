---
uid: NetCode.TypedCode.CompareApis.DataObjectApi
---

# Data Object API Differences

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

> [!TIP]
> This is about **Data Objects** - the objects which contain the data you're working with.
>
> So **DynamicEntities**, **TypedItems** and **Strongly-Typed Custom Data Models**.


> [!TIP]
> 🎓 Best check out the [tutorial QuickRef](https://go.2sxc.org/quickref) which shows all this!

## What are Data Objects?

Internally 2sxc leverages a system called **EAV** (Entity-Attribute-Value) which is a very flexible way to store data.
The underlying data type is called an `IEntity`, but it's difficult to work with.

Because of this, 2sxc provides simpler objects to work with, specifically these:

* **Dynamic Entities** - a dynamic object which can contain any data - older Razor up until `Razor14`
* **Typed Items** - a strongly-typed object which contains data - `RazorTyped` and later (v16+)
* **Strongly-Typed Custom Data Models** - a strongly-typed object which contains data - `RazorTyped` and later (v17.03+)

> [!TIP]
> To understand this better, imagine that the EAV system delivers `IEntity` objects to the Razor / C#.
> Each Razor provides simple methods such as `AsDynamic(...)` or `AsItem(...)` to convert/wrap them to the simpler objects.

## Show / Get Built-In Properties

Standard properties are things like `Id`, `Guid`, `Title`, `Created`, `Modified` etc.

| Dynamic | Typed | Strongly Typed
| --- | --- | ---
| `dyn.EntityId` | `itm.Id` | `itm.Id`
| `dyn.EntityGuid` | `itm.Guid` | `itm.Guid`
| `dyn.EntityTitle` | `itm.Title` | `itm.Title`

TODO: IsDemoItem, IsPublished, Created, Modified etc.

TODO: Type name etc.


## Show / Output Values from Items

The following example assumes that you have an `dyn` or `itm` object containing various properties such as `Name` or `Birthday`.
The objects themselves could be from the primary items (eg `var dyn = Content;` or `var itm = MyItem;`)
but they could also come from loops, queries, etc.

| Dynamic | Typed | Strongly Typed
| --- | --- | ---
| `dyn.Xyz` <br> type unknown / `dynamic` | `itm.Get("Xyz")` <br> type `object` | `itm.Xyz` <br> type known
| `dyn.Name` (`dynamic`) | `itm.String("Name")` | `itm.String("Name")` <br> `itm.Name`
| `dyn.IsGreen` (`dynamic`) | `itm.Bool("IsGreen")` (`bool`) | `itm.IsGreen` (`bool`) <br> `itm.Bool("IsGreen")` (`bool`)
| `dyn.Birthday` (`dynamic`) | `itm.DateTime("Birthday")` (`DateTime`) | `itm.Birthday` (`DateTime`) <br> `itm.DateTime("Birthday")` (`DateTime`)
| `(dyn.Birthday as DateTime).Year` | `itm.DateTime("Birthday").Year` | `itm.Birthday.Year` (`int`) <br> `itm.DateTime("Birthday").Year` (`int`)

### Number Values

When working with numbers, the following is important:

* in Dynamic mode, all numbers are always returned as `decimal` since it's the most precise
* in Typed mode, you can specify the type you want, and it will be converted if possible
* in Strongly Typed mode, the type is defined in the generated Data-Model, and you can't change it

| Dynamic | Typed | Strongly Typed
| --- | --- | ---
| `dyn.Weight` | `itm.Int("Weight")` | `itm.Weight` (see data model) <br> `itm.Int("Weight")`
| `dyn.Weight` | `itm.Double("Weight")` | `itm.Weight` (see data model) <br> `itm.Double("Weight")`
| `dyn.Weight` | `itm.Float("Weight")` | `itm.Weight` (see data model) <br> `itm.Float("Weight")`
| `dyn.Weight` | `itm.Decimal("Weight")` | `itm.Weight` (see data model) <br> `itm.Decimal("Weight")`

> [!IMPORTANT]
> In Dynamic, property names are not case sensitive.
> In Typed `.String(name)` etc. property names are case sensitive.
> So `dyn.weight` and `itm.Int("WEIGHT")` will work.
>
> In Strongly Typed, the property names are defined in the data model, and are case sensitive.

> [!TIP]
> When simply showing data in HTML, the exact type is not super important
> as the Razor engine will convert it to a string anyway.
> The differences become much more important when you want to do a bit more in your code.
>
> This is why it's really ok to just do `@itm.Get("FirstName")`.  
> But `var name = itm.String("FirstName") + " " + itm.String("LastName");` is much better.


## HTML Values

Creating HTML from data entered by the editor can be dangerous, as it could contain malicious code such as `script` or unexpected `iframe` tags.
So just showing data will automatically encode it, so it's safe to show.
To show HTML when you need it - eg. from a WYSIWYG editor, these are the APIs:

* Dynamic
  * `@dyn.Description` - show HTML as text
  * `@Html.Raw(dyn.Description)` - show HTML as HTML
* Typed
  * `@itm.String("Description")` - show HTML as text
  * `@Html.Raw(itm.String("Description"))` - show HTML as HTML
  * `@itm.Html("Description")` - show HTML as HTML, automatically adding a toolbar (more parameters can change the behavior)
* Strongly Typed
  * `@itm.Description` - show HTML as text
  * `@Html.Raw(itm.Description)` - show HTML as HTML
  * `@itm.Html("Description")` - show HTML as HTML, automatically adding a toolbar (more parameters can change the behavior)

## Links

Internally links can be stored as the real link (`https://www.2sxc.org/`) or as a `file:123` reference to a file in the system.
When showing links, you'll usually want to convert these to a real link, and this is how you do it:

* Dynamic
  * `@dyn.Link` - link as URL, so `file:72` will be converted to the real URL
  * `@dyn.Get("Link", convertLinks: false)` - link as string, without auto-conversion
* Typed
  * `@itm.Url("Link")` - link as URL, so `file:72` will be converted to the real URL
  * `@itm.String("Link")` - link as string, without auto-conversion
* Strongly Typed
  * `@itm.Link` - link as URL, so `file:72` will be converted to the real URL
  * `@itm.String("Link")` - link as string, without auto-conversion

## Images and Pictures

Very often you will want to use a link to create an `img` or a `picture` tag.
If you want to do it manually, you can always use the properties as described in the previous section.

```razor
<img src='@itm.Url("Image")' alt='@itm.String("ImageAlt")' />
```

Usually you will prefer to use built in APIs/Services to do this.

* Dynamic
  * `@Kit.Image.Img(dyn, "Pic")` - create an `img`; auto-resize and toolbar
  * `@Kit.Image.Picture(dyn, "Pic")` - create a `picture`; auto-resize and toolbar
* Typed
  * `@itm.Img("Pic")` - create an `img`; auto-resize and toolbar
  * `@itm.Picture("Pic")` - create a `picture`; auto-resize and toolbar
* Strongly Typed
  * `@itm.Img("Pic")` - create an `img`; auto-resize and toolbar
  * `@itm.Picture("Pic")` - create a `picture`; auto-resize and toolbar

Note that the `Img` and `Picture` methods have more parameters to specify what you want.  

## Show/Output Complex Values

| Dynamic | Typed
| --- | --- | ---
| `AsAdam(dyn as object, "Pic").Files.First()` | `itm.File("Pic")` | Get a file in the field `Pic`
| `AsAdam(dyn as object, "Pic")` | `itm.Folder("Pic")` | Get a folder on the item


## Working with Children and Parents

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `@dyn.Publisher.Name` | `@itm.String("Publisher.Name")` <br> `@itm.Child("Publisher").String("Name")` | Show a child value
| `@(dyn.Authors as IEnumerable<dynamic>).Count()` | `@itm.Children("Authors").Count()` | Show number of children


