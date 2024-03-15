---
uid: NetCode.Services.More
---

# More Services

> [!TIP]
> Almost all services which should be used are available on the [Kit](xref:NetCode.Services.ServiceKits).

## Where to Find More Services

As of 2sxc 13+ we publish all common services for your Razor / C# code on [ToSic.Sxc.Services](xref:ToSic.Sxc.Services).
This helps you figure out what's in the box - just go check it out.

## How To Get Services

Technically a service is just a .net object which does stuff for you.
They are provided through **Dependency Injection**.

You can get Services in your C# code like this:

```csharp
using ToSic.Sxc.Services;
var page = GetService<IPageService>();
```

Internally services may require additional information to work - like the current Page it's on etc.
This happens almost by magic thanks to **Dependency Injection**.
If this is new to you, you should [read up on it](xref:NetCode.DependencyInjection.Index).

