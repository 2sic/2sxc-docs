---
uid: Abyss.Platforms.Oqtane.Index
---

<img src="~/assets/features/platform-oqtane.svg" width="100%">

<img src="./assets/oqtane-logo.png" width="250px" align="right">

# Oqtane Platform

[Oqtane](https://oqtane.org/) is a modern [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) based platform similar to Dnn. It's inspired by the Dnn model but uses the latest .net core and more. 

👉 As of May 2021 2sxc works great on Oqtane as well. 

## Install Oqtane and 2sxc

👉 See [](xref:Abyss.Platforms.Oqtane.Install)


## Features currently not implemented


#### Global Content Files

ADAM works and images uploaded will automatically work. But as of now, you cannot have shared files in a global folder structure for re-use in many places yet. You can of course re-use an entity with files, but not place a file in a global (like Portals) folder for use. 


#### Image Resizer won't work on Global Content Files

Image Resizer works for app-assets (like the app-icon) and for ADAM assets, but not for files in the `\Tenants\x\Sites\x\` folder

---

## History

* 2sxc 12 was developed for Oqtane 2.0