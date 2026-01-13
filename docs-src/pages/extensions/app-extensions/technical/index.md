---
uid: Extensions.AppExtensions.Technical.Index
---

# App Extensions - Technical Docs (new v21 ⭐)

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

This should provide you with some background information how App Extensions work technically.

## App Extensions are per App

An app extension is installed to each app individually.
So each app can have it's own set of extensions.

## App Extension Folders and Files

### App Extension Folders and Files - Minimal

The most basic app extension contains just an `extension.json` file in a folder under `/extensions/your-extension-name/App_Data/`.
Note that the `extension.json` is in the `App_Data` folder, which protects it from external access.

* `/extensions/`
  * `your-extension-name/`
    * `App_Data/`
      * `extension.json`

To create this, you basically have to create the `/extensions/your-extension-name/` folder.
Once this folder exists, it will show up in the Admin UI and allow you to create the `extension.json` file.

The `extension.json` file contains metadata about the extension, such as its name, version, author, and description.
It's the basic requirement to export and distribute an extension.

### App Extension Folders and Files - Comprehensive

In addition to the folder in the `/extensions` location, an app extension can also contain App Code in the `/AppCode/Extensions/your-extension-name/` folder.
Alternatively, if the folder doesn't exist, it will also try to find code in `/AppCode/Extensions/YourExtensionName/` (note the different casing). TODO! NOT YET IMPLEMENTED.

So in summary, the two base folders for any app extension are:

1. `/extensions/your-extension-name/` - for extension configuration and related files
2. `/AppCode/Extensions/your-extension-name/` - for any C# code which will be precompiled
   or `/AppCode/Extensions/YourExtensionName/` - alternative location for C# code

This is the comprehensive list of all files and folders of an App Extension.

* `/extensions/` location to store app extensions and their configurations - in the **App Root**
  * `/your-extension-name/` folder for a specific app extension
    * `/App_Data/` folder to store extension configuration files and other data included in the app
      * `/system/bundles/` where persisted data / content-types / views are stored (if data was included)
      * `extension.json` main configuration file for the app extension
      * `package-index.json` this file only exists if an extension was installed, as it tracks the installed files
    * `/SomeSubfolder/` _optional_ sub folders for organizing additional files related to the app extension
    * `icon.png` _optional_ icon representing the app extension
    * `index.js` _optional_, typical JavaScript file for input field extensions
    * `readme.md` _optional_ readme file providing information about the app extension
    * `Some Razor.cshtml` _optional_ Razor files for custom views or templates
    * `some-script.js` _optional_ JavaScript files for client-side functionality
* `/AppCode/` folder for custom C# code and Web APIs
  * `/Extensions/` location to store code extensions
    * `/Your-Extension-Name/` _optional_ folder for any shared C# code
      * `/Data/` _optional_ folder for a specific data models
        * `Something.cs` C# _partial_ model file with custom adjustments
        * `Something.Generated.cs` C# _partial_ model files which are auto-generated
      * `compile.json` _optional_ file to configure [compilation settings](xref:Extensions.AppExtensions.Create.AppCode.CompilerOptions)
      * `MyExtensionService.cs` C# code file for the code extension
      * `/SomeSubfolder/` _optional_ sub folders for organizing additional code files

## Packaged App Extensions

When an app extension is packaged for distribution, it is bundled into a ZIP file.
The structure of the ZIP file is almost the same as the installed version, with a few differences:

1. There is an additional top-level file called `package-index.json`, which lists all files included in the package.

## How App Extensions Work

In general the code and files included in an extension are treated the same way as if they were part of the app itself.
This means that Razor views, JavaScript files, and C# code can all be used just like regular app files.
The main difference is that the files are organized in a specific folder structure under the `/extensions` and `/AppCode/Extensions` locations.

When an app extension is installed, the system reads the `extension.json` file to get metadata about the extension.

This allows these **parts** of the app to be managed and updated independently from the app itself.

---

## History

App Extensions were introduced in 2sxc v21 as a new way to extend apps with custom functionality.
