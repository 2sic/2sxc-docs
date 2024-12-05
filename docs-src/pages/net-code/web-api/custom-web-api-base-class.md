---
uid: NetCode.WebApi.BaseClass
---

# Custom C# Web API Base Classes

Any WebAPI controller in ASP.net inherits from a base class. This is a typical code you may see as an example:

```cs
[AllowAnonymous]
public class BasicController : Custom.Hybrid.Api14 // <-- This is the Base Class
{
  [HttpGet]
  public string Hello()
  {
    return "Hello from the basic controller in /api";
  }
}
```

In these docs we want to explain what the base class is for, and what you should use.


## Why Inherit from a Base Class

A WebAPI controller does a lot of magic in the background so your code can stay small and simple.

In classic ASP.net you would inherit from a class called `ApiController` (namespace `System.Web.Http`).
In classic Dnn you inherit from a base class `DnnApiController` (namespace `DotNetNuke.Web.Api`) which also inherits the `ApiController`.

> [!TIP]
> Each additional layer adds functionality which will be available to your code.

For example if you inherit from `ApiController` you can use objects such as `Request` and `User` in your code.
If you inherit from `DnnApiController` your code can also use `PortalSettings` or `ModuleInfo`.


## Recommended Base Class in 2sxc 14+

You can use any base class available in 2sxc.
But by inheriting the latest from `Custom.Hybrid.Api14` [docs](xref:Custom.Hybrid.Api14) your code will have access to many more objects like these:

* App
* Data
* Content
* CmsContext

You also get many helper commands like these

* AsDynamic(...)
* AsEntity(...)
* AsList(...)
* [SaveInAdam(...)](xref:NetCode.WebApi.DotNet.SaveInAdam)

> [!TIP]
> As of 2sxc 14 we always recommend that your APIs inherit from `Custom.Hybrid.Api14`

## Avoid using SxcApiController and Others

In previous versions of 2sxc the recommended base class was `ToSic.SexyContent.WebApi.SxcApiController`.
For compatibility reasons this still works, but we strongly urge you to switch over to the new `ToSic.Sxc.Dnn.ApiController` as the old base class may become deprecated.

> [!CAUTION]
> We strongly recommend that you switch over to the new base class `Custom.Hybrid.Api14`.  
> But be aware that some of the APIs have changed a bit, so switching will take a few minutes.
> You will probably see compile errors which tell you what to fix.

## Why Hybrid Base Classes

2sxc v12 was made multi-platform to support both Dnn and Oqtane.
By using any `Custom.Hybrid.*` base classes you can write code which will work on both platforms.
Since we belive that moving between platforms will soon be important, it's best to start now.


## Recommended Reading

* [](xref:Tut.WebApi)
* [WebApi](xref:WebApi.Index)
* [Concepts: Polymorphisms](xref:Basics.Polymorphism.Index)


---

## History

1. Introduced in 2sxc 06.05
1. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)
1. The `ToSic.Sxc.Dnn.ApiController` was introduced in 2sxc 10.25


---

## Internal Docs: Api Controller Inheritance

> [!WARNING]
> This is internal documentation for the 2sxc core developers.
> You don't need this part.

### Internal Docs: Dnn API Controller Inheritance

Basis for everything:

1. `System.Web.Http.ApiController`
    1. `DotNetNuke.Web.Api.DnnApiController`
        1. 🥷🏽 `ToSic.Sxc.Dnn.WebApi.DnnApiControllerWithFixes<TRealController>`  
            _internal base for everything but without context of module/block_  
            🔹 changes serialization (remove XML v3+ to default to Newtonsoft)  
            🔹 add System.Text.Json in v14.10+ to replace Newtonsoft  
            🔹 Adds logging to insights  
            🔹 Base class for **Real** controller concept

            1. 🥷🏽 `various` _internal API Controllers which don't need the context_
            1. 🥷🏽 `ToSic.Sxc.WebApi.SxcApiControllerBase<TRealController>` _internal_  
              🔹 Adds DNN Logging Exceptions  
              🔹 Add basic context of Block (Module) information
                1. 🥷🏽 `various` _internal API Controllers which need the context_
                1. 🥷🏽 `ToSic.Sxc.WebApi.DynamicApiController` _internal_  
                    _non-generic base class for all others_  
                    🔹 Adds empty contstructor to allow simple inheritance
                    🔹 Provides DynamicCode object and better context (block/module)

Based on that these public base classes were made:

1. ⭐💀 `ToSic.SexyContent.WebApi.SxcApiController` _public, very old/deprecated_  
    _oldest base class, should not be used any more_  
    🔹 had some exotic propecties such as `List` which contained Content/Presentation pairs  
1. ⭐💀 `ToSic.Sxc.Dnn.ApiController` _public, old/deprecated_  
    _was the recommended base class for v10 and v11_
1. 🥷🏽 `ToSic.Sxc.WebApi.ApiCoreShim` _internal_  
    _adds a lot of .net core API commands to the controller_
    1. ⭐💀 `Custom.Hybrid.Api12` _public, old/deprecated_
        1. ⭐💀 `Custom.Dnn.Api12` _public, old/deprecated_
    1. `Custom.Hybrid.Advanced.Api14<TModel, TServiceKit>` _internal_  
        _like Api12, but without the `Convert` object_
        1. ⭐🌟 `Custom.Hybrid.Api14` _public, **recommended**_
        1. ❓ `Custom.Hybrid.Api15` _WIP_  
            ⚡ _will use System.Text.Json for javascript serialization_
