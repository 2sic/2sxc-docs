---
uid: NetCode.WebApi.AutoConvertEntities
---

# Custom C# Web API - Auto Convert Entities

## Background: Entities are Complex Objects

Internally all 2sxc data is stored as `IEntity` objects.
These are fairly complex, as they do caching and support multi-language values.

Because of this, any WebApi that wants to return it must convert it to a simple object.
Previously you had to do this manually, but 🆕 v16 it's done automatically if you use the `[JsonFormatter]` attribute.

## New Implementation (v16+)

```c#
using ToSic.Sxc.WebApi;   // For the [JsonFormatter] (see below)
...
[HttpGet]
[JsonFormatter]                           // this will auto-convert Entities to JSON
public dynamic PersonsAuto()
{
  return App.Data["Persons"];
}
...
```

Note that by default, it uses _camelCase_ for all properties, which is the modern standard.
But you can change that as needed, read about it [](xref:NetCode.WebApi.JsonFormat).



## Old Implementation (before v16)

Before 2sxc 16, this had to be done manually, ca. like this:

```c#
using ToSic.Eav.DataFormats.EavLight; // For Auto-Conversion
...
[HttpGet]                             // [HttpGet] says we're listening to GET requests
public dynamic PersonsAuto()
{
  // 2sxclint:disable:v14-no-getservice
  var json = GetService<IConvertToEavLight>();
  return json.Convert(App.Data["Persons"]);
}
...
```




## Recommended Reading

* [](xref:Tut.WebApi)
* [](xref:ToSic.Sxc.WebApi.JsonFormatterAttribute)

---

## History

1. New JsonFormatter introduced in 2sxc 16.00
