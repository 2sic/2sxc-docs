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


## Get with an HTML Tag (Inline)

We recommend the **HTMLElement syntax**. 
With this syntax, `$2sxc` will go up through the DOM-tree and find the module it's in (or the content-block).
It will then auto-configure itself. 
What's nice about this is that this method works without any server-side support (which you need for the other methods). 
Here's a simple example:

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

Note that the simple example above assumes that there is only one item on the page, but there can often be more. 
So you'll usually need to do something like this

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

## Get with a Module ID

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


You can also find an example of finding all of our nodes and initializing them in the [TimeLineJS App](xref:App.TimelineJs). 
If you're interested, here's the [js-initializer](https://github.com/2sic/app-TimeLineJS/blob/master/assets/scripts.js).  

TODO: TURNoN ETC.


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
