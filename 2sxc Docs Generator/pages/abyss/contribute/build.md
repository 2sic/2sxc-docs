---
uid: Abyss.Contribute.Build
---

# Build / Compile 2sxc / EAV / JS Parts

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

> [!TIP]
> This is very new documentation and applies to 2sxc 16.06+

## Concept

2sxc has a few git repositories, each with their own build process.
But in general they all follow the same principles:

1. When you compile a project, it will first compile the standard way, into the `dist` (JS) or `bin` (C#) folder
1. The build process (WebPack or MSBuild) will then check the current folder _and all parent folders_ for a file `2sxc-build.config.json`
to determine places which it should copy things to...
1. If not found, it will use `2sxc-build-fallback.config.json` which is located in the root of each repository - this is basically empty but should reference these docs.

## Use Cases

### Use Case 1: Build a Part and Copy Manually

Let's assume you just got started and want to try something in partial project.
You can just pull the repo, npm-ci everything and build.

As a result you'll have the compiled JS in the `dist` folder and can manually copy it to folder of any DNN/Oqtane as you wish.

### Use Case 2: Build a JS Library and Copy to DNN/Oqtane Automatically

In this scenario you would do the same as above, but in addition to that,
create a `2sxc-build.config.json` file in the repo folder with the specs.


### Use Case 3: Build Everything Automatically

This is the scenario that the 2sxc team uses to build everything automatically.
This is our folder structure:

* `C:\Projects\2sxc` the root folder
  * `C:\Projects\2sxc\2sxc-build.config.json` - The config file in our root
  * `c:\Projects\2sxc\2sxc-dnn961.dnndev.me\Website` - our main DNN installation for verifying DNN 9.6.1
  * `C:\Projects\2sxc\Oqtane\oqtane.framework\Oqtane.Server` - our main Oqtane installation for verifying Oqtane 4.x
  * `C:\Projects\2sxc\2sxc` - the main 2sxc C# repo
  * `C:\Projects\2sxc\2sxc-ui` - the 2sxc JS repo
  * `C:\Projects\2sxc\eav-server` - the eav C# repo
  * `C:\Projects\2sxc\eav-ui` - the EAV JS parts repo
  * `C:\Projects\2sxc\InstallPackages` the location where the final ZIP and NuGets are created

And this is the `2sxc-build.config.json` mentioned above:

```json
{
  "JsTargets": [
    "C:/Projects/2sxc/2sxc-dnn/Website/DesktopModules/ToSIC_SexyContent",
    "C:/Projects/2sxc/Oqtane/oqtane.framework/Oqtane.Server/wwwroot/Modules/ToSic.Sxc.Oqtane",
  ],
  "DnnTargets": [
    "C:/Projects/2sxc/2sxc-dnn961.dnndev.me/Website",
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

Shortlink: <https://go.2sxc.org/build>
