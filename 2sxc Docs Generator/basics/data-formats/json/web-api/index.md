---
uid: Basics.DataFormats.Json.WebApi.Index
---

# JSON Data Format used in WebAPI calls (technical)

[!include[](~/basics/stack/_shared-float-summary.md)]
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

1. All the normal fields are included with their real names, usually Uppercase as that's how the fields are typically saved
1. A few internal fields are also included
    1. Id
    1. Title
    1. Modified
    1. Created
    1. The Guid is only supplied on queries or if the REST API requests includes a `?includeGuid=true`
1. Dates are transferred as strings, using the international ISO format

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

## Write / PUT is the same, just sending

To create data or update it, use the identical format. 


## Read Multi-Language Data

This is currently WIP

## Write Multi-Language Data

This is WIP