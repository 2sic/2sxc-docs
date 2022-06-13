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

1. *add a script-tag* to include the 2sxc.api.min.js  
_note 1: in edit-mode this happens automatically_  
_note 2: always use lower-case paths and the minified version_
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

1. how to include the api-file in the best way using `GetService<IPageService>().Activate("2sxc.JsCore")`
2. how go get the ModuleId into JS using `@CmsContext.Module.Id` from Razor (there is another way - read below)
3. how to ask if we're in edit-mode

The moduleId is usually dynamic, so you can't hardwire it with `var modId = 17` into your JS code. This is explained in the next section _Initialization_.


## Get the Sxc-Module-Service using $2sxc

We have four initializers:

1. `$2sxc(HTMLElement)` - recommended
2. `$2sxc(moduleId)` - oldest way, very common
3. ~~`$2sxc(moduleId, contentBlockId)`~~ - a special version for [internal use only](#module-instances-and-content-blocks)
1. `$2sxc(ContextIdentifier)` - new in v11.11

### The HTMLElement Method

We recommend the *HTMLElement syntax*, because in that mode $2sxc will go up through the DOM-tree and find the module it's in (or the content-block), and auto-configure itself. What's nice about this is that this method works without any server-side support (which you need for the other methods). Here's a simple example:

```html
<a onclick='$2sxc(this).manage.run("layout")'>layout</a>
```

In the above example, the HTMLElement is given by the current click, which puts the current `<a>` node in the `this` object.

Here's a JS example:

```javascript
var x = $(".myApp");    // get ANY dom element inside this 2sxc app
var sxc1 = $2sxc(x);    // use it

// the same thing in 1 line
var sxc2 = $2sxc($("#SomeNodeInThePage"));
```

Note that the simple example above assumes that there is only one item on the page, but there can often be more. So you'll usually need to do something like this

```javascript
// note that we cannot work before the page-onready.
// so our code is in a $(our-code);
$(function(){
    $("some-jquery-selector").each(function(index, element){
        var sxc = $2sxc(element);
        // now do something...
    });
});

```

### The ModuleId Method

In this method, you need to get the ModuleId from somewhere, usually provided by the server-side template. In a Token-Template you would use `[Module:ModuleId]` and in a Razor-Template it's `@Dnn.Module.ModuleID` (large "ID").

The same code in **Razor** for Dnn and Oqtane would be:

```JavaScript
$(function () {
    var sxc = $2sxc(@CmsContext.Module.Id);
    alert("edit mode: " + sxc.isEditMode());
})
```

The same code in **Tokens** would be:

```JavaScript
$(function () {
    var sxc = $2sxc([Module:ModuleId]);
    alert("edit mode: " + sxc.isEditMode());
})
```


You can also find an example of finding all of our nodes and initializing them in the [TimeLineJS App](xref:App.TimelineJs). If you're interested, here's the [js-initializer](https://github.com/2sic/app-TimeLineJS/blob/master/assets/scripts.js).  

### The ContextIdentifier Method (new v11.11)

When you use the `ContextIdentifier`, you are bypassing various automations which pick up the context by default. 
The `ContextIdentifier` has this setup:

```js
export class ContextIdentifier {
  /** ZoneId of this Context */
  zoneId: number;
  /** AppId of this Context */
  appId: number;
  /** PageId of this Context (optional) */
  pageId?: number;
  /** ModuleId of this Context (optional) */
  moduleId?: number;
}
```

This mode is mainly used 

* when integrating 2sxc into other systems which don't provide the full CMS functionality
* when creating edit-functionality which is outside the default context, like in the context of a Module where you must edit data of a different App

---

## Additional properties of the $2sxc Controller: `cms`

* In 2sxc 9.30 a new object `$2sxc.cms` was added - read about it in [$2sxc.cms](xref:Api.Js.SxcJs.SxcGlobalCms)

---

## Everything about the Module-Level Sxc Instance

In the [module level Sxc Instance](xref:JsCode.2sxcApi.Sxc.Index) you'll read about:

1. The API of a module-level controller
2. Calling commands, creating toolbars and buttons
3. Working with JSON data of the current module
4. Working with REST / HTTP Async Stuff
5. Working with WebAPI calls, especially to your backend WebAPI in your api-folder
6. Calling Queries (from the [VisualQuery](xref:Basics.Query.VisualQuery.Index) designer)


## Technical Features Explained

### Including the $2sxc API JavaScript File
Each template that needs the $2sxc-file when not logged in must include it, to be sure it's always there when needed. Note that we've included various features to prevent duplicate execution.

1. if the file is included multiple times, it will only execute once
2. if the file is included [minified](xref:Basics.Server.AssetOptimization.Index) and unminified, it too will only be executed once
3. if you need to debug the JS for whatever reason with [F12 in the browser](http://2sxc.org/en/blog/post/debugging-javascript-errors-with-a-modern-browser-and-f12-(200)) a sourcemap is included
4. for more advanced debuging, just include the unminified version

Note that the entire code is packed in an IIFE, so the only global variable created is the `$2sxc`.

### Everything is Cached
We optimized for just about every thinkable situation, so the $2sxc will build a controller-object for a module,
but following calls to it will use the cached information. Example:

```javascript
var sxc = $2sxc(42); // initial call, will build controller for Module 42
var sxc2 = $2sxc(42); // second call, will use cached controller
var sxc3 = $2sxc(domNodeInsideTheModule42); // another call, will also used cached controller
```

### Environment and Context Data Needed by $2sxc to Work

The $2sxc object needs a few pieces of information to work properly, which are usually stored in two locations:

1. In a page-header Meta tag with the Id `_jsApi`
1. In JSON in the HTML where the Module start

So the Module-DIV-Tag is actually enhanced with additional pieces of information. 
This structure is open and easy to read, but the structure can change from time to time, 
so don't read/rely on that JSON, use the $2sxc to access any information. 

There are even situations where additional context data in inserted into the HTML rendered by your template. This has to do with inner-content (see next section) and the same "don't rely on the JSON" applies. 

### Module-Instances and Content-Blocks

This is a very advanced topic, so if you're new - just skip this. Also if you use content-blocks you don't need to understand this, it's just included for completeness.

A 2sxc-module can contain many [2sxc-content-blocks since version 8.4][content-blocks] because an item could have independent, inner content-blocks. Because of this, the controller may need an additional parameter, so instead of `$2sxc(moduleId)` it can also use `$2sxc(moduleId, contentBlockId)`.

As mentioned above, you never need to work with this, it's included for completeness. Since the now recommended method to initialized $2sxc is not with the moduleId but with a DOM-node, that call will automatically resolve everything correctly.


## Background: How $2sxc works

This is just some info for you to better understand what happens behind the scenes:

### How Module-Level Information is found

1. When you use `$2sxc(moduleId)` it scans the DOM for the `<div>` tag that contains the module with that ID
1. When you use `$2sxc(htmlNode)` it starts from that node and scans all parents till it finds the `<div>` which is the module wrapper
1. Once it finds that, it knows what module it's for and configures itself

### How Page and Portal Information is Found

This is for information the $2sxc needs for WebApi calls. _This here applies to 2sxc 10.25+_

1. It first checks the html-head section for a `meta` tag with the name `_jsApi`. If this exists, it contains a JSON with everything it needs.
1. If that doesn't exist it will retry 3x times (in case the head wasn't ready yet) and otherwise falls back to the old mechanism.
1. The old mechanism is to ask Dnn and the _ServicesFramework_ for this information. This is always available when you're logged on as an editor, but it's only on the page for anonymous users IF
    1. ...you are either using the old mechanisms
    1. ...or your Razor code asked for with `@Edit.Enable(js:true)`

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

[content-blocks]: http://2sxc.org/en/blog/post/designing-articles-with-inner-content-blocks-new-in-8-4-like-modules-inside-modules
