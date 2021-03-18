---
uid: Basics.App.Assets
---

# App Assets

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-assets-app    { visibility: visible; }</style>

In the [App Folder](xref:Basics.App.FolderStructure) you can add any files you need in your App, like:

* CSS files
* JS files
* Images, Logos

Note that they should not be [content-files](xref:Basics.Content.Assets), but files your App and the templates need to work. 

## Using App Assets in your Template

These files will also be referenced in your template. Since the App may be installed in various places, you should always use the **App Path** to find the file, like this:

```html
<link rel="stylesheet" href="@App.Path/assets/style.css" data-enableoptimizations="150" />
<link rel="stylesheet" href="@App.Path/assets/lazy.css" data-enableoptimizations="bottom" />
<script type="text/javascript" src="@App.Path/assets/scripts.js" data-enableoptimizations="200:bottom" /> </script>
<img src="@App.Path/some-logo.png?w=200">
```

## Read More

* [](xref:Basics.App.FolderStructure)
* [](xref:Basics.Server.AssetOptimization.Index)
* [](xref:Basics.ImageResizer.Index)
* [](xref:Basics.Content.Assets)
