---
uid: NetCode.DataSources.Use.Index
---

# Use DataSources in your C# Code

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource, .context-box-summary .process-razor-app, .context-box-summary .process-web-api-app { visibility: visible; } </style>


You will usually use DataSource objects in these common cases in both Razor and Custom WebApi:

1. the [Data](xref:NetCode.DynamicCode.Data) object is a DataSource, usually having a `Default` stream (`Data["Default"]`) and sometimes further streams like `Data["ListContent"]` or `Data["Categories"]` etc.
1. the [App.Data](xref:NetCode.DynamicCode.Objects.App.Data) is also a DataSource providing a stream for each content-type in this app, like `App.Data["BlogPost"]` or `App.Data["Tag"]`
1. every query is technically a DataSource, and in the query you define which DataStreams it has - if ever you use it in code, you'll see that `App.Query["SortedTags"]` would be a DataSource and typically the `Default` stream would contain all these tags.
1. a query is always a chain of DataSource doing one operation and passing it on to the next DataSource

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Use The Data As Prepared

In your code you'll usually work with these three sources which have been prepared for you:

1. [Data](xref:NetCode.DynamicCode.Data)
1. [App.Data](xref:NetCode.DynamicCode.Objects.App.Data)
1. [App.Query[...]](xref:NetCode.DynamicCode.Objects.App.Query)

If all you want is to loop through various lists already available, you'll usually work with [AsList](xref:NetCode.DynamicCode.AsList) like this:

```razor
@foreach(var item in AsList(Data)) {
  <li>@item.Title</li>
}
```

Note that this is a Shorthand for

```razor
@foreach(var item in AsList(Data["Default"].List)) {
  <li>@item.Title</li>
}
```

If your data-source `Data`, `App.Data` or `App.Query["QueryName"]` has more than one stream, you would do this:

```razor
@foreach(var item in AsList(App.Data["Categories"])) {
  <li>@item.CategoryName</li>
}
```

Please read more about these in links. 

## Create DataSource Objects in C#/Razor Code

Sometimes you want to have full control over what a DataSource does or what parameters it's using. This is easy: 

```cs
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
allAuthors.TypeName = "Authors";

// access the data and automatically apply the filter/config
var authors = allAuthors["Default"]; 
``` 

👉 Also read [](xref:NetCode.DataSources.Use.DataSourceParameters)

##  Create a Query in Code by Piping / Chaining Data sources

What the [VisualQuery](xref:Basics.Query.VisualQuery.Index) designer does is configure how DataSources are attached, mapping their in/out streams and adding parameters. 

You can also do this in code, but it's fairly advanced. You would usually want to do this, if you want to use a filter or something, but need to provide parameters which aren't available in the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer. Here's a simple example:

```cs
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<EntityTypeFilter>();
allAuthors.TypeName = "Author";

// Sort by FullName
var sortedAuthors = CreateSource<ValueSort>(allAuthors);
sortedAuthors.Attributes = "FullName";

// Sort by Fullname descending
var sortedAuthorsDesc = CreateSource<ValueSort>(allAuthors);
sortedAuthorsDesc.Attributes = "FullName";
sortedAuthorsDesc.Directions = "desc";

// Sort by 2 fields
var sortedAuthorsMult = CreateSource<ValueSort>(allAuthors);
sortedAuthorsMult.Attributes = "Website,FullName";
sortedAuthorsMult.Directions = "asc, desc";

// sort by internal EntityId
var sortedAuthorsById = CreateSource<ValueSort>(allAuthors);
sortedAuthorsById.Attributes = "EntityId";
```

Because the first `allAuthors` didn't specify an up-stream in the `()` empty brackes, it automatically gets attached to the App-Cache with all the data of the current app. So `var allAuthors = CreateSource<EntityTypeFilter>();` will initially have all content-items at it's disposal. 

The most important thing to notice is that each additional data-source uses the first `allAuthors` DataSource as the default **upstream** DataSource. So when these sort/filter or do something, they will only receive the data already filtered by the allAuthors.


## Read also

* [Data Sources](xref:NetCode.DataSources.DataSource)
* [Data Streams](xref:ToSic.Eav.DataSource.IDataStream)
* [Dynamic Code CreateSource\<T\>(...)](xref:NetCode.DynamicCode.CreateSource)
* [.net API](xref:ToSic.Sxc.Code.IDynamicCode.CreateSource*)
* [Demo-App showing some coding of DataSources][app-ds-code]
* [Blog about creating your own data-source](xref:Blog.CustomDataSource)


## History

1. Introduced in 2sxc 04.00


[app-ds-code]: http://2sxc.org/en/apps/app/tutorial-use-a-custom-developed-datasource
