---
uid: Basics.App.FoldersAndFiles.AppJson
---

# App Configuration `/App_Data/app.json` (improved v17.02)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  { visibility: visible; }
</style>

The `app.json` file is a special config file located in the [protected `/App_Data` folder](xref:Basics.App.FoldersAndFiles.FolderAppData).

This file is _optional_ and serves multiple purposes:

* Control export behavior of the app (eg. which folders to exclude) (v14)
* Control which editions the app has - eg. for Copilot code generation (v17)
* Control code generation behavior (v17 WIP)

## Documentation uses JSON Schema

The `app.json` file is documented using a JSON schema, so you will have intellisense and validation in your editor.
It's best to start with the following minimal json file:

```json
{
  "$schema": "https://schemas.2sxc.org/app/v17/app.json"
}
```

The JSON schema is very exact, so it will indicate which properties are allowed and which are not.
Where possible, it will also provide intellisense for the values, and auto-complete certain defaults.

## Configuration Parts

As of v17.02, the main parts of the `app.json` are:

* `export` - which folders to exclude from export - see [](xref:Basics.App.ExportImport.App.Json)
* `editions` - which editions this app has (see below)
* `copilot` - settings for code generation (WIP)

## Editions

Editions allow you to create multiple variants of the app, which can be used in different scenarios.

* eg. a `bs3` and a `bs4` edition of a bootstrap app - which does the same thing, but with slightly different HTML
* eg `staging` and `live` to develop the next features on a live system without affecting the users

Best read up on [Polymorphism](xref:Basics.Polymorphism.Index) to understand this.

Since 2sxc can't detect if a folder like `layout` is just a folder, or an edition, you must define this in the `app.json`.
Once editions are configured, 2sxc can use this - for example to generate code using the **2sxc Copilot**.

Here's an example of how to configure editions (note that in VS-Code you would get intellisense):

```json
{
  "$schema": "https://schemas.2sxc.org/app/v17/app.json",
  "editions": {
    "": {
      "description": "The root / edition of the app."
    },
    "staging": {
      // This is our default edition - will work in 2sxc 17.03.01+
      "isDefault": true,
      "description": "This is the staging edition of the app",
      // BTW: you can add comments like this
      // This is for a future feature, to auto-copy all files from staging to live
      "deployTo": "live",
      "generateModelsEnabled": true,
    },
    "live": {
      "description": "This is the live edition of the app",
      "generateModelsEnabled": false
    },
  }
}
```


## Schemas

* [app.json index on schemas.2sxc.org](https://schemas.2sxc.org/app/)
* app.json v17 <https://schemas.2sxc.org/app/v17/app.json> (latest 🌟)
* app.json v14 <https://schemas.2sxc.org/app/v14/app.json> (old, not recommended anymore)

---

## History

* Created in v14.10
* Updated in 17.02 with `editions` and `copilot`

Shortlink: <https://go.2sxc.org/app-json>
