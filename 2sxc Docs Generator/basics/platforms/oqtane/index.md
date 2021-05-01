---
uid: Basics.Platforms.Oqtane.Index
---

<img src="./assets/oqtane-logo.png" width="250px" align="right">

# Oqtane Platform

[Oqtane](https://oqtane.org/) is a modern [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) based platform similar to Dnn. It's inspired by the Dnn model but uses the latest .net core and more. 

As of now (March 2021) we are porting 2sxc to work on Oqtane and Dnn. The work is still in progress. 





## Features currently not implemented


#### Global Content Files

ADAM works and images uploaded will automatically work. But as of now, you cannot have shared files in a global folder structure for re-use in many places yet. You can of course re-use an entity with files, but not place a file in a global (like Portals) folder for use. 


#### Image Resizer won't work on Global Content Files

Image Resizer works for app-assets (like the app-icon) and for ADAM assets, but not for files in the `\Tenants\x\Sites\x\` folder