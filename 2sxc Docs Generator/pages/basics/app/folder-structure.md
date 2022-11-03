---
uid: Basics.App.FolderStructure
---

# App Folder Structure

Every app has an own folder for its files. Within that folder the App can have zero or hundreds of folders.

* all apps are located in `[portal-root]\2sxc\[app-name]`
* the _primary_ / _Content_ App is located in `[portal-root]\2sxc\Content`

You can create your own folders to organize your templates as you need as the structure is completely open.

## System Files

* `app-icon.png` is always used as the [app-icon](xref:Basics.App.Icons) if provided
* `App_Data/app.json` is an optional configuration file, see [app.json](xref:Basics.App.ExportImport.App.Json)

## System Folders

1. `api` this folder contains c# files for the web services this app has. It's not available on the simpler **Content App**.  
    _Note: if you're using [Polymorphism](xref:Basics.Polymorphism.Index) then the api folder is usually in a sub-folder, like `live\api`_
1. `App_Data` (previously `.data`) this folder may contain a snapshot of the app-data and is usefull when git-versioning your app
1. `App_Data\[something]` (previously `.data\.[something]`) is usually used for special data like [custom input field configuration](xref:Basics.Browser.EditForm.CustomFields)
1. `system` this folder would contain [custom input fields](xref:Basics.Browser.EditForm.CustomFields)

## Non-Exportable Folders

Some folders are not exported by default, and in v14.10+ you can configure it in more detail.
See [Export restrictions and app.json](xref:Basics.App.ExportImport.App.Json)

## Recommended sub folder names

The following folders have no technical relevance, but we recommend this naming to improve consistency.

1. `src` and sub-folders should contain your javascript source files in original (unminified, etc.)
1. `dist` should contain your processed, minified, uglified and combined JS files  
    _Note: if you're using [Polymorphism](xref:Basics.Polymorphism.Index) then the dist folder is usually in a sub-folder, like `live\dist`_

## Platform Differences Dnn ☢️ & Oqtane 🩸

In Dnn ☢️ the App-folder is located in

`[Website-Root]\Portals\[site-id]\2sxc\[App-Folder-Name]`

In Oqtane 🩸 the App-folder is located in

`[Website-Root]\2sxc\[Site-Id]\[App-Folder-Name]`

This difference is due to architecture and security differences.
