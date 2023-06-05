---
uid: JsCode.2sxcApi.Index
---

<img src="~/assets/features/js-api.svg" class="feature">

# Introduction to the 2sxc JavaScript APIs

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc, .context-box-summary .edit-custom { visibility: visible; } </style>

The JS APIs let you do many things such as:

1. get or create data of the current App from
  the [headless REST APIs](xref:WebApi.Data.Index)
  or the [VisualQuery](xref:Basics.Query.VisualQuery.Index)
1. call custom backend [WebAPI controllers](xref:NetCode.WebApi.Index)
1. provide a custom edit experience

This is very simple, but you need to know some basics.

## Step 1: Activate the JS APIs

[!include[](~/pages/js-code/2sxc-api/basics/activate_intro_inc.md)]

[!include[](~/pages/js-code/2sxc-api/basics/activate_v13_inc.md)]

For older versions consult the [activate](xref:JsCode.2sxcApi.Activate.Index) instructions.

## Step 2: Get the Current `Sxc` Object

Once you've activated the JS APIs, there will be a [window.$2sxc(...) function/object](xref:Api.Js.SxcJs.SxcGlobal).
It's primary purpose is to get you an [Sxc object](xref:JsCode.2sxcApi.Sxc.Index).

> [!TIP]
> A page can contain many 2sxc Apps and Modules.
> For your code to work easily, it needs to get an Sxc object for the current App.

There are a few ways to get the current `Sxc` object:

1. Using the module ID with inline code:
  `const sxc = $2sxc(17);`
1. Using the module ID with inline code and Razor:
  `const sxc = $2sxc(@CmsContext.Module.Id);`
1. Using any html tag in the DOM:
  `<a onclick='alert($2sxc(this))'>layout</a>`

There are more ways to do this - see [How to get Sxc](xref:JsCode.2sxcApi.GetSxc.Index).

## Step 3: Use the `Sxc` to get Data or Perform CMS Actions

Once you have the `Sxc` object of the current App, you can do all kinds of things.

* Use the [.data(...)](xref:Api.Js.SxcJs.SxcData) to get or create data on the current App
* Use the [.query(...)](xref:Api.Js.SxcJs.SxcQuery) to get data from a Query
* Use the [.webApi.fetchJson(...)](xref:JsCode.2sxcApi.Sxc.WebApi.Fetch) to get data from a WebAPI
* Use the [.cms.run(...)](xref:JsCode.Commands.Index) to run CMS commands
