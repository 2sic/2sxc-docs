---
uid: Basics.DataFormats.Json.WebApi.Index
---

# JSON Data Format used in WebAPI calls (technical)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .format-json-headless { visibility: visible; } </style>

When reading or writing data to/from the [Headless WebAPI](xref:WebApi.Headless.Index) the data format used is JSON. Here are the basics:

## Read Single Item is Super-Simple JSON

Here's an example of a `BusinessUnit` item:

```json
{
  "Name": "Web",
  "Description": "<p>We create websites!</p>",
  "Id": 19403,
  "Guid": "1252c52c-30e4-4c9f-8d45-e094160ca251",
  "Title": "Web",
  "Modified": "2021-02-25T20:32:52.94Z",
  "Created": "2021-02-18T20:47:58.827Z"
}
```

Some notes

1. All the value fields have their real names, usually uppercase as that's how the fields are typically named
1. A few internal fields are also included
    1. `Id` (int)
    1. `Title` (string)
    1. `Modified` (date)
    1. `Created` (date)
    1. `Guid` (string with GUID) - this is only supplied on queries or if the REST API requests includes a `?includeGuid=true`
1. Dates are transferred as strings, using the international ISO format
1. Html strings contain the real html

## Read Lists: Arrays of Items

```json
[
  {
    "Name": "Web",
    "Description": "<p>We create websites!</p>",
    "Id": 19403,
    "Guid": "1252c52c-30e4-4c9f-8d45-e094160ca251",
    "Title": "Web",
    "Modified": "2021-02-25T20:32:52.94Z",
    "Created": "2021-02-18T20:47:58.827Z"
  },
  {
    "Name": "Dev",
    "Description": "<p>Our development unit</p>",
    "Id": 19404,
    "Guid": "c89cb53b-0f7b-441a-9e6c-5467dd9322e9",
    "Title": "Dev",
    "Modified": "2021-02-25T18:02:52.327Z",
    "Created": "2021-02-18T20:47:58.827Z"
  },
  {
    "Name": "Eff",
    "Description": "<p>Everything regarding efficiency - like <a href=\"https://sphosting.ch\" target=\"_blank\" rel=\"noopener\">SharePoint</a>, Word &amp; Excel automation, <a href=\"https://azing.org\" target=\"_blank\" rel=\"noopener\">azing.org</a></p>",
    "Id": 19405,
    "Guid": "fa4a1de9-adf5-4e1d-ab70-63281b3e797b",
    "Title": "Eff",
    "Modified": "2021-02-25T18:03:12.84Z",
    "Created": "2021-02-18T20:47:58.827Z"
  }
]
```

## Write / PUT has the Same Data Format

To create data or update it, use the identical format. Some notes:

1. When creating, the ID must be blank (otherwise an update is assumed)
1. When creating, the Guid is usually blank and will be generated automatically (see special notes below)



## Special System Properties when Saving

When creating or updating data, there are some system properties you can also set, which affect how things are saved

### `EntityGuid` on Create (ca. v8)

You can provide an `EntityGuid` if necessary, for example when other code needs to know the Guid before creating. 
This would then be saved and returned on the Guid property on the next call.


### `PublishState` Controls Publishing (v13.03)

If you set the property `PublishState` it can have these values and effects:

* `null` or `""` will save new as is preset by permissions; on update it will leave the existing state unchanged
* `true`, `"true"`, `1` will always set the published to true (if permissions allow)
* `false`, `"false"`, `0` will alwyays set published to false
* `"draft"` will set published to false; if it's an update and there was a published one before, that will remain published


### `For` Determines Metadata-Target (ca. v11)

`For` can contain metadata headers to anchor this item to another thing. Will only affect new data, and be ignored on updates. 

This is the schema of this object

```js
{
  TargetType: int; // one of known target types
  Number?: number; // Key if it's a number key
  String?: string; // Key if it's a string ey
  Guid?: string;   // Guid if it's a GUID key
}
```

Note that you must provide one of the keys, othewise it will fail. 

* See also [](xref:Basics.Metadata.TargetTypes)
* See also [](xref:Api.Js.SxcJs.SxcData)


### `ParentRelationship` Adds Item to a Parent (v13.03)

If your data has a property `ParentRelationship` with these fields:

1. `Parent` - a GUID to the parent
1. `Field` - the name of the field it should be added to (must be an entity-field)
1. `Index` - the location it should be added to in that field which is a list of items

Then upon creating the new item, it will also be added to that parent and it's list of items. 


## Read / Write Multi-Language Data

This does not exist yet as a simple REST API but is a planned feature for 2022. For now, create your own WebApi if you need this.

---

## History

* REST API added ca. v7 on the path `/app/content`
* Ability to also set `EntityGuid` added ca. v8
* `For` feature added ca. v11
* primary path changed to `/app/data/`
* `PublishState` added v13.03
* `ParentRelationship` added v13.03