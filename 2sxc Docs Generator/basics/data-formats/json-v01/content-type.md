---
uid: Basics.DataFormats.JsonV1.ContentType
---
# JSON Content-Type V1

JSON based content-types are type-definitions which are stored as JSON. As of now we're using it to provide system-level types to the application (see [Concepts - file provided content-types](xref:Basics.Data.ContentTypes.FileStorage)) and for various automated testing. 

## Description

1. As of now, it's using a envolope to package everything and includes a minimal header to ensure we know it's [V1](xref:Basics.DataFormats.JsonV1.Index). 
1. It then contains a `ContentType` node containing 
   1. various identification and description
   1. optional [Content-Type Metadata](xref:Basics.DataFormats.JsonV1.Metadata)
   1. attributes (array) - often with [attribute Metadata](xref:Basics.DataFormats.JsonV1.Metadata)
1. note that the attribute order is relevant

## Example

This example is an extract of the Config Content-Type to manage the SqlDataSource (will be releasen in 2sxc 9.8 with more help-text etc.):

```json
{
  "_": { "V": 1 },
  "ContentType": {
    "Id": "|Config ToSic.Eav.DataSources.SqlDataSource",
    "Name": "|Config ToSic.Eav.DataSources.SqlDataSource",
    "Scope": "System",
    "Description": "todo",
    "Attributes": [
      {
        "Name": "Title",
        "Type": "String",
        "IsTitle": true,
        "Metadata": [
          {
            "Id": 0,
            "Version": 1,
            "Guid": "00000000-0000-0000-0000-000000000000",
            "Type": {
              "Name": "@All",
              "Id": "@All"
            },
            "Attributes": {
              "String": {
                "DefaultValue": { "*": "Sql Query" },
                "InputType": { "*": "string-default" }
              },
              "Boolean": { "VisibleInEditUI": { "*": true } }
            }
          }
        ]
      },
      {
        "Name": "ConnectionGroup",
        "Type": "Empty",
        "IsTitle": false,
        "Metadata": [
          {
            "Id": 0,
            "Version": 1,
            "Guid": "00000000-0000-0000-0000-000000000000",
            "Type": {
              "Name": "@All",
              "Id": "@All"
            },
            "Attributes": {
              "String": {
                "DefaultValue": { "*": "" },
                "InputType": { "*": "empty-default" }
              },
              "Boolean": { "VisibleInEditUI": { "*": true } }
            }
          }
        ]
      },
      {
        "Name": "ConnectionStringName",
        "Type": "String",
        "IsTitle": false,
        "Metadata": [
          {
            "Id": 0,
            "Version": 1,
            "Guid": "00000000-0000-0000-0000-000000000000",
            "Type": {
              "Name": "@All",
              "Id": "@All"
            },
            "Attributes": {
              "String": {
                "DefaultValue": { "*": "SiteSqlServer" },
                "InputType": { "*": "string-default" }
              },
              "Boolean": { "VisibleInEditUI": { "*": true } }
            }
          }
        ]
      },
      ...
      {
        "Name": "SelectCommand",
        "Type": "String",
        "IsTitle": false,
        "Metadata": [
          {
            "Id": 0,
            "Version": 1,
            "Guid": "00000000-0000-0000-0000-000000000000",
            "Type": {
              "Name": "@All",
              "Id": "@All"
            },
            "Attributes": {
              "String": {
                "DefaultValue": { "*": "/****** Script for SelectTopNRows command from SSMS  ******/\r\nSELECT TOP (1000) PortalId as EntityId, HomeDirectory as EntityTitle\r\n      ,[PortalID]\r\n      ,[ExpiryDate]\r\n      ,[AdministratorRoleId]\r\n      ,[GUID]\r\n      ,[DefaultLanguage]\r\n      ,[HomeDirectory]\r\n      ,[CreatedOnDate]\r\n      ,[PortalGroupID]\r\n  FROM [Portals]\r\n  Where ExpiryDate is null" },
                "InputType": { "*": "string-default" }
              },
              "Boolean": { "VisibleInEditUI": { "*": true } }
            }
          },
          {
            "Id": 0,
            "Version": 1,
            "Guid": "00000000-0000-0000-0000-000000000000",
            "Type": {
              "Name": "@string-default",
              "Id": "@string-default"
            },
            "Attributes": { "Number": { "RowCount": { "*": 10.0 } } }
          }
        ]
      }
      ...
    ],
    "Metadata": []
  }
}
```

## Details about the Format

The format is currently in version 1, and looks like this:

* `_` this is the header - containing the version, in case we introduce breaking changes in the future - see also [format v1](xref:Basics.DataFormats.JsonV1.Index)
* `ContentType` - this is the content-type
  * `Id` - internal identifier, also known as the [static name](xref:Basics.Data.ContentTypes.Names) - often a GUID
  * `Name` - a nicer [name](xref:Basics.Data.ContentTypes.Names)
  * `Scope` - a term which groups types together; mainly for hiding types the user should normally not see 
  * `Description` - a short description for internal use
  * `Attributes` [array]
    * [item]
      * `Name` - the field-name
      * `Type` - the primary type, like string, number, etc.
      * `Description` - a short description
      * `IsTitle` - is this the title field (there must always be one title field)
      * `Metadata` [array] with more information about this field/attribute - see [Metadata](xref:Basics.DataFormats.JsonV1.Metadata)
* Metadata [array] with more information about the content-type - see [Metadata](xref:Basics.DataFormats.JsonV1.Metadata)

## Specials about the JSON Content-Types

#### ID is not always a GUID

The ID is usually a GUID, but for special system types it is not. 
This is mostly historic, as all new content-types will have GUIDs, but old types still exist in the system which have a nice name, but that's not ideal for various use cases. 
This corresponds to the `StaticName` in the C# API.

#### Scope is Like a Virtual Group

The Scope is a name - usually System or something like that. 
It's primarily used to group types together, so that the editor doesn't have to see the ca. 50 types in the background which make the solution work. See [](xref:Basics.Data.Scopes)

#### Content Types Have Metadata

Content-types can have a lot of metadata - also mostly for the UI. 
An example is the help-text which is shown. 
This too is stored as normal JSON. See [](xref:Basics.DataFormats.JsonV1.Metadata).

#### Attributes Have Metadata

Each attribute - let's say a field "Color" has more information which is needed for scenarios like the edit-UI. 
These items are standard [Metadata](xref:Basics.DataFormats.JsonV1.Metadata).

#### Content Type Attributes must preserve Sort Order

This is important, as it's relevant to the UI.

## Limitations

As of now (2sxc 9.7) the system will pick up the content-types stored there and everything works. BUT there is no built-in mechanism to edit these. We (2sic) can easily create content-types in a normal 2sxc and export them to json for this purpose, but as of now there is no GUI to do so.

This should not affect you, as it's not meant to be managed by anybody else than us as of now. 

## Read also

* [](xref:Basics.DataFormats.JsonV1.Index)
* [](xref:Basics.Data.ContentTypes.FileStorage)
* [Blog post about json content-type definitions](https://2sxc.org/en/blog/post/deep-dive-json-content-type-definitions)


## History

1. Added in 2sxc 9.7
