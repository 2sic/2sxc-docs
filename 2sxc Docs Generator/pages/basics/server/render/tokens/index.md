---
uid: Basics.Server.Render.Tokens.Index
---
# Token Templates

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .process-razor { visibility: visible; } </style>

Token Templates will generate HTML - often based on the data a editor entered, and/or which was provided from the App.

> [!NOTE]
> The [View](xref:Basics.App.Views.Index) determines which template file is being loaded. 

> [!TIP]
> Token templates are by far not as powerful as [Razor Templates](xref:NetCode.Razor.Index). We always recommend Razor. 

## Example Template

```html
<h1>[Header:Title]</h1>
<ul>
  <repeat>
    <li><a href="[Content:Link]">[Content:Title]</a> [Content:Toolbar]</li>
  </repeat>
</ul>
```

## How it Works

Token templates use a Token Engine to generate Html. The convention uses placeholders like `[Scope:Property]` to put data into the Html. 

The template files usually reside inside app root folder or sub folder. These end with `.html`. 
Placeholders and code usually is marked with `[...]` like `[Content:Name]`.

Internally the Token-Engine uses [LookUps](xref:Abyss.Parts.LookUp.Index) to find what can be shown. 

> [!TIP]
> Tokens are very limited, we strongly recommend to use [Razor Templates](xref:Basics.Server.Render.Razor.Index) templates instead. 

Read more about it in the [Token Basics](https://2sxc.org/en/learn/token-templates-and-views)

## Content, Presentation and Toolbar Tokens

1. `[Content:PropertyName]` like `[Content:FirstName]`
1. `[Content:Presentation:PropertyName]` like `[Content:Presentation:UseLightbox]`
1. `[Content:Toolbar]` to get a [Toolbar](xref:NetCode.Razor.Edit.Toolbar) for the Content-object with it's [Presentation](xref:Basics.Content.Presentation)

Token Toolbars only support the basic toolbar, not the newer **TagToolbar**. Read more about [Toolbars](xref:NetCode.Razor.Edit.Toolbar).

## Header Tokens

Note that in Token-templates the `Header` is called the `ListContent` for historical reasons, not `Header` like in Razor.

1. `[ListContent:PropertyName]` like `[ListContent:Title]`  
1. `[ListContent:Toolbar]` for the toolbar
1. `[ListContent:Presentation:PropertyName]` like `[ListContent:Presentation:UseLightbox]`  

## Common LookUp Sources

[!include[](~/pages/abyss/parts/look-up/_include-common-sources.md)]

Read more about [LookUp Sources](xref:Abyss.Parts.LookUp.Sources)

## Repeaters / Lists

Token templates have a trivial mechanism to loop through lists. Note that we strongly recommend you use [Razor Templates](xref:Basics.Server.Render.Razor.Index) instead. Here's how it works:

```html
<ol>
  <repeat repeat="Item in Data:Default">
    <li>
      [Item:Title] [Item:Toolbar] <br>
      <a href="?details=[Item:UrlKey]">Details...</a>
    </li>
  </repeat>
</ol>
```

In a repeater the Toolbar can be added using `[repeater-name:Toolbar]`.

## Read also

* [Views](xref:Basics.App.Views.Index)
* [Templates](xref:Basics.App.Templates)
* [Razor Templates](xref:NetCode.Razor.Index)
* [Razor Tutorial](https://2sxc.org/dnn-tutorials/en/razor)

## History

1. Introduced in 2sxc 1.0