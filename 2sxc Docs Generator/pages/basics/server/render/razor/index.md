---
uid: Basics.Server.Render.Razor.Index
---
# Razor Templates

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .process-razor { visibility: visible; } </style>

Token Templates will generate HTML - often based on the data a editor entered, and/or which was provided from the App.

> [!NOTE]
> The [View](xref:Basics.App.Views.Index) determines which template file is being loaded. 

## How it Works

Razor templates are files in the [App Folder](xref:Basics.App.FolderStructure) or a subfolder, beginning with an `_` and ending with `.cshtml`. 

Here's a simple example from the Tutorial:

```razor
@inherits Custom.Hybrid.Razor12
<h2>Hello World</h2>
<div>
  Now is @DateTime.Now
</div>
```

👉 The technical details are explained in [](xref:NetCode.Razor.Index)

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## History

1. Introduced in 2sxc 2.0