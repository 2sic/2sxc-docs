---
uid: Basics.App.ExportImport.App.Json
---

# App Export Configuration

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  { visibility: visible; }
</style>

Starting in v14.10 you can override some export behavior.
This is done using the `/App_Data/app.json` file.

You can find out more about the [app.json here](xref:Basics.App.FoldersAndFiles.AppJson).
The rest of this page is for configuring the export.


## Default Export Behavior (v7+)

By default (eg. if you don't have an `app.json`), the following folders will not be included in the ZIP file:

The following folders and files are special source-code folders and will not be included in export / import of Apps.

1. `.git` git versioning data
1. `.vs` visual studio code settings
1. `node_modules` location for NPM javascript packages for development
1. `bower_components` location for javascript packages, similar to NPM but older

## Configurable Behavior

When Webpack5 came along, it also needed the folder `.temp_cache`.
So it became clear, that we shouldn't hard wire a list, but make it configurable.
This uses the [/App_Data/app.json](xref:Basics.App.FoldersAndFiles.AppJson).

Example:

```jsonc
{
  "$schema": "https://schemas.2sxc.org/app/v17/app.json",
  /*
    This is a JSON file but it is treated like a JSONC (with comments).

    Different editors may complain about the comments. 
    To reconfigure VS Code so it knows comments are ok, do this: https://azing.org/2sxc/r/h9m1l6JO
  */

  "export": {
    "exclude": [
      // Skip git versioning folders, github config folders
      ".git/",
      ".github/",
      // ".gitignore",

      // Webpack 5 temporary folder and NPM folders
      ".temp_cache/",
      "node_modules/",

      // Other examples
      // ".vs",
      // ".vscode",
      // "package.json",
      // "package-lock.json",
      // "nuget.config",
    ]
  }

}
```

---

## History

* Default behavior since v7
* Configurable since v14.10
