---
uid: Abyss.Releases.History.V14.AppDataFolder
---

# Change in App Data Folder in v14.08

In older versions, **App-State versioning** saves or restores the app with data and configuration in `.data/app.xml`. That is useful for versioning using git (aka **git-sync**). `.data` folder is renamed to the safer `App_Data`.

## What has changed

For the installed apps **App-Export**, **App-Import**, **App-State** save or restore will migrate `app.xml` from the old `.data` folder to the new `App_Data` folder.

## Workaround if you Need to Import in an Older Version

Please manually modify the zip file.

1. Copy file `Apps/app-name/2sexy/App_Data/app.xml` to `Apps/app-name/app.xml`.
1. Rename folder `Apps/app-name/2sexy/App_Data/` to `Apps/app-name/2sexy/.data/`.
