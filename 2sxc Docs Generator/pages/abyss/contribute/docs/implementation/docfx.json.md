---
uid: Abyss.Contribute.Docs.Implementation.DocfxJson
---

# Implementation: docfx.json configuration

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