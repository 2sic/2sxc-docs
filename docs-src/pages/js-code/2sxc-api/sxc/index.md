---
uid: JsCode.2sxcApi.Sxc.Index
---

# The App / Module Sxc Instance

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

The module-specific `sxc`-instance is the core JavaScript object helping you in these cases:  

1. if you want full control over the edit-experience with custom buttons etc. 
1. when you want to use view-data as an asyc-JS call
1. if you wish to work with WebAPI REST calls - of your own App-WebApi, 2sxc-WebApi or Dnn-WebApi

## How to use

First you must ensure that you have the [`$2sxc` global](xref:JsCode.2sxcApi.Index) on your page, which will get you a module-specific `sxc`.

Here's a simple example (assuming you have the $2sxc global):

```HTML
<a onclick="var sxc = $2sxc(this); alert(sxc.isEditMode())">
    click me 
</a>
```

The code above shows

1. how the sxc-object is retrieved using the `$2sxc(...)` global, based on the current context `this`
2. how to ask if we're in edit-mode

Here's another quick example, calling a C# web-api endpoint: 

```JavaScript
var sxc = $2sxc(27);
sxc.webApi.post("Form/ProcessForm")
    .success(function(result) {
        // ....
    });
```

## How to Get the Current Context's `sxc` Instance

Before you continue, make sure you know how to resolve/get your `sxc`, as it is unique for each Dnn-Module. 
This is because each action needs to know which module it belongs to. 
Read about the 3 ways to get this in the [$2sxc Global docs](xref:JsCode.2sxcApi.Index).

## The API of an Module `sxc` Instance

📖 [Sxc](xref:Api.Js.SxcJs.Sxc)

## Common Tasks

1. Work with the JSON Data of the Current Module  
    📖 In v.13+ you should should use the [Data Service](xref:Api.Js.SxcJs.SxcData)
1. Work with REST Api to Read/Write Content-Items / Data  
    📖 In v.13+ you should should use the [Data Service](xref:Api.Js.SxcJs.SxcData)  
    _In older versions, use the [Sxc WebApi](xref:Api.Js.SxcJs.SxcWebApi)_
1. Use App-Queries with $2sxc  
    📖 In v.13+ you should should use the [Query Service](xref:Api.Js.SxcJs.SxcQuery) objects.  
    _In older versions, use the [Sxc WebApi](xref:Api.Js.SxcJs.SxcWebApi)_
1. Work with Custom C# App WebAPIs  
    📖 Read about it in the [Sxc WebApi](xref:Api.Js.SxcJs.SxcWebApi) page.


## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)
* all the JS-apps including AngularJS in the [app-catalog](xref:AppsCatalog)

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)

## History

1. Introduced in 2sxc 04.00
1. Enhanced with `SxcData` and `SxcQuery` in 2sxc 13.00