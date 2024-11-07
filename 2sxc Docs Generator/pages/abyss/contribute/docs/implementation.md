---
uid: Abyss.Contribute.Docs.Implementation
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
1. The `/templates/2sxc` folder contains all the customizations
    1. The `/partials` folder contains the HTML templates
    1. The `/styles` folder contains the CSS styles
    1. The `/src` folder contains the TypeScript which is compiled with WebPack
1. NPM / WebPack are used to make things better
    1. We use the Fancybox plugin to make images look better. It's installed using NPM and started using custom scripts.
    1. We also reconfigure highlightjs...
1. TODO: Mermaid diagrams
1. TODO: Version Switcher
1. TODO: Permalink-System
1. Todo: TOC customizations
1. TODO: blinking architecture illustrations
1. TODO:

## Configuration

The `docfx.json` file is the configuration file for DocFX. It specifies how to generate documentation from your code and Markdown files.

Our `docfx.json` file is configured to generate documentation from C# project files and pre-parsed JavaScript files, build documentation pages from Markdown and YAML files, copy resource files to the output directory, use overwrite files to provide additional metadata, and use multiple templates to define the layout of the documentation pages. The built documentation is saved to the `../docs` directory.

Here's a breakdown of our `docfx.json` file:

- `"metadata"`: This section is used to configure the metadata extraction process. It specifies the source files to extract metadata from, the destination to save the extracted metadata, and other options that are necessary to compile cs projects using [MSBuildWorkspace](https://gist.github.com/DustinCampbell/32cd69d04ea1c08a16ae5c4cd21dd3a3).

- `"build"`: This section is used to configure the documentation build process. It specifies the source files to build documentation from, the destination to save the built documentation, and other options.

  - `"content"`: This subsection specifies the source files to build documentation from. Each item in the array specifies a set of files and options for those files.

  - `"resource"`: This subsection specifies the resource files to copy to the output directory. Resource files are typically non-documentation files that are used by the documentation, such as images.

  - `"xref"`: This subsection specifies the cross reference map files to use. Cross reference map files provide information about how to link to items in other projects.

  - `"overwrite"`: This subsection specifies the overwrite files to use. Overwrite files provide additional metadata for items in the documentation.

  - `"dest"`: This key specifies the destination directory to save the built documentation.

  - `"template"`: This key specifies the templates to use for building the documentation. Templates define the layout of the documentation pages.

  - `"cleanupCacheHistory"`: This key specifies whether to clean up the cache history.

  - `"disableGitFeatures"`: This key specifies whether to disable Git features.

  - `"globalMetadata"`: This subsection specifies global metadata that is available to all documentation pages.

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

### Razor Source Code Support

DocFX uses highlightjs to highlight code blocks.
By default, it doesn't support Razor syntax highlighting.
 To enable it, we added the following code to the `/2sxc Docs Generator/templates/2sxc/images.ts` file:

```html
