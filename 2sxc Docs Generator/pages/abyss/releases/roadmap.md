---
uid: Abyss.Releases.Roadmap
---

# Roadmap of EAV and 2sxc - Vision of the Future

The 2sxc roadmap contains the things we think are fairly important to tackle next. Since we're all working for free, there is no commitment to do this in the order you see below. And sometimes a customer will need a feature quickly - and pay for it - then it will appear sooner. _You too can sponsor a feature!_

## Priorities 2022 Q3 v14

_Updated 2022-09-16_

Finish-Fine-Tune existing stuff from Q2

1. Improve UI/Flow of system registration (ATM still confusing) - ca. 1-2d
1. Toolbars Service Improvements {started, ca. 1d of 3d left}
  1. ✅ icon-metadata
  1. ✅ group C# API
  1. ✅ SVG icons
  1. ✅ base64
  1. ✅ ui multiple params
  1. ✅ bugfixes
  1. ✅ params multiple params
  1. ✅ array params
  1. ⏳ data
  1. ...
1. Get tutorial app to run perfectly on Oqtane - ca. 0.5d
1. ✅ Debug-logging on Oqtane client side code, bugfixing ca. 0.5d

New Stuf and Major Enhancements

1. ✅ Change storage of `app.xml` to `App_Data`, change how import works and enable import-from-folder/git
1. ⏳ Create a new `app.json` configuration file for 2sxc apps to tune how export/import works - ca. 1d (75%)
  1. 
1. More Tutorials Formulas (dropdown values from api-call, ...) - ca. 0.5d
1. Code editor intellisense for most APIs - ca. 3-4d
1. v14 LTS #2 ca. v14.14 🚀

Other

1. ✅ Clean up JS code, latest webpack, packages etc. ca. 1d
1. ✅ Infrastructure for automated testing of JS - ca. 5d
1. Make sure edit-ui doesn't need material fonts for icons - ca. 0.5d SDV
1. Many automated tests in the core JS APIs (toolbar, etc.) - ca. 5d

Apps / App Maintenance

1. ✅ Update most apps which used ephemeral variables for formulas to just use parameters (new in v14) ca. 0.5d
1. ✅ new Timeline Apps
1. ✅ new Files App
1. ✅ new Jobs
1. ✅ Make many Apps backwards compatible with Bootstrap 3 for a big customer
1. ✅ Have the core apps tested & optimized for WCAG for a government customer
1. publish other new apps

Ongoing, probably not complete Q3

1. CSP - ca. 5d
  1. CSP for the Edit UI incl. custom extensions etc.
  1. CSP Tutorials, docs and more
1. Data Sources
    1. Improve data sources for Pages - ca. 0.5d
    1. Improved custom DataSources API - ca. 1d
    1. New data sources like: Users, Roles, ADAM (Files, Folders), Navigation - ca. 2d
1. Deprecation System (show in UI, mark all APIs clearly, blog) - ca. 2d
1. Provide Page-Level Metadata and Settings (outside of a specific App) - ca. 2d
1. Metadata for Page, User, Site incl. Notes for each - ca. 2d
1. Notes everywhere - especially on the page - ca. 2d
1. Auto-Install more apps from catalog - even after some have already been installed - ca. 1d - SDV?
1. Formulas - ca. 2d
  1. Formula Boost #3 (intellisense in Formulas, entity-type info)
  1. JS Docs for formula


## Priorities 2022 Q4 v14 / v15

New Stuf and Major Enhancements

1. Improve WYSIWYG
  1. Sections to better allign images
  1. Images which auto-resize based on size
1. Note-feature to add notes to various things like entities, fields etc. (show, persist show, add to all kinds of things, ...) - ca. 3d
1. Oqtane Theme release
1. Blazor / Oqtane CMS Website to demo functionality & features
1. CSP for Oqtane
  1. It's partially done, but docs are missing
  1. Unsolved aspect: collecting all necessary resources for CSP of pages not initially loaded
1. sxc-angular
  1. Re-release sxc-angular and demo-app for it
  1. Js Docs for sxc-angular
1. Language editing permissions - improve, test, finalize, document - ca. 3-5d
  1. also allow non-admins to possibly translate resources
1. Review dropping `_` prefix requirement on cshtml files by protecting them in an additional manner
  1. It's not needed on Oqtane, as the files are not accessible
  1. Only needed ATM on DNN because each file could be called from the browser directly
  1. Probably make sure all base classes refuse to render standalone
1. OpenGraph system - probably requires rewrite of CSP-Stack
1. string-Dropdowns from many data sources like
  1. CSVs 
  1. WebService
  1. svg files icon-picker
1. New Icon-Dropdowns from other data sources for better icons-support without fonts
1. Create demo app with react
1. More public headless APIs and Demos
1. Oqtane Page/Module integration / use (also for notes etc.)

Apps / App Maintenance

1. Status App


## WIP / Ongoing Larger Projects / Enhancements

1. Language Editing Permissions based on roles/users
  * Implemented v13 2022 Q1 but not in production, so probably not fully ready / tested / documented
1. Enable viewing read-only data / configuration to better discover options/features
  * Implemented to ca. 70%, but shared data metadata can't be accessed in UI ATM
1. Provide more help UIs for using REST APIs
1. Make the Metadata-System completely discoverable
1. Standardize how to integrate into other systems (non-Dnn/Oqtane) (ca. 70% done)

---

## Priorities 2022 Q1 V13

1. ✅ Improve Tutorials massively
1. ✅ View Metadata
1. ✅ Oqtane Website Mode which can be indexed in Google
1. ✅ Improve Feature-Management
1. ✅ IFeaturesService
1. ✅ Shared Apps across Sites (Patrons only feature)
1. ✅ Enable editing of Shared Templates / files
1. ✅ Enable shared APIs
1. ✅ Disable translation of specific content-types
1. ✅ Dnn Factory replacement to render module or get DynamicCode outside of 2sxc
1. ✅ Fully integrate with Dnn Dependency Injection
1. ✅ Improve DI Scopes to Module-Level
1. ✅ IImageService


## Completed Priorities 2022 Q2 v13 / v14

1. ✅ v13 LTS
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


## Future / Other

1. [Update DB-Schema](xref:Abyss.Releases.Planned.DbSchema)
1. Support for persisting data to the file-system instead of DB
1. Database re-organization ca. Dec. 2021
1. Blazor integration for use in client-side Blazor  
  ATM not really usefuly, because blazor is not run-time compiled yet, so development would be super difficult
1. nopCommerce integration
1. Review Orchard / Umbraco integration
1. In-Page direct upload / replacement of images
1. In-Page direct editing of texts
1. Possible side-by-side editing with live-preview
1. Multi-import apps (drop many) - probably patrons only
1. Import Export
  1. Improve JSON import (language differences etc.)
  1. Improve xml and app import (language differences, etc.)
1. App Update System (features to help migrate an App to a newer template)
  1. Unclear how to do this, but probably needs some kind of compare/merge features
1. ...or whatever is needed next :)
