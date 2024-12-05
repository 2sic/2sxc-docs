---
uid: Basics.Data.ContentTypes.Names
---

# Content-Type Names and StaticNames

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Content-Type Names**. For an overview check out [](xref:Basics.Data.Index).

---

## What is a Content-Type Name?

Each Content-Type has a **Name** which the admin gave it - something like `Person`. 
Internally there is another name called the **StaticName** and it's usually a GUID, something like `ad59b44d-41f2-4f02-9a68-dd914a98c19a`.

The **Name** can be changed at any time, but you'll have to update code which uses this name. 

The **StaticName** should never be changed, it's used internally and also necessary for [Shared Content-Types](xref:Basics.Data.ContentTypes.Shared)

## Special StaticNames used In Internal Types

Some older internal types have StaticNames which are _not_ a GUID. This is just a leftover from the old days, you should never do this yourself. 

## History

1. Introduced in 2sxc 1.0
