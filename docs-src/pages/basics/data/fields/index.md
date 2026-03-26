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

* [Boolean](xref:Basics.Data.Fields.Boolean){title="icon:toggle-on"}
  basic true/false or yes/no values
* [Custom](xref:Basics.Data.Fields.Custom){title="icon:braces"}
  a JSON data type for GPS and other JSON data
* [DateTime](xref:Basics.Data.Fields.DateTime){title="icon:calendar"}
  for dates and times
* [Empty](xref:Basics.Data.Fields.Empty){title="icon:minus"}
  a UI-only field for things like grouping fields together under a title
* [Entity](xref:Basics.Data.Fields.Entity){title="icon:link"}
  an item-picker field to choose existing items, for relationships between items - like a book to the author or a blog-post to tags
* [Hyperlink](xref:Basics.Data.Fields.Hyperlink){title="icon:link-45deg"}
  a special string with helper objects which resolve "file:72" to the real link
* [Number](xref:Basics.Data.Fields.Number){title="icon:123"}
  for any kind of number like 1, 2, 3 or with decimals
* [String](xref:Basics.Data.Fields.String){title="icon:font"}
  for string types or when your other options don't fit

## History

1. Almost all types were introduced in EAV 1.0 2sxc 1.0
2. Changed continously - most of it in EAV 2-4 which matches 2sxc 4, 6 and 9