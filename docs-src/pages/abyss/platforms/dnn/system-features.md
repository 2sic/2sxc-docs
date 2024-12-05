---
uid: Abyss.Platforms.Dnn.SystemFeatures
---

# Dnn System Features

Dnn comes with a lot of features pre-installed.
Others can be installed later on, as needed.

> [!TIP]
> 2sxc 17 requires C# v8.
>
> This will be pre-installed in Dnn 10, but for Dnn 9.6.1+ you need to install it manually.
> 
> For this specific issue, please check <https://r.2sxc.org/dnn-roslyn>

Sometimes you may install an App which requires an additional capability.
This page should guide you through installing them if you're stuck.
Look for the code you received, such as `System-CSharp08` to find the instruction.

## Additional System Capabilities

The following are are capabilities which may or may not be pre-installed.

### C# v6 to v8 - `System-CSharp06` to `System-CSharp08`

Dnn v.7.x - 9.x all include C# 5, but not C# 6+.
C# 6 was once installed by default, but was reset to **include but not auto-install** because of
[issues with the hosting provider GoDaddy](https://dnntracker.atlassian.net/browse/DNN-8528).

Depending on your Dnn version, it has a different CodeDom / CSharp Compiler prepared for you:

* Dnn 9.6.1 has prepared the CodeDom v2.0.1 containing C# 6 for .net 4.5
* Dnn ca. 9.10+ has C# 7.3 and C# 8 (called CodeDom 3.6)

> [!IMPORTANT]
> If you're on Dnn 9.6.1, you can install C# 8 manually.
> See <https://r.2sxc.org/dnn-roslyn>

<iframe src="https://azing.org/dnn-community/r/ogPu9EDH?embed=1" width="100%" height="600" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>
<!-- <script src="https://cdn.azing.org/e/1/embed.js"></script> -->


## Preinstalled System Capabilities

The following are always available in every Dnn:

* `System-NetFramework`
* `System-Razor`
* `System-CSharp05`

## Optional System Capabilities

* `System-CSharp06`
* `System-CSharp07`
* `System-CSharp08`

## Unavailable System Capabilities

The following are listed just to clarify that they currently don't exist in DNN and
probably cannot be added in any feasible way.

* `System-CSharp09` .net 5 (core)
* `System-CSharp10` .net 6 (core)
* `System-CSharp11` .net 7 (core)
* `System-CSharp12` .net 8 (core)
* `System-NetCore` Dnn is .net Framework only as of now
* `System-Blazor` requires .net Core v3+; works in Oqtane

---

Shortlink: <https://go.2sic.org/dnn-syscap>
