---
uid: NetCode.DataSources.Use.DataSourceParameters
---

# Set Parameters for DataSource Objects in C#/Razor Code

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource, .context-box-summary .process-razor-app, .context-box-summary .process-web-api-app { visibility: visible; } </style>

Many DataSource Objects will do something that you can parameterize / configure.

There are two ways to do this

1. Set Configuration values on the DataSource objects
1. Put Tokens in the Configuration Values of the objects

> [!TIP]
> DataSource Objects are **Single-Use**, so any configuration you set must happen before data is accessed.
>
> Once Data has been retrieved (by accessing the List of a DataSource) the inner engine
> will cache the result and not re-run the code, so changing parameters afterwards will have no effect.


> [!TIP]
> These samples require 2sxc 16.
> For older versions, check the code at the end of this page.

## Set Property Values

Each DataSource object has unique properties you can set. Example:

```c#
using ToSic.Eav.DataSources;

// A source which can filter by Content-Type (EntityType)
var allAuthors = Kit.Data.GetSource<EntityTypeFilter>(
  attach: App.Data,                     // Use the apps data as input
  parameters: new { TypeName = "Author" }  // tell it to filter by "Author"
);

// access the data and automatically apply the filter/config
var authors = allAuthors.List;
```

This demonstrates the [EntityTypeFilter DataSource](xref:ToSic.Eav.DataSources.EntityTypeFilter).
We `attach` it to the `App.Data` so that will be the input, before the filter is applied.
It has a single configuration [TypeName](xref:ToSic.Eav.DataSources.EntityTypeFilter.TypeName).
Since we set the `TypeName` property to `Author`, only items of type `Author` will be returned.

The [Csv DataSource](xref:ToSic.Eav.DataSources.Csv) on the other hand has [5 Properties you can set](xref:ToSic.Eav.DataSources.Csv#properties) like the file name to use, the delimiter etc.

> [!TIP]
> Setting properties is the most common way to configure DataSources in C#.

## Set Property Tokens

Tokens are usually used in [VisualQuery](xref:Basics.Query.VisualQuery.Index) but mentioned here for completeness. This is what you could do:

```cs
using ToSic.Eav.DataSources;

// A source which can filter by Content-Type (EntityType)
var allAuthors = Kit.Data.GetSource<EntityTypeFilter>(
  attach: App.Data,
  parameters: new { TypeName = "[QueryString:TypeName]" }
);
CreateSource<EntityTypeFilter>();

// access the data and automatically apply the filter/config
var authors = allAuthors.List;
```

In this case we specified a [Token](xref:Abyss.Parts.LookUp.Tokens) which will be processed by the system and replaced before the DataSource does it's internal work.
Tokens use a [LookUp System](xref:Abyss.Parts.LookUp.Index) to identify a source (in this case `QueryString`)
and then ask that source for the value (in this case the url parameter `TypeName`).

Tokens have additional features like fallbacks (so `[QueryString:Typename||BlogPost]` would use `BlogPost` if the URL didn't have a parameter).
Since you will usually prefer to do this kind of value-resolution in your C# code, tokens are rarely used here.

## Deprecated Samples

The following code is old/deprecated and shouldn't be used any more.
But since many older samples used this (pre v15) we're still including it in the docs.

```cs
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
allAuthors.TypeName = "Authors";

// access the data and automatically apply the filter/config
var authors = allAuthors["Default"]; 
```


---

## History

1. Introduced in 2sxc 04.00
1. Massively enhanced in 2sxc 16 using Kit.Data which supports `attach:` and `parameters:` parameters
