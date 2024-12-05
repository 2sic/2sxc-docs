---
uid: NetCode.WebApi.Hybrid.Index
---

# Custom C# Web API: Hybrid Dnn & Oqtane APIs

Dnn and Oqtane have a few differences because of these important factors:

1. Different underlying C# and .net frameworks
1. Different platforms (Dnn is different from Oqtane)
1. Different security attributes for each platform

> [!IMPORTANT]
> This is very advanced stuff and only relevant if you want to create Apps which run on _both_ Dnn and Oqtane. 
>
> For most of your apps this is not relevant

## 2sxc Philosophy - Stay out of the Way

Our philosophy is to _not reinvent the wheel_ so it's important that we let you use the .net APIs as they are designed. Se we don't plan on creating another API which to hide the differences, but let you understand them and easily handle everything as needed. 

## Core Strategies for Hybrid WebAPIs

If you follow these three rules you should be good to go:

1. Inherit from `Custom.Hybrid.Api12`
1. Use very common C# features and syntaxes which existed since C# 7.2 (so anything that runs in Dnn will also run in Oqtane)
1. Use .net standard 2.0 APIs and avoid using `System.Web`
1. Where necessary, use preprocessor directives as explained below

## The Preprocessor Directives

C# has special `#if` [preprocessor](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives) statements which are evaluated during compilation. 
Using this you can define which code should be used in Dnn and Oqtane. Here's an example:

```c#
// Add namespaces to enable security in Oqtane & Dnn despite the differences
#if OQTANE
using Microsoft.AspNetCore.Authorization; // .net core [AllowAnonymous] & [Authorize]
using Microsoft.AspNetCore.Mvc;           // .net core [HttpGet] / [HttpPost] etc.
using Oqtane.Shared;        // Oqtane role names
#else
using System.Web.Http;      // .net 4.5 [AllowAnonymous] / [HttpGet]
using DotNetNuke.Web.Api;   // [DnnModuleAuthorize]
using DotNetNuke.Security;  // SecurityAccessLevel.Xyz
#endif

// All commands can be accessed without security checks
public class HybridController : ToSic.Custom.Api12
{
  [AllowAnonymous]  // Works in Oqtane and Dnn
  [HttpGet]         // Works in Oqtane and Dnn
  public string Hello()
  {
    return "Hello from the basic controller in /api";
  }

  #if OQTANE
  [Authorize(Roles = RoleNames.Everyone)]
  #else
  [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Anonymous)]
  #endif
  [HttpGet]
  public int Square(int number)
  {
    return number * number;
  }
}
```

The following _symbols_ are set when Api Controllers are compiled:

[!include[](~/pages/net-code/hybrid/_include-preprocessor-symbols.md)]

Use like this:

* `#if OQTANE ... #endif`
* `#if OQTANE ... #else ... #endif`
* `#if !OQTANE ... #endif`
* `#if !OQTANE ... #else ... #endif`


You can't use `#if Dnn ... #endif` because of limitations in the dynamic C# compiler of Dnn. Just use `#if !OQTANE ... #endif`. 


## Different C# and .net Frameworks

| Part | Dnn 7 | Dnn 9 | Oqtane
| --- | --- | --- | ---
| C# Language | ca. 7 | ca. 7 | C# 9
| .net Framework | 4.5.1 | 4.7.2 | .net core 5
| .net Standard | 1.6 | 2.0 | 2.0

Any hybrid controller must limit itself to features in .net standard 1.6 or 2.0, depending on the platforms you want to support. Note that any 2sxc standard apps are meant to still run in Dnn 4.7.2, so we'll restrict our work to support _.net standard 1.6_. This means our examples are more limited than what you will be doing. 

## Differences in the Platforms

If you are creating hybrid controllers, we'll assume that you usually don't need to access properties of Dnn or Oqtane. If you do, you'll have to use the standard mechanisms provided by these. 

* In Dnn - use global objects like `PortalSettings.Current`
* In Oqtane use [Dependency Injection](xref:NetCode.DependencyInjection.Index)
* To avoid the code from causing trouble during compilation, wrap the necessary differences in `#if OQTANE ... #endif` and `#if !OQTANE ... #endif` blocks

## Security Attribute Differences

All APIs need to have the correct attributes to mark the security requirements. 

```cs
// Oqtane way
[Authorize(Roles = RoleNames.Admin)]

// Dnn way
[DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Admin)]
```

The Attributes come from these namespaces:

* Dnn: `DotNetNuke.Web.Api`
  * `[DnnModuleAuthorize]` - the most common security attribute
  * `[DnnAuthorize]` - for special cases, we're not sure if it's ever used.  
    _my understanding is that it's for protecting an endpoint that will be accessed by users, but not from a module on the page, so the module-context would be missing. note that it's very different from the DnnModuleAuthorize_
  * `[SupportedModules]` - to limit access to an API from specific modules. You probabably won't ever use this. 
* Oqtane: `Microsoft.AspNetCore.Authorization` 
  * `[Authorize]` - standard Authorize of .net core

The list of possible values come from these namespaces/enums/constants:

* Dnn: `DotNetNuke.Security.SecurityAccessLevel`  
  Example: #todoc
* Oqtane Core Roles `Oqtane.Shared.RoleNames`  
  Example: `[Authorize(Roles = RoleNames.Host)]`
  Multiple: `[Authorize(Roles = RoleNames.Host, RoleNames.Admin)]`
* Oqtane Common Permissions: `Oqtane.Shared.PolicyNames`  
  Example: `[Authorize(Policy = PolicyNames.ViewPage)]`
  Multiple: `[Authorize(Policy = PolicyNames.ViewPage, PolicyNames.ViewFolder)]`

Permissions of this using `DnnModuleAuthorize` or `Authorize`

| Target Permission | `DnnAuthorize` | `DnnModuleAuthorize` | Oqtane `Authorize`
| --- | --- | --- | ---
| System Admin | ? | `SecurityAccessLevel.Host` | `RoleNames.Host`
| Site Admin | ? | `SecurityAccessLevel.Admin` | `RoleNames.Admin`
| Registered users | ? | ? | `RoleNames.Registered`
| Anybody | ? | `Anonymous` | `RoleNames.Everyone`
| Module Editor | ? | `SecurityAccessLevel.Edit` | `PolicyNames.EditModule` <br> `PolicyNames.EditPage`
| Module Viewer | ? | `SecurityAccessLevel.View` | `PolicyNames.ViewModule` <br> `PolicyNames.ViewPage`
| Module Permissions Manager | ? | `SecurityAccessLevel.ViewPermissions` | `RoleNames.Admin`
| Module ControlPanel | ? | `SecurityAccessLevel.ControlPanel` | `RoleNames.Admin`
| Module SkinObjects ? | ? | `SecurityAccessLevel.SkinObject` | `RoleNames.Admin`


## ValidateAntiForgeryToken Differences

Comparison

| Purpose | Attribute | Dnn Namespace | Oqtane/.net Core Namespace
| --- | --- | --- | --- |
| Enforce Anti-Forgery | `[ValidateAntiForgeryToken]` | `DotNetNuke.Web.Api` | `Microsoft.AspNetCore.Mvc`
| Skip Enforcing on a method even if Class enforces it | `[IgnoreAntiforgeryToken]` | (doesn't exist) | `Microsoft.AspNetCore.Mvc`
| Auto Enforce on unsafe calls (POST, etc.) | `[AutoValidateAntiforgeryToken]` | (doesn't exist) | `Microsoft.AspNetCore.Mvc`

_Sidenote: in the .net core implementation the attributes can also accept an `order` parameter which defaults to `1000`. We believe you should never change this :) but it does allow for other security configurations than were possible in Dnn._

## HTTP Verbs like GET, POST

All APIs need to have attributes like `[HttpGet]` and `[HttpPost]`. The main difference you need to be aware of is that they must come from a different namespace. Use the `#if ...` statements as shown in the example above. 


## API Result JSON Output

Standard Implementations:

* In Dnn WebApis all data is automatically converted to JSON. This was an early design decision of 2sxc and works great for most cases, but some edge cases (like responding with XML) is more difficult this way. 
* In Oqtane (.net core 5) the default is more sophisticated. The methods return objects or values. In advanced cases they will return an `ActionResult` or `ContentResult`. The default encoding is as follows:
  * Simple values like strings are returned just as-is
  * Complex objects are serialized - by default as json

So for anything more complex the behavior is often identical, but for simple values it's different unless you specify explicitly what you want:

| Value | Type | Dnn 2sxc API | Oqtane Apis | Comments
| --- | --- | --- | --- | ---
| `27` | int | `27` | `27` | identical
| `"Hello World"` | string | `"Hello World"` | `Hello World` | Note missing quotes in Oqtane which makes this non-json
| `["a", "b"]` | string[] | `["a", "b"]` | `["a", "b"]` | identical

> The most important difference is that by default, strings are _not_ converted to JSON

If you need to return a simple string and must ensure it's JSON on both platforms, add this attribute to your class or method:

```c#
[Produces("application/json")]
```

This is in the namespace `using Microsoft.AspNetCore.Mvc` which you usually already have. Since Dnn won't know it, you will probably wrap it in an `#if OQTANE` like this:

```c#
#if OQTANE
[Produces("application/json")]
#endif
```

---

## History

1. Introduced in 2sxc 12.00

