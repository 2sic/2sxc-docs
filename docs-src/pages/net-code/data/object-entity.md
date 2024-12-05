---
uid: NetCode.DynamicData.Entity
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# Entity Objects

All content-items in the **EAV** database of 2sxc are internally handled as `Entity` objects with the interface `IEntity`.
When using content-items in Razor-Templates and WebAPIs you usually don't care about this, as you will use it as a [](xref:ToSic.Sxc.Data.IDynamicEntity).

But there are some advanced cases where you need to look deeper into the object - maybe to check if a translation exists in another language, or if the value is blank because it's null, or an empty string.
In this case you'll need to look at the internals, the `IEntity`.

To learn more about the differences, check out [DynamicEntity vs Entity](xref:NetCode.Data.ObjectTypes)


## Using the IEntity Interface

Just a short piece of code to show how it would work (but not usually recommended).

```cs
// This example shows how to get the link as stored in the data 
// without converting page:74 to the real link
var languagePreference = ["de", "en"];
var autoResolveLinks = false;
var rawLink = AsEntity(Content).GetBestValue("Link", languagePreference, autoResolveLinks);

// Hard-core accessing the internal data structure
IEntity entity = AsEntity(Content);
Dictionary<string, IAttribute> attribs = entity.Attributes;
IAttribute titleMultiLanguage = attribs["Title"];
string attType = titleMultiLanguage.Type;
IEnumerable<IValue> titleVals = titleMultiLanguage.Values;
IValue firstTitle = titleVals.First();
string firstString = firstTitle.ToString();
IEnumerable<ILanguage> langAssignments = firstTitle.Languages;
//etc.
```

## When would You need to work with Entity objects

For Razor and WebAPI these are edge cases, but they are real:

1. The DynamicEntity will automatically resolve links like `page:72` and give you `http://...`. In rare cases you may need to actually get `page:72` and for this you need to convert back to Entity. 
1. If you want to explicitly figure out what languages have been translated on a value
1. To find out more about the underlying Content-Type (like to list the fields)
1. If the entity is Metadata and you want to know what it's assigned to
1. If the entity has Metadata and you want to get that

## Read also

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

In case you feel like you really need to know more about the real Entity objects, check out these things:

1. [IEntity](xref:ToSic.Eav.Data.IEntity) API
1. [AsEntity(...)](xref:NetCode.DynamicCode.AsEntity)
1. [](xref:NetCode.Data.ObjectTypes)



## History

1. Introduced in 2sxc 01.00
1. Multi-Language since 2sxc 02.00
1. Added `Value` and `Value<T>` as well as `Parents()` and `Children(...)` in 09.42. Note that Value does not do the same thing as GetBestValue.
