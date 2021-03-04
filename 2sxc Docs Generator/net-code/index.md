---
uid: NetCode.Index
---

# C#, Razor & Dynamic Code

When people implement solutions using 2sxc, most of their server-side code will be written in C# to create `.cs` or `.cshtml` files in the App folder:

1. Razor components, shared Razor and Razor Code-Behind (`_*.cshtml` & `_*.code.cshtml`)
1. Custom WebApi controllers (`*Controller.cs` files in the `api` folder)
1. Shared code (`*.cs` files in any folder)

> [!TIP]
> These files are in your App folder as **Dynamic Code** and have three core features:
> 
> 1. The source code can be changed at any time
> 1. Changes are immediately live without restarting the CMS
> 1. Cool APIs 😎 help you work with dynamic data (Entities) 


## Quick Example

The variable `person` in the following Razor template is a **Dynamic Entity** - meaning that it can have different properties depending on the configuration. In this case it seems to have `FirstName`, `LastName` and `Gender`. 

```html
<div @Edit.Toolbar(person)>
  @person.FirstName @person.LastName - @Text.First(person.Gender, "unknown")
</div>
```

The code first creates a `div` tag which would show a hover-toolbar (to admins only) for editing the `person`. It then shows the names and the gender - which if not determined will show as `unknown`. 

> [!NOTE]
> This kind of code is easy understand for people who know HTML. 
> It's also very easy to customize if you need a different output - since it's basically HTML and placeholders. 

## What's Where

This documentation contains the following sections

1. [Dynamic Code](xref:NetCode.DynamicCode.Index)  
    The shared API on all Dynamic Code - Razor, WebApi or other.
1. [Razor](xref:NetCode.Razor.Index)  
    The APIs special to Razor templates
1. [Web API](xref:WebApi.Custom)  
    Everything you need to know to create/customize Web API Controllers
1. [External API](xref:HowTo.External)  
    Guides you to access 2sxc-instances on the server from the Theme, WebForms or other MVC components




---


## Important APIs when Working with Content-Items/Data

1. [DataSource](xref:Specs.DataSources.DataSource) and [DataStream](xref:ToSic.Eav.DataSources.IDataStream), the core concept for data read/processing/delivery
    1. [List of all DataSource Objects](xref:Specs.DataSources.ListAll)
    3. [how to create custom data sources](http://2sxc.org/en/blog/post/new-2sxc7-create-your-own-custom-datasource-for-visual-query)

## Advanced APIs

1. [Content-Blocks API](xref:NetCode.Razor.Blocks) to render inner-content (see also the [concept](xref:Specs.Cms.InnerContent))


