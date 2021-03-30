---
uid: NetCode.DataSources.Custom.TypeModify
---

# DataSource API: Modify Data DataSources

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource takes an `In` stream and _changes the properties_ of the items forwarded it's called a **Modify DataSource**. 

You can find some simple examples in our DataSources like the [AttributeRename](xref:ToSic.Eav.DataSources.AttributeRename) or [AttributeFilter](xref:ToSic.Eav.DataSources.AttributeFilter). 

Also make sure you mark your sources in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) as `DataSourceType.Modify`.

## Read Also

* [](xref:Tutorial.DataSource.Basic.Git)

## History

1. Introduced ca. EAV / 2sxc v6
