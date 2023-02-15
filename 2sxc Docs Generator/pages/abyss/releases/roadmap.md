---
uid: Abyss.Releases.Roadmap
---

# Roadmap of EAV and 2sxc - Vision of the Future

The 2sxc roadmap contains the things we think are fairly important to tackle next.
Since we're all working for free, there is no commitment to do this in the order you see below.
And sometimes a customer will need a feature quickly - and pay for it - then it will appear sooner.

> [!TIP]
> You too can sponsor a feature to make things happen sooner!

Last Update: **2023-01-31**

## Just Released v15.00 X-Mas 2022

See [](xref:Abyss.Releases.History.V15)

## January 2023 - Released v15.01

👉🏽 [See all changes v15](xref:Abyss.Releases.History.V15)

## February 2023 - Released v15.02

This was a quick release, no changes to report ATM, they will be reported in v15.03

also done:

1. ✅ Upgrade Blazor-CMS.org to use 2sxc 15.01 for real-life testing
1. ✅ Create blog on Blazor-CMS.org
1. ✅ Publish Tutorial in Blazor-CMS.org
1. ✅ CSP Training at DNN Summit
1. ✅ Image Perfectionist Training at DNN Summit

## Priorities for v15 LTS

1. New WYSIWYG mode completed (and documented)
1. New APIs for Data Sources finalized (and documented)
1. ⏳ Probably move to .net 6 (and drop .net standard 2.0) - almost done, last tests @STV
1. Probably data-conversion of entities to json in attribute...
1. Bugs
    1. ✅ RazorBlade json serialization https://github.com/2sic/2sxc/issues/2998
    1. ...

## Planned for February 2023

1. Bugs
    1. 2sxc in DNN Skins on 404 pages https://github.com/2sic/2sxc/issues/2986
    1. ...
1. ⏳ Edit and Admin UI Dependencies Upgrades @SDV
    1. ⏳ Angular 15 upgrade
    1. ⏳ Angular Material upgrade
    1. ⏳ AG DataGrid upgrade
    1. ⏳ Improve / Refactor some public types code
1. ⏳ Improve WYSIWYG
    1. ✅ Ability to select which "mode" the editor is in, affecting toolbars
    1. Allow selected mode to affect other things (like deny image-drop if in text-mode)
    1. Sections to better align images
    1. Use classes to determine size instead of styles
    1. WYSIWYG Images which auto-resize on the server based on size (eg 1/2 of the screen)
    1. ⏳ Create `CmsService.Show()` to auto apply certain aspects
    1. ⏳ Create best practices CSS styling for `wysiwyg` content
1. ⏳ Internal - Rework Getting-Started Server to be latest and greatest @2ro
1. ✅ Query Improvements
    1. ✅ Allow edit/new to be done in a query-selector
    1. ✅ Get query to know if entity can be edited (based on AppId)
1. Improve WYSIWYG
    1. Ability to do more configuration on WYSIWYG
        1. ability to override toolbar buttons
        1. ability to set various easy-to-set configuration
        1. Possibly ability to preset various configurations globally or at site-level and use in other places
1. ✅ Auto-Installer - Features to configure at system level which apps are allowed / must be installed
1. Data Sources
    1. ✅ Improve data sources for Pages - ca. 0.5d
    1. ✅ New Data Source `Scopes`
    1. ✅ New Query `Scopes`
    1. ✅ New Data Source `MetadataTargetTypes`
    1. ✅ New Query `MetadataTargetTypes`
    1. ✅ Internal/WIP data source to get data from app parents
    1. ✅ Internal/WIP Query to get data from app-parents
    1. ✅ New (WIP) API for data sources to make data generation easier
    1. ✅ New DataSource `Licenses` - with state
    1. ✅ New Query `Licenses`
    1. ✅ New DataSource `Features` - with state
    1. ✅ New Query `Features`
    1. ✅ New DataSource `Sites`
    1. ✅ New Query `Sites`
    1. ✅ Change internal key for `Settings` to something else, probably `MyConfig` or something (breaking) ⭐
    1. ✅ New LookUp for Settings- and Resources-Stack - to use `Settings` and `Resources` ⭐
    1. Pages DataSource
        1. ✅ Improve Pages DataSource with `LinkTarget`
        1. ✅ Improve Pages DataSource with internal ability to configure what to get
        1. ✅ Improve Pages DataSource to have a UI to configure what to get - @2dm
        1. Improve Oqtane Pages DS to also respect settings - @STV
    1. ⏳ New DataSource (name TBD) `AppWithParentApps` to retrieve data from an App and all it's parent Apps for use in Settings etc.
    1. ⏳ New Query (name TBD) `AppWithParentApps` to retrieve data from an App and all it's parent Apps for use in Settings etc.
    1. ⏳ Improved custom DataSources API - ca. 1d - 2dm ⭐
    1. ⏳ Improve custom DataSource API with something like `ICanConvertToEntity` to make it easier to create data sources ⭐
    1. ⏳ New data sources like: ADAM (Files, Folders), Navigation, etc. - ca. 2d
    1. ⏳ Upgrade Demo DataSources Code
    1. Upgrade docs for custom DataSources
    1. ⏳ Publish `SharePoint` DataSource (Premium/Patrons only)
1. ✅ Compress Timeline: Feature to compress the existing history

Minor: Tutorial App Enhancements

1. Custom DataSources
    1. Create new demos
    1. Create Testing-framework to make it testable despite dependency injection
    1. Update docs
    1. Create migration instructions ?

## February post LTS

1. Formula improvements
    1. ✅ Get App or global settings for formulas
    1. Better support for promises
    1. ⏳ Ability to set the value of another field
    1. Intellisense on Formulas
1. Improve Export-Import Bundles
    1. Ability to create bundles in the Admin UI
    1. Ability to review bundles and what's inside in the Admin-UI
    1. Ability to download/export bundles
    1. Ability to import bundles in the Admin-UI
    1. Ability to save bundles to App_Data
    1. Ability to import bundles from App_Data
    1. Maybe ability to auto-save bundles to App_Data on standard export
1. Apps / App Maintenance: publish other new apps
    1. New timeline
    1. Files
    1. etc.
1. CSP - ca. 5d
    1. ⏳ CSP Tutorials, docs and more
1. ⏳ Auto-Install more apps from catalog - even after some have already been installed - ca. 1d

Blazor CMS / cre8magic

1. ⏳ cre8magic - auto-generate sitemap.xml

Minor: Tutorial App Enhancements

1. More Tutorials Formulas - ca. 0.5d
1. Get tutorial app to run perfectly on Oqtane - ca. 0.5d 2dm
1. Upgrade all template Apps to v15


## Probably 2023 Q1

2sxc

1. ⏳ Toolbars Service Improvements:  transport `data` for use in notes etc. ca. 0.5d 2dm
1. Notes / Metadata
    1. Provide Page-Level Metadata and Settings (outside of a specific App) - ca. 2d
    1. Metadata for Page, User, Site incl. Notes for each - ca. 2d
    1. Notes everywhere - especially on the page - ca. 2d
1. Massively improve JSON import with language checks, overwrite/vs new etc.
1. Code editor intellisense for most APIs - ca. 3-4d
1. Deprecation System (show in UI, mark all APIs clearly, blog) - ca. 2d
1. Many automated tests in the core JS APIs (toolbar, etc.) - ca. 5d - SDV
1. Formulas - ca. 2d
    1. Formula Boost #3 (intellisense in Formulas, entity-type info)
    1. JS Docs for formula
1. Probably update ImageFlow again, if PNG resize bug is fixed
1. Enable standard apps to be installed from catalog easily after first apps have been installed
    1. ✅ Feature to tell new auto-installer what apps are already installed
    1. App-Auto-Installer UI to add-install apps later on
1. CSP
    1. CSP for inline code - eg using nonce
    1. CSP for the Edit UI incl. custom extensions etc.

Blazor CMS / cre8magic

1. Oqtane Theme release and cre8magic Nuget v0.0.2
    1. cre8magic Google Analytics
    1. Improve getting started with theme etc.
1. Create section with showcase
1. Create section with partners / experts

## Backlog 2023 v15

New Stuf and Major Enhancements

1. Note-feature to add notes to various things like entities, fields etc. (show, persist show, add to all kinds of things, ...) - ca. 3d
1. sxc-angular
    1. Re-release sxc-angular demo-app for it
    1. Js Docs for sxc-angular
    1. React sample application
1. Language editing permissions - improve, test, finalize, document - ca. 3-5d
    1. also allow non-admins to possibly translate resources

1. string-Dropdowns from many data sources like
    1. CSVs
    1. WebService
    1. svg files icon-picker
1. New Icon-Dropdowns from other data sources for better icons-support without fonts

Apps / App Maintenance

1. _maybe_ Status App


## WIP / Ongoing Larger Projects / Enhancements

1. Language Editing Permissions based on roles/users
    * Implemented v13 2022 Q1 but not in production, so probably not fully ready / tested / documented
1. Enable viewing read-only data / configuration to better discover options/features
    * Implemented to ca. 70%, but shared data metadata can't be accessed in UI ATM
1. Provide more help UIs for using REST APIs
1. Make the Metadata-System completely discoverable
1. Standardize how to integrate into other systems (non-Dnn/Oqtane) (ca. 70% done)
1. OpenGraph system - probably requires rewrite of CSP-Stack
1. Create demo app with react
1. More public headless APIs and Demos

### Oqtane specific

1. CSP for Oqtane
    1. It's partially done, but docs are missing
    1. Unsolved aspect: collecting all necessary resources for CSP of pages not initially loaded
1. Oqtane Page/Module integration / use (also for notes etc.)


---


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
1. Multi-import apps (drag-drop many) - probably patrons only
1. Import Export
    1. Improve JSON import (language differences etc.)
    1. Improve xml and app import (language differences, etc.)
1. App Update System (features to help migrate an App to a newer template)
    1. Unclear how to do this, but probably needs some kind of compare/merge features
1. ...or whatever is needed next :)
