---
uid: Basics.DataFormats.JsonV1.Entity
---

# JSON Entity V1

JSON based entities are items which are stored as JSON. This is used in the history, in dynamic-entities in the DB and more. 

## Description

1. As of now, it's using a envolope to package everything and includes a minimal header to ensure we know it's [V1](xref:Basics.DataFormats.JsonV1.Index). 
2. It then contains an `Entity` node containing 
   1. various identification and description
   1. attributes / properties
   1. optional [Entity Metadata](xref:Basics.DataFormats.JsonV1.Metadata)
   1. optional [Assets](xref:Basics.DataFormats.JsonV1.Assets)

## Example
This example is an extract of the Config Content-Type to manage the SqlDataSource (will be releasen in 2sxc 9.8 with more help-text etc.):

```json
{
    "_": {
        "V": 1
    },
    "Entity": {
        "Id": 42900,
        "Version": 6,
        "Guid": "e8a702d2-eccd-4b0f-83bd-600d8a8449d9",
        "Type": {
            "Name": "DataPipeline",
            "Id": "DataPipeline"
        },
        "Attributes": {
            "String": {
                "Description": {
                    "*": "Retrieve full list of all zones"
                },
                "Name": {
                    "*": "Zones"
                },
                "StreamsOut": {
                    "*": "ListContent,Default"
                },
                "StreamWiring": {
                    "*": "3cef3168-5fe8-4417-8ee0-c47642181a1e:Default>Out:Default"
                },
                "TestParameters": {
                    "*": "[Module:ModuleID]=6936"
                }
            },
            "Boolean": {
                "AllowEdit": {
                    "*": true
                }
            }
        },
        "Owner": "dnn:userid=1",
        "Metadata": [

        ]
    }
}
```

## Format Explained

* `_` (header) mainly storing the version, in case we have to introduce a breaking change - see also [format v1](xref:Basics.DataFormats.JsonV1.Index)
* `Entity` - this marks an entity - at the moment a json package should only have 1, but later it could contain more
  * `Id` - the identity as a number
  * `Guid` - the identity guid as a string
  * `Type` - type information object
    * `Name` - the type [name](xref:Basics.Data.ContentTypes.Names)
    * `Id` - the type identity ([Static Name](xref:Basics.Data.ContentTypes.Names)) as a string. It's usually a guid, but special types can also use a specific string
  * `Attributes` - the values of this entity
    * `String` - all the string values; _optional, only exists if there are string values_
      * [the field name] - an object containing languages/values, see [JSON Values](xref:Basics.DataFormats.JsonV1.Value)
        * [language code]: [value]
        * [language code]: [value]
      * [more fields / languages / values]
    * `Boolean` - all the boolean values; _optional, only exists if there are boelean values_
    * `Number` - all numbers; _optional, only exists if there are number values_
    * [more types]
  * `Owner` a special string identifying the owner of this item
  * `Metadata` (optional, array of more entities) - a list of Entities which further describe this Entity - see [](xref:Basics.DataFormats.JsonV1.Metadata)
    * [item 1]
      * `Id`
      * `Guid`
      * [more properties]
    * [next items]
  * `For` object _optional_, metadata target reference - see [](xref:Basics.DataFormats.JsonV1.Metadata)
  * `Assets` object _optional_ for including template files in View-exports - see [](xref:Basics.DataFormats.JsonV1.Assets)


## All Attributes are Grouped by Type

Because JSON is itself a very loose data-format, and certain types like dates are not auto-detectable, we decided to have the type-specification as a first-class citizen in the format. This allows for automatic, reliable type-checking when materializing objects. 


## Values and Languages

👉 [](xref:Basics.DataFormats.JsonV1.Value)

## Metadata

👉 [](xref:Basics.DataFormats.JsonV1.Metadata)


## Read also

* [](xref:Basics.DataFormats.JsonV1.Index)
* [Blog post about the entity json format](https://2sxc.org/en/blog/post/deep-dive-json-stored-content-items-entities)

## History

1. Added in 2sxc 9.4
1. Extended to support attachments so Views can include templates and icons in 2sxc ca. v11.10