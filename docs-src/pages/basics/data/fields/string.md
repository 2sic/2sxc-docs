---
uid: Basics.Data.Fields.String
---
# Field Data Type: String

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **String Fields**. For an overview check out [](xref:Basics.Data.Index).

---


String data is a basic [data type](xref:Basics.Data.Fields.Index) and is very commonly used in many fields. It's used for any basic kind of text, be it a character, a single-line text or wysiwyg-content. 

## Features 
The basic **string** field doesn't have any features, since all the features are in the sub-types. 

## Sub-Types of String Fields

1. [string-default](xref:Basics.Data.Fields.String-Default) - simple one or multi-line inputs
1. [drop-down](xref:Basics.Data.Fields.String-Dropdown) for simple dropdowns
1. [drop-down-query](xref:Basics.Data.Fields.String-Dropdown-Query) for dropdowns which retrieve the data from a server
1. [wysiwyg](xref:Basics.Data.Fields.String-Wysiwyg)
1. [font-icon-picker](xref:Basics.Data.Fields.String-Font-Icon-Picker)
1. [url-path](xref:Basics.Data.Fields.String-Url-Path)

## Shared Settings

All string field types currently don't have shared settings. 

---

## Technical Information

### Storage in the SQL Database in the EAV-Model

This is simply stored as a string in the DB.

## Storage in the SQL Database in the JSON-Model

This is simply stored as a JSON string.

[!include["Note-Null"](./notes-null.md)]

## Read also

* [](xref:Tut.RazorBlade.Text.Has)
* [](xref:Tut.RazorBlade.Text.First)

## History

1. Introduced in EAV 1.0 / 2sxc 1.0
2. Changed in EAV 3.0 / 2sxc 6.0 (it used to have many configuration fields for all kinds of uses, which were then moved to sub-types)
3. Enhanced in 12.02 to show old, invisible configuration which may still have an effect and allow copy/purge