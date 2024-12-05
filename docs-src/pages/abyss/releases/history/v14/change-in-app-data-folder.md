---
uid: Abyss.Releases.History.V14.AppDataFolder
---

# Change in App Data Folder in v14.08

In older versions, **App-State versioning** saves and restores the app with data and configuration in `[App-Folder]/.data/app.xml`.
That is useful for versioning using git (aka **git-sync**).

## What has changed

The `.data` folder is renamed to the more protected `App_Data`.

This means that in the following processes, this folder will now be used instead:

* App Export
* App Import
* App State Versioning

It will always save / restore in this folder. 

If it finds the older folder, will migrate `app.xml` from the old `.data` folder to the new `App_Data` folder.

## See also

👉🏻 [](xref:Abyss.Releases.History.V14.AppZip)

---

Changed in v14.08