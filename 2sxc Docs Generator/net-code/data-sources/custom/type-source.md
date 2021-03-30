---
uid: NetCode.DataSources.Custom.TypeSource
---

# DataSource API: Root DataSources which Introduce Data

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource creates new items - like from memory or elsewhere - it's called a **Root DataSource**. 

Examples would be DataSources which...

* ...get data from a WebApi
* ...list files in a Folder
* ...reads image file properties

You can find some simple examples in the [Tutorial](xref:Tutorial.DataSource.Basic.Git).

Also make sure you mark your sources in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) as `DataSourceType.Source`.

## Read Also

* [](xref:Tutorial.DataSource.Basic.Git)

## History

1. Introduced ca. EAV / 2sxc v6
