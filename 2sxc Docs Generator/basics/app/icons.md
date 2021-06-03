---
uid: Basics.App.Icons
---

# Icons in Apps

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-assets-app { visibility: visible; }</style>

App icons are convention based, so there is no configuration for it. 
To give your app an icon, place a file called `app-icon.png` in the root folder of your app. 
It should be square, and at least 200x200 Pixels, but we recommend it's at least 500x500 pixels. 

## Icons for Views / Templates

This is also convention based, there is no configuration for it. 
To give your views/templates an icon, add an icon file with the same name as your template file. 
So if your template is called `_overview.cshtml` your icon should be `_overview.png`.

2sxc 12.02 also introduces the possibility of specifying an icon in the view-configuration. You have two options for that

* Just drop a file there and let ADAM manage it
* Place the file in the [App-folder](xref:Basics.App.FolderStructure) and reference it using `[App:Path]/your-file.png`

## Icons for Content-Types

Content-Types don't have a file (like a Template), so this is only configuration based. 

Just edit the Content-Type Metadata and on the Icon-field you have two options:

1. Just drop the image you want for your content-type and let ADAM manage it
1. Place the file in the [App-folder](xref:Basics.App.FolderStructure) and reference it using `[App:Path]/your-file.png` _v12_

---

## History

1. App icons introduced ca. v8
1. View Icons introduced ca. v8
1. Content-Type Icons introduced ca. v8
1. View Icons enhanced with option to upload or specify manually in v12.02