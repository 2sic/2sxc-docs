---
uid: NetCode.DataSources.Use.DataSourceParameters
---

# Set Parameters for DataSource Objects in C#

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource, .context-box-summary .process-razor-app, .context-box-summary .process-web-api-app { visibility: visible; } </style>

Most DataSource Objects will do something that you can parameterize / configure. 

There are two ways to do this

1. Set Property values on the DataSource objects
1. Put Tokens in the Property Values of the objects

> [!IMPORTANT]
> DataSource Objects are **Single-Use**, so any configuration you set must happen before data is accessed. 
>
> Once Data has been retrieved (by accessing the List of a DataSource) the inner engine 
> will cache the result and not re-run the code, so changing parameters afterwards will have no effect. 

## Set Property Values 

Each DataSource object has unique properties you can set. Example:

```cs
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
allAuthors.TypeName = "Authors";

// access the data and automatically apply the filter/config
var authors = allAuthors["Default"]; 
``` 

This demonstrates the [EntityTypeFilter DataSource](xref:ToSic.Eav.DataSources.EntityTypeFilter) which has only a single property [TypeName](xref:ToSic.Eav.DataSources.EntityTypeFilter.TypeName) to configure.

The [CsvDataSource](xref:ToSic.Eav.DataSources.CsvDataSource) on the other hand has [5 Properties you can set](xref:ToSic.Eav.DataSources.CsvDataSource#properties) like the file name to use, the delimiter etc.

> [!TIP]
> Setting properties is the most common way to configure DataSources in C#.

## Set Property Tokens

Tokens are usually used in [VisualQuery](xref:Basics.Query.VisualQuery.Index) but mentioned here for completeness. This is what you could do:

```cs
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
allAuthors.TypeName = "[QueryString:TypeName]";

// access the data and automatically apply the filter/config
var authors = allAuthors["Default"]; 
``` 

In this case we specified a [Token](xref:Abyss.Parts.LookUp.Tokens) which will be processed by the system and replaced before the DataSource does it's internal work. 
Tokens use a [LookUp System](Abyss.Parts.LookUp.Index to identify a source (in this case `QueryString`) 
and then ask that source for the value (in this case the url parameter `TypeName`). 

Tokens have additional features like fallbacks (so `[QueryString:Typename||BlogPost]` would use `BlogPost` if the URL didn't have a parameter). Since you will usually prefer to do this kind of value-resolution in your C# code, tokens are rarely used here.


---

## History

1. Introduced in 2sxc 04.00
