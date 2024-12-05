---
uid: Basics.Metadata.TargetTypes
---

<img src="~/assets/features/metadata.svg" class="feature">

# Metadata Target Types

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
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
6. Zone Metadata
7. Scope Metadata
8. Dimension (Language) Metadata
9. Reserved
10. CMS-Item (like `file:72` or `page:42`) - key should be string
11. System Metadata
12. Site Metadata
13. Reserved
14. Page Metadata
15. Reserved
16. Module Metadata
17. Reserved
18. User Metadata
19. `19`-`89` are Reserved
90. `90` Custom Metadata target - for your most common custom target that only you care about
91. `91` Custom1 - additional custom target for your own use, only your app cares about this
92. `92` Custom2 - ...
93. `93` Custom3
94. `94` Custom4
95. `95` Custom5
96. `96` Custom6
97. `97` Custom7
98. `98` Custom8
99. `99` Custom9
100. `100` Reserved
101. `101`+ is free to define for your own purpose, but ATM you probably shouldn't use them

See also

* [](xref:ToSic.Eav.Metadata.TargetTypes)

## Custom Target Types

You can easily add custom types as you need them in the SQL database yourself. 
Just make sure your type-id is greater than 100.

---

## History

1. Introduced in 2sxc v2
1. The 100 top numbers reserved for 2sxc in 2sxc v5
