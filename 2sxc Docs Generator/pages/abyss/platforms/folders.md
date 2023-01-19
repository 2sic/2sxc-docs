---
uid: Abyss.Platforms.Folders
---

# Platform Folders

This is where the various folders are located on each platform.

## App Files

1. App files
    * ☢️ Dnn places App folders in the `[PortalRoot]/2sxc/[AppName]` eg. `/Portals/0/2sxc/Blog5`
    * 💧 Oqtane places App folders in `[WebRoot]/2sxc/[SiteId]/[AppName]` eg. `/2sxc/1/Blog5`
1. ADAM Files (Automatic Digital Asset Management)
    * ☢️ Dnn places ADAM assets in the `[PortalRoot]/adam/[AppName]` eg. `/Portals/0/adam/[AppName]`
    * 💧 Oqtane places ADAM assets in `[WebRoot]/Content/Tenants/[TenantId]/Sites/[SiteId]/adam/[AppName]` eg. `/Content/Tenants/1/Sites/1/adam/Blog5`

Note that for Dnn, `[PortalRoot]` is usually `[WebsiteRoot]/Portals/`.

## System Data Files

* ☢️ Dnn places system files in the `[WebRoot]/DesktopModules/ToSIC_SexyContent/App_Data/`
* 💧 Oqtane places system files in `[WebRoot]/Content/2sxc/system/App_Data/`

Within this folder, you'll typically see the following folders:

* `system` - the preset system files containing global content-types and more.
    These will be replaced on every update
* `system-custom` - _optional_ additional overriding files to augment the system files.
    These will be preserved on every update
* `new-app` - these files are used when creating a new app.
* `system-beta` - _optional_ only used for the development of 2sxc


---

## History

* Last update 2021-10-25 with regards to 2sxc 12.06 LTS