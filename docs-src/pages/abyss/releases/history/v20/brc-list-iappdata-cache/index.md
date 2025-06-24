---
uid: Abyss.Releases.History.V20.IAppDataCache
---

# Fix Breaking Change Removal of _Cache_ on IAppData in v20

**Keywords:** #Deprecated #DependencyInjection

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

The `App.Data.Cache` was removed, so you may see a message like this:

```text
error CS1061: 'IDataSource' does not contain a definition for 'Cache' and no accessible extension method 'Cache' accepting a first argument of type 'IDataSource' could be found (are you missing a using directive or an assembly reference?) 
```

or

```text
error CS1061: 'IAppData' does not contain a definition for 'Cache' and no accessible extension method 'Cache' accepting a first argument of type 'IAppData' could be found (are you missing a using directive or an assembly reference?) 
```

This was deprecated in v12 and finally removed in v20.

We believe it was only ever used in some old Mobius Apps, which were not popular at the time.

## Reason for Removal

There are two key risk of leaving very old APIs alive:

1. maintenance and testing for the developers of 2sxc - who work for free - goes up and up and up.
1. people tend to discover old code and reuse it, spreading bad code practices.

So it was time to clean up in this MoT release.

## History - How it Used to Work

Previously you may have had code like this on Mobius Apps:

```csharp
var type = Data.Cache.GetContentType(config.ContentType);
```

## What we Changed

The way to get the type was changed long ago, so you should change to the more modern API.

## Upgrade to Newer functionality


```c#
var type = App.GetContentType(config.ContentType);
```

---

## History

* Introduced for DNN ca. 2sxc 7
* Deprecated in 2sxc 12 ca. 2018
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc v20 ca. 2025-06

---

<!-- Shortlink to here: <https://go.2sxc.org/brc-20-list-element> -->
