---
uid: Abyss.Parts.LookUp.MyConfiguration
---

[!include[](~/assets/features/look-up-system.md)]

# `MyConfiguration` LookUp in DataSources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

The `MyConfiguration` LookUp is special because it's only used in C# on [DataSources](xref:NetCode.DataSources.Index).

The [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index) can show the user a unique edit-dialog for each data source. The data itself is then stored as an Entity, and when the DataSource is being built in the Query engine, the _Settings_ for that data-source are made available on the `MyConfiguration` LookUp.

Note: You will usually never use this source, as it's only used internally by the code.
So avoid using the `MyConfiguration` in your code, the name could change in future.

---

## Read also

* [VisualQuery Parameters](xref:Basics.Query.Parameters.Index)

## History

1. In added in 2sxc 07.00
1. Renamed from `Settings` to `MyConfiguration` in 2sxc 15
