---
uid: NetCode.DynamicCode.CreateSource
---

# CreateSource\<T\>() Command

If you need to use a `DataSource` object in your code use `CreateSource<T>()`

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.CreateSource*).

**Simple Example**

```cs
@inherits ToSic.Sxc.Dnn.RazorComponent
@{
  // A source which can filter by Content-Type (EntityType)
  var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
  allAuthors.TypeName = "Authors";

  // access the data and automatically apply the filter/config
  var authors = allAuthors["Default"]; 
}
```

**Example Chaining DataSources**

```cs
@inherits ToSic.Sxc.Dnn.RazorComponent
@{
  // A source which can filter by Content-Type (EntityType)
  var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
  allAuthors.TypeName = "Authors";

  // Sort by Fullname descending
  var sortedAuthorsDesc = CreateSource<ValueSort>(allAuthors);
  sortedAuthorsDesc.Attributes = "FullName";
  sortedAuthorsDesc.Directions = "desc";

  // access the data and automatically apply the filter/config
  var authors = sortedAuthorsDesc["Default"]; 
}
```

Read more about this in [](xref:Specs.DataSources.DataSource)

> [!NOTE]
> The type `T` mentioned above must be an [IDataSource](xref:ToSic.Eav.DataSources.IDataSource). The built in ones are usually in these namespaces:

* [](xref:ToSic.Eav.DataSources)
* [](xref:ToSic.Sxc.DataSources)
* [](xref:ToSic.Sxc.Dnn.DataSources)

You can also create and compile your own DataSources, and then deploy the DLL to use in your code. 

> [!TIP]
> In most cases you will prefer to use [Visual Query](xref:Specs.DataSources.Query) to work with data, but sometimes this approach is neecssary. 

We suggest you check out some apps - almost all use this. 

## Also Read

* TODO

## History

1. General Tokens introduced in 2sxc 8.0
1. Added extra security switch in 2sxc 9.32
