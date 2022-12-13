---
uid: Abyss.Parts.LookUp.Engine
---

[!include[](~/assets/features/look-up-system.md)]

# LookUp Engine

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-engine { visibility: visible; } </style>

The **LookUp Engine** is responsible for getting values. It will use **LookUp** sources to resolve the values.

* The LookUp System is in the [](xref:ToSic.Eav.LookUp) namespace
* The LookUp Engine is an [](xref:ToSic.Eav.LookUp.ILookUpEngine)

> [!WARNING]
> This is very technical stuff, you usually don't need to know this. We're just including it for completeness sake.

## LookUpEngine

LookUp Engines will collect a set of LookUp objects and use these to resolve strings like `Module:ModuleId`. For this, they will check which LookUp has the right name (in this case `Module`) and will ask it if it can provide the value (in this case the `ModuleId`).

## Notes

Usually LookUp Engines will receive a long list (Dictionary) of things to look up, and resolve these in one quick call. This is because often they are attached to a DataSource which requires many configuration values - so they will prepare the list of parameters, pass it to the LookUpEngine and then work with the results as needed.

> [!TIP]
> LookUp Engines can also perform default-fallbacks - so if a LookUp source can't provide the answer needed, the engine may use a static value instead:
> `[QueryString:PageSize||10]`

> [!TIP]
> LookUp Engines can also perform lookup-fallbacks if the source can't provide an answer. In this case it may ask another LookUp if it has the answer. This happens when the Token looks like this:  
> `[QueryString:PageSize||[App:Settings:PageSize]]`


## C# and Dependency Injection

LookUp Engines all implement the [](xref:ToSic.Eav.LookUp.ILookUpEngine) interface and should inherit the `LookUpEngine` object.

LookUpEngine objects are provided with DepedencyInjection. The system that gets the currently valid LookUpEngine inherits the [](xref:ToSic.Eav.LookUp.ILookUpEngineResolver).



## Also Read #todoc

* [](xref:Abyss.Parts.LookUp.Index)
* [](xref:Abyss.Parts.LookUp.Tokens)
* [](xref:NetCode.DataSources.Custom.ConfigurationParse)
* [](xref:ToSic.Eav.LookUp)
* [](xref:ToSic.Sxc.LookUp)
* [](xref:ToSic.Sxc.Dnn.LookUp)


## History

1. General Tokens introduced in 2sxc 1.0
1. Most enhancements were in 2sxc 07.00

