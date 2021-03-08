---
uid: Basics.Data.Fields.Index
---
# Field / Value Data Types



The EAV (Entity-Attribute-Value) system and 2sxc is all about data. The data in the Attributes (aka Fields, Properties) are have a _Type_ This **Value-Type** or **Data-Type** describes how data is stored (persisted) in various formats (SQL, JSON, XML) and how it's used in code (C#, JavaScript, Tokens, Angular, ...). 

## Data Types in EAV/2sxc 10

1. [Boolean](xref:Specs.Data.Values.Boolean) - basic true/false or yes/no values
1. [Custom](xref:Specs.Data.Values.Custom) - a JSON data type for GPS and other JSON data
1. [DateTime](xref:Specs.Data.Values.DateTime) - for dates and times
1. [Empty](xref:Specs.Data.Values.Empty) - a UI-only field for things like grouping fields together under a title
1. [Entity](xref:Specs.Data.Values.Entity) - an item-picker field to choose existing items, for relationships between items - like a book to the author or a blog-post to tags
1. [Hyperlink](xref:Specs.Data.Values.Hyperlink) - a special string with helper objects which resolve "file:72" to the real link
1. [Number](xref:Specs.Data.Values.Number) - for any kind of number like 1, 2, 3 or with decimals
1. [String](xref:Specs.Data.Values.String) - for string types or when you other options don't fit

## General Settings for all Fields

[@All](xref:Specs.Data.Inputs.All) is not a field-type, but contains core information about a field like name, help-text and more. Every field has these configurations. 


## History

1. Almost all types were introduced in EAV 1.0 2sxc 1.0
2. Changed continously - most of it in EAV 2-4 which matches 2sxc 4, 6 and 9