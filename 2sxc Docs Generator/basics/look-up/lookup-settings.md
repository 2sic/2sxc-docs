---
uid: Basics.LookUp.Settings
---

[!include[](~/assets/features/look-up-system.md)]

# `Settings` LookUp in DataSources

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

The `Settings` LookUp is special because it's only used in C# on [DataSources](xref:NetCode.DataSources.Index). 

The [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index) can show the user a unique edit-dialog for each data source. The data itself is then stored as an Entity, and when the DataSource is being built in the Query engine, the _Settings_ for that data-source are made available on the `Settings` LookUp. 

You usually need this in the [ConfigMask](xref:NetCode.DataSources.Custom.ConfigMask).

---

## Read also

* [VisualQuery Parameters](xref:Basics.Query.Parameters.Index)

## History

1. In added in 2sxc 07.00

