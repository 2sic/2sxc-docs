

[!include["Breaking Changes"](./_brc14.md)]


## All Changes V14

### 14.00 - 14.07.05 (2022-Q2 & 2022-Q3)

Q2

1. ✅ Image-Service/Picture
1. ✅ Image primary area / corner selector
1. ✅ Patron features with licensing & payment system
1. ✅ LightSpeed cache
1. ✅ v14 Release
1. ✅ DNN 9.6.1 only
1. ✅ Formula Boost with many new features #1
1. ✅ DNN DI integration
1. ✅ Update turnOn to 0.1.2
1. ✅ CSP for the site (DNN only ATM)
1. ✅ Formula Boost #2 (more context info, features-infos, etc.)
1. ✅ NPM Types updated to latest release
1. ✅ Enterprise Features which will be availabe for bigger sponsors
1. ✅ Patron-System, where sponsors of 2sxc get some extra features
1. ✅ Standardize how to integrate into other systems (non-Dnn/Oqtane)
1. ✅ Service Kits
1. ✅ Deprecation System
1. ✅ Toolbar Services v1
1. ✅ JS Docs updated to the latest version and auto-generated
1. ✅ Tutorials Formulas
1. ✅ Update all Apps to the lastest/greatest conventions
1. ✅ v14 LTS

Q3

1. ✅ Toolbars Service Improvements
    1. ✅ icon-metadata
    1. ✅ group C# API - ToolbarBuilder now has `Group` command
    1. ✅ SVG icons - Toolbar Buttons can now use SVGs for icons (usually base64 encoded)
    1. ✅ base64
    1. ✅ ui multiple params
    1. ✅ bugfixes
    1. ✅ params multiple params
    1. ✅ array params
1. ✅ Debug-logging on Oqtane client side code, bugfixing ca. 0.5d
1. ✅ Change storage of `app.xml` to `App_Data`, change how import works and enable import-from-folder/git
1. ✅ Clean up JS code, latest webpack, packages etc. ca. 1d
1. ✅ Infrastructure for automated testing of JS - ca. 5d
1. Apps / App Maintenance
    1. ✅ Update most apps which used ephemeral variables for formulas to just use parameters (new in v14) ca. 0.5d
    1. ✅ new Timeline Apps
    1. ✅ new Files App
    1. ✅ new Jobs
    1. ✅ Make many Apps backwards compatible with Bootstrap 3 for a big customer
    1. ✅ Have the core apps tested & optimized for WCAG for a government customer
1. ✅ Re-release sxc-angular
1. ✅ Remove dependency on SharpZipLib

<!-- ### 14.07.05

* ToolbarBuilder now has `Group` command
* Toolbar Buttons can now use SVGs for icons (usually base64 encoded)
* ... -->

## 14.09 - 14.12 (2022-10)

1. ✅ Improve UI/Flow of system registration (ATM still confusing)
1. ✅ Make sure edit-ui doesn't need material fonts from CDN for icons
1. ✅ Create a new `app.json` configuration file for 2sxc apps to tune how export/import works
1. ✅ Remove Newtonsoft JSON and migrate to System.Text.Json
1. ✅ Improve handling of app-metadata (resources, settings)
1. ✅ Enable init and import completely new app directly from folder/git copy 1d SDV
1. ✅ Ability to sync Apps through git including the Assets and ADAM
1. ✅ Improve handing feature details to edit-ui
1. Data Sources
    1. New data source `Users`
    1. New data source `Roles`
1. ✅ Update Imageflow to latest version
1. ✅ Remove dependency on Newtonsoft - only use System.Text.Json
1. ✅ Create <https://schemas.2sxc.org> for json schemas
1. ✅ Create JSON Schemas for image recipe and app.json
1. ✅ More formula tutorials how to call a WebAPI
1. ✅ Security update System.Data.SqlClient
1. ✅ Oqtane 2shine Theme release
1. ✅ cre8magic v0.0.1 released

### 14.12.00 - 14.12.03 LTS (November 2022)

1. ✅ Publish [blazor-cms.org](https://blazor-cms.org/)
    1. ✅ get a great page speed - 95%+
    1. ✅ Get blazor-cms.org to index really well in google
1. ✅ v14 LTS #2 ca. v14.12 🚀


## Important Changes

1. [](xref:Abyss.Releases.History.V14.IssueAssemblyBinding)
1. [](xref:Abyss.Releases.History.V14.AppZip) _v14.08_
1. [](xref:Abyss.Releases.History.V14.AppDataFolder) _v14.08_
1. [](xref:Abyss.Releases.History.V14.ExportExcludeInAppJson) _v14.09_