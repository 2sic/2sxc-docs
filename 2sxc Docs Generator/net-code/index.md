---
uid: NetCode.Index
---

# C#, Razor & Dynamic Code (WIP)

When people implement solutions using 2sxc, most of their server-side code will be written in C# to create one of the following:

1. Custom Razor templates (`_*.cshtml` files)
1. Shared Razor snippets (`_*.cshtml` files)
1. Razor Code-Behind files (`_*.code.cshtml` files)
1. Custom WebApi controllers (`*Controller.cs` files in the `api` folder)
1. Helper code (`*.cs` files in any folder)

> [!TIP]
> All of these files are in your App folder as **Dynamic Code**, which has three core features:
> 
> 1. The code remains as source code in the app-folder, ready to be changed at any time
> 1. Changes are immediately live without restarting or recompiling the system
> 1. Cool APIs 😎 help this code work with dynamic data (Entities) having dynamic properties

## Quick Example

The variable `person` in the following Razor template is a **Dynamic Entity** - meaning that it can have different properties depending on the configuration. In this case it seems to have `FirstName`, `LastName` and `Gender`. 

```razor
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

1. [Dynamic Code](xref:NetCode.DynCode.Index) which explains the shared API (objects, commands) available on all Dynamic Code parts, whether Razor, WebApi or other.
1. [Razor](xref:NetCode.Razor.Index) which explains the APIs special to Razor templates
1. [Web API](xref:WebApi.Custom) explains everything you need to know to create/customize Web API Controllers
1. [External API](xref:HowTo.External) guides you to access 2sxc-instances on the server from WebForms or other MVC components




---

This is the C# .net API Documentations, usually meant for Razor-Templates, custom Web-APIs or when accessing 2sxc-instances from external code.

[!include["Tip Inherits"](razor/shared-tip-inherits.md)]

## Working with C# Razor Templates
1. [C# API in a normal Razor Template](xref:HowTo.Razor.Templates)
1. [LINQ Data Handling examples](xref:Specs.DataSources.Linq) on working with relationships, filtering etc.

## Important APIs when Working with Content-Items/Data

1. [Dynamic Entities](xref:HowTo.DynamicCode.DynamicEntity) (DynamicEntity / AsDynamic)
1. [IEntity](xref:HowTo.DynamicCode.Entity) - the complex data object for advanced use cases
1. [DataSource](xref:Specs.DataSources.DataSource) and [DataStream](xref:ToSic.Eav.DataSources.IDataStream), the core concept for data read/processing/delivery
    1. [List of all DataSource Objects](xref:Specs.DataSources.ListAll)
    2. [Querying Data and Data Sources with code and LINQ](xref:Specs.DataSources.Linq)
    3. [how to create custom data sources](http://2sxc.org/en/blog/post/new-2sxc7-create-your-own-custom-datasource-for-visual-query)

## Advanced APIs

1. [WebService API](xref:WebApi.Custom) to create your own web services in your apps
1. [Content-Blocks API](xref:HowTo.Razor.Blocks) to render inner-content (see also the [concept](xref:Specs.Cms.InnerContent))



