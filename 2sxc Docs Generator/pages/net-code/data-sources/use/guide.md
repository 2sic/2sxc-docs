---
uid: NetCode.DataSources.Use.Guide
---

# Guide for Using DataSources in your C# Code

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource, .context-box-summary .process-razor-app, .context-box-summary .process-web-api-app { visibility: visible; } </style>

All data comes from DataSources.
Either because something prepared the DataSources for your code,
or because your code explicitly requested a DataSource from the API.

1. Some DataSources are **prepared** and always available in Razor and WebApi, like `Data`, `App.Data` or `App.Query["QueryName"]`

1. And you can also get other DataSources in C# code, like `Kit.Data.GetSource<EntityTypeFilter>()`

## Step 1: Use a DataSource

This is a basic example of an _Employees_ Razor Template.
It uses the `Data` DataSource which is always available in Razor and WebApi.
For some magical reasons we'll explain later, the `Data` is a DataSource which in this case _provides_ all the Employees which should be shown.

```razor
@foreach(var person in AsList(Data)) {
  <li>@person.FullName (@person.Function)</li>
}
```

This demonstrates

1. Some magic in the background prepared `Data` to contain what should be shown

1. A simple `foreach` can be used to loop through the data

1. The `Data` returns `IEntity` objects but we need `dynamic` objects so we can do things like `@person.FullName`, so we use `AsList` which wraps the items inside `Data`

1. Now we can just output the values as needed, like `@person.FullName`


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Step 2: Understanding Prepared Data

You will usually use DataSource objects in these common cases in both Razor and Custom WebApi:

1. The [Data](xref:NetCode.DynamicCode.Data) object is a DataSource. It always has a `Default` stream (`Data["Default"]`). Sotemites it has other streams like `Data["ListContent"]` or `Data["Categories"]` etc.

1. The [App.Data](xref:NetCode.DynamicCode.Objects.App.Data) is a DataSource providing a stream for each content-type in this app, like `App.Data["BlogPost"]` or `App.Data["Tag"]`

1. Every [App.Query[...]](xref:NetCode.DynamicCode.Objects.App.Query) is a DataSource. In the query you define which DataStreams it has. Eg. `App.Query["SortedTags"]` would be a DataSource and typically the `Default` stream would contain all these tags.

1. A query is actually a set DataSources doing one operation and passing it on to the next DataSource


## Step 3: Use The Data As Prepared

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

Note that `AsList(Data)` is a Shorthand for `AsList(Data.List)` or `AsList(Data["Default"].List)`:

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


## Step 4: Create DataSource Objects in C#/Razor Code

Sometimes you want to have full control over what a DataSource does or what parameters it's using. This is easy:

```cs
// A source which can filter by Content-Type (EntityType)
var allAuthors = Kit.Data.GetSource<ToSic.Eav.DataSources.EntityTypeFilter>(
  attach: App.Data,                     // Use the apps data as input
  parameters: new { TypeName = "Author" }  // tell it to filter by "Author"
);

// access the data and automatically apply the filter/config
var authors = allAuthors.List;
```

👉 Also read [](xref:NetCode.DataSources.Use.DataSourceParameters)

> [!TIP]
> 2sxc 16 uses a new [Kit.Data.GetSource(...)](xref:ToSic.Sxc.Services.IDataService) to get DataSources.
> Older code used `CreateSource(...)` which is still available, but deprecated.
> The new method is more powerful and we'll slowly migrate to that API only


## Step 5: Create a Query in Code by Attaching Data sources

What the [VisualQuery](xref:Basics.Query.VisualQuery.Index) designer does is configure how DataSources are attached, mapping their in/out streams and adding parameters.

You can also do this in code, but it's fairly advanced.
You would usually want to do this, if you want to use a filter or something, but need to provide parameters which aren't available in the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer.
Here's a simple example:

```cs
using ToSic.Eav.DataSources;

// A source which can filter by Content-Type (EntityType)
var allAuthors = Kit.Data.GetSource<EntityTypeFilter>(
  attach: App.Data,                     // Use the apps data as input
  parameters: new { TypeName = "Author" }  // tell it to filter by "Author"
);

// Sort by FullName
var sortedAuthors = Kit.Data.GetSource<ValueSort>(attach: allAuthors,
  parameters: { Attributes = "FullName" });

// Sort by FullName descending
var sortedAuthorsDesc = Kit.Data.GetSource<ValueSort>(attach: allAuthors,
  parameters: { Attributes = "FullName", Directions = "desc" });

// Sort by 2 fields
var sortedAuthorsMult = Kit.Data.GetSource<ValueSort>(attach: allAuthors,
  parameters: { Attributes = "Website,FullName", Directions = "asc, desc" });

// sort by internal EntityId
var sortedAuthorsById = Kit.Data.GetSource<ValueSort>(attach: allAuthors,
  parameters: { Attributes = "EntityId" });
```

The most important thing to notice is that each additional data-source uses the first `allAuthors` DataSource as the default **upstream** DataSource.
So when these sort/filter or do something, they will only receive the data already filtered by the allAuthors.


## Read also

* [Data Sources](xref:NetCode.DataSources.DataSource)
* [Data Streams](xref:ToSic.Eav.DataSource.IDataStream)
* [Dynamic Code CreateSource\<T\>(...)](xref:NetCode.DynamicCode.CreateSource)
* [.net API](xref:ToSic.Sxc.Code.IDynamicCode.CreateSource*)
* [Demo-App showing some coding of DataSources][app-ds-code]
* [Blog about creating your own data-source](xref:Blog.CustomDataSource)


## History

1. Introduced in 2sxc 04.00
1. Changed API in 2sxc 16 to use `Kit.Data.GetSource(...)` instead of `CreateSource(...)`
1. Changed API ni 2sxc 16 to use `parameters:` at construction time instead of setting variables on the object

[app-ds-code]: https://2sxc.org/en/apps/app/tutorial-use-a-custom-developed-datasource
