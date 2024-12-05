---
uid: NetCode.DataSources.Custom.StreamsOut
---

# DataSource API: Out Streams

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

All DataSources must have **Out** Streams.

By convention, the primary Out is called `Default` and the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer assumes that it exists by default.

But there are two important things you can change

1. You can determine one or more predefined Out streams
1. You can tell the UI that your Stream can have many, dynamically named Out-Streams just like the [App DataSource](xref:ToSic.Eav.DataSources.App)

<img src="~/pages/basics/query/streams/assets/out-streams.png" width="100%" class="full-width">


> [!IMPORTANT]
> Here we only explain aspects which are relevant to your code. Make sure you are familiar with the [general concept of Out-Streams](xref:Basics.Query.Streams.Out).


## Pre-Named Out-Streams

For an example, we'll use the [Paging DataSource](xref:ToSic.Eav.DataSources.Paging).
It's job is to take a list of items and only forward a chunk on the `Default`, like "Page 3 containing items 61-90".
In addition it should also provide information as to what page we're on and how many pages exist.

This is defined in the constructor, where the DataSource determines what it Provides #todoc.

```c#
public Paging()
{
  ProvideOut(GetList);
  ProvideOut(GetPaging, "Paging");
}
```

The two lines of `ProvideOut` are the important bits:

1. `ProvideOut(GetList)` will provide data on the `Default` Out-Stream
1. `ProvideOut(GetPaging, "Paging")` will provide data on the `Paging` Out-Stream


## Dynamic Out Streams

Some DataSources like the [App DataSource](xref:ToSic.Eav.DataSources.App) can have many Out-streams which are not known till Runtime.
To allow the UI to provide these, we must specify this in the [VisualQuery attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute).
 Here's an example of the App DataSource:

```c#
[VisualQuery(
  NameId = "...",
  Type = DataSourceType.Source, 
  Icon = "app",
  DynamicOut = true,
  NiceName = "App",
  UiHint = "...",
  ConfigurationType = "...",
  HelpLink = "...")]
```

The important part here is the `DynamicOut = true`.

## Strategies for Providing Dynamic Out

Providing dynamic-out in your code can be tricky, and there are 2 strategies you can use:

1. Create all Out-Streams on first Use of `Out`  
  This would create the Out-Accessors when `Out` is first accessed. You can see examples of this on the [App](xref:ToSic.Eav.DataSources.App) DataSource
1. Re-Implement the `Out` of the type `IDictionary<string, IDataStream>` to do some kind of Lazy-Loading
  There is no example to do this, but it could be done.

Note that this is fairly sophisticated so do spend some time to familiarize yourself with the EAV code before you attempt this.

## History

1. Introduced ca. in 2sxc 6
1. Extended with Dynamic Out ca. 2sxc 8
1. Provide API completely changed in v15+ and uses the new `ProvideOut` method
