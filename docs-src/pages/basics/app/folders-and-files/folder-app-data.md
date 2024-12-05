---
uid: Basics.App.FoldersAndFiles.FolderAppData
---

# `App_Data` Folder

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-assets-app { visibility: visible; }</style>

The `/App_Data` folder is special.
Files in this folder cannot be downloaded by the user, as IIS prevents access to it.

This makes it the right choice for files which contain confidential information, like the [`app.json` file](xref:Basics.App.FoldersAndFiles.AppJson).

## Security Notes

* When running DNN you will always run it on IIS, so the `/App_Data` folder is protected.
* When running Oqtane, the `/App_Data` folder is actually not accessible through http, so the protection is guaranteed on all platforms.

## What does 2sxc place in App_Data?

Basically

* the `app.json` file
* data snapshots like the `app.xml` file, which contains all the data in the DB, so it could be confidential  
  _Note: this is not at runtime, but is useful when git-versioning your app_

---

## History

1. App_Data use introduced ca. v14.10
