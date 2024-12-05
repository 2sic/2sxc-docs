---
uid: NetCode.Services.Custom
---

# Create Custom C# Services

You can create **Custom C# Services** in DLLs for Dnn and Oqtane.

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-cs { visibility: visible; } </style>
</div>

## System Requirements

1. Custom Services are compiled into a DLL
1. They must register themselves at startup of the Application (Dnn, Oqtane)
1. In DNN you must have at least Dnn 9.4 and 2sxc 13
1. In Oqtane any version of Oqtane and compatible 2sxc will do

## Constructor Requirements

Any class / interface can be used as a Service, but there are some important requirements in regards to the Constructor:

1. Your Service must have an empty constructor like `MyService()`
1. ...or a constructor that only expects objects which themselves are known services,
  like `MyService(ToSic.Sxc.Services.IConvertService converter)`

## Register a Service in Dnn

Dnn 9.4 introduces a new interface `DotNetNuke.DependencyInjection.IDnnStartup`.
Use this to create a class which registers your services.
Check out [Andrew Hoeflings awesome tutorial](https://www.andrewhoefling.com/Blog/Post/dnn-dependency-injection).

## Register a Service in Oqtane

Oqtane Server uses the interface `Oqtane.Infrastructure.IServerStartup` to register services ([docs](https://docs.oqtane.org/api/Oqtane.Infrastructure.IServerStartup.html)).

Oqtane client uses the interface `Oqtane.Service.IClientStartup` for this ([docs](https://docs.oqtane.org/api/Oqtane.Services.IClientStartup.html)).
