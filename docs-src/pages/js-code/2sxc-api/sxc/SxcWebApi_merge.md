---
uid: Api.Js.SxcJs.SxcWebApi
---

### `sxc.webApi` Helpers on the Sxc Controller

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

The WebApi object on the App/Module-specific `sxc`-controller is for AJAX calls. It helps you in these advanced cases:  

1. to read/write content-items using REST
1. to access your apps WebApi controllers

### How to use

First you must ensure that you have the [`$2sxc` manager](xref:JsCode.2sxcApi.Index) on your page, which will get you a module-specific `sxc` controller. Read about the [$2sxc global](xref:Api.Js.SxcJs.SxcGlobal) here. 

Here's a simple example (assuming you have the $2sxc manager):

```HTML
<a onclick="$2sxc(this).webApi.fetchJson('app/auto/data/Category').then(handleResult);">
    get all Categories 
</a>
```

### The APIs to Get Data

1. [Modern `fetchRaw` and `fetchJson` API](xref:JsCode.2sxcApi.Sxc.WebApi.Fetch)
1. [APIs to get URLs and headers](xref:JsCode.2sxcApi.Sxc.WebApi.BareMetal)


### How to Get the Current Context's `sxc` Controller

Before you continue, make sure you know how to resolve/get your `sxc`-controller, as it is unique for each Dnn-Module. This is because each action needs to know which module it belongs to. Read about the 3 ways to get this in the [$2sxc Manager docs](xref:JsCode.2sxcApi.Index). Here you'll also find out more about the [sxc-controller](xref:JsCode.2sxcApi.Sxc.Index).




[!include["history"](_webapi-history.md)]

