---
uid: Basics.Data.Fields.Empty
---

# Field Data Type: Empty

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Empty Fields**. For an overview check out [](xref:Basics.Data.Index).

---


Empty data is a basic [data type](xref:Basics.Data.Fields.Index) and is for adding things to the UI (input form) which doesn't actually save any data. A common use is group-headers which contain a text, but don't result in data being stored.

> [!TIP]
> 2sxc 12.01 also introduces [Ephemeral Fields](xref:Basics.Data.Fields.Ephemeral) which are normal fields which don't save the value. Use that for fields which should behave like variables and not be saved. 

## Features 

The basic **empty** field doesn't have any features, since all the features are in the sub-types. 

## Sub-Types of Empty Fields

1. [empty-default](xref:Basics.Data.Fields.Empty-Default) - a UI-only field for things like grouping fields together under a title
1. [empty-end](xref:Basics.Data.Fields.Empty-End) - a UI-only field to close a Field-Group
1. [empty-message](xref:Basics.Data.Fields.Empty-Message) - just a message in the edit form
## Shared Settings

Doesn't have shared settings.



---

## Technical Information

## Storage in the SQL Database in the EAV-Model

This is not stored, as it is specifically meant to not store data. 

## Storage in the SQL Database in the JSON-Model

This is not stored, as it is specifically meant to not store data. 


## History

1. Introduced in EAV 1.0 2sxc 1.0