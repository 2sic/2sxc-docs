---
uid: Basics.Query.Serialization.Index
---

# Fine-Tune Serialization in Queries (new v11.13)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-app, .context-box-summary .process-headless, .context-box-summary .format-json-headless { visibility: visible; } </style>

You can now customize a lot how Query data is made available in the Headless API.

You can control things like

1. If Id, Guid and Titles are included
1. If [Metadata-For](xref:Basics.Data.Metadata.Index) is included
1. If [Metadata](xref:Basics.Data.Metadata.Index) is included and which identifiers
1. If [Relationships](xref:Basics.Data.Relationships.Index) are included and which identifiers

This is made possible through the new [SerializationConfiguration](xref:ToSic.Eav.DataSources.SerializationConfiguration) DataSource. Just try it out.

Todo: #todoc screenshots etc. 

## History

1. Introduced in 2sxc 11.13

