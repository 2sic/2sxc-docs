---
uid: NetCode.Razor.Services.IPageService
---

# Page Service to set Title, Headers and Activate Features

In 2sxc 12.02 we introduced the `IPageService` which helps you to do things like

1. Set the page Title, Keywords, Description or Base-Tag
1. Add Meta-headers
1. Add Icons or Icon-Sets
1. Create JsonLD headers
1. Activate page features like turnOn


## Concept

A Razor template is standalone - the page requests that it's rendered, but there is no official way to also tell the page that the title should change or that certain headers must be set. 

We approached it in a futuristic way because we wanted to make sure that the code you write works in Dnn and Oqtane. So here's how it works

1. Your code will get a `IPageService` object using [`GetService\<IPageService\>()](xref:NetCode.DynamicCode.GetService)
1. Your code can then tell it what you need - like `SetTitle(...)` or `AddJsonLd(...)`
1. Once the Razor is done, the engine will forward these requests to the page and ensure it happens

👉 Read about [Dependency Injection](xref:NetCode.DependencyInjection.Index)
👉 Read about the [IPageService in the API docs](xref:ToSic.Sxc.Web.IPageService)

## Set Page Properties

You can set these page properties

1. `SetTitle(newToPrefix)`  
    `SetTitle(newTitle, placeholder)`  
    see [docs](xref:ToSic.Sxc.Web.IPageService.SetTitle*)
1. `SetDescription(newDescription)`  
    `SetDescription(newDescription, placeholder)`  
    see [docs](xref:ToSic.Sxc.Web.IPageService.SetDescription*)
1. `SetKeywords(additionalKeywords)`  
    `SetKeywords(additionalKeywords, placeholder)`  
    see [docs](xref:ToSic.Sxc.Web.IPageService.SetKeywords*)
1. `SetBase(url)` - see [docs](xref:ToSic.Sxc.Web.IPageService.SetBase*)

Note that SetTitle, SetDescription and SetKeywords will prepend or append whatever you give them to the existing value, unless you specify a placeholder - in which case that placeholder will be replaced. 

## Set Http Response Codes

In some cases an App may need to set the page to 404 - so that google doesn't index it. Do this using

* `SetHttpStatus(statusCode, optionalmessage)` - see [docs](xref:ToSic.Sxc.Web.IPageService.SetHttpStatus*)

Note: ATM this is Dnn ☢ only, as Oqtane doesn't render each page at a time - so a status code wouldn't work there (yet).

## Add Icons and Icon-Sets like FavIcon

Icons / FavIcons are minor enhancements to a page, but they serve more than just the icon in the browser tab. In many cases they may also have larger images used for tiles and more. Use these two commands to get them working:

* `AddIcon` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddIcon*) to add a single icon
* `AddIconSet` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddIconSet*) to add a bundle of icons for various use cases in one step

## Add Custom Headers

Custom headers may be important for JavaScripts running on your page or other special purposes. Set them using these methods:

* `AddToHead(string)` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddToHead(System.String))
* `AddToHead(tag)` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddToHead(ToSic.Razor.Markup.TagBase))
* `AddMeta(name, content)` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddMeta*)

## Add JsonLD Headers (Schema.org)

JsonLD is a powerful way to describe your page to other systems, especially web crawlers like Google. 
It uses conventions from [schema.org](https://schema.org). 
Use this to add custom JsonLD headers:

* `AddJsonLd(jsonString)` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddJsonLd(System.String))
* `AddJsonLd(jsonObject)` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddJsonLd(System.Object))

## Add OpenGraph Headers

OpenGraph is a standard to describe your page for Facebook, Twitter and other more social-style systems. 
It adds meta headers using `og:` prefixes. Use these commands to add such headers:

* `AddOpenGraph(propertyName, content)` - see [docs](xref:ToSic.Sxc.Web.IPageService.AddOpenGraph*)

## Activate Page Features

An important aspect of Razor solutions is ensuring that the page has helper materials like jQuery etc. 
This gets especially complex in scenarios like Oqtane, where the page doesn't really reload and therefor may already have some scripts / styles loaded, but it's hard to guess. 

For this we have developed a helper called `turnOn` (not documented yet, WIP) and the `PageService` is able to activate this feature (and more in future). Here's how it works

```c#
var page = GetService<ToSic.Sxc.Web.IPageService>();
page.Activate("turnOn");
```

Features you can activate as of v12.02

* `jQuery`  
    _note: in Oqtane 💧 this will include jQuery slim as that is the default. We're still trying to enhance this_
* `jQuery.slim` - this is jQuery without ajax and effects  
    _note: in Dnn ☢ this will include jQuery_
* `jQuery.Ui` - this is the UI component. As it requires jQuery to work, that would be auto-included as well.

We'll list the keys of features that can be activated, as there will be quite a few. But as of the first release now it's

* `turnOn` - the JavaScript Activation system

_Note: The system is meant to also cascade features - so if you activate a feature which needs other features, these are automatically activated as well._



[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]



## History

1. Introduced in 2sxc 12.02 to replace the previous static implementation using [RazorBlade](xref:NetCode.RazorBlade.Index)

