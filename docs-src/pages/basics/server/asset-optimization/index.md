---
uid: Basics.Server.AssetOptimization.Index
---
# Optimizing Template Assets / Client Dependencies (JS & CSS)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .asset-optimizer { visibility: visible; } </style>

Learn about using the Dnn Client-Resource-Management aka Dnn Client-Depedency-Management in 2sxc templates.

Whenever a template needs additional files, specifically

1. JavaScripts
1. CSS Styles
1. Image Resources
1. Fonts

These should be included in an optimized form to enhance performance dramatically. This is all about reducing the amount of server requests (very important for end-user performance) and delivering them in the order / places in the HTML-file, optimal for their purpose.

So far 2sxc will take care of your JS/CSS files by bundling and minifying them, at the position and order you need.

## How to use

Here's a trivial example for optimizing a CSS with default settings:

```html
<link rel="stylesheet" href="@App.Path/style.css" @Kit.Page.AssetAttributes() />
```

This will

1. Create a link to the file `styles.css` in the current App
1. Add some attributes which will enable optimizations
1. If you have [Content Security Policy (CSP)](xref:Abyss.Security.Csp.Index) enabled, it will also [whitelist the resources in CSP](xref:Abyss.Security.Csp.Whitelist)


Here's a more typical example, showing an optimization for a style & js which are inside the app-folder. This example uses Razor, so we use `@App.Path` to ensure it's picking up the right folder (use `[App:Path]` in token-templates):

```razor
<link rel="stylesheet" href="@App.Path/assets/style.css"
    @Kit.Page.AssetAttributes(priority: 150) />
<link rel="stylesheet" href="@App.Path/assets/lazy.css"
    @Kit.Page.AssetAttributes(position: "bottom") />
<script type="text/javascript" src="@App.Path/assets/scripts.js"
    @Kit.Page.AssetAttributes(priority: 200, position: "bottom") />
</script>
```

This shows:

1. a CSS with lower [priority](#understanding-priorities) (150 instead of the default 100)
1. a css with which will be [placed](#understanding-placement) at the page bottom (so it will load later)
1. a script-tag and specifies [priority](#understanding-priorities) and [placement](#understanding-placement) inside the HTML document

## How it works

Basically all `<script>` tags and all `<link rel="stylesheet">` tags can have a special attribute, which the system will parse according to the environments capabilities. In Dnn 7/8/9 this means it can

* can assign priorities (to ensure load-order)
* can assign placement in the html-document (head, body, bottom)

## Understanding Priorities

There is a fairly complicated article in the [dnn wiki about client resource management][dnn-api-docs] which explains most of it. In general you can say that all Dnn scripts load with priorities below 100, the default for all standard scripts is 100, and from there you can order things as you need them.

We usually prioritize libraries like `2sxc` or `angular.min.js` with 100 or larger, and then place our own script (like an app-blog.min.js) at numbers like 200.

## Understanding Placement

Placement information can only be supplied in 2sxc 8.9 or higher. The three positions are:

* `head` meaning that the resulting data is requested in the HTML header. So it will be loaded before the page is rendered, meaning it's available right from the start but also delays page-build. This is often detrimental in terms of page-load times.  
_this is the default location for CSS files_
* `body` meaning it will be loaded in the beginning of the HTML body tag. Again this means it's there very early, but will slow down page buildup.  
_this is the default location for JS files_
* `bottom` meaning it will be loaded at the end of the html document. This is actually great for page-loading performance to improve _above-the-fold_ loading. But it takes a bit of work to perfect its application.

## Read also

* [Dnn API Documentation][dnn-api-docs]
* [Blog about problems with the Dnn resource management](http://2sxc.org/en/blog/post/the-trouble-with-dnn-javascript-css-minification-aka-client-dependency-resource-management) in case you run into problems

## Demo App and further links

You should find some code examples in this demo App

* basically this is used in every app in the [app-catalog](http://2sxc.org/en/apps)

---

## Old API Before v14

The syntax above using the `@Kit.Page` [IPageService](xref:ToSic.Sxc.Services.IPageService).
It was introduced in v14 and requires your Razor to inherit from [Razor14](xref:Custom.Hybrid.Razor14) or later.
This is the recommended way of doing this. 
But there is also a more manual way for older razor files, like this:

```razor
<link rel="stylesheet" href="/style.css" data-enableoptimizations="true" />
<link rel="stylesheet" href="@App.Path/assets/style.css"
    data-enableoptimizations="150" />
<link rel="stylesheet" href="@App.Path/assets/lazy.css"
    data-enableoptimizations="bottom" />
<script type="text/javascript" src="@App.Path/assets/scripts.js"
    data-enableoptimizations="200:bottom" />
</script>
```

---

## History

1. Introduced in Version 04.00 with true/false
1. Enhanced in Version 06.00 with priority numbers
1. Enhanced in 08.09 with position head/body/bottom


[dnn-api-docs]:http://www.dnnsoftware.com/wiki/client-resource-management-api
