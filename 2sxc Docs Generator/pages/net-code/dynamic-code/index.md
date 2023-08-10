---
uid: NetCode.DynamicCode.Index
---

# Dynamic Code API

Every C# file in 2sxc is **Dynamic Code** as it's compiled on-the-fly and has a lot of helpers to work with [Dynamic Data](xref:NetCode.Data.Index).

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-cs { visibility: visible; } </style>
</div>

The following APIs are available on all 2sxc **Dynamic Code**. You can use this in:

1. [Razor](xref:NetCode.Razor.Index)
1. [WebAPI Controllers](xref:NetCode.WebApi.Index)
1. Helper Code files

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Instance Data in Dynamic Code

[!include[""](../dynamic-data/_include-data-origins.md)]

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
