---
uid: Basics.Data.Fields.Number
---

# Field Data Type: Number

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Number Fields**. For an overview check out [](xref:Basics.Data.Index).

---

Number data is a basic [data type](xref:Basics.Data.Fields.Index) and is for any kind of number 1,2,3 or very detailed numbers like 47.020503020400203 which are common in GPS coordinates. 


## Features

The basic **number** field doesn't have any features, since all the features are in the sub-types. 

## Sub-Types of Empty Fields

1. [number-default](xref:Basics.Data.Fields.Number-Default) - is the input field for any kind of numbers like simple numbers, numbers with decimal-digits or very detailed numbers like 47.020503020400203 which are common in GPS coordinates.
1. [drop-down](xref:Basics.Data.Fields.Number-Dropdown) for simple number dropdowns

## Shared Settings

Don't have shared settings.


--- 

## Technical Information

### Storage in the SQL Database in the EAV-Model

This is converted to a string when stored as a string in the DB, and converted back to a boolean when the data is loaded. 

## Storage in the SQL Database in the JSON-Model

This is simply stored as a number in json.

[!include["Note-Null"](./notes-null.md)]

## History
1. Introduced in EAV 1.0 2sxc 1.0