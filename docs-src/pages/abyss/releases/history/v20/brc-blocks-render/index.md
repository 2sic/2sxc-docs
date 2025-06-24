---
uid: Abyss.Releases.History.V20.BlocksRender
---

# Fix Breaking Change _Static Render_ in v20

**Keywords:** #Deprecated #Render #DependencyInjection

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

The `ToSic.Sxc.Blocks.Render.One(...)` and `ToSic.Sxc.Blocks.Render.All(...)` APIs are finally removed in v20.
It has been deprecated for more than 5 years now, [since v13; planned removal was v15](xref:Abyss.Releases.History.V13.StaticRender).

You can still review the [old Render API here](https://v19.docs.2sxc.org/api/dot-net/ToSic.Sxc.Blocks.Render.html).

The static commands which were removed are:

* `ToSic.Sxc.Blocks.Render.All(DynamicEntity parent, NoParamOrder noParamOrder = default, string field = null, string apps = null, int max = 100, string merge = null)`
* `ToSic.Sxc.Blocks.Render.One(DynamicEntity parent, NoParamOrder noParamOrder = default, ICanBeEntity item = null, string field = null, Guid? newGuid = null)`

## Reason for Removal

2sxc used to be the first and only Module in Dnn which supported Dependency Injection, so there was a need to patch this in somehow.

The solution we used was to have static object `ToSic.Sxc.Blocks.Render` which managed this, but this is actually bad practice and encourages bad code.

We believe this is rarely used, so we removed it.
But it was used in some of the apps, so we believe there are still live apps which need fixing.


## History - How it Used to Work

Previously you could write code like this in your Razor:

```razor
<div>
  @ToSic.Sxc.Blocks.Render.One(...)
</div>

or
<div>
  @ToSic.Sxc.Blocks.Render.All(...)
</div>
```

## What we Changed

In 2sxc 11.11 we introduced the `GetService<T>()` ([e.g. docs](xref:Custom.Hybrid.Razor12.GetService*)) which takes care of this.
Please use this from now on.


## Upgrade to Newer functionality

So the previous example would look like this:

```csharp
var dynamicCodeService = GetService<ToSic.Sxc.Services.IDynamicCodeService>();
var internalAppApi = dynamicCodeService.App(appId: 42);
```

If you were using this from outside of 2sxc Razor / WebApi, you will need to use the [Dnn specific DependencyInjection (available in Dnn 9.4+)](xref:NetCode.DependencyInjection.Dnn).

For a list of other APIs, see the [IDynamicCodeService docs](xref:ToSic.Sxc.Services.IDynamicCodeService).

---

## History

* Introduced for DNN ca. 2sxc 7 with Dependency Injection based on .net Standard 1.6
* Deprecated in [2sxc 13 with the integration of Dnn 9.4 DI](xref:Abyss.Releases.History.V13.StaticRender)
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc v20 ca. 2025-06

---

Shortlink to here: <https://go.2sxc.org/brc-20-static-render>
