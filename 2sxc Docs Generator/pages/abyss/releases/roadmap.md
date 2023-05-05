---
uid: Abyss.Releases.Roadmap
---

# Roadmap of EAV and 2sxc - Vision of the Future

The 2sxc roadmap contains the things we think are fairly important to tackle next.
Since we're all working for free, there is no commitment to do this in the order you see below.
And sometimes a customer will need a feature quickly - and pay for it - then it will appear sooner.

> [!TIP]
> You too can sponsor a feature to make things happen sooner!

Last Update: **2023-05-04** (international Star Wars day)

## 2023 Q1 - Released v15.00 - 15.05

👉🏽 [See all changes v15](xref:Abyss.Releases.History.V15)


## May the 4th 2023 - v16.x LTS

👉🏽 [See all changes v15](xref:Abyss.Releases.History.V16)

## Priorities for v16 LTS

1. ✅ Data-conversion of entities to json in attribute... - documented ⌛
1. User Service - documentation
1. Improve Oqtane Pages DS to also respect settings - @STV


## Priority May / Towel Day 2023

1. ✅ Create Wysiwyg Rich Mode
    1. ✅ Create `Content.ToHtml()` to auto apply certain aspects
    1. ✅ Create best practices CSS styling for `wysiwyg` content
1. Clean up Formulas code into better SoC @SDV


## Currently being developed / WIP

1. Slim down Oqtane Client @STV
1. Rework the UI Selector / DropDown system
    1. to have titles, help, notes, links, and more @SDV
    1. to also have various data sources
    1. dropdown for numbers etc.
1. Clean up ancient documentation which is probably invalid, but still seen by many :(



## Done but not communicated, or still tweaking / WIP

1. ✅ Auto-Installer - Features to configure at system level which apps are allowed / must be installed
1. ⏳ Auto-Install more apps from catalog - even after some have already been installed - ca. 1d
1. Data Sources
    1. ✅ Internal data source to get data from app parents
    1. ✅ Internal Query to get data from app-parents
    1. ✅ New DataSource `AppFiles`
    1. ✅ New DataSource `AdamFiles`
    1. ⏳ Publish `SharePoint` DataSource (Premium/Patrons only)
    1. ⏳ New data sources like: ADAM (Files, Folders), Navigation, etc. - ca. 2d
1. ✅ Compress Timeline: Feature to compress the existing history
1. ⏳ Entity Serialization Improvements
1. ⏳ Data Bundles
1. ⏳ Language editing permissions - improve, test, finalize, document - ca. 3-5d
    1. also allow non-admins to possibly translate resources


## Post LTS

1. Apps / App Maintenance: publish other new apps
    1. New timeline
    1. Files
    1. etc.
1. CSP - ca. 5d
    1. ⏳ CSP Tutorials, docs and more
1. Standardize / complete `IDataBuilder` API

Blazor CMS / cre8magic

1. ⏳ cre8magic - auto-generate sitemap.xml

Minor: Tutorial App Enhancements

1. More Tutorials Formulas - ca. 0.5d
1. Get tutorial app to run perfectly on Oqtane - ca. 0.5d 2dm
1. Upgrade all template Apps to v15


## Probably 2023 Q3

2sxc

1. Plan new Metadata Target/Address system using only a string
1. Major update on dropdowns/selectors
1. Improve Export-Import Bundles
    1. Ability to create bundles in the Admin UI
    1. Ability to review bundles and what's inside in the Admin-UI
    1. Ability to download/export bundles
    1. Ability to import bundles in the Admin-UI
    1. Ability to save bundles to App_Data
    1. Ability to import bundles from App_Data
    1. Maybe ability to auto-save bundles to App_Data on standard export
1. Notes / Metadata
    1. Provide Page-Level Metadata and Settings (outside of a specific App) - ca. 2d
    1. Metadata for Page, User, Site incl. Notes for each - ca. 2d
    1. Notes everywhere - especially on the page - ca. 2d
1. Massively improve JSON import with language checks, overwrite/vs new etc.
1. Code editor intellisense for most APIs - ca. 3-4d
1. ⚠️ Deprecation System (show in UI, mark all APIs clearly, blog) - ca. 2d
1. Many automated tests in the core JS APIs (toolbar, etc.) - ca. 5d - SDV
1. ~~JS Docs for formula~~
1. Probably update ImageFlow again, if PNG resize bug is fixed
1. Enable standard apps to be installed from catalog easily after first apps have been installed
    1. ✅ Feature to tell new auto-installer what apps are already installed
    1. App-Auto-Installer UI to add-install apps later on

Blazor CMS / cre8magic

1. Oqtane Theme release and cre8magic Nuget v0.0.2
    1. cre8magic Google Analytics
    1. Improve getting started with theme etc.
1. Create section with showcase
1. Create section with partners / experts





## Backlog 2023 v15

New Stuff and Major Enhancements

1. CSP
    1. CSP for inline code - eg using nonce
    1. CSP for the Edit UI incl. custom extensions etc.
1. Note-feature to add notes to various things like entities, fields etc. (show, persist show, add to all kinds of things, ...) - ca. 3d
1. sxc-angular
    1. Re-release sxc-angular demo-app for it
    1. Js Docs for sxc-angular
    1. React sample application

1. ⏳ Edit UI Picker (Entity, Number, String, etc.) - completely rework concept / system - SDV ca. 10d
1. ⏳ Edit UI Picker - hierarchy / tree of data
1. ⏳ string-Dropdowns from many data sources like
    1. CSVs
    1. WebService
    1. svg files icon-picker
1. after new Selectors - improve permissions UIs
1. New Icon-Dropdowns from other data sources for better icons-support without fonts
1. ⏳ Edit and Admin UI Dependencies Upgrades @SDV
    1. ⏳ Angular 15 upgrade
    1. ⏳ Angular Material upgrade
    1. ⏳ AG DataGrid upgrade
    1. ⏳ Improve / Refactor some public types code



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
1. Improve WYSIWYG
    1. Ability to do more configuration on WYSIWYG
        1. ability to override toolbar buttons
        1. ability to set various easy-to-set configuration
        1. Possibly ability to preset various configurations globally or at site-level and use in other places



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
