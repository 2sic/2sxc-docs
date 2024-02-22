---
uid: Basics.App.FoldersAndFiles.Icons
---

# Icons in Apps

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-assets-app { visibility: visible; }</style>

Icons are a great way to make your app more recognizable and user-friendly.
They are used in many places, like the app-list, the content-type list, the view-list and more.
The most common icons are:

* The App Icon - shown in the app picker, app-admin and apps-management
* The View Icon - shown in the view-picker and view-admin (future)
* Content-Type Icons - shown in the content-type selection in the special [Content App](xref:Basics.App.ContentApp.Index)

## App Icon

App icons are convention based, so there is no configuration for it.
To give your app an icon, place a file called `app-icon.png` in the root folder of your app.
It should be square, and at least 500x500 pixels.


## Icons for Views / Templates

This is also convention based, there is no configuration for it.

2sxc 12.02 also introduces the possibility of specifying an icon in the view-configuration. You have two options for that

* **Convention**: To give your views/templates an icon, add an icon file with the same name as your template file.  
So if your template is called `_overview.cshtml` your icon should be `_overview.png`.
* **Configured, in the App-Folder**: Place the file in the [App-folder](xref:Basics.App.FoldersAndFiles.Index) and reference it using `[App:Path]/your-file.png`  
👍🏽 _this is the recommended option_
* **ADAM**: Just drop a file there and let ADAM manage it.  
⚠️ _this is not recommended, because this way the file is NOT in your app folder, so it won't be included in export/import_


## Icons for Content-Types

Content-Types don't have a file (like a Template), so this is _only configuration based_.

Just edit the Content-Type Metadata and on the Icon-field you have two options:

1. **Configured, in the App-Folder**: Place the file in the [App-folder](xref:Basics.App.FoldersAndFiles.Index) and reference it using `[App:Path]/your-file.png` _v12_  
👍🏽 _this is the recommended option_
1. **ADAM**:Just drop the image you want for your content-type and let ADAM manage it  
⚠️ _this is not recommended, because this way the file is NOT in your app folder, so it won't be included in export/import_

---

## History

1. App icons introduced ca. v9.01
1. View Icons introduced ca. v9.01
1. Content-Type Icons introduced ca. v9.01
1. View Icons enhanced with option to upload or specify manually in v12.02
