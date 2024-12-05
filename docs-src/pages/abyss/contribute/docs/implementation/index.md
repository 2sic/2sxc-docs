---
uid: Abyss.Contribute.Docs.Implementation.Index
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Docs: Technical Implementation

> [!WARNING]
> This is a technical documentation about how the documentation system works.
> It helps the core team understand how to maintain and enhance the documentation system.
>
> It's not meant for most contributors, as it's too technical.

## Basics

1. The documentation is built with [DocFX](https://dotnet.github.io/docfx/).

1. When compiling, it will take the C# code and the markdown files and merge them together...

1. ...and create a static HTML documentation which can be hosted anywhere - often on GitHub pages.



## The Parts that Make it Work

Since this is a large documentation it needs a bit more than just the standard DocFX setup.
Here is an overview as to what is really implemented:

1. DocFX will build everything based on the configuration in `docfx.json`, `filterConfig.yml` and `xrefmap.yml`  
    ➡️ [Configuration](xref:Abyss.Contribute.Docs.Implementation.Configuration)

1. C# Code Docs generation and Merging with additional docs is very sophisticated.  
    ➡️ [C# Code Docs](xref:Abyss.Contribute.Docs.Implementation.CSharpCode)

1. JavaScript Code Docs generation and Merging with additional docs is a beast!
    ➡️ [JavaScript Code Docs](xref:Abyss.Contribute.Docs.Implementation.JsCode)

1. The Templates generate everything, add JS and much more  
    ➡️ [Templates](xref:Abyss.Contribute.Docs.Implementation.DocfxTemplates)

1. We have some custom magic to improve the C# API TOC  
    ➡️ [TOC Customizations](xref:Abyss.Contribute.Docs.Implementation.TocCustomizations)

1. The `/templates/[project]/src` has TypeScript  and SASS which is compiled with WebPack to the `/public` folder  
    ➡️ see [TypeScript, CSS, WebPack Customizations](xref:Abyss.Contribute.Docs.Implementation.TsCssWebpack)

1. We implemented a special Permalink-System TODO: @iJungleboy

1. Most projects also support version-switching, so you can switch between versions of the documentation TODO: @iJungleboy




More...

1. TODO: Mermaid diagrams
1. Attribution

