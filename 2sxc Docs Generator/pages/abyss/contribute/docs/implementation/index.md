---
uid: Abyss.Contribute.Docs.Implementation.Index
---

# Technical Implementation of the Docs

## Output & Hosting

This documentation is static HTML which can be hosted on any web server.

As of now it's hosted an GitHub Pages, which automatically hosts the `/docs` folder of this repository.

## How it Works

The way it works is that it takes data from 2 sources

1. All the comments in the C# source code referenced in `docfx.json`
1. All the markdown files in the [2sxc docs](https://github.com/2sic/2sxc-docs) repo

...and merges them together to create HTML.

When pushed back to the repo, GitHub which automatically hosts the final solution on <https://docs.2sxc.org>

## The Parts that Make it Work

Since this is a large documentation it needs a bit more than just the standard DocFX setup.
Here is an overview as to what is really implemented:

1. DocFX will build everything based on the configuration in `docfx.json`
    1. It will also use the `/xrefmap.yml` which contains manually managed short links
    1. It also uses the `/filterConfig.yml` to decide what C# code to include/exclude
1. The [Templates](xref:Abyss.Contribute.Docs.Implementation.DocfxTemplates) generate everything, add JS and much more
1. The `/templates/2sxc/toc.json.js` is run by docfx to enhance the C# API TOC
1. The `/templates/2sxc/src` folder contains the TypeScript which is compiled with WebPack to the `/public` folder

More...

1. TODO: Mermaid diagrams
1. TODO: Version Switcher
1. TODO: Permalink-System
1. TODO: blinking architecture illustrations
1. TODO: JavaScript Types and Sources...

## Template Customizations

### Special JavaScripts and WebPack

We have some special TypeScript code which enhances the documentation, like the lightbox feature for images.
This is in the `/2sxc Docs Generator/templates/2sxc/main.ts` file.

It is built with WebPack and must be started manually to compile.
Note that you can run WebPack and make ongoing changes without rebuilding the whole documentation.

### Razor Source Code Support

DocFX uses highlightjs to highlight code blocks.
By default, it doesn't support Razor syntax highlighting.

To enable it, we added the following code to the `/2sxc Docs Generator/templates/2sxc/images.ts` file:

```html
TODO:
```
