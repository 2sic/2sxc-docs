---
uid: NetCode.DataSources.Custom.ExternalData
---

[!include[](_obsolete-docs.md)]

# DataSource API: Inherit from ExternalData

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource gets data from elsewhere, please always inherit from `ToSic.Eav.DataSources.ExternalData` (doesn't exist anymore in v15).

It doesn't do much, but in case future optimizations happen, this will help us detect that you have a source getting external data.


## Demo App and further links

* [](xref:NetCode.DataSources.Custom.TutorialBasic.Index)

## History

1. Introduced ca. EAV / 2sxc v9
