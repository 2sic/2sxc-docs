---
uid: Basics.Data.ContentTypes.System
---

# Global System Content-Types

[!include["Data"](~/pages/basics/data/_shared-content-types-global.md)]

This explains **System Content-Types**. For an overview check out [](xref:Basics.Data.Index).

---

## What is an System Content-Type?

**System Content-Types** are built-in [Content-Types](xref:Basics.Data.ContentTypes.Index) which are defined in the 2sxc/EAV installation. 
These are internal Content-Types which are used to configure Fields, Data-Sources etc. 

* They can only be used in every App
* They are _not_ included upon export/import as they will also exist in the target system
* These Content-Types are stored in the [File system](xref:Basics.Data.ContentTypes.FileStorage)

## History

1. Introduced in 2sxc 1.0
1. Changed concept to [File Storage](xref:Basics.Data.ContentTypes.FileStorage) in 2sxc 10.0
