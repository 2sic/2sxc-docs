---
uid: Basics.Data.Metadata.Of
---

# Metadata Of Something - (advanced ⚠)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata** is Data which describes or adds information _to other data_. 

When working with things (let's call it the _Owner_) which have metadata, we talk about the Metadata being **Metadata Of** the _Owner_. 

In 2sxc many object _have_ Metadata, such as

1. Apps
1. Content-Types
1. Attribute Definitions
1. Entities

You can always access the Metadata through the `.Metadata` property. 

> [!TIP]
> When looking at **Metadata** from the _Owner_ object, we call it **[Metadata Of](xref:Basics.Data.Metadata.For)** the _Owner_. 
> 
> When looking at it from the Metadata-items point of view, they are **[Metadata-For](xref:Basics.Data.Metadata.For)** the _Owner_.

## The Metadata Property

You can probably learn a lot by looking at the API docs of [MetadataOf](xref:ToSic.Eav.Metadata.IMetadataOf) but here are the important parts:

* You can loop through the `Metadata` property
* The Metadata-Property will always return at least 1 item, even if no metedata was specified. 
* If no data was specified, the returned item will have an Id of `0` (zero)
* Additional helpers like `GetBestValue` let you quickly get a value without going through the items themselves


---

## History

1. Introduced in 2sxc v2
1. Continuously improved in 2sxc 7, 8, 10 and 11