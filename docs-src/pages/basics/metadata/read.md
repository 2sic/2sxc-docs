---
uid: Basics.Metadata.Read
---

<img src="~/assets/features/metadata.svg" class="feature">

# Read / Access Metadata - (advanced ⚠)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
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


## Edge cases of the `.Metadata` Property

Since `.Metadata` is often used in dynamic code it's optimized to just work. This means it has the following effects

1. It will always return a valid object, even if there is no metadata attached
1. If no metadata exists, the `EntityId` will always equal zero `0`
1. If it has one or more metadata items attached, the `EntityId` will be that of the first Metadata-Entities found

#todoc - this should probably be moved to the C# API infos

## Get Metadata for Data outside of 2sxc #todoc

To read Metadata for non-2sxc objects you must request it from the **App.Data.Metadata** or from the [AppState](xref:ToSic.Eav.Apps.AppState).MetadataSource object. Both are a a [](xref:ToSic.Eav.Metadata.IMetadataSource). Use commands like `GetMetadata<T>(...)` to access the metadata you need. 



## Read also #todoc


## Demo App and further links #todoc

* [](xref:App.FancyBoxGallery)


---

## History

1. Introduced in 2sxc v2
