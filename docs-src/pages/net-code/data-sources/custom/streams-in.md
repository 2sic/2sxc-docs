---
uid: NetCode.DataSources.Custom.StreamsIn
---

# DataSource API: In Streams

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

All DataSources can have **In** Streams, even Root DataSources. This is because an **In** is often used to provide the DataSource with configuration information.

In addition to that, many DataSources expect Data which will be processed. For example, the [Shuffle](xref:ToSic.Eav.DataSources.Shuffle) needs one In-Stream containing data to shuffle, while the [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter) expects two streams: a `Default` to filter on and an optional `Fallback` stream to return in case the filter didn't return anything. 

<img src="~/pages/basics/query/streams/assets/in-streams.png" width="100%" class="full-width">

> [!IMPORTANT]
> Here we only explain aspects which are relevant to your code. Make sure you are familiar with the [general concept of In-Streams](xref:Basics.Query.Streams.In). 

To help the UI explicitly show these predefined In-Streams, we must list them in the [VisualQuery decorator attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) in the `In` property. 

## Example from the ValueFilter DataSource

```c#
[VisualQuery(NameId = "...",
  Type = DataSourceType.Filter, 
  In = new[] { Constants.DefaultStreamName, Constants.FallbackStreamName },
  DynamicIn = false,
  DynamicOut = false,
  ConfigurationType = "...",
  HelpLink = "...")]
```

## Nice to Know

1. If the `In` is not specified in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute), then the UI will show no special In-markers  
    ...except in [Dynamic DataSources](xref:NetCode.DataSources.Custom.Dynamic) where the default is to always have In-Streams.
1. By convention, the default In-stream is called `Default`
1. To mark an In-Stream as required, add a `*` at the end, like `Default*`
1. In-Streams have data which can be used, but they are not accessed until you really need them
1. If your code really needs an In (like you require the `Default` stream) best use [the best-practice for error-handling](xref:NetCode.DataSources.Custom.Errors)
1. The property `DynamicIn` would mark DataSources which can work with a variable amount of In-Streams, like [StreamMerge](xref:ToSic.Eav.DataSources.StreamMerge)

## History

1. Introduced ca. in 2sxc 6
1. Best practices for getting in-streams in Code were changed in v15 (breaking change)
