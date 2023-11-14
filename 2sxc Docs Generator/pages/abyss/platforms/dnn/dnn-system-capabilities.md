---
uid: Abyss.Platforms.Dnn.SystemCapabilities
---

# Dnn System Capabilities

Dnn comes with a lot of features pre-installed.
Others can be installed later on, as needed.

Sometimes you may install an App which requires an additional capability.
This page should guide you through installing them if you're stuck.
Look for the code you received, such as `SystemCapability-CSharp07` to find the instruction.

## Additional System Capabilities

The following are are capabilities which may or may not be pre-installed.

### C# 7 - `SystemCapability-CSharp07`

Dnn v.7.x - 9.x all include C# 5, but not C# 7.
C# 7 was once installed by default, but was reset to **include but not auto-install** because of
[issues with the hosting provider GoDaddy](https://dnntracker.atlassian.net/browse/DNN-8528).

<iframe src="https://azing.org/dnn-community/r/ogPu9EDH?embed=1" width="100%" height="600" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>
<!-- <script src="https://cdn.azing.org/e/1/embed.js"></script> -->


## Preinstalled System Capabilities

The following are always available in every Dnn:

* `SystemCapability-NetFramework`
* `SystemCapability-Razor`
* `SystemCapability-CSharp05`

## Unavailable System Capabilities

The following are listed just to clarify that they currently don't exist in DNN and
probably cannot be added in any feasible way.

* `SystemCapability-CSharp08` .net 3 (core)
* `SystemCapability-CSharp09` .net 5 (core)
* `SystemCapability-CSharp10` .net 6 (core)
* `SystemCapability-CSharp11` .net 7 (core)
* `SystemCapability-CSharp12` .net 8 (core)
* `SystemCapability-NetCore` Dnn is .net Framework only as of now
* `SystemCapability-Blazor` requires .net Core v3+; works in Oqtane

---

Shortlink: <https://go.2sic.org/dnn-syscap>
