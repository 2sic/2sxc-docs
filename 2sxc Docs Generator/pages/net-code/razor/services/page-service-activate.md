---
uid: NetCode.Razor.Services.IPageServiceActivate
---

# Page Service to Activate Features & WebResources (JS, CSS, etc.)

The PageService helps Razor templates to activate features and load predefined JS/CSS (WebResources).

An important aspect of Razor solutions is ensuring that the page has helper materials like jQuery etc.
This gets especially complex in scenarios like Oqtane, where the page doesn't really reload and therefor may already have some scripts / styles loaded, but it's hard to guess.

For this we have developed a helper called [`turnOn`](xref:JsCode.TurnOn.Index) and the `PageService` is able to activate this feature (and more in future).

> [!TIP]
> Using the `IPageService.Activate(...)` ensures that all apps use the same resources, and that these are only loaded once per page.

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Difference between features and WebResources**

* **Features** are some system-specific JS/CSS (like jQuery or turnOn)
* **WebResources** are JS/CSS which are configured in Settings, so you can use the preset WebResources or define your own at the App, Site or Installation. Examples are `fancybox4`, `Bootstrap5` etc.

## Activate Page Features

A simple example:

```c#
var page = GetService<ToSic.Sxc.Services.IPageService>();
page.Activate("jQuery");                          // Activate jQuery
page.Activate("turnOn");                          // Activate turnOn
page.Activate("jQuery", "turnOn", "2sxc.JsCore"); // Activate many
```

This will ensure that jQuery and [turnOn](xref:JsCode.TurnOn.Index) are available on the page.
Note that it will only be activated once, even if the code would accidentally activate it multiple times.

Features you can activate as of v12.02

* `jQuery`  - activate jQuery if you need it - recommended for Dnn, required for Oqtane 2.2+  
    _note: we really want to discourage the use of jQuery - so avoid if possible_
* `turnOn` - [the JavaScript turnOn Activation system](xref:JsCode.TurnOn.Index)
* `2sxc.JsCore` - the 2sxc standard JS APIs.  
    Replaces `@Edit.Enable(js: true)` _new in v13_
* `2sxc.JsCms` - 2sxc JS APIs to run commands for edit, etc.  
    Replaces `@Edit.Enable(api: true)` _new in v13_  
    Includes `2sxc.JsCore`
* `2sxc.Toolbars` - _allow_ edit-toolbars on the page.  
    Replaces `@Edit.Enable(js: true, api: true, styles: true)` _new in v13_  
    Includes `2sic.JsCms` and `2sic.JsCore`
* `2sxc.ToolbarsAuto` - _auto-show_ edit-toolbars on the page.  
    Replaces `@Edit.Enable(js: true, api: true, styles: true, autoToolbar: true)` _new in v14_  
    Includes `2sxc.Toolbars`, `2sic.JsCms` and `2sic.JsCore`
* `Cms.Wysiwyg` - activate special CSS for content made in the rich WYSIWYG editor _WIP in v15.01_  
    Usually auto-activated by `CmsService.Show(some-wysiwyg-field)`

_Note: The system will auto-cascade features - so if you activate a feature which needs other features, these are automatically activated as well._

Features that are explicitly not implemented

1. jQueryUI is often used in ASP.net but it's really old and hasn't had updates since 2016
1. knockoutJS is often used in ASP.net but it's also barely alive, so it's not meant to be activatable in modern systems like the ones usually built with 2sxc

## Activate WebResources

Any WebResources registered in the settings can be activated. Here's an example:

```c#
var page = GetService<ToSic.Sxc.Services.IPageService>();
page.Activate("Bootstrap5");                // Activate Bootstrap5 from a CDN
page.Activate("fancybox4");                 // Activate fancybox4 from a CDN
page.Activate("fancybox3", "FontAwesome5"); // Activate the older fancybox + FontAwesome5
```

You can define your own WebResources in the Settings, or check out the list of [pre-defined WebResources](xref:Basics.Configuration.Settings.WebResources).


## History

1. Introduced in 2sxc 12.02 to replace the previous static implementation using [RazorBlade](xref:NetCode.RazorBlade.Index)
1. Activating WebResources added in 2sxc 12.04
