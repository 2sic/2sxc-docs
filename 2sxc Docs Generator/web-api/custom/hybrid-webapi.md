---
uid: WebApi.Custom.Hybrid
---

# Custom C# Web API: Hybrid Dnn & Oqtane APIs

Dnn and Oqtane have a few differences because of these important factors:

1. Different underlying C# and .net frameworks
1. Different platforms
1. Different security attributes for each platform

> [!IMPORTANT]
> This is very advanced stuff and only relevant if you want to create Apps which run on _both_ Dnn and Oqtane. 
>
> For most apps this is not important

## Core Strategies for Hybrid WebAPIs

If you follow these three rules you should be good to go:

1. Use very common C# features and syntaxes which existed since C# 7.2 (so anything that runs in DNN will also run in Oqtane)
1. Use .net standard 2.0 APIs and avoid using `System.Web`
1. Where necessary, use preprocessor directives as explained below

## The Preprocessor Directives

C# has special `#if` [preprocessor](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives) statements which are evaluated during compilation. 
Using this you can define which code should be used in Dnn and Oqtane. Here's an example:

```c#
// Add namespaces to enable security in Oqtane & DNN despite the differences
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
  [AllowAnonymous]  // Works in Oqtane and DNN
  [HttpGet]         // Works in Oqtane and DNN
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

| Key | True for Dnn | True for Oqtane
| --- | :-: | :-:
| `OQTANE` | ⛔ | ✅
<!-- | `NETCORE` | ⛔ | ✅ -->

Use like this:

* `#if OQTANE ... #endif`
* `#if OQTANE ... #else ... #endif`
* `#if !OQTANE ... #endif`
* `#if !OQTANE ... #else ... #endif`


You can't use `#if DNN ... #endif` because of limitations in the dynamic C# compiler of Dnn. Just use `#if !OQTANE ... #endif`. 


## Different C# and .net Frameworks

| Part | Dnn 7 | Dnn 9 | Oqtane
| --- | --- | --- | ---
| C# Language | ca. 7 | ca. 7 | C# 9
| .net Framework | 4.5.1 | 4.7.2 | .net core 5
| .net Standard | 1.6 | 2.0 | 2.0

Any hybrid controller must limit itself to features in .net standard 1.6 or 2.0, depending on the platforms you want to support. Note that any 2sxc standard apps are meant to still run in DNN 4.7.2, so we'll restrict our work to support _.net standard 1.6_. This means our examples are more limited than what you will be doing. 

## Differences in the Platforms

If you are creating hybrid controllers, we'll assume that you usually don't need to access properties of Dnn or Oqtane. If you do, you'll have to use the standard mechanisms provided by these. 

* In DNN - use global objects like `PortalSettings.Current`
* In Oqtane use Dependency Injection
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
  * `[DnnAuthorize]` - for special cases, we're not sure if it's ever used
  * `[SupportedModules]` - to limit access to an API from specific modules. You probabably won't ever use this. 
* Oqtane: `Microsoft.AspNetCore.Authorization` 
  * `[Authorize]` - standard Authorize of .net core

The list of possible values come from these namespaces/enums/constants:

* Dnn: `DotNetNuke.Security.SecurityAccessLevel`
* Oqtane: `Oqtane.Shared.RoleNames`

Permissions of this using `DnnModuleAuthorize` or `Authorize`

| Target Permission | `DnnAuthorize` | `DnnModuleAuthorize` | Oqtane `Authorize`
| --- | --- | --- | ---
| System Admin | ? | `SecurityAccessLevel.Host` | `RoleNames.Host`
| Site Admin | ? | `SecurityAccessLevel.Admin` | `RoleNames.Admin`
| Registered users | ? | ? | `RoleNames.Registered`
| Anybody | ? | `Anonymous` | `RoleNames.Everyone`
| Module Editor | ? | `SecurityAccessLevel.Edit` | -
| Module Viewer | ? | `SecurityAccessLevel.View` | -
| Module Permissions Manager | ? | `SecurityAccessLevel.ViewPermissions` | -
| Module ControlPanel | ? | `SecurityAccessLevel.ControlPanel` | -
| Module SkinObjects ? | ? | `SecurityAccessLevel.SkinObject` | -


## ValidateAntiForgeryToken Diferences

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

todo #todoc

---

## History

1. Introduced in 2sxc 12.00

