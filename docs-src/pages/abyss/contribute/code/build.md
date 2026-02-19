---
uid: Abyss.Contribute.Code.Build
---

# Build Automation

[!include[""](_contributors-only.md)]

## Concept

2sxc has a few git repositories, each with their own build process.
But in general they all follow the same principles:

1. When you compile a project, it will first compile the standard way, into the `dist` (JS) or `bin` (C#) folder
1. The build process (WebPack, Vite or MSBuild) will then check **the current folder and all parent folders** for a file `2sxc-build.config.json`
to determine places which it should copy things to...
1. If not found, it will use `2sxc-build-fallback.config.json` which is located in the root of each repository - this is basically empty but should reference these docs.

[!include[""](_build-diagram.md)]

> [!TIP]
> The `2sxc-build.config.json` file is the key to automating the build and deployment process.
> It allows you to specify where the built files should be copied to, which can save you a lot of time and effort when testing your changes in a local DNN or Oqtane installation.
>
> Without this file, you would need to manually copy the built files to the appropriate locations in your local DNN or Oqtane installation every time you make a change and build the code, which can be very time-consuming and error-prone.

## Location of the `2sxc-build.config.json` File

The `2sxc-build.config.json` file can be located in any folder of your project.
It is typically placed in the root folder of your project or in a parent folder that is common to all the parts you want to build and deploy.

> [!TIP]
> Recommended: `C:\Projects\2sxc\2sxc-build.config.json` - this is the location used by the 2sxc team for their development environment.

This is the scenario that the 2sxc team uses to build everything automatically.
This is our folder structure:

* `C:\Projects\2sxc\` the root folder
  * `2sxc-build.config.json` - The config file in our root
  * `2sxc.dnndev.me\Website\` - our main DNN installation for verifying DNN 9.6.1
  * `Oqtane\oqtane.framework\Oqtane.Server\` - our main Oqtane installation for verifying Oqtane 4.x
  * `2sxc\` - the main 2sxc C# repo
  * `2sxc-ui\` - the 2sxc JS repo
  * `eav-server\` - the eav C# repo
  * `eav-ui\` - the EAV JS parts repo
  * `InstallPackages\` the location where the final ZIP and NuGets are created

You can also place it in sub folders, for example if you want to use a different configuration for a specific part of the project, but in general it's easier to maintain a single config file in the root folder.

If you're maintaining multiple versions of 2sxc (such as the latest LTS and the latest dev)
you could also do something like:

* `C:\Projects\2sxc\2sxc-build.config.json` - for the latest dev version
* `C:\Projects\2sxc\lts\21\2sxc-build.config.json` - for the latest LTS version

## Structure of the `2sxc-build.config.json` File

This is the `2sxc-build.config.json` mentioned above:

```json
{
  "JsTargets": [
    "C:/Projects/2sxc/2sxc.dnndev.me/Website/DesktopModules/ToSic.Sxc",
    "C:/Projects/2sxc/Oqtane/oqtane.framework/Oqtane.Server/wwwroot/Modules/ToSic.Sxc.Oqtane",
  ],
  "DnnTargets": [
    "C:/Projects/2sxc/2sxc.dnndev.me/Website",
  ],
  "OqtaneTargets": [
    "C:/Projects/2sxc/oqtane/oqtane.framework/Oqtane.Server",
  ],
  "Sources": [
    "C:/Projects/2sxc/2sxc-sources/_latest",
  ],
  "DnnInstallPackage": "C:/Projects/2sxc/InstallPackages/Dnn-Installer",
  "OqtaneInstallPackage": "C:/Projects/2sxc/InstallPackages/OqtaneModule"
}
```

---

## History

* New in 2023-09 v16.06
* Updated docs 2026-02-12

Shortlink: <https://go.2sxc.org/build>
