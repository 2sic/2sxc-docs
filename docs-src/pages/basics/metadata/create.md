---
uid: Basics.Metadata.Create
---

<img src="~/assets/features/metadata.svg" class="feature">

# Create Metadata - (advanced ⚠)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

To create Metadata, new data must be assigned to a **Target** the moment it's created. 

Metadata can be created in 3 ways

1. Through the **Edit-UI**: If the toolbar which opens a `new` dialog adds metadata information, then the newly created item will be stored as metadata
1. In the **REST WebAPI**: the REST calls for creating new data can contain target information
1. In the [App.Data.Create(...)](xref:NetCode.DynamicCode.Objects.App.Data): The `Create(...)` command can include target information 


## Create when Opening the Edit-Dialog #todoc

The toolbar has various commands like `new` where you can include target-information which will then ensure that it's set when saved. In addition there is a simpler button/command called `metadata` which will _create metadata if it doesn't exist, or edit existing if it's already created_. 

This is documented in [Toolbar Customizations for Metadata](xref:JsCode.Toolbars.CreateMetadata)

## Create Automatically on any ADAM field in the Edit-UI #todoc



## Create using the Headless REST API #todoc



## Create using the C# API #todoc



## Manually create Metadata for Tests #todoc

The Admin-UI has a special feature to manually create Metadata. It's technical, but it's meant to quickly create some test-metadata.



## Demo App and further links #todoc

* [](xref:App.FancyBoxGallery)

---

## History

1. Introduced in 2sxc v2