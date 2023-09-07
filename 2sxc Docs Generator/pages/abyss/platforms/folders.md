---
uid: Abyss.Platforms.Folders
---

# Platform Folders

This is where the various folders are located on each platform.

## App Files

1. App files
    * ☢️ Dnn places App folders in the `[PortalRoot]/2sxc/[AppName]` eg. `/Portals/0/2sxc/Blog5`
    * 🩸 Oqtane places App folders in `[WebRoot]/2sxc/[SiteId]/[AppName]` eg. `/2sxc/1/Blog5`
1. ADAM Files (Automatic Digital Asset Management)
    * ☢️ Dnn places ADAM assets in the `[PortalRoot]/adam/[AppName]` eg. `/Portals/0/adam/[AppName]`
    * 🩸 Oqtane places ADAM assets in `[WebRoot]/Content/Tenants/[TenantId]/Sites/[SiteId]/adam/[AppName]` eg. `/Content/Tenants/1/Sites/1/adam/Blog5`

Note that for Dnn, `[PortalRoot]` is usually `[WebsiteRoot]/Portals/`.

## System Data Files

* ☢️ Dnn places system files in the `[WebRoot]/DesktopModules/ToSIC_SexyContent/App_Data/`
* 🩸 Oqtane places system files in `[WebRoot]/Content/2sxc/system/App_Data/`

Within this folder, you'll typically see the following folders:

* `new-app` - these files are used when creating a new app.
* `system` - the preset system files containing global content-types and more.
    These will be replaced on _every_ update
* `system-custom` - _optional_ additional overriding files to augment the system files.
    These will be preserved on updates
* `system-beta` - _optional_ only used for the development of 2sxc
    These will be preserved on updates

Note that the `system...` folders will all have some of the following folders inside them:

* `bundles` - contains the bundles of many content-types and entities (new in v15)
* `configurations` - contains the configuration files for the system - especially licenses
* `contenttypes` - contains the content-types for the system
* `entities` - contains data for the system (records/rows/items)

## Temporary Files

* ☢️ Dnn places system files in the `[WebRoot]/DesktopModules/ToSIC_SexyContent/_/`
* 🩸 Oqtane places system files in `[WebRoot]/Content/2sxc/system/_/`

---

## History

* [Changed](xref:Abyss.Releases.History.V14.AppDataFolder) `.data` folder to `App_Data` in v14.08
* Enhanced with `bundles` folder in v15.01
