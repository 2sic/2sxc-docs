---
uid: NetCode.Conventions.Immutable
---

# Convention: Everything is Immutable

There are many programming paradigms.
One that's become very important to us is **immutable** programming.
This is strongly related to [functional APIs](xref:NetCode.Conventions.Functional)

This means than objects inside 2sxc are never modified.
Instead, they are copied and modified, and the original object is discarded.

## Example

```c#

var original = new { Name = "John", Age = 42 };
var modified = SomeService.ChangeAge(original, 43);

var areEqual = original.Age == modified.Age; // false

```

## Use in DataSources

A common place where this affects Razor and WebApis is when using DataSources.
Old data sources could do this:

```c#
var entityFilter = CreateSource<EntityIdFilter>();
entityFilter.EntityIds = "123,456";
var data = entityFilter.List;
```

This behavior still works on old data sources to ensure compatibility.
But newer DataSources such as `AppFiles` will not allow this, and will throw an exception if you try to modify the properties.
They are immutable. Instead, you must do this:

```c#
var appFiles = CreateSource<AppFiles>(options: new { OnlyFolders = true });
// The following would throw an error:
// appFiles.OnlyFolders = true;
var data = appFiles.List;
```

This new way is the only recommended way of doing this from now on.

## Coverage

As of March 2023, ca. 80% of all objects in 2sxc are immutable, we hope to reach 95% by end of 2023.
We cannot reach 100% any time soon, because we must ensure compatibility with existing code.

1. IEntity is internally 98% immutable - some details left to optimize
1. DataSources _can_ be immutable. Newer DataSources are immutable, and data sources created using Kit.Data are immutable by default.

---

## History

* First introductions in 2sxc 13
* Spread out more in 2sxc 15, eg. IEntity is now immutable


Shortlink: <https://go.2sxc.org/immutable>
