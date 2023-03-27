---
uid: NetCode.DynamicCode.AsList
---

# AsList(...) - Magic Lists

In razor you prefer a simple `@Something.Property` syntax. If you only have one item, you'll use [](xref:NetCode.DynamicCode.AsDynamic). When you need a list to go through, you use `AsList(...)`. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.AsList*).


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How it works

AsList has various signatures accepting a variety of input values. It then returns an `IEnumerable<dynamic>` object which is a `List` of [](xref:ToSic.Sxc.Data.IDynamicEntity) objects. These are the things AsList can process:

* a `List<IEntity>` or `IEnumerable<IEntity>` - will return a List/IEnumerable of [](xref:ToSic.Sxc.Data.IDynamicEntity)
* a `List<DynamicEntity>` or `IEnumerable<IDynamicEntity>` - will return the same thing again  
  _this option exists just so you don't have to pre-check what you pass in, making it easier to code for you_
* a [](xref:ToSic.Eav.DataSource.IDataStream) - will return a List/IEnumerable of [](xref:ToSic.Sxc.Data.IDynamicEntity)
* a [](xref:ToSic.Eav.DataSource.IDataSource) - will return a List/IEnumerable of [](xref:ToSic.Sxc.Data.IDynamicEntity) of the `"Default"` stream 
* a 

[!include["Tip Inherits"](../razor/_include-tip-inherits.md)]


## History

1. Introduced in 2sxc 10.20