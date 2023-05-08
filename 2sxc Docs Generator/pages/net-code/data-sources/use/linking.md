---
uid: NetCode.DataSources.Use.Linking
---

# Attaching / Linking DataSource Objects in C#/Razor Code

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource, .context-box-summary .process-razor-app, .context-box-summary .process-web-api-app { visibility: visible; } </style>

In many cases a DataSource expects data to be passed in.
This is usually done by attaching it to another DataSource.

Here is a simple example:

```c#
using ToSic.Eav.DataSources;

// A source which can filter by Content-Type (EntityType)
var allAuthors = Kit.Data.GetSource<EntityTypeFilter>(
  attach: App.Data,                     // Use the apps data as input
  parameters: new { TypeName = "Author" }  // tell it to filter by "Author"
);
```

Note the `attach: App.Data`.
This says "attach `App.Data` as the input to this DataSource on the stream `Default`".

> [!TIP]
> This is the most common way to attach a DataSource to another DataSource.

## How Attaching Works

Internally links are created using the [IDataSourceLink](xref:ToSic.Eav.DataSource.IDataSourceLink).
The code above simply works, because every DataSource and every DataStream is also a [IDataSourceLinkable](xref:ToSic.Eav.DataSource.IDataSourceLinkable).
This means it has a `.Link` property which contains the DataSourceLink.

When using the simple linking as specified above, the thing (in this case `App.Data`)
will simply provide it's `Default` Out-stream as the `Default` In-stream to the target.

## Attaching to/from Another Name

Sometimes you may want to attach to a different stream.
There are two Scenarios

1. Link data from a different Out-Stream (not `Default`)
1. Link the data to a different In-Stream (not `Default`)

### Linking to a different Out-Stream

This is done by linking from the desired out-stream.
So instead of doing `attach: App.Data` you would do `attach: App.Data["MyStream"]`.

### Linking to a different In-Stream

This is done by _renaming_ the target stream on the link, like this:

```c#
attach: App.Data.Link.Rename(inName: "Fallback")
```

The example above would attach the data _not_ to the `Default` but to the stream `Fallback`.
The `Link` property has all the commands needed for renaming etc., which is why you need to add `.Link` before calling `Rename(...)`.

> [!TIP]
> The [IDataSourceLink](xref:ToSic.Eav.DataSource.IDataSourceLink) API is fluent, [functional](xref:NetCode.Conventions.Functional) and  [immutable](xref:NetCode.Conventions.Immutable).
> As such anything you write will only affect this use, and not really rename anything.

## Attaching Multiple DataSources

Since any `.Link` provide a link, you can chain multiple links together like this:

```c#
// First get the root data source - the App with all data
var appDs2 = Kit.Data.GetAppSource();

// Now create a Type-Filter and tell it to only keep Books / Authors
var books2 = Kit.Data.GetSource<EntityTypeFilter>(attach: appDs2, parameters: new { TypeName = "Books" });
var authors2 = Kit.Data.GetSource<EntityTypeFilter>(attach: appDs2, parameters: new { TypeName = "Persons" });

// The following lines are just spread for easier documentation
// Usually you would write in inline
var dataSourceLinks2 = books2.Link    // Get the link to the books
  .Add(authors2.Link              // Add the author2 link
    .Rename(inName: "Stream2"     // but rename the link so it's attached as "Stream2"
  )
);
var merged2 = Kit.Data.GetSource<StreamMerge>(attach: dataSourceLinks2);
```



---

## History

1. Introduced in 2sxc 16.00
