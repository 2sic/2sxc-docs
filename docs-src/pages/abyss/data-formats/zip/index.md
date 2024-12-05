---
uid: Basics.DataFormats.Zip.Index
---

# ZIP App Data Format in 2sxc (technical)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

When Apps are exported, they result in a ZIP file which can be easily re-imported. 

## Info-Files in the Root Folder

The root folder contains some files which are not important, but they should help in case someone tries to install the App in Dnn, because it would then show some messages that it's not a Dnn Package. 


## Structure of the ZIP

* various info files
* `Apps`
    * [AppName] (like Accordion3)
        * `app.xml` - all the data in the App as [XML](xref:Basics.DataFormats.Xml.AppData.Index)
        * `2sexy` folder containing all the files in your app
        * `PortalFiles` folder (optional)
            * `adam` folder (optional) - would contain all the adam files
                * [AppName] (like Accordion3)
            * all folders / files in the site root, which were referenced by data



## Multi-App Package not Supported

The file structure would support the ability to bundle many apps into one package, but the export/import system does not support this use case as of now.