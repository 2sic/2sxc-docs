---
uid: Basics.DataFormats.JsonV1.Value
---

# JSON Value (Multilanguage) V1

JSON based entities are items which are stored as JSON. This is used in the history, in dynamic-entities in the DB and more. 

Attributes/Properties have one or move values depending on how they are translated, so the Value is always an Dictionary (object of keys/values). 

## Example

This example is showing part of a JSON. Most of it has been removed to just focus on the values:

```json
{
  "_": {
    "V": 1
  },
  "Entity": {
    "//1": "Stuff skipped in this example",
    "Attributes": {
      "String": {
        "Description": {
          "*": "Retrieve full list of all zones"
        },
        "Name": {
          "en-US": "Zones",
          "de-DE": "Zonen"
        },
    },
    "//2": "More stuff skipped for this example"
  }
}
```

## Value Format Explained

* `_` (header) mainly storing the version, in case we have to introduce a breaking change - see also [format v1](xref:Basics.DataFormats.JsonV1.Index)
* `Entity` - this marks an entity - at the moment a json package should only have 1, but later it could contain more
  * `Attributes` - the values of this entity
    * `String` - all the string values; _optional, only exists if there are string values_
      * [the field name]
        * [the languages this value applies to]
          * [the value]
        * [more languages / values]
      * [more fields / languages / values]
    * [next type] - all the boolean values; _optional, only exists if there are boelean values_

## Language Codes

The keys of the dictionary determine what language is used and how. 

* if the key is `*` then this value applies to all languages
* if the key is a culture code like `en-us` (always lower case) it applies to that language
* if the value is shared with multiple languages you'll see keys like `en-us,de-de`
* if the value is shared but read-only in some languages the read-only-languages are prefixed with a `~` so you'll see `en-us,~de-de`

This can of course extend over many languages, so keys like `en-us,de-de,de-ch,~ar-ae` are valid.

## Entity Relationship Fields

Note that entity-relationship fields cannot be multi-language, so it's always mapped to `*` and contains an array of references:

```json
{
  "_": { "V": 1 },
  "Entity": {
    "//1": "Stuff skipped in this example",
    "Attributes": {
      "String": { "Name": { "en-us": "Street" } },
      "Entity": {
        "Calculations": { "*": [] },
        "Errors": { "*": [] },
        "Warnings": { "*": [] }
      }
    },
    "//2": "More stuff skipped for this example"
  }
}
```

## Read also

* [](xref:Basics.DataFormats.JsonV1.Index)
* [Blog post about the entity json format](https://2sxc.org/en/blog/post/deep-dive-json-stored-content-items-entities)

## History

1. Added in 2sxc 9.4