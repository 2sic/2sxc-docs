---
uid: Basics.Data.Fields.Index
---
# Content-Type Fields

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Content-Type Fields**. For an overview check out [](xref:Basics.Data.Index).

---


The EAV (Entity-Attribute-Value) system and 2sxc is all about data. The data in the Attributes (aka Fields, Properties) are have a _Type_ This **Value-Type** or **Data-Type** describes how data is stored (persisted) in various formats (SQL, JSON, XML) and how it's used in code (C#, JavaScript, Tokens, Angular, ...). 

## General Settings for all Fields

[General Settings](xref:Basics.Data.Fields.GeneralSettings) contain core information about a field like name, help-text and more. Every field has these configurations. 

## Field Types

These are the core **Field-Types**. Each may have one or more **Input-Types**.

1. [Boolean](xref:Basics.Data.Fields.Boolean) - basic true/false or yes/no values
1. [Custom](xref:Basics.Data.Fields.Custom) - a JSON data type for GPS and other JSON data
1. [DateTime](xref:Basics.Data.Fields.DateTime) - for dates and times
1. [Empty](xref:Basics.Data.Fields.Empty) - a UI-only field for things like grouping fields together under a title
1. [Entity](xref:Basics.Data.Fields.Entity) - an item-picker field to choose existing items, for relationships between items - like a book to the author or a blog-post to tags
1. [Hyperlink](xref:Basics.Data.Fields.Hyperlink) - a special string with helper objects which resolve "file:72" to the real link
1. [Number](xref:Basics.Data.Fields.Number) - for any kind of number like 1, 2, 3 or with decimals
1. [String](xref:Basics.Data.Fields.String) - for string types or when you other options don't fit




## History

1. Almost all types were introduced in EAV 1.0 2sxc 1.0
2. Changed continously - most of it in EAV 2-4 which matches 2sxc 4, 6 and 9