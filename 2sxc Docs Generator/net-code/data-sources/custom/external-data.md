---
uid: NetCode.DataSources.Custom.ExternalData
---

# DataSource API: Inherit from ExternalData 

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource gets data from elsewhere, please always inherit from [ExternalData](xref:ToSic.Eav.DataSources.ExternalData).

It doesn't do much, but in case future optimizations happen, this will help us detect that you have a source getting external data. 


## Demo App and further links

* [](xref:NetCode.DataSources.Custom.TutorialBasic.Index)

## History

1. Introduced ca. EAV / 2sxc v9
