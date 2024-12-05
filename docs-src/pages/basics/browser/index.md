---
uid: Basics.Browser.Index
---

# What Happens in the Browser...

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .browser-all { visibility: visible; } </style>

In 2sxc most things _just work_. These docs give you a deep understanding of how they work so you can figure out really cool stuff. But don't be intimidated - by default things just magically work.

This is what web-systems do from a bird's-eyes perspective. On the top you see what happens in the browser (the purple boxes).

1. **Show**: Output using HTML and a little CSS + JS. This is the simplest way to work with 2sxc.
1. **Interact**: Content or SPAs where the UI does some hard work like reorganizing data and getting data from JSON endpoints. This requires additional skills.
1. **[Edit](xref:Basics.Browser.Edit.Index)**: Editing is built into everything by default and you can customized it as much as you need, up to creating custom WebAPIs, forms and input fields.

This document will go into more detail what happens at that level. To understand the server level go to [](xref:Basics.Index).

> [!TIP]
> Everything that's green in the image can be customized.


## Standard CSS and JS Libraries and Frameworks

A key goal of 2sxc is to stay out of the way and let you do things using your favorite CSS and JS Frameworks. So the frameworks-section is simply here for you to see that you can use any standard framework or library you want.

<div class="context-box2" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box2 .frameworks-browser { visibility: visible; } </style>
</div>

Basically you can simply add these frameworks to your Razor-template files as `<script>` or `<link>` tags, and everything will just work. You may want to learn more about

1. [Bundling / Optimizing assets](xref:Basics.Server.AssetOptimization.Index)
1. Use [Koi](xref:NetCode.Koi.Index) to detect if the Skin/Theme already has some frameworks (like Bootstrap) to not load them

## Custom App HTML is created by the Server-Templates

The HTML you need is 100% customizable and comes from the server using your [templates](xref:Basics.App.Templates).
Usually you'll use Razor templates to generate this.

<div class="context-box3" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box3 .show-html { visibility: visible; } </style>
</div>


👉 [](xref:Basics.Browser.Html)

## Custom CSS and JS Assets

JS and CSS files are stored in your app folder and included in your output.

<div class="context-box4" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box4 .show-js { visibility: visible; } </style>
</div>

👉 [](xref:Basics.Browser.Css)

👉 [](xref:Basics.Browser.JavaScript)


## Create Awesome SPAs (Single-Page-Applications)

2sxc is great and bundling SPA JS Applications built using Angular, React, Vue or whatever.

<div class="context-box5" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box5 .spa-all { visibility: visible; } </style>
</div>

👉 [](xref:Basics.Browser.JavaScript)

👉 [Angular in Dnn](xref:JsCode.Angular.Index)


## Automatic In-Page Editing Experience

By default 2sxc creates hover toolbars to add modules and on most items which only a _Content Editor_ can see. These let them edit the content or data. It's made possible thanks to the server helper [@Edit.TagToolbar](xref:NetCode.Razor.Edit.Toolbar) in your templates.

<div class="context-box6" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box6 .edit-auto { visibility: visible; } </style>
</div>

👉 [](xref:Basics.Browser.Edit.Index)


## Custom In-Page Editing Experience

The edit experience can be customized to a very large extent:

<div class="context-box-edit-js" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-edit-js .edit-custom { visibility: visible; } </style>
</div>

👉 [](xref:Basics.Browser.Edit.Index)


## Edit Form

The edit form is generated automatically from the Content-Type information (Schema) and the template configuration.

<div class="context-box-edit-form" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-edit-form .browser-edit-ui { visibility: visible; } </style>
</div>

👉 [](xref:Basics.Browser.EditForm.Index)
