---
uid: WebApi.Custom.BaseClass
---

# Custom C# Web API Base Classes

Any WebAPI controller in ASP.net inherits from a base class. This is a typical code you may see as an example:

```cs
using System.Web.Http;

[AllowAnonymous]
public class BasicController : ToSic.Sxc.Dnn.ApiController // <-- This is the Base Class
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

In classic ASP.net you would inherit from a class called `ApiController` (namespace `System.Web.Http`) and in classic Dnn you inherit from a base class `DnnApiController` (namespace `DotNetNuke.Web.Api`) which also inherits the standard `ApiController`. 

> [!TIP]
> Each additional layer adds functionality which will be available to your code. 

For example if you inherit from `ApiController` you can use objects such as `Request` and `User` in your code, and if you inherit from `DnnApiController` your code can also use `PortalSettings` or `ModuleInfo`. 


## Recommended Base Class in 2sxc 10+

You can use any base class available in 2sxc, including the previously mentioned `System.Web.Http.ApiController` and `DotNetNuke.Web.Api.DnnApiController` and others. But by inheriting from `ToSic.Sxc.Dnn.ApiController` your code will have access to many more objects like these:

* App
* Data
* Content
* CmsContext

You also get many helper commands like these

* AsDynamic(...)
* AsEntity(...)
* [SaveInAdam(...)](xref:WebApi.Custom.DotNet.SaveInAdam)

> [!TIP]
> As of 2sxc 10 we always recommend that your APIs inherit from `ToSic.Sxc.Dnn.ApiController`

## The Past: Avoid using SxcApiController

In previous versions of 2sxc the recommended base class was `ToSic.SexyContent.WebApi.SxcApiController`. For compatibility reasons this still works, but we strongly urge you to switch over to the new `ToSic.Sxc.Dnn.ApiController` as the old base class may become deprecated. 

> [!CAUTION]
> We strongly recommend that you switch over to the new base class `ToSic.Sxc.Dnn.ApiController`.  
> But be aware that some of the APIs have changed a bit, so switching will take a few minutes. You will probably see compile errors which tell you what to fix. 

## The Future: A Hybrid Base Class

As of March 2021 we're working on bringing 2sxc to [](xref:Platform Oqtane). Since Oqtane doesn't have Dnn objects like `PortalSettings` we must develop a new base class which will have an identical API across all platforms. This is still work in progress. 


## Recommended Reading

* [](xref:Tut.WebApi)
* [WebApi](xref:WebApi.Index)
* [Concepts: Polymorphisms](xref:Basics.App.Polymorphism)




## History

1. Introduced in 2sxc 06.05
1. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)
1. The `ToSic.Sxc.Dnn.ApiController` was introduced in 2sxc 10.25

