---
uid: NetCode.DataSources.Custom.TypeFilter
---

# DataSource API: Filter DataSources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource takes an `In` stream and limits what is forwarded it's called a **Filter DataSource**.

You can find some simple examples in our DataSources like the [EntityId](xref:ToSic.Eav.DataSources.EntityIdFilter) or [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter).

## Recommendations

1. Inherit from the [CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource) base class
1. Use `ProvideOut` and give it a lambda or method which returns the data after applying filters
1. Mark your sources in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) as `DataSourceType.Filter`

It's important to note that filtering must use the standard `IEntity` APIs, so there is a learning curve to this.
Best check out the examples listed above.

## Read Also

* Check out the [](xref:Tut.DynamicDataSources) for some easy examples

## History

1. Introduced ca. EAV / 2sxc v6
