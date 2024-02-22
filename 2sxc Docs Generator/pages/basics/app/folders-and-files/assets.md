---
uid: Basics.App.FoldersAndFiles.Assets
---

# App Assets

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-assets-app    { visibility: visible; }</style>

In the [App Folder](xref:Basics.App.FoldersAndFiles.Index) you can add any files you need in your App, like:

* CSS files
* JS files
* Images, Logos

Note that they should not be [content-files](xref:Basics.Content.Assets), but files your App and the templates need to work.

## Base Url to Files in the App or View Folder

Most links to files need to know where to find the App.
You could hardwire the correct link, but that would be very inflexible.
This is usually done using the `@App.Path` or `@App.Folder.Url` property.

* The base url to the App is found on `@App.Folder.Url` (on Razor files which inherit RazorTyped) or on `@App.Path` on older Razor files
* If you are using [Polymorphism](xref:Basics.Polymorphism.Index), you may prefer to use the `@MyView.Folder.Url` (RazorTyped) or `@CmsContext.View.Path` (older Razor files)

## Example Using App Assets in your Template

```html
@inherits Custom.Hybrid.RazorTyped
<link rel="stylesheet" href="@App.Folder.Url/assets/style.css" @Kit.Page.AssetAttributes(priority: 150) />
<link rel="stylesheet" href="@App.Folder.Url/assets/lazy.css" @Kit.Page.AssetAttributes(position: "bottom") />
<script type="text/javascript" src="@App.Folder.Url/assets/scripts.js" @Kit.Page.AssetAttributes(priority: 200, position: "bottom") /> </script>
<img src="@App.Folder.Url/some-logo.png?w=200">
```

or with older Razor base classes

```html
@inherits Custom.Hybrid.Razor14
<link rel="stylesheet" href="@App.Path/assets/style.css" @Kit.Page.AssetAttributes(priority: 150) />
<link rel="stylesheet" href="@App.Path/assets/lazy.css" @Kit.Page.AssetAttributes(position: "bottom") />
<script type="text/javascript" src="@App.Path/assets/scripts.js" @Kit.Page.AssetAttributes(priority: 200, position: "bottom") /> </script>
<img src="@App.Path/some-logo.png?w=200">
```

> [!NOTE]
> The above example uses the `@Kit.Page` service.
> This requires your razor to inherit from `Custom.Hybrid.Razor14` or newer.
> For other uses, see [Asset Optimization](xref:Basics.Server.AssetOptimization.Index)

## Read More

* [](xref:Basics.App.FoldersAndFiles.Index)
* [](xref:Basics.Server.AssetOptimization.Index)
* [](xref:Basics.ImageResizer.Index)
* [](xref:Basics.Content.Assets)
