---
uid: NetCode.Index
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-process .process-cs { visibility: visible; } </style>

# C#, Razor & Dynamic Code

When you implement solutions using 2sxc, most of your server-side code will be written in C#.

## C# Files in 2sxc Apps

You will create many dynamic `.cs` or `.cshtml` files in the App folder:

1. [Razor components](xref:NetCode.Razor.Index) and shared Razor views
1. [WebApi Controllers](xref:NetCode.WebApi.Index) (`*Controller.cs` files in the `api` folder)
1. Shared, pre-compiled App Code (`*.cs` files in each apps `AppCode` folder)
1. Shared code (`*.cs` files in any folder)

> [!TIP]
> These files are in your App folder as **Dynamic Code** and have three core features:
>
> 1. The source code can be changed at any time
> 1. Changes are immediately live without restarting the CMS
> 1. Cool APIs 😎 help you work with dynamic data (Entities)


## Quick Example

The variable `person` in the following Razor template is a special **data object**.
It can have different properties depending on what it represents.
In this case it has `FirstName`, `LastName` and `Gender`.

```razor
<div @Edit.Toolbar(person)>
  @person.FirstName @person.LastName - @Text.First(person.Gender, "unknown")
</div>
```

The code first creates a `div` tag which would show a hover-toolbar (to admins only) for editing the `person`.
It then shows the names and the gender - which if not determined will show as `unknown`.

> [!NOTE]
> This kind of code is easy understand for people who know HTML.
> It's also very easy to customize if you need a different output - since it's basically HTML and placeholders.

## Important APIs

In general the API is split into 5 topics:

1. Data API to get and show data
2. Context API to get information about the current user, page, etc.
3. Settings APIs to get configuration information
4. Edit APIs to show edit toolbars and other edit features
5. Extensive other APIs usually on the `Kit` object to do all kinds of things like JSON parsing, file handling, etc.

## What's Where

This documentation contains the following sections

1. [Dynamic Data](xref:NetCode.Data.Index)
    Everything you need to understand how data, especially dynamic data, works in 2sxc.
1. [Dynamic Code](xref:NetCode.DynamicCode.Index)
    The shared API on all Dynamic Code - Razor, WebApi or other.
1. [Razor](xref:NetCode.Razor.Index)
    The APIs special to Razor templates
1. [Web API](xref:NetCode.WebApi.Index)
    Everything you need to know to create/customize Web API Controllers
1. [External API](xref:NetCode.External.Index)
    Guides you to access 2sxc-instances on the server from the Theme, WebForms or other MVC components




---


## Important APIs when Working with Content-Items/Data

TODO: this must be moved elsewhere

1. [DataSource](xref:NetCode.DataSources.DataSource) and [DataStream](xref:ToSic.Eav.DataSource.IDataStream), the core concept for data read/processing/delivery
    1. [List of all DataSource Objects](xref:Basics.Query.DataSources.Index)
    2. [how to create custom data sources](http://2sxc.org/en/blog/post/new-2sxc7-create-your-own-custom-datasource-for-visual-query)
