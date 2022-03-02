---
uid: Basics.DataFormats.JsonV1.Metadata
---

# JSON Metadata V1

JSON Data can

1. **be Metadata** for something. The target reference is stored in the `For` object.
1. **have Metadata** which is stored in the `Metadata` object.

👉 Read more about [Metadata](xref:Basics.Metadata.Index).


## For Information

The `For` is optional and is only specified if this entity is Metadata for something. It gives it the target Reference. 

This is the structure of the `For` object

  * `For` object _optional_, metadata target reference
    * `Target` - string name describing the target type as the name is specified in the DB. We don't use the number but the string, in case the number is different on another system
    * `Number` - the number key _optional, only if the key is a number_
    * `String` - the string key _optional, only if the key is a string_
    * `Guid` - the guid key _optional, only if the key is a guid_

**Example of a Field-Metadata**

```json
{
  "_": { "V": 1 },
  "Entity": {
    "Id": 423,
    "Version": 1,
    "Guid": "82bdcdc9-ff37-40e5-8a5c-340a7864c325",
    "Type": { "Name": "@All", "Id": "@All" },
    "Attributes": {
      "String": { "Name": { "*": "Street" } },
      "Entity": {
        "Calculations": { "*": [] },
        "Errors": { "*": [] },
        "Warnings": { "*": [] }
      }
    },
    "For": { "Target": "EAV Field Properties", "Number": 244 }
  }
}
```

## Metadata Items

If something _has_ Metadata, it will be included in the `Metadata` object. This is an array. The Metadata items are built just like an [Entity](xref:Basics.DataFormats.JsonV1.Entity) except that it cannot have a `For` - since the target is already defined. 

**Example - Extract of a Content-Type with Fields having Metadata**

```json
{
  "_": { "V": 1 },
  "ContentType": {
    "Id": "3de8e971-9e76-4d77-beda-f754e7b056bd",
    "Name": "Content with Preview",
    "Scope": "2SexyContent",
    "Description": "Content with Preview",
    "Attributes": [
      {
        "Name": "Title",
        "Type": "String",
        "InputType": "string-default",
        "IsTitle": true,
        "Metadata": [
          {
            "Id": 447,
            "Version": 1,
            "Guid": "859745e4-6064-45f1-b96e-35226f6505e9",
            "Type": { "Name": "@All", "Id": "@All" },
            "Attributes": {
              "String": { "Name": { "*": "Title" } },
              "Entity": {
                "Calculations": { "*": [] },
                "Errors": { "*": [] },
                "Warnings": { "*": [] }
              }
            }
          }
        ]
      },
      {
        "Name": "Body",
        "Type": "String",
        "InputType": "string-wysiwyg",
        "IsTitle": false,
        "Metadata": [
          {
            "Id": 448,
            "Version": 1,
            "Guid": "f887914e-371b-4c2c-862d-1ad572a9ce5a",
            "Type": { "Name": "@All", "Id": "@All" },
            "Attributes": {
              "String": {
                "DefaultValue": { "*": "<p> </p>" },
                "Name": { "*": "Body" },
                "Notes": { "*": "" }
              },
              "Entity": {
                "Calculations": { "*": [] },
                "Errors": { "*": [] },
                "Warnings": { "*": [] }
              },
              "Boolean": {
                "Required": { "*": false },
                "VisibleInEditUI": { "*": true }
              }
            }
          },
          {
            "Id": 449,
            "Version": 1,
            "Guid": "6a01df48-483e-471e-a4a9-3b7c760bbe44",
            "Type": { "Name": "@String", "Id": "@String" },
            "Attributes": {
              "String": {
                "DropdownValues": { "*": "" },
                "InputType": { "*": "wysiwyg" }
              },
              "Number": { "RowCount": { "*": 1.0 } }
            }
          }
        ]
      },
    ],
    "Metadata": []
  }
}
```

## Special note about `Target`

In all long-term uses of Metadata (like for export/import or in item history) the target is a string. 
In short-term use like simple WebAPI calls the Target can be the number. 

## Read also

* [](xref:Basics.DataFormats.JsonV1.Index)
* [Blog post about the entity json format](https://2sxc.org/en/blog/post/deep-dive-json-stored-content-items-entities)

## History

1. Added in 2sxc 9.4
