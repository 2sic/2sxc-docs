---
uid: Basics.DataFormats.Json.SysSettings.Index
---

# SysSettings JSON Data Formats - WIP!

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .format-json-headless { visibility: visible; } </style>

Internally there are a few cases where an object needs some special configuration which are called `SysSettings`.
Examples:

* The `App` object has a `SysSettings` which is used to control sharing across sites
* Attributes (Fields/Properties) are planned to have `SysSettings` to control sharing their configuration WIP

## App SysSettings

This is not documented ATM, you'll need to check the code


## Attribute SysSettings WIP

_This is based on new features we're working on as of 2023-10 - it's really not final!_

### Purpose

Our goal is to enable central attribute definitions.
This will allow a content-type to specify all attributes incl. configuration and help texts.
Other ContentTypes can then have fields which share the definition of the original.

### Challenges

### Sharing

* Mark attributes which are meant for sharing (to ensure only these are shared)
* Restrict how far the sharing goes - to better restrict what is possible and to avoid unwanted side-effects (eg. current App only)
* Possibly restrict what parts are shared / can be inherited

Probably minimal setup for sharing:

```jsonc
{
  "Share": true
}
```

Future: Probably advanced setup for sharing outside of current App

```jsonc
{
  "Share": true, // required for sharing
  // The following are currently not implemented
  "ShareRestriction": "Site", // optional, restrict sharing to this level, optional, defaults to "Scope" = "Current App, Current Scope"
  "ShareOnly": "Metadata", // optional, by default everything that can be shared is shared, this would restrict it to only share the metadata
}
```

### Inheriting

* Mark Attributes to indicate that their identity is the the **same as another field**
* Mark Attributes to indicate they inherit something (eg. the Metadata)
* Possibly exact control over what is inherited (eg. all specs, only certain specs etc.)
* Possibly inherit from multiple attributes (eg. `MyField` inherits label from `MyFieldBase` and Formulas from `MyFieldBase2`)

#### Inherit Metadata / Configuration of another Field

Most common version of inherit (inherits all metadata of a shared field, nothing else)

```jsonc
{
  "InheritMetadataOf": "0fc6d925-77df-4ccc-80dd-5d9ddaf003c9", // inherit all metadata from this field
}
```

#### WIP - Preserve minimal features of own Metadata

Prototyping...

```jsonc
{
  "InheritMetadataOf": "00000000-0000-0000-0000-000000000000/@All/Name,0fc6d925-77df-4ccc-80dd-5d9ddaf003c9",
}
```


#### Future: Complex Metadata inheritance

```jsonc
{
  "InheritMetadataOf": "0fc6d925-77df-4ccc-80dd-5d9ddaf003c9,0fc6d925-77df-4ccc-80dd-5d9ddaf003c9/@UiFormulas,0fc6d925-77df-4ccc-80dd-5d9ddaf003c9/@All,0fc6d925-77df-4ccc-80dd-5d9ddaf003c9/-@All",
}
```

Note WIP - the long string on `inheritMetadataOf` is a string version of the following rules.
Reason we're just using a string is to keep things simple in the final format.

* `0fc6d925-77df-4ccc-80dd-5d9ddaf003c9` - inherit all metadata from this field
* `0fc6d925-77df-4ccc-80dd-5d9ddaf003c9/@UiFormulas` - inherit the @UiFormulas metadata from this field
* `0fc6d925-77df-4ccc-80dd-5d9ddaf003c9/@All` - inherit the @All metadata from this field
* `0fc6d925-77df-4ccc-80dd-5d9ddaf003c9/-@All` - inherit the metadata _except_ @All from this field

#### Future: Other Inheritance in Consideration

```jsonc
{
  "Inherit": "0fc6d925-77df-4ccc-80dd-5d9ddaf003c9", // inherit identity and from the field with this guid
  "InheritName": true, // would enforce the name to match the original in code/APIs no matter what name is manually set
  "InheritMetadata": true, // inherit all metadata from this field
}
```


---

## History

* Initial experiments v16.07.01 2023-10-27
