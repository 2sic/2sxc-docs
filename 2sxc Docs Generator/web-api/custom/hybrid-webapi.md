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
// Add namespaces to enable [HttpGet] and [AllowAnonymous]
// In Oqtane it's on a different .net namespace than in Dnn
#if OQTANE
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
#endif
#if !OQTANE
using System.Web.Http;		
#endif

// All commands can be accessed without security checks
[AllowAnonymous]
public class HybridController : ToSic.Custom.Api12
{
  [HttpGet] public string Hello()
  {
    return "Hello from the basic controller in /api";
  }

  [HttpGet] public int Square(int number)
  {
    return number * number;
  }
}
```

The following keys are set when Api Controllers are compiled:

| Key | True for Dnn | True for Oqtane
| --- | :-: | :-:
| `OQTANE` | ⛔ | ✅
| `NETCORE` | ⛔ | ✅

Note that you can use `#if OQTANE` but not `#if DNN`. This is because of limitations in the dynamic C# compiler of Dnn. 

Note that you can use `#if OQTANE ... #endif` and `#if !OQTANE ... #endif` but not `#elif` because `#elif` doesn't work in Dnn. 


## Different C# and .net Frameworks

---

## History

1. Introduced in 2sxc 12.00

