---
uid: Basics.Data.Metadata.TargetTypes
---

# Metadata Target Types

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata** is Data which describes or adds information _to other data_. For this to work, Entities which are Metadata store the ID of the **Target**. In addition, they must know what **Target Type** this ID describes, because an ID like 20503 could be in use in many systems. 

The **Target Type** is a simple number and all known Target-Types are stored in the SQL-Database. Any Target-Type number from 1-100 are reserved for 2sxc/EAV predefined types, any number above 100 you can define yourself for your use case. 

## Reserved / Built-In Target-Types

The following list are internally reserved Target-Types

1. Anything with 1 (or 0) is defined as not being Metadata
2. Attribute Metadata
3. App Metadata
4. Entity-Metadata
5. Content-Type Metadata
6. Zone Metadata
8. Reserved
9. Reserved
10. CMS-Object (like `file:72` or `page:42`)
11. 11-100 are reserved

## Custom Target Types

You can easily add custom types as you need them in the SQL database yourself. 

---

## History

1. Introduced in 2sxc v2
1. The 100 top numbers reserved for 2sxc in 2sxc v5
