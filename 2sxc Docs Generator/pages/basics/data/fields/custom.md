---
uid: Basics.Data.Fields.Custom
---

# Field Data Type: Custom

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Custom Fields**. For an overview check out [](xref:Basics.Data.Index).

---


Custom data is a basic [data type](xref:Basics.Data.Fields.Index). It's used to store JSON for special use cases. 


## Sub-Types

* [custom-gps](xref:Basics.Data.Fields.CustomGps)
* `custom-json`

## Recommendation

Since 2sxc 10 there is a special `AsDynamic` which you can use to work with JSON data in Razor templates.


--- 

## Technical Information

### Storage in the SQL Database in the EAV-Model
This is converted to a string when stored as a string in the DB, and converted back to a boolean when the data is loaded. 

### Storage in the SQL Database in the JSON-Model
This is simply stored as a string value in json, so kind of JSON in JSON.

## History

1. Introduced in EAV 1.0 2sxc 1.0