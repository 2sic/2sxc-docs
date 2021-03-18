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

## System Folders

1. `api` this folder contains c# files for the web services this app has. It's not available on the simpler **Content App**.  
    _Note: if you're using [Polymorphism](xref:Basics.Polymorphism.Index) then the api folder is usually in a sub-folder, like `live\api`_
1. `.data\app` this folder may contain a snapshot of the app-data and is usefull when git-versioning your app
1. `.data\.[something]` is usually used for special data like [custom input field configuration](xref:Basics.Browser.EditForm.CustomFields)
1. `system` this folder would contain [custom input fields](xref:Basics.Browser.EditForm.CustomFields)

## Non-Exportable Folders

The following folders and files are special source-code folders and will not be included in export / import of Apps.

1. `.git` is a hidden folder which all github repositories have.
1. `node_modules` is the default folders when you use JS-automation while developing; it can be very large. 
1. `bower_components` contains bower (run-time) dependencies for your JS and can become very large. Normally you will not want this in your app (because it contains a lot of unneeded stuff) so it too will not be exported when you create an app-package. 

## Recommended sub folder names

The following folders have no technical relevance, but we recommend this naming to improve consistency.
1. `src` and sub-folders should contain your javascript source files in original (unminified, etc.)
1. `dist` should contain your processed, minified, uglified and combined JS files  
    _Note: if you're using [Polymorphism](xref:Basics.Polymorphism.Index) then the dist folder is usually in a sub-folder, like `live\dist`_
