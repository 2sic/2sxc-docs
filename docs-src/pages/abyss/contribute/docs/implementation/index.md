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

1. We also have a neat trick to inline SVGs in the HTML TODO: @iJungleboy (explain, needs 'svg' class, etc.)

1. We implemented a special find Permalink-System for linking to deep docs  
    ➡️ [Find Permalink System](xref:Abyss.Contribute.Docs.Implementation.Permalink)

1. Most projects also support version-switching, so you can switch between versions of the documentation TODO: @iJungleboy

## History of this Docs Setup

### 2024

_Note: we only started documenting this in 2024-12, so it's incomplete._

#### Reduced Time-To-Redirect on XREF to 1 Second

Previously the time to redirect was 3 seconds. We reduced it to 1 second.

* `/templates/shared-global/src/scripts/xref/xref.ts`

Changed: 2024-12-12, `@iJungleboy`

#### Made API-Docs TOC Sidebar not Wrap

Added the `api-toc-sidebar-menus.scss` to prevent the API-Docs TOC from wrapping.

* `/templates/shared-global/src/styles/api-toc-sidebar-menu.scss`
* `/templates/shared-global/src/styles/_index.scss`

Changed: 2024-12-12, `@iJungleboy`

#### Added SVG helpers for colored logos

Added some JavaScripts to inline SVGs on `img` tags with the class `svg`.

This helps for both the logo and images added like this,
so that they will be inlined and behave according to the CSS.
It's especially useful when the SVG uses `currentColor` in it's own CSS.

* `/templates/shared-global/src/scripts/svgs/svg-importer.ts`

Changed: 2024-12-10, `@iJungleboy`

#### Created Attribution System

We created an attribution system to show who wrote which part of the documentation.

Changed: ca. 2024-12-05, `@iJungleboy`

#### Standardized Entire Setup

We put all customizations and docs-instructions in the `2sxc` docs only,
to consolidate everything from 2sxc, Oqtane, RazorBlade and cre8magic.

Implementation:

1. Everything shared is now in `/templates/shared-global`
1. The `/templates/[project]/src` is now the only place for project-specific customizations

Changed: 2024-12-05, `@iJungleboy`, `@tvatavuk`


#### Added Gallery Feature

We created the `<div gallery="name"><!-- img list --></div>` feature to create galleries
with previews etc.

Changed: ca. 2024-12-01, `@iJungleboy`

#### Added Lightbox with Fancybox

We added the Fancybox lightbox to the system, so that images can be opened in a lightbox.

Changed: ca. 2024-11, `@iJungleboy`


#### Added Razor/Blazor Syntax Coloring

We added the Razor/Blazor syntax coloring to the system, so that code can be colored.

Changed: ca. 2024-06, `@tvatavuk`
