---
uid: NetCode.DataSources.Custom.StreamsIn
---

# DataSource API: In Streams

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

All DataSources can have **In** Streams, even Root DataSources. This is because an **In** is often used to provide the DataSource with configuration information.

In addition to that, many DataSources expect Data which will be processed. For example, the [Shuffle](xref:ToSic.Eav.DataSources.Shuffle) needs one In-Stream containing data to shuffle, while the [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter) expects two streams: a `Default` to filter on and an optional `Fallback` stream to return in case the filter didn't return anything. 

To help the UI explicitly show these predefined In-Streams, we must list them in the [VisualQuery decorator attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) in the `In` property. 

<img src="./assets/in-streams.png" width="100%" class="full-width">


## Example from the ValueFilter DataSource

```c#
[VisualQuery(GlobalName = "..., ...",
  Type = DataSourceType.Filter, 
  In = new[] { Constants.DefaultStreamName, Constants.FallbackStreamName },
  DynamicOut = false,
  ExpectsDataOfType = "...",
  HelpLink = "...")]
```

## Nice to Know

1. If the `In` is not specified in the VisualQuery Attribute, then the UI will show no special In-markers
1. By convention, the default In-stream is called `Default`


## History

1. Introduced ca. in 2sxc 6
