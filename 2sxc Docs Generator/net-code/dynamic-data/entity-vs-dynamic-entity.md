---
uid: NetCode.DynamicData.EntityVsDynamicEntity
---

# Entity vs. Dynamic Entity Content-Items

## Difference IEntity and IDynamicEntity

Just a short piece of code, so you can see why you usually _don't want to use the IEntity_ and will prefer the _IDynamicEntity_ instead.

```cs
// The easy way, using the content-item as a DynamicEntity
var titleSimple = Content.Title; 

// The hard way, what actually happens internally
var languagePreference = ["de", "en"];
var autoResolveLinks = true;
var titleMedium = AsEntity(Content).GetBestValue("Title", languagePreference, autoResolveLinks);

```

As you can see, the internals provide a lot of information about the underlying data - things you usually don't care about, but in rare cases may be important.

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
@foreach(var post in AsDynamic(Data["Default"]))
{
    var postEnt = AsEntity(post);
    // do something with the @post here, it's a DynamicEntity
    // ...or with postEnt, it's an IEntity
}
```


## Read also

[!include["Razor Tutorials"](../../shared/tutorials/razor.md)]


* [](xref:NetCode.DynamicData.DynamicEntity)
* [](xref:NetCode.DynamicData.Entity)

## History

1. Introduced in 2sxc 01.00
1. Multi-Language since 2sxc 02.00
1. Added `Value` and `Value<T>` as well as `Parents()` and `Children(...)` in 09.42. Note that Value does not do the same thing as GetBestValue.
