---
uid: NetCode.Razor.Services.IPageService
---

# Page Service to set Title, Headers and Activate Features

In 2sxc 12.02 we introduced the `IPageService` which helps you to do things like

1. Set the page Title, Keywords, Description or Base-Tag
1. Add Meta-headers
1. Add Icons or Icon-Sets
1. Create JsonLD headers
1. Activate page features like [turnOn](xref:JsCode.TurnOn.Index)

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Concept

A Razor template is standalone - the page requests that it's rendered, but there is no official way to also tell the page that the title should change or that certain headers must be set.

We approached it in a futuristic way because we wanted to make sure that the code you write works in Dnn and Oqtane. So here's how it works

1. Your code will get a `IPageService` object using [`GetService\<IPageService\>()](xref:NetCode.DynamicCode.GetService)
1. Your code can then tell it what you need - like `SetTitle(...)` or `AddJsonLd(...)`
1. Once the Razor is done, the engine will forward these requests to the page and ensure it happens

👉 Read about [Dependency Injection](xref:NetCode.DependencyInjection.Index)
👉 Read about the [IPageService in the API docs](xref:ToSic.Sxc.Services.IPageService)

## Set Page Properties

You can set these page properties

1. `SetTitle(newToPrefix)`  
    `SetTitle(newTitle, placeholder)`  
    see [docs](xref:ToSic.Sxc.Services.IPageService.SetTitle*)
1. `SetDescription(newDescription)`  
    `SetDescription(newDescription, placeholder)`  
    see [docs](xref:ToSic.Sxc.Services.IPageService.SetDescription*)
1. `SetKeywords(additionalKeywords)`  
    `SetKeywords(additionalKeywords, placeholder)`  
    see [docs](xref:ToSic.Sxc.Services.IPageService.SetKeywords*)
1. `SetBase(url)` - see [docs](xref:ToSic.Sxc.Services.IPageService.SetBase*)

Note that SetTitle, SetDescription and SetKeywords will prepend or append whatever you give them to the existing value, unless you specify a placeholder - in which case that placeholder will be replaced.

## Set Http Response Codes

In some cases an App may need to set the page to 404 - so that google doesn't index it. Do this using

* `SetHttpStatus(statusCode, optionalmessage)` - see [docs](xref:ToSic.Sxc.Services.IPageService.SetHttpStatus*)

Note: ATM this is Dnn ☢️ only, as Oqtane doesn't render each page at a time - so a status code wouldn't work there (yet).

## Add Icons and Icon-Sets like FavIcon

Icons / FavIcons are minor enhancements to a page, but they serve more than just the icon in the browser tab. In many cases they may also have larger images used for tiles and more. Use these two commands to get them working:

* `AddIcon` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddIcon*) to add a single icon
* `AddIconSet` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddIconSet*) to add a bundle of icons for various use cases in one step

## Add Custom Headers

Custom headers may be important for JavaScripts running on your page or other special purposes. Set them using these methods:

* `AddToHead(string)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddToHead(System.String))
* `AddToHead(tag)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddToHead(ToSic.Razor.Blade.IHtmlTag))
* `AddMeta(name, content)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddMeta*)

## Add JsonLD Headers (Schema.org)

JsonLD is a powerful way to describe your page to other systems, especially web crawlers like Google.
It uses conventions from [schema.org](https://schema.org).
Use this to add custom JsonLD headers:

* `AddJsonLd(jsonString)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.String))
* `AddJsonLd(jsonObject)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.Object))

## Add OpenGraph Headers

OpenGraph is a standard to describe your page for Facebook, Twitter and other more social-style systems.
It adds meta headers using `og:` prefixes. Use these commands to add such headers:

* `AddOpenGraph(propertyName, content)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddOpenGraph*)

## Activate Page Features

👉 See [](xref:NetCode.Razor.Services.IPageServiceActivate)


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Activate JavaScript with TurnOn (new v15)

[TurnOn](xref:JsCode.TurnOn.Index) is a simple JavaScript helper which allows to you _turn on_ / boot
a script when everything it needs has been loaded.
You can do this by creating HTML manually, but in v15 we added a simple helper which makes it easier.

* `TurnOn(runCommand)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.Object))
* `TurnOn(runCommand, require: object)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.Object))
* `TurnOn(runCommand, data: object)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.Object))
* `TurnOn(runCommand, require: object, data: object)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.Object))
* `TurnOn(turnOnSpecs)` - see [docs](xref:ToSic.Sxc.Services.IPageService.AddJsonLd(System.Object))




## History

1. Introduced in 2sxc 12.02 to replace the previous static implementation using [RazorBlade](xref:NetCode.RazorBlade.Index)
1. Enhanced in 12.05
