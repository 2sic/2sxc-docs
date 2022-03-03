---
uid: Abyss.Architecture.Controllers
---

# EAV / 2sxc Controllers (System Endpoints)

This is a reference of all Controllers (System WebApi Endpoints) in 2sxc/eav. 

> [!WARNING]
> This in not meant for public use, it's here so you understand how things work.
> It's also here to help people [integrating 2sxc/eav with their solution](xref:Abyss.Integration.Index)

## List of System WebApi Controllers

All controllers are implemented using the [proxy/real system](xref:NetCode.Conventions.ProxyControllers), except those were specifically noted. 

1. Adam
    1. `Sxc.AdamControllerReal`
    1. `Oqt.AppAssetsController` - Oqtane only, proxy/real concept doesn't apply
1. Admin
    1. `Sxc.ApiExplorerControllerReal` - TODO: not quite perfect yet 2022-03-02
    1. `Sxc.AppControllerReal<T>` - TODO: not quite perfect yet 2022-03-02, timeout300
    1. `AppFilesControllerReal`  
      Responsible for giving folders/files of the App-folder to the code editor. 
    1. `Eav.AppPartsControllerReal`  
    1. `Sxc.DialogControllerReal`  
      In charge of getting settings etc. to dialogs.
    1. `Eav.EntityControllerReal`  
      Admin of Entities, like listing all entities of a specific type. 
    1. `Eav.FeaturesControllerReal`  
      Provides information about the features to the Features-Management dialogs
    1. `Sxc.FieldControllerReal`  
      Admin: Fields - like get all, create new etc.
    1. `Eav.MetadataControllerReal`  
      Admin: Metadata - like get all for a specific target
    1. `Sxc.QueryControllerReal`  
      Admin: Query - like create new, import/export etc.
    1. `Sxc.TypeControllerReal`  
      Admin: Content Types
    1. `Sxc.ViewControllerReal`  
      Admin: Views
    1. `Eav.ZoneControllerReal`  
      Admin: Zone - information about the current Zone (site)
1. App
    1. `Oqt.AppAssetsController` - Oqtane only, proxy/real concept doesn't apply
    1. `app/[name]/data` - `Sxc.AppDataControllerReal`
    1. `app/[name]/query` - `Sxc.AppQueryControllerReal`
1. CMS
    1. `Sxc.BlockControllerReal`
    1. `Sxc.ContentGroupControllerReal`
    1. `cms/edit` - `Sxc.EditControllerReal` (almost?)  
      Edit: Edit data
    1. `cms/history` - `Sxc.HistoryControllerReal`  
      Edit: History of an item incl. restore of a previous version
    1. `cms/list` - `Sxc.ListControllerReal`  
      In-Page editing of lists
1. Sys
    1. `sys/insights` - `Eav.InsightsControllerReal`
    1. ** `Sxc.InstallControllerReal` - TODO: no interface, timeout300
    1. `sys/license` - `Eav.LicenseControllerReal`
    1. ** Log - TODO: no interface?


---

## History

1. Documented for v13.03 (March 2022)