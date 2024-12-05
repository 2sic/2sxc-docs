---
uid: Basics.Metadata.For
---

<img src="~/assets/features/metadata.svg" class="feature">

# Metadata For Something - (advanced ⚠)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata** is Data which describes or adds information _to other data_. 

When an Entity/Item is _for_ something else (we call it the _Owner_) then we call this item as being **Metadata For** the _Owner_.

To be **Metadata For** something, an Entity must have **Target** information. 

1. Every Entity can be **Metadata For** something else
1. An item can only be _Metadata For_ one thing

> [!TIP]
> When looking at **Metadata** from the _Owner_ object, we call it **[Metadata Of](xref:Basics.Metadata.For)** the _Owner_. 
> 
> When looking at it from the Metadata-items point of view, they are **[Metadata-For](xref:Basics.Metadata.For)** the _Owner_.

## The MetadataFor Property

To find out if an object _is Metadata_ for something, check the `.MetadataFor` property which contains the _Target Information_. 

You can read about the [Target](xref:ToSic.Eav.Metadata.ITarget) APIs here.

---

## History

1. Introduced in 2sxc v2
1. Continuously improved in 2sxc 7, 8, 10 and 11