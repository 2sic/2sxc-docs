---
uid: JsCode.Dnn.JQuery
---
# JQuery in Dnn and 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .frameworks-js { visibility: visible; } </style>


Often you'll need and want jQuery, but when you don't it shouldn't be loaded for performance reasons. 

> [!TIP]
> Removing jQuery and jQueryUI will boost your mobile PageSpeed like crazy. 
> So only include it on pages where you really need it. 

> [!WARNING]
> We believe jQuery was once amazing, but should be seen as end-of-life.
> Our docs still show how to work with it, but we highly recommend to stop using it. 
> 
> See also our [blog](https://2sxc.org/en/blog/post/bye-jquery-go-fetch-2sxc-12-10)

## How Dnn Auto-Loades jQuery

There is some history to this which we'll explain briefly. Dnn made jQuery a first-class citizen around Dnn 4, and since then most of the UI was jQuery based. For a while there even was a standard that buttons etc. should be built and styled with jQuery UI. That is not the case any more. You can now easily run Dnn (at least in browsing mode, not editing) without jQuery. 

But because _jQuery was always there_ developers never noticed that they could leave it away, and many parts like Templates would simply rely on them. There were also many things that automatically added jQuery but were never noticed. Here some important examples:

1. 2sxc always used the ServicesFramework of Dnn which internally auto-added jQuery
1. Most Dnn websites use popups for login, and just doing this automatically adds jQueryUI and jQuery to the page. You can easily stop this using the recipe [Remove jQueryUI from my page](https://azing.org/dnn-community/r/fjgSyTfI)

In case your code is running on a page without jQuery but you need it, your code should tell Dnn that you want jQuery, like this:

<iframe src="https://azing.org/dnn-community/r/YqJFbNKH?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

> [!WARNING]
> Don't manually add urls to the jQuery files, make sure you use the official API. This should help you prevent loading jQuery multiple times and avoid conflicts between jQuery version.

> [!TIP]
> If you do need a newer version of jQuery, that is possible but needs some tweaking to get them to run side-by-side. It's done using the [jQuery.noConflict()](https://api.jquery.com/jQuery.noConflict/).

## How 2sxc loads jQuery in Dnn

* Up until 2sxc 10.24, every 2sxc module automatically loaded jQuery because 2sxc used the ServicesFramework of Dnn
* Starting from 2sxc 10.25 
  * old templates auto-load jQuery for backward compatibility. This includes token-templates and Razor templates which don't have an `@inherits` statement at the beginning. 
  * Anything new done using the [RazorComponent](xref:NetCode.Razor.Component) will not do that unless your template code requests it.

In 2sxc 10.25 and newer, all core features of 2sxc _don't_ need jQuery. So anonyomus browsing of your site won't require jQuery at all, even if you're doing API calls or using the [$2sxc javascript API](xref:JsCode.2sxcApi.Index). 

But what you do need if you're using the new [RazorComponent](xref:NetCode.Razor.Component), 
is to tell 2sxc that you plan to use JavaScript and APIs. 
This lets 2sxc add the stuff to the page to make the magic happen. 
See [](xref:JsCode.2sxcApi.Activate.Index).

Because 2sxc doesn't use jQuery any more for normal stuff, this will have the following effect:

1. Add a special header to the page containing information needed for API calls
1. Load the 2sxc.api.min.js in the correct way

_It's important to note that this will not load jQuery._





