---
uid: JsCode.2sxcApi.HowItWorks.Index
---

<img src="~/assets/features/js-api.svg" class="feature">

# How `$2sxc` and `Sxc` Actually Work

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

This is more internal information in case you're curious.
Or if things don't behave as expected. 


## Environment and Context Data Needed by $2sxc to Work

The $2sxc object needs a few pieces of information to work properly, which are usually stored in two locations:

1. In a page-header Meta tag with the Id `_jsApi`
1. In JSON in the HTML where the Module start

So the Module-DIV-Tag is actually enhanced with additional pieces of information. 
This structure is open and easy to read, but the structure can change from time to time, 
so don't read/rely on that JSON, use the $2sxc to access any information. 

There are even situations where additional context data in inserted into the HTML rendered by your template. This has to do with inner-content (see next section) and the same "don't rely on the JSON" applies. 


## How Page and Portal Information is Found

This is for information the $2sxc needs for WebApi calls. _This here applies to 2sxc 10.25+_

1. It first checks the html-head section for a `meta` tag with the name `_jsApi`. If this exists, it contains a JSON with everything it needs.
1. If that doesn't exist it will retry 3x times (in case the head wasn't ready yet) and otherwise falls back to the old mechanism.
1. The old mechanism (Dnn only) is to ask Dnn and the _ServicesFramework_ for this information. This is always available when you're logged on as an editor, but it's only on the page for anonymous users IF
    1. ...you are either using the old mechanisms
    1. ...or your Razor [activated it on explicitly](xref:JsCode.2sxcApi.Activate.Index)


## How Module-Level Information is found

1. When you use `$2sxc(moduleId)` it scans the DOM for the `<div>` tag that contains the module with that ID
1. When you use `$2sxc(htmlNode)` it starts from that node and scans all parents till it finds the `<div>` which is the module wrapper
1. Once it finds that, it knows what module it's for and configures itself


## Module-Instances and Content-Blocks

This is a very advanced topic, so if you're new - just skip this. Also if you use content-blocks you don't need to understand this, it's just included for completeness.

A 2sxc-module can contain many [2sxc-content-blocks since version 8.4][content-blocks] because an item could have independent, inner content-blocks. Because of this, the controller may need an additional parameter, so instead of `$2sxc(moduleId)` it can also use `$2sxc(moduleId, contentBlockId)`.

As mentioned above, you never need to work with this, it's included for completeness. Since the now recommended method to initialized $2sxc is not with the moduleId but with a DOM-node, that call will automatically resolve everything correctly.


## Everything is Cached

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


[content-blocks]: http://2sxc.org/en/blog/post/designing-articles-with-inner-content-blocks-new-in-8-4-like-modules-inside-modules
