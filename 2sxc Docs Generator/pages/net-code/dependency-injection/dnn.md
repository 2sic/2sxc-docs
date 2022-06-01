---
uid: NetCode.DependencyInjection.Dnn
---

# Depedency Injection in Dnn Skins and Modules

Since Dnn 9.4, Dependency Injection is built in. 
It's still fairly basic, so there are some hoops to jump through, but for now it's the recommended way to work with this. 

> [!TIP]
> Andrew Hoefling wrote a [comprehensive guide how to use Dependency Injection in Dnn](https://www.andrewhoefling.com/Blog/Post/dnn-dependency-injection).

> [!IMPORTANT]
> You need Dnn 9.4+ for these examples to work. 
> 
> 2sxc 13 will only support this form of providing services outside of 2sxc, so if you need this, make sure you upgrade. 

## How Can I Use Dependency Injection in Dnn Modules?

* Dnn Modules inherit from the [PortalModuleBase](https://docs.dnncommunity.org/api/DotNetNuke.Entities.Modules.PortalModuleBase.html)
* This has a property called [DependencyProvider](https://docs.dnncommunity.org/api/DotNetNuke.Entities.Modules.PortalModuleBase.html#DotNetNuke_Entities_Modules_PortalModuleBase_DependencyProvider)
* This is a _.net Standard 2_ [IServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/system.iserviceprovider)

The naming is a bit unfortunate, since normally we talk of `ServiceProvider` and this is called `DependencyProvider` but otherwise it works the same. 

To get a 2sxc Service with this, you could write code like this

```csharp
using ToSic.Sxc.Services;
var jsonSvc = (IJsonService)DependencyProvider.GetService(typeof(IJsonService));
var json = jsonSvc.ToJson(someObject);
```

This is a bit clunky, so usually we'll add the namespace [Microsoft.Extensions.DependencyInjection](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.serviceproviderserviceextensions) and write this:


```csharp
using Microsoft.Extensions.DependencyInjection;
using ToSic.Sxc.Services;
var jsonSvc = DependencyProvider.GetService<IJsonService>();
var json = jsonSvc.ToJson(someObject);
```

## How Can I Use Dependency Injection in Dnn Skins/Themes?

This is unfortunately not prepared well - I guess at the time it was developed this wasn't seen as an important use case. 

* Dnn has Dependency Injection prepared for each request
* Each Request has a separate _Scope_ (to not mix services between requests)
* This scoped Service-Provider is cached on the HttpContext
* Dnn has a special extension method called `GetScope()` to work with this - [see docs](https://github.com/dnnsoftware/Dnn.Platform/blob/develop/DNN%20Platform/Library/Common/Extensions/HttpContextDependencyInjectionExtensions.cs)

To get a 2sxc Service in a Skin, you can write code like this:

```csharp
using DotNetNuke.Common.Extensions;
using System;
using Microsoft.Extensions.DependencyInjection;
using ToSic.Sxc.Services;

var sp = HttpContext.Current.GetScope().ServiceProvider;
var jsonSvc = sp.GetService<IJsonService>();
var json = jsonSvc.ToJson(someObject);
```

## How Can I Get Dnn Objects using Dependency Injection?

As of Dnn 9.10 the answer is mostly no 😶. Dnn is simply not there yet. Work-in-progress.

The documentation is almost non-existant, so if you want to try using Dnn objects, you'll need to dig through Dnn code to get this to fly. 

## How Can I Register my Services in Dnn DI?

You need to create a class that implement `IDnnStartup` like this

```c#
using azing.Catalog.Permissions;
using DotNetNuke.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace azing.Catalog
{
    public class StartupAzing : IDnnStartup
    {
        // This is the new v13 mode, requires DNN 9.44+
        public void ConfigureServices(IServiceCollection services)
        {
            services.TryAddTransient<AppPermissions>();
        }
    }
}

```

[!include["history"](../services/_history.md)]