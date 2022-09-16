---
uid: Abyss.Releases.History.V14.AppZip
---

# Change in App Zip Package in v14.08

In **App-Export** the file `app.xml` is generated and stored in zip file.
In new version, in zip file, the old path for `app.xml` was changed to streamline the use of `app.xml`.

## What has changed

ZIP file generated for **App-Export** have `app.xml` in the new path `Apps/app-name/2sexy/App_Data/app.xml`. The old path was `Apps/app-name/app.xml`.

**App-Import** will import `app.xml` from the old and new path.

## Workaround if you Need to Import in an Older Version

Please manually modify the zip file.

1. Copy file `Apps/app-name/2sexy/App_Data/app.xml` to `Apps/app-name/app.xml`.
1. Optionally, rename folder `App_Data` to `.data`.
