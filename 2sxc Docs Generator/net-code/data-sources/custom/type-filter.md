---
uid: NetCode.DataSources.Custom.TypeFilter
---

# DataSource API: Filter DataSources

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource takes an `In` stream and limits what is forwarded it's called a **Filter DataSource**. 

You can find some simple examples in our DataSources like the [EntityId](xref:ToSic.Eav.DataSources.EntityIdFilter) or [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter). 

Also make sure you mark your sources in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) as `DataSourceType.Filter`.

## Read Also

* [](xref:NetCode.DataSources.Custom.TutorialBasic.Index)

## History

1. Introduced ca. EAV / 2sxc v6
