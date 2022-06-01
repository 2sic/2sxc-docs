---
uid: Basics.Data.ContentTypes.SqlStorage
---

# SQL-Stored Content-Types 

[!include["Data"](../../_shared-content-types-app.md)]

This section explains **SQL-Stored Content-Types**. For an overview check out [](xref:Basics.Data.Index).

---

Usually [Content-Types](xref:Basics.Data.ContentTypes.Index) are stored in the database as part of the App they were defined in. 

This is how they are stored:

1. A table contains the primary entry with `StaticName` (usually a GUID) and the nice `Name` - the one you give it.
1. Other tables list the fields of this Content-Type and assigns them to the Type
1. Description of the Content-Type is Metadata - so it's also a multi-lingual Entity which is stored in the App
1. Descriptions of the Fields are also Metadata - so it's also a multi-lingual Entity which is stored in the App

## Nice to Know

1. For advanced scenarios you can also [share Content-Types across Apps](xref:Basics.Data.ContentTypes.Shared)
1. In even more advanced scenarios you can use [file based Content-Types](xref:Basics.Data.ContentTypes.FileStorage)

## History

1. Added in 2sxc 1.0

