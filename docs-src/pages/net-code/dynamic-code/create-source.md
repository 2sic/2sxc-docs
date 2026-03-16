---
uid: NetCode.DynamicCode.CreateSource
---

# CreateSource\<T\>() Command

If you need to use a `DataSource` object in your code use `CreateSource<T>()`

⚡ The [official API docs](xref:Custom.Hybrid.Razor12.CreateSource*).


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Simple Example

```razor
@inherits Custom.Hybrid.Razor12
@{
  // A source which can filter by Content-Type (EntityType)
  var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
  allAuthors.TypeName = "Authors";

  // access the data and automatically apply the filter/config
  var authors = allAuthors["Default"]; 
}
```

## Example Chaining DataSources

```razor
@inherits Custom.Hybrid.Razor12
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

Read more about this in [](xref:NetCode.DataSources.DataSource)

> [!NOTE]
> The type `T` mentioned above must be an [IDataSource](xref:ToSic.Eav.DataSource.IDataSource). The built in ones are usually in these namespaces:

* [ToSic.Eav.DataSources Namespace](xref:ToSic.Eav.DataSources){title="icon:database"}
* [ToSic.Sxc.DataSources Namespace](xref:ToSic.Sxc.DataSources){title="icon:database"}
* [ToSic.Sxc.Dnn.DataSources Namespace](xref:ToSic.Sxc.Dnn.DataSources){title="icon:database"}

You can also create and compile your own DataSources, and then deploy the DLL to use in your code. 

> [!TIP]
> In most cases you will prefer to use [VisualQuery](xref:NetCode.DataSources.Query.Index) to work with data, but sometimes this approach is neecssary. 

We suggest you check out some apps - almost all use this. 

## Also Read

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## History

1. General Tokens introduced in 2sxc 8.0
1. Added extra security switch in 2sxc 9.32
