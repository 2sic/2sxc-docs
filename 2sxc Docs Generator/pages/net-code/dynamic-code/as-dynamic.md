---
uid: NetCode.DynamicCode.AsDynamic
---
# AsDynamic(...)

To make a complex system like the EAV work, the real objects like the [](xref:ToSic.Eav.Data.IEntity) must very very smart and complicated. This would not be fun to use in razor, where you would prefer a simple `@Something.Property` syntax. This is where `AsDynamic(...)` comes in.

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.AsDynamic(System.Object)).


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How to Use

If you have an [](xref:ToSic.Eav.Data.IEntity)
or you're not sure if it's either an IEntity or a [](xref:ToSic.Sxc.Data.IDynamicEntity),
just pass it through `AsDynamic(...)` and the result will be a [](xref:ToSic.Sxc.Data.IDynamicEntity).
You can then access the properties with the simple `thing.Property` syntax.

```razor
@inherits Custom.Hybrid.Razor12
@{
    var unknown = App.Data["Default"].List.First(); // this will be an IEntity
    var myThing = AsDynamic(unknown);
}
<div>@myThing.FirstName</div>
```

> [!NOTE]
> Results of AsDynamic are dynamically typed, so you can write `.Anything` behind it.
> But the data coming out of it is strongly typed, so `Content.Birthday` is a real date object.

> [!TIP]
> [](xref:ToSic.Sxc.Data.IDynamicEntity) objects also have some additional properties like
> `EntityId` or `Parents(...)`. Check out the API docs.

## How it works

AsDynamic has many signatures accepting a variety of input values. It then returns an `dynamic` object which is either a [](xref:ToSic.Sxc.Data.IDynamicEntity). These are the things AsDynamic can process:

* a [](xref:ToSic.Eav.Data.IEntity) - this will return a single [](xref:ToSic.Sxc.Data.IDynamicEntity)
* [](xref:ToSic.Sxc.Data.IDynamicEntity) - will return the same [](xref:ToSic.Sxc.Data.IDynamicEntity)  
  _this option exists just so you don't have to pre-check what you pass in, making it easier to code for you_
* a `string` containing JSON - will return a dynamic object [](xref:ToSic.Sxc.Data.DynamicJacket)  
  _added in 2sxc 10.20.06_

[!include["Tip Inherits"](../razor/_include-tip-inherits.md)]

## Reversing AsDynamic with AsEntity

Check out these docs: [](xref:NetCode.DynamicCode.AsEntity)

## Obsolete use of AsDynamic() for Lists

> [!WARNING]
> In previous versions of 2sxc you'll find AsDynamic(...) also used to convert lists (IEnumerable or DataStreams) into lists.
> This caused a lot of issues with dynamic code compilation, so in 2sxc 10.20 we introduced [AsList(...)](xref:NetCode.DynamicCode.AsList) for that use case.
> So if you find that kind of code, it works because...
>
> * without `@inherits Custom.Hybrid.Razor12` in the header, the old calls still work
> * with `@inherits Custom.Hybrid.Razor12` in the header, you must use `AsList(...)`

---

## History

1. Introduced ca. in 2sxc 1
1. Modified/added signatures in 2sxc 7
1. Added the string and DataSource signature in 2sxc 10.20
1. Introduced AsList to make code more readable for lists 10.20
