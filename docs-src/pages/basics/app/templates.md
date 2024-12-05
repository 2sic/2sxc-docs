---
uid: Basics.App.Templates
---

# Template Files

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .process-razor-app { visibility: visible; }</style>

Template files will generate HTML - often based on the data a editor entered, and/or which was provided from the App.

## Template File Types

The system is built in a way, that furhter templating engines could also be implemented at any time. As of now there are two types of template files: 

1. [Token](xref:Basics.Server.Render.Tokens.Index) (simple but limited) 
1. [Razor](xref:NetCode.Razor.Index) (can do anything you can think of)

## How it Works

Each [View](xref:Basics.App.Views.Index) has a configuration referencing a template file. 2sxc will then decide what type it is, and run the appropriate engine. 

The template files usually reside inside app root folder or sub folder. As of now, there are two types:

* **Razor / MVC** - These always begin with an `_` and end with `.cshtml`. Placeholders and code usually is marked with `@` like `@Content.Name`
* **Tokens** - these always end with `.html`. Placeholders usually look like `[Content.Name]`. Tokens cannot have any server-side code aside from the basic placeholders. 

> [!TIP]
> If your view just hosts a JavaScript SPA, it will also be one of these types of files.

## Re-Using Templates

> [!NOTE]
> **Re-Using in many Views**  
> Sometimes you'll want to use the same template file in multiple Views. This can just be configured at the [View](xref:Basics.App.Views.Index) level

> [!TIP]
> **Re-Using Templates Across Portals**  
> Instead of placing the template in the App-folder of the current portal, 
> you can also place it in a global App-folder in the `_default` portal of Dnn. 
> This is great if you have the same app in many portals, and want to centralize the template.

> [!TIP]
> [Razor Templates](xref:NetCode.Razor.Index) also support re-using template parts or any C# code. 
> You can also pass parameters to these parts, which allows you to share template-code across templates. 

## Read also

* [](xref:Basics.App.Views.Index)
* [](xref:Tut.Razor.Home)
* [](xref:Tut.RazorBlade.Home)

## History

1. Introduced in 2sxc 1.0
1. Automatic View-Polymorphism added in 2sxc 11