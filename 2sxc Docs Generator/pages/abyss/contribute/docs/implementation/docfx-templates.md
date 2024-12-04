---
uid: Abyss.Contribute.Docs.Implementation.DocfxTemplates
---

# Implementation: DocFx Templates

1. `/templates/default` is the base template to generate everything.
    It's not in the code, docfx keeps its own copy.
1. `/templates/modern` is a standard Bootstrap 5 template which builds on the default
1. The `/templates/2sxc` folder contains all the customizations
    1. The `/layout/_master.tmpl` contains the HTML layout
    1. The `/partials` folder would fragment HTML templates with placeholders (but not in use)
    1. The `/public` folder contains the CSS styles and _compiled_ JavaScript
1. The `/templates/2sxc/toc.json.js` is run by docfx to enhance the C# API TOC
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


## Templates

DocFX uses [templates](https://dotnet.github.io/docfx/docs/template.html) to transform the structured data model into the final static website. It is configured in `2sxc Docs Generator\docfx.json` in the `template` section:

```json
    "template": [
      "default",
      "statictoc",
      "material/material",
      "templates/2sxc"
    ],
```

It has a few pre-defined templates, including:

1. `default`: This template contains the basic layout of a website, including the home page, table of contents, and other necessary parts of a website.

2. `statictoc`: This template generates a website with a static table of contents.

3. `material/material`: It is a modern **material** template with a responsive design.

We also created 2sxc custom templates for DocFX in `/2sxc Docs Generator/templates/2sxc` composed of several parts:

- **Transformers** in `templates\2sxc` are responsible for transforming the data model into another data model. They are written in JavaScript and are used to transform the data model into another format.
- **Templates** in `partials` folder define how to render the data model into the final document. They are responsible for generating the HTML from the data model. The placeholders (like {{title}}) are written in [Mustache](http://mustache.github.io/), a logic-less templating language. They are replaced with actual values from the data model when DocFX generates the documentation.
- **Styles** in `styles` folder are written in CSS and are used to style the final document.
- **Renderers** in `styles` folder are responsible for rendering the data model into the final document. They are written in JavaScript and are used to render the data model into other formats, such as HTML.

More info:

- [Introduction to the DocFX Template System](https://dotnet.github.io/docfx/tutorial/intro_template.html).
- [How-to: Create A Custom Template](https://dotnet.github.io/docfx/tutorial/howto_create_custom_template.html)

## Template Customizations

### Special JavaScripts and WebPack

We have some special TypeScript code which enhances the documentation, like the lightbox feature for images.
This is in the `/2sxc Docs Generator/templates/2sxc/main.ts` file.

It is built with WebPack and must be started manually to compile.
Note that you can run WebPack and make ongoing changes without rebuilding the whole documentation.

