---
uid: Basics.Data.Fields.Boolean
---

# Field Data Type: Boolean

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Boolean Fields**. For an overview check out [](xref:Basics.Data.Index).

---


## The Boolean Data Type

Boolean data is a basic [data type](xref:Basics.Data.Fields.Index) and is for `yes`/`no`, `true`/`false`, `1`/`0` values. 

It can also contain `null` values. 

## Features

The basic **boolean** field doesn't have any features, since all the features are in the sub-types. 


## Configuration

Every boolean field can be configured to have special labels shown in each state.


## Input-Types of Boolean Fields

1. [boolean-default](xref:Basics.Data.Fields.Boolean-Default) - simple on/off input field
1. [boolean-tristate](xref:Basics.Data.Fields.Boolean-Tristate) on/off with optional null (not-defined)


--- 

## Technical Information

### Storage in the SQL Database in the EAV-Model

This is converted to a string when stored as a string in the DB, and converted back to a boolean when the data is loaded. 

### Storage in the SQL Database in the JSON-Model

This is simply stored as a `true`, `false` or `null` in json.

[!include["Note-Null"](./notes-null.md)]

> A common shorthand to work with nulls is the `??` operator: `@(Content.IsAdult ?? false)`


> Another common use is to check for `true`.
> So instead of `@if(Content.IsAdult) {...}`
> Use `if(Content.IsAdult == true) {...}`


## History

1. Introduced in EAV 1.0 2sxc 1.0