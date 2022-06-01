---
uid: Basics.Data.Fields.DateTime
---

# Field Data Type: DateTime

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **DateTime Fields**. For an overview check out [](xref:Basics.Data.Index).

---


DateTime data is a basic [data type](xref:Basics.Data.Fields.Index) and is used for dates and/or time values.  

## Features 

The basic **datetime** field doesn't have any features, since all the features are in the sub-types. 

## Sub-Types of DateTime Fields

1. [datetime-default](xref:Basics.Data.Fields.DateTime-Default) - simple date and/or time input field (basic datepicker and/or timepicker)

## Shared Settings

Don't have shared settings.

---

## Technical Information

### Storage in the SQL Database in the EAV-Model

This is converted to a string when stored as a string in the DB, and converted back to a .net DateTime when the data is loaded. 

### Storage in the SQL Database in the JSON-Model

This is stored as a string-value in json using the standard ISO format, as there is no official format for dates or times in JSON.

[!include["Note-Null"](./notes-null.md)]


## History

1. Introduced in EAV 1.0 2sxc 1.0