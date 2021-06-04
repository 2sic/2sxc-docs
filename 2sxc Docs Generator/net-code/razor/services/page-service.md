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

## Setting Page Properties

You can set these page properties

1. `SetTitle(newToPrefix)` or `SetTitle(newTitle, placeholder)`
1. `SetDescription(newDescription)` or `SetDescription(newDescription, placeholder)`
1. `SetKeywords(additionalKeywords)` or `SetKeywords(additionalKeywords, placeholder)`
1. `SetBase(url)`

Note that SetTitle, SetDescription and SetKeywords will prepend or append whatever you give them to the existing value, unless you specify a placeholder - in which case that placeholder will be replaced. 

## Setting Icons and Icon-Sets


## Add Custom Headers


## Add JsonLD Headers (Schema.org)


## Add OpenGraph Headers



## Activate Page Features

An important aspect of Razor solutions is ensuring that the page has helper materials like jQuery etc. 
This gets especially complex in scenarios like Oqtane, where the page doesn't really reload and therefor may already have some scripts / styles loaded, but it's hard to guess. 

For this we have developed a helper called `turnOn` (not documented yet, WIP) and the `PageService` is able to activate this feature (and more in future). Here's how it works

```c#
var page = GetService<ToSic.Sxc.Web.IPageService>();
page.Activate("turnOn");
```

We'll list the keys of features that can be activated, as there will be quite a few. But as of the first release now it's

* `turnOn` - the JavaScript Activation system

_Note: The system is meant to also cascade features - so if you activate a feature which needs other features, these are automatically activated as well._


# TODO: Todoc - not done yet!






[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How to use

This example shows how you enable the UI using Razor, which will allow public users to create data:

```razor
<div>
    @Edit.Enable(api: true, forms: true, context: true, autoToolbar: false)
</div>
```

This example ensures that

1. `api`: basic JS for editing are loaded, allowing you to then run javascript commands like `$2sxc(...).run(...)`
1. `forms`: additional JS is loaded, enabling the standard form dialogs to open
1. `context`: the html contains context-information about the app, so that the dialogs actually work - see also [edit context](xref:Basics.Browser.EditUx.EditContext)
1. the auto-toolbars are disabled (this would generate a default toolbar if no toolbar was specified)

## Usage Notes

This command simply enables editing - but doesn't provide any permissions or show any buttons yet. Here are a few things you must know to get this to work:

1. remember to set [permissions](xref:Basics.Cms.Permissions.Index) to allow what you want to do (like create new draft items for public users)
1. Edit.Enable uses [named parameters](xref:NetCode.Conventions.NamedParameters), so you always have to use the `api: true` syntax
1. the Edit.Enable won't output anything in the position it's added, because it controls the main wrapper
1. you must also create a link or toolbar in your code for the public users, as they won't have a button to press otherwise


## Read also

* [Tutorial app for Public Forms](https://2sxc.org/en/apps/app/tutorial-public-forms-with-2sxc-9-30)
* [Blog Recipe for using Public Forms with 2sxc](https://2sxc.org/en/blog/post/recipe-create-public-forms-with-2sxc)


## History

1. Introduced in 2sxc 12.02 to replace the previous static implementation using [RazorBlade](xref:NetCode.RazorBlade.Index)

