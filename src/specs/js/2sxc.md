---
uid: Specs.Js.$2sxc
---
# JS: The $2sxc Root Object

The $2sxc-object is the core JavaScript object helping you to access data of your view or WebAPIs of your 2sxc-App.

> [!NOTE]
> 2sxc uses these objects internally for building the edit experience. You only need this if you wish to do 
> custom JavaScript stuff in 2sxc, like retrieve data from a WebApi.

Advanced cases where _you_ need $2sxc:

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

```HTML
@Edit.Enable(js: true)
<script>
    $(function () {
        var modId = 17;
        var sxc = $2sxc(modId);
        alert("edit mode: " + sxc.isEditMode());
    });
</script>
```

The code above shows

1. how to include the api-file in the best way using `@Edit.Enable(js: true)`
2. how the sxc-object is resolved
3. how to ask if we're in edit-mode

The moduleId is usually dynamic, so you can't hardwire it with `var modId = 17` into your JS code. This is explained in the next section _Initialization_.


## Initialization of the $2sxc for a Module
We have three initializers:

1. `$2sxc(DomNode)` - recommended
2. `$2sxc(moduleId)` - oldest way, very common
3. ~~`$2sxc(moduleId, contentBlockId)`~~ - a special version for [internal use only](#module-instances-and-content-blocks)

### The Recommended HTML/DOM-Node Initializer
We recommend the *DOM-Node syntax*, because in that mode $2sxc will go up through the DOM-tree and find the module it's in (or the content-block), and auto-configure itself. What's nice about this is that this method works without any server-side support (which you need for the other methods). Here's a simple example:

```html
<a onclick='$2sxc(this).manage.run("layout")'>layout</a>
```

In the above example, the dom-node is given by the current click, which puts the current `<a>` node in the `this` object.

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

### The Classic ModuleId method

In this method, you need to get the ModuleId from somewhere, usually provided by the server-side template. In a Token-Template you would use `[Module:ModuleId]` and in a Razor-Template it's `@Dnn.Module.ModuleID` (large "ID").

The previous code in Tokens would be like:

```JavaScript
$(function () {
    var sxc = $2sxc([Module:ModuleId]);
    alert("edit mode: " + sxc.isEditMode());
})
```

And the same code in Razor would be like:

```JavaScript
$(function () {
    var sxc = $2sxc(@Dnn.Module.ModuleID);
    alert("edit mode: " + sxc.isEditMode());
})
```

You can also find an example of finding all of our nodes and initializing them in the [TimeLineJS App](xref:App.TimelineJs). If you're interested, here's the [js-initializer](https://github.com/2sic/app-TimeLineJS/blob/master/assets/scripts.js).  

## Everything about the Module-Level `sxc` Controller
In the [module sxc controller](xref:Specs.Js.Sxc) you'll read about:

1. The API of a module-level controller
2. Calling commands, creating toolbars and buttons
3. Working with JSON data of the current module
4. Working with REST / HTTP Async Stuff
5. Working with WebAPI calls, especially to your backend WebAPI in your api-folder
6. Calling Queries (from the visual query designer)


## Technical Features Explained

### Including the $2sxc API JavaScript File
Each template that needs the $2sxc-file when not logged in must include it, to be sure it's always there when needed. Note that we've included various features to prevent duplicate execution.

1. if the file is included multiple times, it will only execute once
2. if the file is included [minified](xref:HowTo.Output.Assets) and unminified, it too will only be executed once
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

### Metadata Needed by $2sxc to Work

The $2sxc object needs a few pieces of information to work properly, which are stored in a JSON in the HTML. 
So the Module-DIV-Tag is actually enhanced with additional pieces of information. 
This structure is open and easy to read, but the structure can change from time to time, 
so don't read/rely on that JSON, use the $2sxc to access any information. 

There are even situations where additional metadata in inserted into the HTML rendered by your template. This has to do with inner-content (see next section) and the same "don't rely on the JSON" applies. 

### Module-Instances and Content-Blocks

This is a very advanced topic, so if you're new - just skip this. Also if you use content-blocks you don't need to understand this, it's just included for completeness.

A 2sxc-module can contain many [2sxc-content-blocks since version 8.4][content-blocks] because an item could have independent, inner content-blocks. Because of this, the controller may need an additional parameter, so instead of `$2sxc(moduleId)` it can also use `$2sxc(moduleId, contentBlockId)`.

As mentioned above, you never need to work with this, it's included for completeness. Since the now recommended method to initialized $2sxc is not with the moduleId but with a DOM-node, that call will automatically resolve everything correctly.


## Additional properties of the $2sxc Controller

* In 2sxc 9.30 a new object `$2sxc.cms` was added - read about it in [$2sxc.cms](xref:Specs.Js.$2sxc.Cms)


TODO: document the properties, mention that they won't be stable in future versions

_Till we find time to document more, please consult the [$2sxc API](https://github.com/2sic/2sxc-ui/blob/master/src/js-api/2sxc.api/2sxc.api.js)_

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
1. The old mechanism is to ask DNN and the _ServicesFramework_ for this information. This is always available when you're logged on as an editor, but it's only on the page for anonymous users IF
    1. ...you are either using the old mechanisms
    1. ...or your Razor code asked for with `@Edit.Enable(js:true)`

## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)
* all the JS-apps including AngularJS in the [app-catalog](xref:AppsCatalog)

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)

## History

1. Introduced in 2sxc 04.00
1. Enhanced with `cms` (see [cms](xref:Specs.Js.$2sxc.Cms)) in 9.30

[content-blocks]: http://2sxc.org/en/blog/post/designing-articles-with-inner-content-blocks-new-in-8-4-like-modules-inside-modules
