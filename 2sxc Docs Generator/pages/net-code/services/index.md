---
uid: NetCode.Services.Index
---

# C# Services

2sxc and EAV provide **Services** through **Dependency Injection** to get stuff done.

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-cs { visibility: visible; } </style>
</div>

## ServiceKits (new in v14)

V14 introduces the concept of [ServiceKits](xref:NetCode.Services.ServiceKits).
They give you access to all common services directly, without using `GetService<...>()`.

## Standard Services

As of 2sxc 13+ we publish all common services for your Razor / C# code on [ToSic.Sxc.Services](xref:ToSic.Sxc.Services).
This helps you figure out what's in the box - just go check it out.

## How Services Work

Technically a service is just a .net object which does stuff for you.
You can get Services in your C# code like this:

```csharp
using ToSic.Sxc.Services;
var page = GetService<IPageService>();
```

Internally services may require additional information to work - like the current Page it's on etc.
This happens almost by magic thanks to **Dependency Injection**.
If this is new to you, you should [read up on it](xref:NetCode.DependencyInjection.Index).

## Integration with Dnn Services

Dnn is still new to Dependency Injection.
Because of this, there are some limitations if you want to get a Dnn service. For example:

1. It requires that you use Dnn 9.4+
1. It also requires 2sxc v13 as that now fully integrations with Dnns Service Provider
1. Not all Dnn Objects exist as services. You'll need to browse Dnn code to figure this out.


## Integration with Oqtane Services

Oqtane started as a .net Core project so _Dependency Injection_ is in it's DNA.

Anything Oqtane has can be requested as a Service, but there are some caveats:

1. If you're writing Blazor code then most services only exist as a proxy, the real work happens on the backend
1. If you're writing server-side code then most services are available, but the name / signature may be a bit different than the Blazor service

## Create your own Service

👉 Check out [](xref:NetCode.Services.Custom)

[!include["history"](_history.md)]
