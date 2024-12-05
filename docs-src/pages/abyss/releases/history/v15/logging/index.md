---
uid: Abyss.Releases.History.V15.Logging
---

# Fix Breaking Change _Logging_ in v15

**Keywords:** #Logging #DataSources

2sxc has a powerful logging system which tracks what happens in a structure that matches code calls.
This was changed extensively.

> [!TIP]
> This change should not affect any normal Razor / WebApi etc. code in any way.
>
> It will only affect compiled code, or if you were using non-public APIs

## Reason for Change

1. We wanted to make this part of code more reusable and plan to publish a Nuget package.
   For this it must be a standalone component.
1. There were various cases were the log could be null, which would result in errors just because of logging.
   We wanted to make sure that logging can never break the code.
1. To make the logs match the call-stack, the log objects must be attached to each other.
   This always dependend on perfect programming, so we wanted it to be more robust.

## History - How it Used to Work

Previously all this came from the following base interfaces / classes

1. `ToSic.Eav.Logging.ILog`
1. `ToSic.Eav.Logging.Log`
1. `ToSic.Eav.Logging.IHasLog`
1. `ToSic.Eav.Logging.HasLog`

Almost every relevant object in 2sxc inherited from these or implemented them.

In addition, the API to add logs was - just as an example:

```c#
Log.Add("Some message");
```

These methods were methods of `ILog`, so they were part of the object.
If for some reason the `Log` object was null, this would result in an exception.

## What we Changed

### 1. Move to ToSic.Lib.Core

In 2sxc 15 we introduced a new DLL `ToSic.Lib.Core`.
It contains very fundamental parts such as **Logging** and **Dependency Injection Helpers**.

👉🏽 All classes now inherit from this. If you had any compiled code, it would need to be recompiled.

We then changed almost all logging commands to be _Extension Methods_.
By doing this, we could make all calls _null safe_, so if the `Log` object is null, the call will not do anything.

This means, that calling anything on the `Log` object requires you to add the namespace `ToSic.Lib.Logging`:

```c#
using ToSic.Lib.Logging;

Log.A("some message);
```

### 2. New ICodeLog for Dynamic Code Logging

We believe that any Razor or WebApi should have a simpler logging mechanism which doesn't need much documentation or learning.
Because of this, we created a new [`ICodeLog`](xref:ToSic.Sxc.Code.ICodeLog) which still has very simple `Add(...)` methods.

This will be what the `Log` property of every Razor and WebApi will return.
So they will not be `ILog` but `ICodeLog`.

This should also ensure that any apps which previously used `Add(...)` will continue to work.

---

## History

* Introduced ca. 2sxc 9
* Completely reworked in 2sxc/eav 15

---

<!-- Shortlink to here: https://go.2sxc.org/brc-15-logging TODO: -->
