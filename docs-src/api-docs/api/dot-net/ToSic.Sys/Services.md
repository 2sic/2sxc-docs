---
uid: ToSic.Sys.Services
---

The EAV system has a powerful structure for services and helpers.

## Object Creation

All services should inherit from `ServiceBase` or `ServiceBase<Dependencies>`.
This is the most common way to create services.

1. [`ToSic.Sys.Services.ServiceBase`](xref:ToSic.Sys.Services.ServiceBase)  
    This is for services which have a few dependencies.
1. [`ToSic.Sys.Services.ServiceBase<Dependencies>`](xref:ToSic.Sys.Services.ServiceBase`1)  
    This is for services which have a lot of dependencies.
    In this case you'll have to pass the dependencies to the base class.
    Dependencies usually inherit from [`ToSic.Sys.Services.DependenciesBase`](xref:ToSic.Sys.Services.DependenciesBase).
1. [`ToSic.Sys.Services.HelperBase`](xref:ToSic.Sys.Services.HelperBase)
    This is for helpers which are not services and will usually be created in code (not from DI).

You can also just create normal objects and implement [`ToSic.Sys.Logging.IHasLog`](xref:ToSic.Sys.Logging.IHasLog).

Note that if you're inheriting from `ServiceBase<Dependencies>` then the dependencies class should
inherit from [`ToSic.Sys.Services.DependenciesBase`](xref:ToSic.Sys.Services.DependenciesBase).

---

## History

1. Introduced a long time ago.
1. Ongoing improvements - the API is considered internal and can change at any time
