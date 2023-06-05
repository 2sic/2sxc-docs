---
uid: NetCode.Services.ServiceKits
---

<img src="~/assets/features/servicekits.svg" class="feature">

# C# ServiceKits (v14)

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-cs { visibility: visible; } </style>
</div>

**ServiceKits** help you get a [Service](xref:NetCode.Services.ServiceKits) with fewer lines of code.

For example, you may need to call the IPageService Activate.
With the v14 API it looks like this:

```c#
@Kit.Page.Activate("turnOn")
```

## The Kit Property

The `Kit` property is available on all of your code which inherits from any one of these:

* `Custom.Hybrid.Api14` for Web APIs
* `Custom.Hybrid.Code14` for custom code
* `Custom.Hybrid.Razor14` for Razor

The Kit in all `...14` base classes will always be a [ServiceKit14](xref:ToSic.Sxc.Services.ServiceKit14).

They are...

* lazy so they are only created if ever needed
* created and preserved so multiple access to the service won't cause any overhead
* versioned so that we can continue to enhance the APIs without breaking existing Razor


## Services in the ServiceKit

This will depend on the ServiceKit you will use.

In v14, the Kit will then always be a [ServiceKit14](xref:ToSic.Sxc.Services.ServiceKit14).
You can read about the included servicen in those docs.


[!include["history"](_history.md)]
