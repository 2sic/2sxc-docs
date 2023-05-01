---
uid: Abyss.Parts.LookUp.Sources
---

[!include[](~/assets/features/look-up-system.md)]

# LookUp Sources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

The [LookUp System](xref:Abyss.Parts.LookUp.Index) will use the [LookUp Engine](xref:Abyss.Parts.LookUp.Engine) to retrieve values for Queries and more. 

The LookUp engine will parse tokens like `[Module:ModuleId]` and then look for a **LookUp Source** with the matching name, in this case `Module`. 

For this to be possible, the Engine has a list of named sources like 

* `Module`
* `QueryString`
* `Params`
* etc.

On this page we'll explain how these work, and what special sources exist. 

## LookUp Sources

These are the sources which are automatically included in 2sxc

[!include[](~/pages/abyss/parts/look-up/_include-common-sources.md)]

### Token Template Sources

In [Token Templates](xref:Basics.Server.Render.Tokens.Index) we also have 3 special lookups

1. `Content` - the current content
1. `Content:Presentation` - presentation settings of the current content, if configured
1. `ListContent` ?
1. `ListContent:Presentation`
1. `AnyNameYouWant` specified in a `<repeat>` tag


### Query Sources

In [Queries](xref:Basics.Query.Index) we also have the following sources

1. [In](xref:Abyss.Parts.LookUp.In)
1. [Params](xref:Abyss.Parts.LookUp.Params)


### DataSource Settings Source

In [DataSources](xref:NetCode.DataSources.Index) code you will usually only work with `Settings` which contain all the settings that specific DataSource should work with. The `Settings` source only exists in your C# code, not in the VisualQuery. 

1. [Settings](xref:Abyss.Parts.LookUp.MyConfiguration)


## What is a LookUp Source (technical ⚠)

**LookUp Sources** are [](xref:ToSic.Eav.LookUp.ILookUp) objects and have a `Name` like like `QueryString`, `Module`, `Portal` etc. 

Each one is capable of retrieving values like `Id` or `DefaultPage`.

So the **Engine** will ask the specific source for the expected value and the source will try to find it. 
If it has an answer, it will return that. 
If it doesn't find anything it will return null and let the Engine take care of fallback options. 

> [!TIP]
> Everything is lazy, so these objects are only accessed and populated if the parameter is actually needed. 
> This results in great performance.

All LookUp objects implement the [](xref:ToSic.Eav.LookUp.ILookUp) interface and inherit the [](xref:ToSic.Eav.LookUp.LookUpBase) object. 

## Internal LookUp Objects (technical ⚠)

Just to give you an idea of the power of LookUp objects, here are some in use:

1. [](xref:ToSic.Eav.LookUp.LookUpInEntity) - this resolves entity values.
1. [](xref:ToSic.Eav.LookUp.LookUpInNameValueCollection) - this resolves from name/value lists like `Dictionary` or `Request.QueryString` objects
<!-- 1. [](xref:ToSic.Eav.LookUp.LookUpInMetadata) - will get values from Metadata of something -->
1. [](xref:ToSic.Eav.LookUp.LookUpInLookUps) - will look up values in various attached LookUp objects
1. [](xref:ToSic.Eav.LookUp.LookUpInDataTarget) - will look up a value from an `In` stream of a DataSource
1. [](xref:ToSic.Sxc.Dnn.LookUp.LookUpInDnnPropertyAccess) - will look up stuff in Dnn specific PropertyAccess objects, which are similar to LookUp objects
1. [](xref:ToSic.Eav.LookUp.LookUpInEntity) - will look up things in an IEntity and also provide more information like Count, IsFirst, etc. for the Token Engine

---

## Also Read

* [](xref:Abyss.Parts.LookUp.Index)

## History

1. General Tokens introduced in 2sxc 1.0
1. Most enhancements were in 2sxc 07.00

