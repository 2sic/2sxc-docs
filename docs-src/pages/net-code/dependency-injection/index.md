---
uid: NetCode.DependencyInjection.Index
---

# Dependency Injection in 2sxc and EAV

**Dependency Injection** is a way to **structure applications** and to **get Services** or **Helpers** in your code.

👉 We suggest you read the [introduction to Dependency Injection](xref:NetCode.DependencyInjection.Introduction)

## Prefer `Kit` do `GetService()`

> [!IMPORTANT]
> It's recommended to use `Kit` instead of `GetService()` directly for better maintainability and readability.
>
> The `Kit` object has almost all the services you'll ever need.

So the example which will be shown below, would usually be written like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@Kit.Page.AddOpenGraph("video", "https://2sxc.org/videos/intro.mp4");
```

## How Can I Use Dependency Injection in Razor?

Previously this was reserved for internal use.
Starting in 2sxc v11.11 all Razor classes have a command called [GetService](xref:NetCode.DynamicCode.GetService).
This is how your code would get a service:

```razor
@inherits Custom.Hybrid.Razor12
@GetService<ToSic.Sxc.Services.IPageService>().AddOpenGraph("video", "https://2sxc.org/videos/intro.mp4");
```

## Discover More

<div docs-tiles>

  <div icon="file-code" title="Read more about GetService in your Code">
    <a href="xref:NetCode.DynamicCode.GetService"></a>
  </div>
  
  <div icon="journal-code" title="Check out the GetService API">
    <a href="xref:Custom.Hybrid.Razor12.GetService*"></a>
  </div>

  <div icon="journal-code" title="Typical 2sxc Services you May Need">
    <a href="xref:ToSic.Sxc.Services"></a>
  </div>

  <div icon="box-arrow-up-right" emoji="☢️" title="Dependency Injection in Dnn Modules and Skins">
    <a href="xref:NetCode.PlatformApi.Dnn.DependencyInjection"></a>
  </div>

  <div icon="box-arrow-up-right" emoji="🩸" title="Dependency Injection in Oqtane">
    <a href="xref:NetCode.PlatformApi.Oqtane.DependencyInjection"></a>
  </div>
</div>

## FAQ

1. How Can I Use Dependency Injection in WebAPIs?  
    Just like with with Razor, 2sxc 11.11 added the same GetService to all WebAPIs.

---

[!include["history"](../services/_history.md)]
