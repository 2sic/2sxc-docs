---
uid: Basics.Data.Entities.ObjectStructure
---
# Entity Object Structure

[!include["Data"](../../_shared-entities.md)]

This explains the **C# Entity Object Structure**. For an overview check out [](xref:Basics.Data.Index).

---

> [!WARNING]
> What follows is very technical. For most use cases you don't need to know this stuff.

Entities are structured as follows:

<br>
<img src="./assets/entity.png" width="100%" class="full-width">
<br>

## EAV+D = Entity-Attribute-Value + Dimension

> EAV stands for **Entity**, **Attribute**, **Value**
> The D stands for **Dimension**, it says what Dimension (Language) a _Value_ is for


## APIs

* [](xref:ToSic.Eav.Data) Namespace has almost everything you see here
* [](xref:ToSic.Eav.Data.IEntity) describes the main unit, the Entity
* [](xref:ToSic.Eav.Data.IContentType) defines what fields exist, it's the ContentType / Schema
* [](xref:ToSic.Eav.Data.IAttributeBase), [](xref:ToSic.Eav.Data.IAttribute),
	[](xref:ToSic.Eav.Data.IAttribute`1), [](xref:ToSic.Eav.Data.IAttribute`1)
	determine the internal model how an attribute is built
* [](xref:ToSic.Eav.Data.IValue), [](xref:ToSic.Eav.Data.IValue`1), <!--[](xref:ToSic.Eav.Data.Value`1)-->
	determines how values in an attribute are stored, because an attribute like `Description`
	can have many values in different languages
* [](xref:ToSic.Eav.Data.ILanguage), [](xref:ToSic.Eav.Data.IDimension), [](xref:ToSic.Eav.Data.ILanguage)
	languages and dimensions determine how the values are used in each language
* [](xref:ToSic.Eav.Metadata.ITarget), [](xref:ToSic.Eav.Metadata.Target)
	this determines if the Entity is by itself, or if it's enriching something else -
	in which case this Entity is Metadata.
* [](xref:ToSic.Eav.Metadata.IMetadataOf)
	sometimes an Entity may itself have more metadata, which would then be stored here.


## History

1. Introduced in 2sxc 1.0
