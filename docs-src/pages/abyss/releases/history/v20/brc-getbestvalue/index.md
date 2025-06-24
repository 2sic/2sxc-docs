---
uid: Abyss.Releases.History.V20.GetBestValue
---

# Fix Breaking Change drop old GetBestValue API in v20

**Keywords:** #Deprecated

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

The `GetBestValue` API was removed, so you may see a message like this:

```text
Error: Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: '...' does not contain a definition for 'GetBestValue' at CallSite.Target(Closure , CallSite , Object , String ) at ...
```

## Background

When 2sxc was first created, the original idea was to have **dynamic** objects with properties such as `Content.Title`.
These properties would be used to get and show values.

Two key features were built into this:

1. the ability to automatically select the value of the best matching user language
1. the ability to track links such as `page:27` and `file:24` and automatically resolve them to the correct URL

In the original implementation, the magic was done within the underlying `IEntity` object which was _not_ dynamic.

As rare cases evolved where the programmers needed access to the raw values, the `GetBestValue(...)` API was created to allow access to these values.
There were about 4 different overloads, such as `GetBestValue("Title")` or `GetBestValue("Title", "en")`.
At the time, it still had the same underlying principle, just with options to skip the magic.
So using `GetBestValue("Title")` would return the best matching value for the current user language - which meant that it had to know the current user language - which was an architectures nightmare.

In future iteration of the system (ca. v12) we improved the separation of concerns, so that the `IEntity` object was no longer performing any of the automatic magic.
But while most APIs were supporting clear `Get(...)` APIs, the name `GetBestValue(...)` was kept for backwards compatibility.

## Reason for Removal

For the Moment-of-Truth (MoT) release v20, we decided to finally remove this API, since it was not used much, and it was a source of confusion for many developers.

There are two key risk of leaving very old APIs alive:

1. maintenance and testing for the developers of 2sxc - who work for free - goes up and up and up.
1. people tend to discover old code and reuse it, spreading bad code practices.

So it was time to clean up in this MoT release.

## Recommended fix: Use `Get(...)` instead

In most cases you can simply replace the `GetBestValue(...)` with `Get(...)`, which will return the same value.

```c#
// old:
var x = someObject.GetBestValue("DetailsPage"); // stops working in v20

// new:
var x = someObject.Get("DetailsPage"); // works in v12 - v20 and beyond
```

---

## History

* Introduced for DNN ca. 2sxc 2
* Deprecated in 2sxc 12 ca. 2018
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc v20 ca. 2025-06

---

Shortlink to here: <https://go.2sxc.org/brc-20-getbestvalue>
