---
uid: JsCode.2sxcApi.GetSxc.Index
---

<img src="~/assets/features/js-api.svg" class="feature">

# Get the Current `Sxc` Object

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

This assumes you have the JS API page features enabled, 
either because you are logged in as Admin, or because you [activated them](xref:JsCode.2sxcApi.Activate.Index).

## Get the `Sxc` using `$2sxc`

There are four get-signatures:

1. With an HTML Tag: `$2sxc(tag: HTMLElement)` - recommended
1. With a Module ID: `$2sxc(moduleId: number)` - oldest way, very common
1. Using a Context: `$2sxc(context: ContextIdentifier)` - new in v11.11
1. ~~`$2sxc(moduleId, contentBlockId)`~~ - a special version for internal use only

For demos it depends a bit on your scenario. 

* Vanilla JavaScript or TypeScript
  * [Inline JavaScript](#get-sxc-with-inline-javascript) - easiest to use
  * [External JavaScript](#get-sxc-with-external-javascript)
  * [External JavaScript with turnOn](#get-sxc-with-external-javascript-and-turnon) - recommended! 🚀
* External JavaScript Framework such as Angular, Vue or React

## Get `Sxc` with Inline JavaScript

This is the easiest to use, but we suggest you try to avoid it, because of [CSP-Hardening](xref:Abyss.Security.Csp.Index).

### Get with an HTML Tag (Inline)

We recommend the **HTMLElement syntax**. 
With this syntax, `$2sxc` will go up through the DOM-tree and find the module it's in (or the content-block).
It will then auto-configure itself. 
What's nice about this is that this method works without any server-side support (which you need for the other methods). 
Here's a simple example:

```html
<a onclick='$2sxc(this).cms.run("layout")'>layout</a>
```

In the above example, the HTMLElement is given by the current click, which puts the current `<a>` node in the `this` object.

Here's a JS example:

```javascript
var x = document.getElementById("myApp"); // get a dom element inside this 2sxc app
var sxc1 = $2sxc(x);                      // use it

// the same thing in 1 line
var sxc2 = $2sxc(document.getElementById("myApp"));
```

With jQuery (not recommended, jQuery should be seen as [end-of-life](xref:JsCode.Dnn.JQuery)):

```javascript
// the same thing in 1 line
var sxc = $2sxc($("#myApp")[0]);
```


Note that the simple example above assumes that there is only one item on the page, but there can often be more. 
In that scenario you'll need to loop or something. 

### Get with a Module ID (Inline)

In this method, you need to get the ModuleId from somewhere, usually provided by the server-side template. 
In a Token-Template you would use `[Module:ModuleId]` and in a Razor-Template it's `@Dnn.Module.ModuleID` (large "ID").

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


You can also find an example of finding all of our nodes and initializing them in the [TimeLineJS App](xref:App.TimelineJs). 
If you're interested, here's the [js-initializer](https://github.com/2sic/app-TimeLineJS/blob/master/assets/scripts.js).  

## Get `Sxc` with External JavaScript

When using external vanilla JavaScript, you will need:

1. either a strong naming convention - such as making sure your app always has a tag with id `myAmazingApp`
1. or pass it a tag or ID to get started.

If you use a strong naming convention, this is the same as the inline-JavaScript-method.

```js
// the same thing in 1 line
var sxc = $2sxc(document.getElementById("myAmazingApp"));
```

If you want to pass in the name or something, then the **external** file would look something like this:

```JavaScript
function startWithId(moduleId) {
  var sxc = $2sxc(moduleId);
  alert("edit mode: " + sxc.isEditMode());
}

function alertFromTag(tag) {
  var sxc = $2sxc(tag);
  alert("edit mode: " + sxc.isEditMode());
}
```

And the page would contain code such as:

```html
<!-- Run a script-->
<script>
  startWithId(@CmsContext.Module.Id);
</script>

<!-- use the this-dom element -->
<a onclick='alertFromTag(this)'>show edit mode</a>
```

## Get `Sxc` with External JavaScript and turnOn

**turnOn** is a special helper to **boot your JavaScript**. 
It's especially useful because you cannot always rely on the loading order / speed of scripts, 
on scripts which may depend on other libraries to run as well. 
Read more about [turnOn](xref:JsCode.TurnOn.Index).

### Use Module ID with turnOn

Razor File - example taken from the [Counter App](xref:App.Counter):

```razor
@inherits Custom.Hybrid.Razor14
@using ToSic.Sxc.Services;
@{
  // Basics / Preparation
  Kit.Page.Activate("turnOn");
  var domId = "app-counter2-js-" + CmsContext.Module.Id;
}
<div id="@domId" data-count="@fact.Number">
  <!-- more -->
</div>

@* include the JS, at the bottom of the page *@
<script src="@App.Path/scripts.js" @pageSvc.AssetAttributes(position: "bottom") ></script>
<turnOn turn-on='{ "run": "window.initMyApp()", "data": { "domId": "@domId" }}'></turnOn>
```

JavaScript / TypeScript File:

```ts
function initMyApp({ domId } : { domId: string }) {
  var sxc = $2sxc(document.getElementById(domId));
  // ...
}
```

### Use Tag with turnOn

This is almost the same as with the Module ID, but the tag is passed in automatically. 
Note that this requires v14.02 with turnOn v0.1.2.

JavaScript / TypeScript File:

```ts
function initMyApp(data: any, context: any) {
  var sxc = $2sxc(document.getElementById(context.tag));
  // ...
}
```


---

## Technical Features Explained

### Everything is Cached

We optimized for just about every thinkable situation, so the $2sxc will build a controller-object for a module,
but following calls to it will use the cached information. Example:

```javascript
var sxc = $2sxc(42); // initial call, will build controller for Module 42
var sxc2 = $2sxc(42); // second call, will use cached controller
var sxc3 = $2sxc(domNodeInsideTheModule42); // another call, will also used cached controller
```


---

## History

1. Introduced in 2sxc 04.00
1. Enhanced the `$2sxc(...)` constructor with the ContextIdentifier in v11.11
