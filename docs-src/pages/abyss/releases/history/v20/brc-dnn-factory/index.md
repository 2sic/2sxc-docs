---
uid: Abyss.Releases.History.V20.DnnFactory
---

# Fix Breaking Change _Static Dnn Factory_ in v20

**Keywords:** #Deprecated #Factory #Build #DependencyInjection

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have code which used this, here's how to fix any code in production.

The `ToSic.Sxc.Dnn.Factory` API (with various methods) is finally removed in v20.
It has been deprecated for more than 5 years now, since v13.
You can still review the [old Dnn.Factory API here](https://v19.docs.2sxc.org/api/dot-net/ToSic.Sxc.Dnn.Factory.html).

The static commands which were removed are:

* `ToSic.Sxc.Dnn.Factory.App(int appId, PortalSettings ownerPortalSettings, bool unusedButKeepForApiStability = false, bool showDrafts = false, ILog parentLog = null)`
* `ToSic.Sxc.Dnn.Factory.App(int appId, bool unusedButKeepForApiStability = false, bool showDrafts = false, ILog parentLog = null)`
* `ToSic.Sxc.Dnn.Factory.App(int zoneId, int appId, bool unusedButKeepForApiStability = false, bool showDrafts = false, ILog parentLog = null)`
* `ToSic.Sxc.Dnn.Factory.CmsBlock(ModuleInfo moduleInfo)`
* `ToSic.Sxc.Dnn.Factory.CmsBlock(int pageId, int modId)`
* `ToSic.Sxc.Dnn.Factory.CmsBlock(int pageId, int modId, ILog parentLog)`
* `ToSic.Sxc.Dnn.Factory.CmsBlock(IModule module, ILog parentLog = null)`
* `ToSic.Sxc.Dnn.Factory.DynamicCode(IBlockBuilder blockBuilder)`

## Reason for Removal

2sxc used to be the first and only Module in Dnn which supported Dependency Injection, so there was a need to patch this in somehow.

The solution we used was to have static object `ToSic.Sxc.Dnn.Factory` which managed this, but this is actually bad practice and encourages bad code.

We believe this is rarely used, so we removed it. But it was in the official docs, so there may have been a few users who picked this up.


## History - How it Used to Work

Previously you could write code like this in your Razor:

```csharp
var internalAppApi = ToSic.Sxc.Dnn.Factory.App(42, false, false, null);
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
* Deprecated in 2sxc 13 with the integration of Dnn 9.4 DI
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc 20

---

Shortlink to here: <https://go.2sxc.org/brc-20-dnn-factory>
