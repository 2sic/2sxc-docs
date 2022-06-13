---
uid: JsCode.2sxcApi.$2sxc.Index
---

<img src="~/assets/features/js-api.svg" class="feature">

# The `$2sxc` Global Object

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

The `$2sxc` is a global JavaScript object helping you to access data of your view or WebAPIs of your 2sxc-App.

> You need this if you wish to do JavaScript stuff in 2sxc, like retrieve data from a WebApi.

Cases where _you_ need $2sxc:

1. When you want to use view-data as an asyc-JS call
1. if you wish to work with WebAPI REST calls
1. if you want more control over the edit-experience with custom buttons etc.

## How to use

1. If you need the JS APIs for non-admins, [activate it first](xref:JsCode.2sxcApi.Activate.Index)
2. *call the `$2sxc(...)` constructor* to get a sxc-controller for your module (as each module on the page will have an own $2sxc controller)
3. *work with the API* of the sxc-controller

Here's a simple example of a template-file:

```razor
@inherits Custom.Hybrid.Razor12
@using ToSic.Sxc.Services;
@{
  // Tell the page that we need the 2sxc Js APIs
  GetService<IPageService>().Activate("2sxc.JsCore"); 
}
<script>
    $(function () {
        var modId = @CmsContext.Module.Id;        // Get the ModuleId from Razor
        var sxc = $2sxc(modId);                   // Get the Module Service in JS from the Global object
        alert("edit mode: " + sxc.isEditMode());  // Check if we are in Edit mode
    });
</script>
```

The code above shows

1. how to activate the JS features for non-admins - see [](xref:JsCode.2sxcApi.Activate.Index)
2. how go get the ModuleId into JS using `@CmsContext.Module.Id` from Razor (there is another way - read below)
3. how to ask if we're in edit-mode

The moduleId is usually dynamic, so you can't hardwire it with `var modId = 17` into your JS code.


## Get the Sxc-Module-Service using $2sxc

See [How to get Sxc](xref:JsCode.2sxcApi.GetSxc.Index)

---

## Everything about the Module-Level Sxc Instance

In the [module level Sxc Instance](xref:JsCode.2sxcApi.Sxc.Index) you'll read about:

1. The API of a module-level controller
2. Calling commands, creating toolbars and buttons
3. Working with JSON data of the current module
4. Working with REST / HTTP Async Stuff
5. Working with WebAPI calls, especially to your backend WebAPI in your api-folder
6. Calling Queries (from the [VisualQuery](xref:Basics.Query.VisualQuery.Index) designer)



## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)
* all the JS-apps including AngularJS in the [app-catalog](xref:AppsCatalog)

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)

## History

1. Introduced in 2sxc 04.00
1. Enhanced with `cms` (see [cms](xref:Api.Js.SxcJs.SxcGlobalCms)) in 9.30
1. Enhanced the `$2sxc(...)` constructor with the ContextIdentifier in v11.11
1. Replaced `Edit.Enable(js:true)` with the new `IPageService.Activate("2sxc.JsCore")` in v13.0

