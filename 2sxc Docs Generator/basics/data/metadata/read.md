---
uid: Basics.Data.Metadata.Read
---

# Read / Access Metadata - (advanced ⚠)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

There are two ways to read / access Metadata

1. On most 2sxc Data-objects there is a property called `Metadata` which contains everything you need
1. To get Metadata for other Data there is a simple API to retrieve it

## Get Metadata on 2sxc Data Objects #todoc

Many standard 2sxc object have a property **Metadata** to quickly access all Metadata of that object. You can find the docs in [](xref:ToSic.Eav.Metadata.IMetadataOf). This applies to all kinds of objects like

1. Entities
1. Content-Types
1. Apps
1. ADAM files and folders

## Get Metadata for ADAM Files and Folders #todoc

All [ADAM](xref:Basics.Cms.Adam.Index) Assets also have the `.Metadata` property to read the metadata as well as a `.HasMetadata` to quickly see if Metadata has been set. 


## Get Metadata for Data outside of 2sxc #todoc

To read Metadata for non-2sxc objects you must request it from the **App.Data.Metadata** or from the [AppState](xref:ToSic.Eav.Apps.AppState).MetadataSource object. Both are a a [](xref:ToSic.Eav.Metadata.IMetadataSource). Use commands like `GetMetadata<T>(...)` to access the metadata you need. 



## Read also #todoc


## Demo App and further links #todoc

* [](xref:App.FancyBoxGallery)


---

## History

1. Introduced in 2sxc v2
