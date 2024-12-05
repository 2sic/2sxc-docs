---
uid: Abyss.Releases.History.V14.ExportExcludeInAppJson
---

# New `app.json` with Export Exclude

In older versions, exported apps automatically excluded some folders such sa

* `.git`
* `node_modules`

To allow more control (and also exclude folders such as `.temp_cache` of Webpack5) this is now configurable. 

The configuration is in `[App-Folder]/App_Data/app.json`.

Here's a sample `[App-Folder]/App_Data/app.json` for 14.09+

```json
{
  /*
    This is a JSON file but it is treated like a JSONC (with comments).

    Different editors may complain about the comments. 
    To reconfigure VS Code so it knows comments are ok, do this: https://azing.org/2sxc/r/h9m1l6JO
  */

  // Export-App configuration
  "export": {

    // Exclude certain folders/file beginning with the values specified below
    // Note that it may look like glob, but ATM it's a simpler starts-with mechanism
    "exclude": [
      // Skip git versioning folders, github config folders
      ".git/",
      ".github/",
      // ".gitignore",

      // Webpack 5 temporary folder and NPM folders
      ".temp_cache/",
      "node_modules/"

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

## Behavior if file is missing

Without the file, the previous defaults will be applied.

## Behavior with the file

With this file, all excludes must be mentioned. 
This includes `node_modules` if you don't want it in your export. 

---

Added in v14.09