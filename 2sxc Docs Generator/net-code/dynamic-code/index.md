---
uid: NetCode.DynamicCode.Index
---

# Dynamic Code API

The following APIs are available on all 2sxc **Dynamic Code** - so you can use this in:

1. Razor (including Code-Behind)
1. Web API Controllers
1. Helper Code files


## Instance Data in Dynamic Code

> [!NOTE]
> Instance specific data _belongs_ to the module-instance on the page, either because it was manually added or because the module-instance uses a Query which is specific to this module. 

Learn more about this in [](xref:NetCode.DynamicData.Index)

[!include["List of Data Context Objects"](../dynamic-code/_include-instance-data.md)]


## App and App-Data Objects

[!include["App Objects"](../dynamic-code/_include-app-objects.md)]


## General Objects


[!include["Helpers"](../dynamic-code/_include-helpers.md)]


## Conversion Commands

[!include["Conversions"](../dynamic-code/_include-conversions.md)]



## Helper Commands provided by 2sxc

[!include["Conversions"](../dynamic-code/_include-commands.md)]


## Important Notes

> [!IMPORTANT]
> Your code must inherit the correct base class to get this API.
> You'll find the correct base classes in the documentations for Razor and Web API.