---
uid: NetCode.WebApi.JsonFormat
---

# Custom C# Web API - JSON Format

## Background: JSON Format in WebApi Requests

Today most JavaScript clients use JSON to communicate with the server.
This is a very simple format, which is easy to read and write.
It's also very easy to parse in JavaScript, which is why it's so popular.

In the old days, Microsoft used XML for this, but it's much more complex and difficult to read and write.
When 2sxc was created, JSON was already the standard, so we never used XML.
But at that time, the json plugin **Newtonsoft** was the de-facto standard, so we used that.
But nowadays `System.Text.Json` is the de-facto standard.
This means that _by default_ this is what is being used:

1. On DNN on all base classes up until `Custom.Hybrid.Api14` Newtonsoft is used for serialization
1. On Oqtane all base classes use the new .net core serializer

## How to Go Modern

In 2sxc 16 we introduced a new attribute called `[JsonFormatter]` - see [](xref:ToSic.Sxc.WebApi.JsonFormatterAttribute).
When it's applied to:

1. a WebApi Controller class
1. a specific method of that class

then it will use the new .net core serializer.
It has the following effects:

1. It can auto-convert `IEntity` objects as well as lists/arrays of `IEntity` objects
1. By default it will use **camelCase** for all properties, which is the modern standard.

> [!TIP]
> Remember that this applies to both `POST` data from the client,
> as well as response data.

## Example

```c#
using ToSic.Sxc.WebApi;   // For the [JsonFormatter] (see below)

[AllowAnonymous]
[JsonFormatter]
public class Api14AttController : Custom.Hybrid.Api14
{
    [HttpGet]
    public object GetEntity()
    {
        return (App.Data.List.First());
    }

    [HttpGet]
    public object GetEntities()
    {
        return App.Data.List;
    }
}
```

## Effects on the POST Data

> [!TIP]
> `POST` data is parsed case-insensitive, so it doesn't matter if the client sends `camelCase` or `PascalCase` - it will be parsed correctly.

There are 2 important effects to keep in mind:

1. Most JSON in the POST will be the same no matter which serializer is used
1. Only exotic data such as binary files will be different

## Effects on Response Data

> [!TIP]
> Response data is usually read by JavaScript, which is case sensitive.

The main impact on Response Data is the client should expect `camelCase` instead of `PascalCase`.
This can be configured if you want it differently, like this:

```c#
  [HttpGet]
  [JsonFormatter(Casing = Casing.Preserve)] // auto-convert but preserve casing
  public dynamic PersonsAutoPreserveCasing()
  {
    return App.Data["Persons"];
  }
```

It will also auto-convert Entities for you, which used to be very difficult.
See [](xref:NetCode.WebApi.AutoConvertEntities)


## Recommended Reading

* [](xref:Tut.WebApi)
* [](xref:ToSic.Sxc.WebApi.JsonFormatterAttribute)

---

## History

1. New JsonFormatter introduced in 2sxc 16.00
