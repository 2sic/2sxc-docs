---
uid: Abyss.Releases.History.V14.AppZip
---

# Change in App Zip Package in v14.08

Apps which are **exported to ZIP** place all their data in a file called `app.xml`. 

We've changed where this file is located to make it identical with the 
[better protected folder used in sync scenarios](xref:Abyss.Releases.History.V14.AppDataFolder). 

## What has changed

1. Location of the `app.xml` file

In previous versions, this ZIP file was located inside the zip in the folder `Apps/[app-name]/app.xml`.

Starting from v14.08 it is located in `Apps/[app-name]/2sexy/App_Data/app.xml`.

This is the _same_ location as the one used for app-sync.

2. Behavior on Export

Previously export created this file in a temporary location and deleted it afterwards. 

Now the file is directly created in the `App_Data` folder. 
This makes it easier to export and also git-sync in the same steps. 

3. Behavior on Import

**App-Import** will import `app.xml` from the old and new path.

After import, the app folder will have an `App_Data` containing the imported state. 

## Breaking Change

This change makes the system more consistent, but also means that exported ZIPs cannot be imported into older versions of 2sxc. 

## Workaround if you Need to Import in an Older Version

Please manually modify the zip file.

1. Copy file `Apps/[app-name]/2sexy/App_Data/app.xml` to `Apps/[app-name]/app.xml`.

---

Changed in v14.08