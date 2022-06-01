---
uid: NetCode.WebApi.Security
---

# Security & Permissions in Custom WebAPIs

> [!IMPORTANT]
> This page explains how security is configured in custom WebAPI controllers.  
> But there is much more to security, so please read [](xref:WebApi.Specs.Security) as well.


Custom WebAPI Security is configured using [Attributes](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes/).

These attributes can be placed on the *class* (in which case they apply to all actions/methods of that class) or on a specific _method_ (in which case it only applies to that method).

This example will NOT respond to _Anonymous_ requests from outside:

```cs
using System.Web.Http;

public class BasicController : ToSic.Sxc.Dnn.ApiController
{
  [HttpGet]
  public string Hello()
  {
    return "Hello from the basic controller in /api";
  }
}
```

This example from the [dnn web api tutorials](https://2sxc.org/dnn-tutorials/en/razor/webapi110/page) will:

```cs
using System.Web.Http;

[AllowAnonymous]			// define that all commands can be accessed without a login
public class BasicController : ToSic.Sxc.Dnn.ApiController
{
  [HttpGet]
  public string Hello()
  {
    return "Hello from the basic controller in /api";
  }
}
```

And this example as well:

```cs
using System.Web.Http;

public class BasicController : ToSic.Sxc.Dnn.ApiController
{
  [HttpGet]
  [AllowAnonymous]			// only his command can be accessed without a login
  public string Hello()
  {
    return "Hello from the basic controller in /api";
  }
}
```

### Common Security Attributes for Custom WebAPI Controllers

The exact set of attributes varies a bit on Dnn and Oqtane, but we're working on a unified set. 
As of now, these attributes are common in Dnn. You can apply all to both classes and methods:

1. `[AllowAnonymous]`  
    This allows non-identified users to use this endpoint.  
    requires `using System.Web.Http;`
1. `[SupportedModules("2sxc,2sxc-app")]`  
    This says to only respond to requests if they originate from a `2sxc` module or a `2sxc-app` Module.  
    _Note that this will only work if the [Module Context](xref:WebApi.Specs.Context) is known._  
    requires `using DotNetNuke.Web.Api;`
1. `[ValidateAntiForgeryToken]`  
    Verifies that the `RequestVerificationToken` in the header is valid. 
    These requests will be blocked if the Anti-Forgery-Token is missing, invalid or is meant for another user.  
    _Note: this means such requests can only be called from a JS on a Dnn page_  
    requires `DotNetNuke.Web.Api;`
1. `[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Admin)]`  
    In place of the `SecurityAccessLevel.Admin` you can also use `SecurityAccessLevel.Anonymous` or [other values](https://dnndocs.com/api/DotNetNuke.Security.SecurityAccessLevel.html#DotNetNuke_Security_SecurityAccessLevel).  
    _Note that this will only work if the [Module Context](xref:WebApi.Specs.Context) is known._  
    requires `using DotNetNuke.Web.Api;`


### Common Other Attributes (HttpGet, HttpPost, HttpDelete)

These attributes `[HttpGet]`, `[HttpPost]` and `[HttpDelete]` are not really security attributes, but because they often lead to problems we figured we should mention them. Adding these to your method means that your method will listen to the **Verbs** mentioned, and only to these verbs. So a method like this:

```cs
using System.Web.Http;

public class BasicController : ToSic.Sxc.Dnn.ApiController
{
  [HttpGet]
  [HttpDelete]
  public string Hello()
  {
    return "Hello from the basic controller in /api";
  }
}
```
...will only respond to `GET` and `DELETE` requests, but not to `POST`. 

### Using Multiple Attributes

You can use many attributes on the same class or method like this: 

```cs
  [HttpGet]
  [ValidateAntiForgeryToken]
  [SupportedModules("2sxc,2sxc-app")]
  [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Admin)]
  {
    return "Hello from the basic controller in /api";
  }
```

In most cases it will do exactly what you expect - and each condition must be met for the command to process. 

## Common Mistakes

### Combining HttpGet with ValidateAntiForgeryToken

> [!WARNING]
> Combining `[HttpGet]` and `[ValidateAntiForgeryToken]` will fail, as GET requests cannot add custom headers. 

### Deny Access at Class level and Allowing at Method Level

> [!WARNING]
> Class level attributes are handled first, and if these result in denying the request
> then method-level attributes won't be checked. 

### Using Context-Requiring-Attributes for External Access

> [!WARNING]
> Certain tags like `[DnnModuleAuthorize(...)]` or `[SupportedModules(...)]` require a [context](xref:WebApi.Specs.Context). 
> If you plan to use the API from outside of the site (like from a mobile app) then those requests will not have the context, and fail. 

### Using ValidateAntiForgeryToken for External Access

> [!WARNING]
> Classes/methods decorated with `[ValidateAntiForgeryToken]` will require the token, which is only available for calls made by JavaScript on the page itself. 
> If you plan to use the API from outside of the site (like from a mobile app) then those requests will fail. 


## Read also

- [DotNet WebApi](xref:NetCode.WebApi.Index)
- [](xref:WebApi.Specs.Security) - understanding Security for all Web API calls
- [](xref:WebApi.Specs.Context) - every request has a context, it's best you read up on that

## Demo App and further links

You should find some code examples in this demo App

- [Razor Web API tutorials](xref:Tut.WebApi)
- [REST and WebApi Tutorial](http://2sxc.org/en/apps/app/tutorial-javascript-rest-api-using-jquery-and-angularjs)
- [Mobius Forms App](https://2sxc.org/en/apps/app/mobius-forms)


## History

1. These security features have been part of Dnn since ca. Dnn 6.0
