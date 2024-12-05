---
uid: Basics.DataFormats.JsonV1.Assets
---

# JSON Assets V1

JSON Data can include Assets. This is currently only used for export/import of [Views](xref:Basics.App.Views.Index)

## Assets

The `Assets` is optional on the [Entity](xref:Basics.DataFormats.JsonV1.Entity) node. It looks like this:

* `Assets` array, _optional_
  * asset object 1
    * `Storage`: "app"
    * `Name`: "some file name"
    * `Folder`: "DefaultTemplates" (location in the storage)
    * `File`: "string containing the file"
  * asset object 2
    * ...

Note that in a view, typically it will export both the template file and the icon used.

## Example of an Exported View with Template file

```json
{
  "_": { "V": 1 },
  "Entity": {
    "Id": 3770,
    "Version": 1,
    "Guid": "56104398-8301-4d67-9d14-168639cc7dc8",
    "Type": { "Name": "2SexyContent-Template", "Id": "2SexyContent-Template" },
    "Attributes": {
      "String": {
        "ContentTypeStaticName": {
          "*": "e2351b42-87f2-427e-9566-ff271e3e5a9f"
        },
        "ListContentTypeStaticName": { "*": "" },
        "ListPresentationTypeStaticName": { "*": "" },
        "Location": { "*": "Host File System" },
        "Name": { "*": "Branding" },
        "Path": { "*": "DefaultTemplates\\_Branding.cshtml" },
        "PresentationTypeStaticName": { "*": "" },
        "StreamsToPublish": { "*": "" },
        "Type": { "*": "C# Razor" },
        "ViewNameInUrl": { "*": "" }
      },
      "Entity": {
        "ContentDemoEntity": { "*": ["9d49e41c-1f4f-448d-88c6-df6ab4064d0b"] },
        "ListContentDemoEntity": { "*": [] },
        "ListPresentationDemoEntity": { "*": [] },
        "Pipeline": { "*": [] },
        "PresentationDemoEntity": { "*": [] }
      },
      "Boolean": {
        "IsHidden": { "*": false },
        "PublishData": { "*": false },
        "UseForList": { "*": false }
      }
    },
    "Assets": [
      {
        "Storage": "app",
        "Name": "_Branding.cshtml",
        "Folder": "DefaultTemplates",
        "File": "<div class=\"sc-element\">\r\n@Html.Raw(Content.Toolbar)\r\n<div id=\"Branding\">@Content.Title</div>\r\n<div id=\"Slogan\">@Html.Raw(Content.Slogan)</div>\r\n</div>"
      }
    ]
  }
}
```

## Read also

* [](xref:Basics.DataFormats.JsonV1.Index)
* [Blog post about the entity json format](https://2sxc.org/en/blog/post/deep-dive-json-stored-content-items-entities)

## History

1. Added in 2sxc v11.10
