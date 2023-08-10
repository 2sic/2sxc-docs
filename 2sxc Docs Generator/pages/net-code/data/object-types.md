---
uid: NetCode.Data.ObjectTypes
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# Data Object Types

When coding with 2sxc data, there are three common data object types:

1. **DynamicEntity**
1. **Entity**
1. **TypedItem** (new/WIP v16.01)

There are also some typical data objects for working with file/assets (not documented here):

1. **IAsset** - see [](xref:ToSic.Sxc.Adam.IAsset)
1. **IFile** - see [](xref:ToSic.Sxc.Adam.IFile)
1. **IFolder** - see [](xref:ToSic.Sxc.Adam.IFolder)

[Dynamic Entities](xref:NetCode.DynamicData.DynamicEntity) are simple, _dynamic_ objects that allow you to write template with any property you believe the data should have, like `@person.FirstName` etc.
They will automatically pick the right language and do a lot of magic 🧙‍♂️ in the background.


[Entities](xref:NetCode.DynamicData.Entity) are strongly typed objects for complex work, but getting values is much more difficult.
You usually don't need this, but it's important that you know this exists.

[TypedItem](xref:ToSic.Sxc.Data.ITypedItem) is a new type of object which is still in development.
It's a strongly typed object which is very similar to the DynamicEntity, but has a few advantages.
It's still in development.

This piece of code shows why you usually _don't want to use the IEntity_ and will prefer the _IDynamicEntity_ instead.

```cs
// The easy way, using the content-item as a DynamicEntity
var titleFromDynamic = Content.Title; 

// The hard way, what actually happens internally
var languagePreference = ["de", "en"];
var autoResolveLinks = true;
var contentEntity = AsEntity(Content);
var titleFromEntity = contentEntity.GetBestValue("Title", languagePreference, autoResolveLinks);

```

As you can see, the internals provide a lot of information about the underlying data - things you usually don't care about, but in rare cases may be important.

## Conversion

Each type can be converted to the other type using helpers like [AsDynamic(...)](xref:NetCode.DynamicCode.AsDynamic), [AsList(...)](xref:NetCode.DynamicCode.AsList) and [AsEntity(...)](xref:NetCode.DynamicCode.AsEntity). The APIs are explained here [](xref:NetCode.DynamicCode.Index).

> [!TIP]
> In most cases you'll always use [Dynamic Entities](xref:NetCode.DynamicData.DynamicEntity) and if you're not sure whan an object is, just run it through [AsDynamic(...)](xref:NetCode.DynamicCode.AsDynamic).


## Conversion Examples

This is just a bit of code so you can see how to convert back and forth. You usually won't care too much about this and not do this.

Note that this is a very advanced topic, and you'll need Visual Studio Intellisense to get this done reasonably. Since you'll figure it out fairly quickly, we won't document it in detail here.

```cs
// assume that you have a DynamicEntity like Content
var entity = AsEntity(Content);

// assume that you have a DataStream with Entities...
@foreach(var postEntity in Data["Default"])
{
    var postDyn = AsDynamic(postEntity);
    // postEntity is a IEntity
    // postDyn is a DynamicEntity
}

// but this is easier - convert the whole list
@foreach(var post in AsList(Data["Default"]))
{
    var postEnt = AsEntity(post);
    // do something with the @post here, it's a DynamicEntity
    // ...or with postEnt, it's an IEntity
}
```


## Read also

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


* [](xref:NetCode.DynamicData.DynamicEntity)
* [](xref:NetCode.DynamicData.Entity)

## History

1. Introduced in 2sxc 01.00
1. Multi-Language since 2sxc 02.00
1. Added `Value` and `Value<T>` as well as `Parents()` and `Children(...)` in 09.42. Note that Value does not do the same thing as GetBestValue.
