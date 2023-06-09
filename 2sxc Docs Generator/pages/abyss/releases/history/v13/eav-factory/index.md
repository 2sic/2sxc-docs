---
uid: Abyss.Releases.History.V13.EavFactory
---

# Fix Breaking Change _Static EAV Factory Resolve_ in v13

**Keywords:** #Deprecated #Factory #Build #DependencyInjection

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

The `ToSic.Eav.Factory.Resolve<T>()` is being deprecated, and will be removed in v14. In v13 it was moved to the Dnn DLL because it shoudn't be used anywhere else. 

## Reason for Removal

2sxc used to be the first and only Module in Dnn which supported Dependency Injection, so there was a need to patch this in somehow. 

The solution we used was to have static object `ToSic.Eav.Factory` which managed this, but this is actually bad practice and encourages bad code. 

We believe this is rarely used, so we removed it. But it was in the official docs, so there may have been a few users who picked this up.


## History - How it Used to Work

Previously you could write code like this in your Razor:

```csharp
var convertService = ToSic.Eav.Factory.Resolve<IConvertService>();
```

## What we Changed

In 2sxc 11.11 we introduced the `GetService<T>()` ([docs](xref:ToSic.Sxc.Code.IDynamicCode.GetService*)) which takes care of this.
Please use this from now on.

The old API will be disabled disabled and will show an error pointing to this documentation.


## Upgrade to Newer functionality

So the previous example would look like this:

```csharp
var convertService = GetService<IConvertService>();
```

If you were using this from outside of 2sxc Razor / WebApi, you will need to use the [Dnn specific DependencyInjection (available in Dnn 9.4+)](xref:NetCode.DependencyInjection.Dnn).

---

## History

* Introduced in 2sxc 7 with Dependency Injection based on .net Standard 1.6
* Deprecated in 2sxc 13 with the integration of Dnn 9.4 DI
* Planned for full removal in 2sxc 14 ca. middle of 2022

---

Shortlink to here: https://go.2sxc.org/brc-13-eav-factory