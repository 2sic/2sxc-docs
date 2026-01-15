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


## How App Extensions Work

In general the code and files included in an extension are treated the same way as if they were part of the app itself.
This means that Razor views, JavaScript files, and C# code can all be used just like regular app files.
The main difference is that the files are organized in a specific folder structure under the `/extensions` and `/AppCode/Extensions` locations.

When an app extension is installed, the system reads the `extension.json` file to get metadata about the extension.

This allows these **parts** of the app to be managed and updated independently from the app itself.


## App Extension Folders and Files

### App Extension Folders and Files - Minimal

The most basic app extension contains just an `extension.json` file in a folder under `/extensions/your-extension-name/App_Data/`.
Note that the `extension.json` is in the `App_Data` folder, which protects it from external access.

* `/extensions/`
  * `your-extension-name/`
    * `App_Data/`
      * `extension.json`

To create this, you have to _manually_ create the `/extensions/your-extension-name/` folder.
Once this folder exists, it will show up in the Admin UI and allow you to create the `extension.json` file.

The `extension.json` file contains metadata about the extension, such as its name, version, author, and description.
It's the basic requirement to export and distribute an extension.

### App Extension Folders and Files - Comprehensive

In addition to the folder in the `/extensions` location,
an app extension can also contain App Code in the `/AppCode/Extensions/YourExtensionName/` folder
(note that here we prefer the c# naming conventions).
Alternatively, if the folder doesn't exist,
it will also try to find code in `/AppCode/Extensions/your-extension-name/` (identical to `/extensions`).

So in summary, the two base folders for any app extension are:

1. `/extensions/your-extension-name/` - for extension configuration and related files
2. `/AppCode/Extensions/YourExtensionName/` - for any C# code which will be precompiled
   or `/AppCode/Extensions/your-extension-name/`

This is the comprehensive list of all predefined files and folders of an App Extension.

* `/extensions/your-extension-name/` folder for a specific app extension
  * `/App_Data/` folder to store extension configuration files and other data included in the app
    * `extension.json` main configuration file for the app extension
    * `package-index.json` this file only exists if an extension was installed, as it tracks the installed files
  * `App_Data/system/bundles/[bundle-name(s)].json` where persisted data / content-types / views are stored (if data was included)
  * `icon.png` _optional_ icon representing the app extension
  * `index.js` _optional_, typical JavaScript file for input field extensions
* `/AppCode/Extensions/YourExtensionName/` folder for custom C# code and Web APIs
  * `/Data/` _optional_ folder for a specific data models
    * `[Something].cs` C# _partial_ model file with custom adjustments
    * `[Something.Generated].cs` C# _partial_ model files which are auto-generated
  * `compile.json` _optional_ file to configure [compilation settings](xref:Extensions.AppExtensions.Create.AppCode.CompilerOptions)

Add any other files and folders as needed to implement the desired functionality of your app extension.


## Packaged App Extensions

When an app extension is packaged for distribution, it is bundled into a ZIP file.
The structure of the ZIP file is almost the same as the installed version, with a few differences:

1. There is an additional top-level file called `package-install.json`,
    which lists all things (in this case extensions) included in the package.
    This file is not copied to the target App, as it's only needed for installation.
1. The `package-index.json` file inside each extension folder is generated on export and included in the ZIP.
    It is also copied to the App, to track installed files and detect any manual changes later on.
1. The `extension.json` get a minor adjustment,
    so that the system can differentiate between extensions installed from packages and those created directly in the App.
    This changes certain features, such as allow export, etc.




---

## History

* App Extensions were introduced in 2sxc v21 as a new way to extend apps with custom functionality.
