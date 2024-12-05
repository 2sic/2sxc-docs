---
uid: Abyss.Contribute.Docs.Implementation.DocfxTemplates
---

# Implementation: DocFx Templates


DocFX uses [templates](https://dotnet.github.io/docfx/docs/template.html)
to transform the structured data model into the final static website.
It is configured in `/docfx.json` in the `build/template` section:

```json
  "template": [
    "default",
    "modern",
    "templates/2sxc", // or "Oqtane" / "cre8magic"
  ],
```

It basically uses "stacked" system of settings, HTML, CSS and JavaScript which is used to generate the final documentation.
The idea is that a base template `default` provides a lot of defaults, `modern` will add Bootstrap 5 and then the project-specific template will add all the customizations, custom logos etc.

This is the basic structure:

1. `default` is the base template to generate everything.
    It's not in the code, docfx keeps its own copy.
1. `modern` is a standard Bootstrap 5 template which builds on the default
1. `/templates/2sxc/` contains all the customizations

The `default` and `modern` templates are provided by DocFX, while the `2sxc` template is custom-made for 2sxc. We won't explain the built-in templates here, but focus on the custom template.

> [!TIP]
> Sometimes when debugging it's useful to find out what the default templates do,
> so you can understand what's happening.
> You can tell docfx to output the generated HTML files to a folder
> by running `docfx template export modern`, so you can inspect them.
>
> You can also find the raw source code for the templates in [GitHub](https://github.com/dotnet/docfx/tree/main/templates/modern).

## The `/templates/[project]` Folder

If you ever need to do anything here, this is what you need to know:

1. `.../build-toc` has our custom scripts to enhance the C# API TOC (explained later)
1. `.../layout` contains the HTML [Mustache](http://mustache.github.io/) layout files, but only the ones we customized
1. `.../public` contains the CSS and JavaScript files which are published by docfx.
    _Do not work in the `public` folder, as we generate the files from the `src` folder._
1. `.../src` contains the TypeScript files which are compiled to the `public` folder
1. `.../toc.json.js` is a special script which enhances the C# API TOC (explained later)
1. `.../build-toc-specs.js` is a special script which enhances the C# API TOC (explained later)

More info:

* [Introduction to the DocFX Template System](https://dotnet.github.io/docfx/tutorial/intro_template.html).
* [How-to: Create A Custom Template](https://dotnet.github.io/docfx/tutorial/howto_create_custom_template.html)


## Custom Template in this Docs Projects

We try to customize as little as possible, to make updates easier.
These are the things we usually customize:

1. Some changes to the layout - usually in `.../layout/_master_.tmpl`

1. Some magic changes to the C# Namespace TOC - usually in `.../toc.json.js`

1. Some changes to CSS, in `.../src/styles/*.scss`

1. Some additional JS, in `.../src/*.ts`

Note that the CSS/JS changes are compiled using WebPack (explained later) and copied to two locations at the same time:

* `/templates/[project]/public` - where docfx will get them on every build
* `/docs/public` - where the docs are, so we can dev/refresh without running docfx

We try to avoid customizing anything else, as it will make updates harder.
Specifically ATM we don't use

* DocFx Transformers
* DocFx Renderers
* DocFx Partials

    
1. The `/templates/2sxc/toc.json.js` is run by docfx to customize the C# API TOC
1. The `/templates/2sxc/src` folder contains the TypeScript which is compiled with WebPack to the `/public` folder
    1. the `/main.ts` file is the main entry point
    1. ... with a special export for docfx
        1. Which will reconfigure `highlightjs` to support Razor syntax
    1. ... and an on-Load watcher
        1. Which will add a lightbox to all images using Fancybox (installed through NPM)
        1. ...and gallery functionality
        1. it will add a version switcher
        1. it will add a permalink XREF system
        1. it will add blinking architecture illustrations
1. NPM / WebPack are used to make things better


## Template Customizations

### Special JavaScripts and WebPack

We have some special TypeScript code which enhances the documentation, like the lightbox feature for images.
This is in the `/2sxc Docs Generator/templates/2sxc/main.ts` file.

It is built with WebPack and must be started manually to compile.
Note that you can run WebPack and make ongoing changes without rebuilding the whole documentation.

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
