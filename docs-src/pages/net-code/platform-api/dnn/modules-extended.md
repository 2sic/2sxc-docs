---
uid: NetCode.PlatformApi.Dnn.ModulesExtended
---

<img src="~/assets/features/platform-dnn.svg" width="100%">

# Use 2sxc Services in Dnn Modules - Extended

This is some additional information regarding the use of 2sxc Services in Dnn Modules.

👉🏽 Normally you don't need this, you need [](xref:NetCode.PlatformApi.Dnn.ThemesAndModules)

Important to Understand:

* Dnn Modules inherit from the [PortalModuleBase](https://docs.dnncommunity.org/api/DotNetNuke.Entities.Modules.PortalModuleBase.html)
* This has a property called [DependencyProvider](https://docs.dnncommunity.org/api/DotNetNuke.Entities.Modules.PortalModuleBase.html#DotNetNuke_Entities_Modules_PortalModuleBase_DependencyProvider)
* This is a _.net Standard 2_ [IServiceProvider](https://docs.microsoft.com/en-us/dotnet/api/system.iserviceprovider)

The naming is a bit unfortunate, since normally we talk of `ServiceProvider` and this is called `DependencyProvider` but otherwise it works the same.

## Get Service Provider on a Module

This just shows the **standard** way of getting the service provider.
It's harder and not recommended.

Modules have a property called `DependencyProvider` which is actually the `IServiceProvider` of the current scope.

To get a 2sxc Service with this, you could write code like this

```csharp
using ToSic.Sxc.Services;
var jsonSvc = (IJsonService)DependencyProvider.GetService(typeof(IJsonService));
var json = jsonSvc.ToJson(someObject);
```

This is a bit clunky, so usually we'll add the namespace [Microsoft.Extensions.DependencyInjection](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.serviceproviderserviceextensions) and write this:


Che general way to get the service provider is:

```csharp
using Microsoft.Extensions.DependencyInjection;
using ToSic.Sxc.Services;
var jsonSvc = DependencyProvider.GetService<IJsonService>();
var json = jsonSvc.ToJson(someObject);
```

_Important: if you try to do this in a Dnn Skin/Theme it will fail, because the `DependencyProvider` object is missing._
