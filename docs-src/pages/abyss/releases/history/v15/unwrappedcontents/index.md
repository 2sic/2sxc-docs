---
uid: Abyss.Releases.History.V15.UnwrappedContents
---

# Fix Breaking Change _UnwrappedContents_ on _IWrapper_ in v15

**Keywords:** #Wrapper #UnwrappedContents

2sxc has a convention for wrapping objects, creating decorators and facades.
Basically there is an internal Interface `IWrapper<T>` which is used in all objects which simply wrap something.

> [!TIP]
> This is a very internal API so we believe should not affect anybody.

## History - How it Used to Work

Previously all these objects had a property `UnwrappedContents`.

## What we Changed

In 2sxc 15 we moved this to the new DLL `ToSic.Lib.Core`.

We also changed the access to the inner value to be `GetContents()`

---

## History

* Introduced ca. 2sxc 9
* Completely reworked in 2sxc/eav 15

---
