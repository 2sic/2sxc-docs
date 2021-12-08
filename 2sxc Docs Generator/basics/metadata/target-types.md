---
uid: Basics.Data.Metadata.TargetTypes
---

<img src="~/assets/features/metadata.svg" class="feature">

# Metadata Target Types

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata** is Data which describes or adds information _to other data_. For this to work, Entities which are Metadata store the ID of the **Target**. In addition, they must know what **Target Type** this ID describes, because an ID like 20503 could be in use in many systems. 

The **Target Type** is a simple number and all known Target-Types are stored in the SQL-Database. Any Target-Type number from 1-100 are reserved for 2sxc/EAV predefined types, any number above 100 you can define yourself for your use case. 

## Reserved / Built-In Target-Types

The following list are internally reserved Target-Types

1. Anything with 1 (or 0) is defined as not being Metadata
2. Attribute/Property Metadata - key should be number
3. App Metadata - key should be number (AppId)
4. Entity-Metadata - key should be guid of entity
5. Content-Type Metadata - key should be string static-name
6. Zone Metadata - not used ATM
7. Reserved
8. Reserved
9. Reserved
10. CMS-Object (like `file:72` or `page:42`) - key should be string
11. 11-100 are reserved
12. 101+ is free to define for your own purpose

See also

* [](xref:ToSic.Eav.Metadata.TargetTypes)

## Custom Target Types

You can easily add custom types as you need them in the SQL database yourself. 
Just make sure your type-id is greater than 100.

---

## History

1. Introduced in 2sxc v2
1. The 100 top numbers reserved for 2sxc in 2sxc v5
