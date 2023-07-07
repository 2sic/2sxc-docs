---
uid: NetCode.Razor.Typed.Index
---

# Typed Razor Components (v16) - DRAFT / WIP

Before v16 we focused on Razor code which extensively used `dynamic` objects.
This allowed a lot of neat, compact code such as `<div>@Content.Title</div>`
but in advanced scenarios resulted in many runtime issues which were hard to debug.

Because of this, we're experimenting with a new **Typed** Razor which does not use `dynamic` objects,
but actually ensures that almost everything is **strictly typed**.
This forces the developer to be more explicit and helps avoid many hard to solve problems.

## Clear, new Naming Conventions

* Anything beginning with `My...` _belongs_ to the current code.
  * MyItem
  * MyItems
  * MyData ??
  * MyModel
* Objects or methods which are singular are/return a single item
  * Item
  * Header
  * MyData.Item(...)
  * MyModel.Item(...)
  * MyModel.Thing(...)
  * AsItem(...)
  * AsThing(...)
* Objects or methods which are plural are/return a list of items
  * Items
  * MyData.Items(...)
  * MyModel.Items(...)
  * MyModel.Things(...)
  * AsItems(...)
  * AsThings(...)
* Anything beginning with `As...` is a helper to convert something to something else
  * AsItem
  * AsItems
  * AsThing
  * AsThings
* Built-in objects which are stacks, are explicitly named as such
  * SettingsStack (previously `Settings`)
  * ResourcesStack (previously `Resources`)

## Not-available APIs any more

* Settings
* Resources
* Content
* Header
* Data
* AsDynamic(...)
* AsList(...)


### Naming of Item-objects

* `ITypedItem`. It has
  * properties such as `.Id`, `.Guid`, `.Title`
  * methods such as `.String(fieldName)`, `.Bool(fieldName)` etc.
* `Item` is an `ITypedItem` which wraps a content-object (IEntity)
* `Items` is a list of TypedItems (`IEnumerable<ITypedItem>`)
* `AsItem(...)` will take a IEntity, a DynamicEntity or a List of these and return one `ITypedItem`
* `AsItems(...)` ...
* `TypedModel.Item(...)`
* `TypedModel.Items(...)`
* ?? `MyItem`
* ?? `MyItems`
* ?? `MyHeader`

* `someItem.Children(fieldName)` + overload
* `someItem.Child(fieldName)` + overload
* `someItem.Parents(typeName)` + overload

MyData ?

* MyData.Item(...)
* MyData.Items(...)

* .Item ~~.Child(...)~~
* .Items ~~.Children(...)~~
* .Ref(...) ~~.Parent(...)~~
* .Refs(...) ~~.Parents(...)~~


TODO:

* Merge(...?) / Stack / MergeItems / **StackItems** / StackRead / AsStack / AsItemStack / AsThingStack(...)

### Naming of Typed? Read? Thing? Object?

* IThing
* ITypedThing
* AsThing(...)
* AsThings(...)
* StackThings(...)
* MyModel.Thing(...)
* MyModel.Things(...)
* CreateInstance.Thing(...)
* CreateInstance.Things(...)

### Settings / Resources TODO

* Settings
* ~~AllSettings~~
* ~~AllResources~~
* `SettingsStack`
* `ResourcesStack`
* ~~StackedSettings~~
* ~~MergedSettings~~
* Something.Settings - eg. `All.Settings`


## Where Data Comes from in Typed Razor

* `Data.MyContent` - an `IEntity` containing the first (or demo) item which belongs to this block/module.  
  _previously_: `Content`  
  _typical use_: `var album = AsItem(Data.MyContent);`
* `Data.MyHeader` - an `IEntity` containing the Header settings (or demo) which belong to this block/module.  
  _previously_: `Header`  
  _typical use_: `var album = AsItem(Data.MyHeader);`
* `Data.MyData` - an `IEnumerable<IEntity>` containing all items (or none, or one demo-item) belonging to this block/module.
  _previously_: `Content` or `Data` (this caused some confusion)  
  _typical use_: `var list = AsItems(Data.MyContent);`
* `Data`, `Data["Default"]` or `Data["some-stream-name]` lists/streams containing all items given to the block/module.
  * if the view is configured to use a **Query** then the query will provide these streams
  * if the view is configured to not use a Query, but just use data added by the user, then this contains the same data as `Data.MyData`


### Improve CreateInstance to be typed??


## New APIs in the Typed Razor

1. AsItem
1. AsTyped
1. Merge
1. TypedModel
    1. TypedModel.Get(...)
    1. TypedModel.Get<T>(...)
    1. TypedModel.String
    1. TypedModel.Int
    1. TypedModel....
    1. TypedModel.Typed
    1. TypedModel.TypedList ???
    1. TypedModel.Item
    1. TypedModel.Items
    1. TypedModel.File
    1. TypedModel.Files
    1. TypedModel.Folder
    1. TypedModel.Folders
    1. TypedModel.Toolbar

## Removed / Changed Common APIs

The following APIs worked in previous versions of Razor Templates but were removed / changed.

The exact list is still WIP!! TODO:

| API of Previous Razors | Old Behavior                                     | New Behavior                                      | Replacement |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------- | ----------- |
| Content                | `dynamic` object pointing to the first / main item | Disabled, should throw error if used TODO:      | Data.MyContent (an IEntity) |
| 
| Settings
| Resources
| App.Settings
| App.Resources

* `someDynamicEntity.EntityId` -> `someDynamicEntity.Id`
* `someDynamicEntity.EntityGuid` -> `someDynamicEntity.Guid`
* `someDynamicEntity.EntityTitle` -> `someDynamicEntity.Title`




Here's an example:

```razor
@inherits Custom.Hybrid.Razor12
<ul>
  @foreach(var person in AsList(App.Data["Persons"])) {
    <li>@person.Name</li>
  }
</ul>
```

Razor Components/Templates are the most powerful templates in 2sxc since you can program anything you want using C#.
They use the Asp.Net Razor engine and contain normal HTML intermixed with Razor placeholders like `@Content.FirstName` or longer code blocks usually marked with `@{ ...}`.


The template files usually reside inside App root folder or sub folder. These always begin with an `_` and end with `.cshtml`.

> [!NOTE]
> The [View Configuration](xref:Basics.App.Views.Index) determines which razor file is being loaded.
>
> If you are using [Polymorphism](xref:Basics.Polymorphism.Index) then you may have multiple razor files with the same name in various folders, and Polymorph will decide which one will be shown.


## Guide to Moving to Pro Code - important Changes

### Content is now MyItem and not Dynamic

...


### Header is no MyHeader and not Dynamic


### Use Kit.Toolbar for Toolbars


### Use MyContext instead of CmsContext


### Avoid the Edit Object or use Kit.Edit


### Use object.Folder("name") instead of AsAdam


### Instead of Settings, use App.Settings or Alternatives

...
explain differences
Recommend App.Settings



### Instead of Resources, use App.Resources or Alternatives


### Instead of AsDynamic(jsonString) use Kit.Json.ToTyped(jsonString)


### Use GetCode() instead of CreateInstance(...)




## Tips

[!include["Tip Inherits"](../_include-tip-inherits.md)]



## History

1. Introduced in 2sxc 1.0
