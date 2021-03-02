---
uid: WebApi.Specs.Security
---

# Security for 2sxc WebAPI and REST APIs

All WebAPI calls in Dnn, Oqtane and 2sxc have some security features. 
In the basic use cases it's straightforward: the current user may do some things, and that should be allowed. 

These docs should help you understand where these things are configured and what to change if you need adjustments. 

## Request Security

Each request contains information needed for the backend to determine if this request should be answered or not. In Dnn and Oqtane this is the **User Identity** and the **RequestVerificationToken**. 

### User Identity

By default, the user is logged in using normal web conventions and from then on the user will have an encrypted cookie identifying this person. 

In advanced scenarios you may also use [JWT](https://jwt.io/) aka **Json Web Tokens**. 
This is useful in mobile app scenarios and scenarios where the client application is remote (like a web-server or a SPA). 
Consult the docs of Dnn or Oqtane to find out how to use this. 

You could also use custom login systems like OAuth, but in these cases you will really need to figure out how to implement it in Dnn or Oqtane. 

### Anti Forgery Token: RequestVerificationToken

ASP.net has a feature to prevent XSS (Cross Site Scripting / Cross-Site Request Forgery). 
To make this possible, pages viewed by a user have some hidden key included which is encrypted to include identity-information for this user. It is included in all HTTP requests except for `GET` requests. 

If an endpoint is secured to check for this using `[ValidateAntiForgeryToken]`, then only requests containing this header will be processed. 

> [!TIP]
> Not all endpoints require this, but many do. 
> It's commonly enforced on admin-endpoints and on any endpoint which are not expected to be used from
> outside of the site. It's best practice to require this where possible. 

> [!WARNING]
> `GET` requests don't include this header, so don't enforce checking this in the backend for GET endpoints. 

When you use standard **2sxc JS** WebAPI calls, the RequestVerificationToken is automatically included in the request. If you use your own JS API stack or plain vanilla browser implementations, make sure you add it. 


## REST Content and Query Endpoint Security

The built-in [Content](xref:WebApi.Content) and [Query](xref:WebApi.Query) endpoints use configuration based security. 

### Prerequisites: Platform Permissions are OK

Just to be aware of the obvious: if the platform (Dnn/Oqtane) don't allow access to the endpoints for whatever reason, then even the built-in endpoints won't do anything. 

### Default Security Configuration: Nothing is allowed

Both Content and Query are by default only available to admins and super-users. To make these available to other users (incl. Anonymous) this must be configured.

### Opening Security Configuration

These are the places you can configure to open security: 

1. On an **App** you can give general permissions that apply to all content types. This is usually not recommended. 
1. On a **Query** you can configure read permissions for specific users or user groups.
1. On a **Content-Type** (the schema that says what fields exist) you can configure many permissions incl. read and write. You can even configure more exotic permissions like:
    1. _Anonymous users can create data, but they are set to draft and not visible_
    1. _Registered users can create data and only edit data which they created_

> [!NOTE]
> Permissions are all locked by default, and adding permissions will only open up permissions.
> There are no deny-permissions.

> [!WARNING]
> Some permissions like _If the user has View permissions, allow Read_ require a [Module Context](xref:WebApi.Specs.Context) since that's required to detect if the condition _View Permissions_ is met. 


## Custom WebAPI Permissions

Custom WebAPI Security is configured using [Attributes](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes/).

These attributes can be placed on the *class* (in which case they apply to all actions/methods of that class) or on a specific _method_ (in which case it only applies to that method).

This example will NOT respond to _Anonymous_ requests from outside:

```c#
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

```c#
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

```c#
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

The exact set of attributes varies a bit on DNN and Oqtane, but we're working on a unified set. 
As of now, these attributes are common in DNN:

1. `[AllowAnonymous]` - apply to class or method  
    This allows non-identified users to use this endpoint.  
    requires `using System.Web.Http;`
1. `[SupportedModules("2sxc,2sxc-app")]` - apply to class or method  
    This says to only respond to requests if they originate from a `2sxc` module or a `2sxc-app` Module. Note that this will only work if the [Module Context](xref:WebApi.Specs.Context) is known.  
    requires `using DotNetNuke.Web.Api;`
1. `[ValidateAntiForgeryToken]` - apply to class or module  
    Verifies that the `RequestVerificationToken` in the header is valid. 
    These requests will be blocked if the Anti-Forgery-Token is missing, invalid or is meant for another user.  
    _Note: this means such requests can only be called from a JS on a DNN page_  
    requires `DotNetNuke.Web.Api;`
1. `[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Admin)]` - apply to class or method  
    requires `using DotNetNuke.Web.Api;`


### Common Other Attributes (HttpGet, HttpPost, HttpDelete)

These attributes `[HttpGet]`, `[HttpPost]` and `[HttpDelete]` are not really security attributes, but because they often lead to problems we figured we should mention them. Adding these to your method means that your method will listen to the **Verbs** mentioned, and only to these verbs. So a method like this:

```c#
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

```c#
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

- [DotNet WebApi](xref:WebApi.Custom)
- [](xref:WebApi.Specs.Context) - every request has a context, it's best you read up on that
- [Concepts: Polymorphisms](xref:Specs.Cms.Polymorphism)

## Demo App and further links

You should find some code examples in this demo App

- [Razor Web API tutorials](xref:Tut.WebApi)
- [REST and WebApi Tutorial](http://2sxc.org/en/apps/app/tutorial-javascript-rest-api-using-jquery-and-angularjs)
- [Mobius Forms App](https://2sxc.org/en/apps/app/mobius-forms)

## History

1. Introduced in 2sxc 5.x
1. Query added in 2sxc 8.10
2. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing edition-folder/api)
