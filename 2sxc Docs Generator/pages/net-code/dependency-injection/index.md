---
uid: NetCode.DependencyInjection.Index
---

# Depedency Injection in 2sxc and EAV

**Dependency Injection** is a way to **structure applications** and to **get Services** or **Helpers** in your code.

👉 We suggest you read the [introduction to Dependency Injection](xref:NetCode.DependencyInjection.Introduction)

## How Can I Use Dependency Injection in Razor?

Previously this was reserved for internal use.
Starting in 2sxc v11.11 all Razor classes have a command called [GetService](xref:NetCode.DynamicCode.GetService).
This is how your code would get a service:

```c#
@inherits Custom.Hybrid.Razor14
@Kit.Page.AddOpenGraph("video", "https://2sxc.org/videos/intro.mp4");
```

👉 Read more about [GetService](xref:NetCode.DynamicCode.GetService) in the docs or in the [GetService API](xref:ToSic.Sxc.Code.IDynamicCode.GetService*).

## How Can I Use Dependency Injection in WebAPIs?

Just like with with Razor, 2sxc 11.11 added the same GetService to all WebAPIs.

## How Can I Use Dependency Injection in Dnn Modules and Skins

👉 [](xref:NetCode.PlatformApi.Dnn.DependencyInjection)

## How Can I Use Dependency Injection in Oqtane

👉 [](xref:NetCode.PlatformApi.Oqtane.DependencyInjection)

## Services My Code May Need

You can get just about anything from 2sxc.
The most common services you'll request as of 2sxc 12 are in the [ToSic.Sxc.Services namespace](xref:ToSic.Sxc.Services).


[!include["history"](../services/_history.md)]
