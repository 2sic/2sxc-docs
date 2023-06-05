---
uid: Abyss.Contribute.Docs
---

# How to contribute to this documentation

This documentation is a github page created with [docfx](https://dotnet.github.io/docfx/index.html) stored in a github repository here: https://github.com/2sic/2sxc-docs

The way it works is that it takes data from 2 sources

1. All the comments in source code
1. All the markdown files in the [2sxc docs](https://github.com/2sic/2sxc-docs) repo

...and merges them together to create HTML. It's then pushed back to the repo, which automatically hosts the final solution on https://docs.2sxc.org

## Working with images and asset-files

Adding images is very difficult when editing online (there's no upload feature) but it's very easy when editing offline, because you can create folders and push them back. Please use the following structure for now

* assets (contains all the assets)
  * logos (contains various logos, for re-use)
  * contribute (assets for the page _Contribute_)
  * \[page-name\] (assets for each specific page)

If you have any other image/file needs which need different structure, please discuss with Daniel @iJungleboy.


## About the Markdown Syntax

If you're new to wikis or github comments / documentation, you may be a bit lost when it comes to markdown. I think the most important things you need to know are:

* Headers have 1-6 hashes in front, like `## Header 2`
* **bold** uses two \* chars around the text, _\_italic\__ uses one \_ char, escaping chars uses the \ slash (so any character right after a \\ is shown and doesn't format)
* Linking has many options, better read the manuals
* Lists have many options, better read the manuals
* Images use a \!\[alt-text\](/assets/path/file.ext) syntax
* Note that line-breaks usually don't cause a line-break in the result (except in code-samples). You can enforce a simple line break by adding two spaces at the end of a line like "check out:  " (two spaces after the ":")

Inline code starts and ends with a "\`" character - like \`code\` - it will then look like `code`

Multi-line code blocks start with three of these, like
\`\`\`
var x = 17; // a comment
\`\`\`
resulting in
```
var x = 17; // a comment
```
Multi-line code with syntax highlighting needs you to specifiy the language c#:
\`\`\`c#
var x = 17; // a comment
\`\`\`
resulting in
```cs
var x = 17; // a comment
```

## Pre-Requisites

Before beginning with the documentation process, ensure that you have set up the complete 2sxc/EAV development environment. This environment should be configured and functional for the development of C# and JavaScript code. For more information on this setup, please refer to the [Code](xref:Abyss.Contribute.Code) documentation.

The documentation tool we use is **docfx**, which needs to be installed on your development machine. You can install it using the following command:

```cmd
dotnet tool install -g docfx
```

Install node modules for npm tasks:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
npm ci
```

## Getting Started

The documentation development takes place in this [2sxc-docs](https://github.com/2sic/2sxc-docs) GitHub repository. The documentation is generated from *.yml and *.md files and 2sxc/EAV's C# and JavaScript source code.

The npm task **import** is an optional step, used only when there is a need to prepare JavaScript-related files for inclusion in the documentation.

To execute this task, navigate to the `2sxc Docs Generator` directory and run the **import** task with npm. Here are the necessary commands:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
npm run import
```

This command will execute the **import** task defined in your **package.json** file, preparing your 2sxc JavaScript related files for documentation generation.

To build and run your local version of the documentation, follow these steps:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
docfx build docfx.json --serve
```

Once the documentation server is running, you can access it via your web browser at http://localhost:8080.

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

We also created 2sxc custom templates for DocFX in `2sxc Docs Generator\templates\2sxc` composed of several parts:

- **Transformers** in `templates\2sxc` are responsible for transforming the data model into another data model. They are written in JavaScript and are used to transform the data model into another format.
- **Templates** in `partials` folder define how to render the data model into the final document. They are responsible for generating the HTML from the data model. The placeholders (like {{title}}) are written in [Mustache](http://mustache.github.io/), a logic-less templating language. They are replaced with actual values from the data model when DocFX generates the documentation.
- **Styles** in `styles` folder are written in CSS and are used to style the final document.
- **Renderers** in `styles` folder are responsible for rendering the data model into the final document. They are written in JavaScript and are used to render the data model into other formats, such as HTML.

More info:
- [Introduction to the DocFX Template System](https://dotnet.github.io/docfx/tutorial/intro_template.html).
- [How-to: Create A Custom Template](https://dotnet.github.io/docfx/tutorial/howto_create_custom_template.html)

## Troubleshooting

To verify whether docfx can successfully build the documentation, use the following command:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
docfx
```

The successful execution of this command should display the message: `Build succeeded`.

If docfx encounters an error when building a .NET project, you can manually attempt to build the project. This allows you to get more information about the error and address it. You can do this with the following commands:

```cmd
cd c:\Projects\2sxc\2sxc\Src\Dnn\ToSic.Sxc.Dnn
dotnet build
```

Upon successful execution, you should see the message: `Build succeeded`.


## Copyright

![CC-BY](https://licensebuttons.net/l/by/4.0/88x31.png)
All docs are licensed as [CC-BY](https://creativecommons.org/licenses/by/4.0/). By contributing you agree that your work can be used in this way.
