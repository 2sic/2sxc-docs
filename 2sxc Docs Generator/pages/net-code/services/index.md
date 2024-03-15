---
uid: NetCode.Services.Index
---

# C# Services

> [!TIP]
> 2sxc has a rich set of **Services** which are **Helpers** to easily get things done.
>
> You can also create your own services as DLLs (v12+) or in your App (v17.03+).

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-cs { visibility: visible; } </style>
</div>

## ServiceKits (new in v14)

V14 introduces the concept of [ServiceKits](xref:NetCode.Services.ServiceKits).
They give you access to all common services directly on the `Kit` object.

> [!TIP]
> The service kit provides more than 10 commonly used services.

Some popular services include:

* [Toolbar Service](xref:ToSic.Sxc.Services.ToolbarBuilder.Index) to build toolbars for the editor
* [Page Service](xref:NetCode.Razor.Services.IPageService) to get/set page properties, run scripts, load resources and more

## More Services

👉🏽 See [More Services](xref:NetCode.Services.More)

## How Services Work

Technically a service is just a .net object which does stuff for you.
They are provided through **Dependency Injection**.

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
1. It also requires 2sxc v13 as that now fully integrations with the Dnn Service Provider
1. Not all Dnn Objects exist as services. You'll need to browse Dnn code to figure this out.


## Integration with Oqtane Services

Oqtane started as a .net Core project so _Dependency Injection_ is in it's DNA.

Anything Oqtane has can be requested as a Service, but there are some caveats:

1. If you're writing Blazor code then most services only exist as a proxy, the real work happens on the backend
1. If you're writing server-side code then most services are available, but the name / signature may be a bit different than the Blazor service

## Create your own Service

👉 Check out [](xref:NetCode.Services.Custom)

[!include["history"](_history.md)]
