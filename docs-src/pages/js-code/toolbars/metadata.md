---
uid: JsCode.Toolbars.CreateMetadata
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbars which Create Metadata

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

If your toolbar should create [Metadata](xref:Basics.Metadata.Index) when creating new data, it must supply the `for` parameter. 

When you do this, the edit-dialog should open just like always, but once the data is saved it should have the metadata target assignment. 

## Schema for the Simple Toolbar

* `...&for=[stringKey]` - will default to [TargetType 10 (CMS Object)](xref:Basics.Metadata.TargetTypes) and key-type `string`
* `...&for=[targetType],[keyType],[key]`

Examples

* `...&for=file:74`
* `...&for=4,guid,5f09bc36-1ada-4f74-8992-a90587b09af5`

## Razor Example

This example will create a new item which will provide metadata for the Entity ([Target-Type 4](xref:Basics.Metadata.TargetTypes)) `5f09bc36-1ada-4f74-8992-a90587b09af5`. This example would usually need an `@if(...)` around it, as you would normally only want to have a create-button if nothing exists yet. 

```razor
<div @Edit.TagToolbar(Content, toolbar: "+new?contentType=Category&for=4,guid,5f09bc36-1ada-4f74-8992-a90587b09af5")>
  ...
</div>
```

This example is used in the [Fancybox3 Gallery](xref:App.FancyBoxGallery) and will either _edit_ existing Metadata or create new Metadata for this file.

```razor
<div class="ga-image" @Edit.TagToolbar(toolbar: new [] {
  "toolbar=empty",
  "metadata?entityId=" + pic.Metadata.EntityId + "&contentType=ImageMetadata&for=file:" + pic.FileId
})>
  ...
</div>
```

## Schema for the Advanced Toolbar System

The old toolbar system which was much harder to set up also as a model for this, but we won't document it, as we don't recommend using it any more. 

## Read More

Basically you have what it takes. To go further: 

* [](xref:Basics.Metadata.Index)
* [](xref:JsCode.Toolbars.Simple)
