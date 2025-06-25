---
uid: Abyss.Releases.History.V20.BlocksIRenderService
---

# Fix Breaking Change Replace IRenderService in v20

**Keywords:** #Deprecated #Render #DependencyInjection

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

The interface `ToSic.Sxc.Blocks.IRenderService` was finally removed in v20.
It has been deprecated for more than 5 years now.

## Reason for Removal

The `ToSic.Sxc.Blocks.IRenderService` was our first service.
At that time, we were not aware of the many services we would provide.
Later on we decided to put all services into the `ToSic.Sxc.Services` namespace.
Since then we created a `ToSic.Sxc.Services.IRenderService` which is the new service to use.

Note that preserving the old interface also caused various naming issues, so it was important to finally remove it.

## How to Fix Old Code

So the previous example would look like this:

```csharp
var renderSvc = GetService<ToSic.Sxc.Blocks.IRenderService>();
```

And now you would use the new service like this:

```csharp
var renderSvc = GetService<ToSic.Sxc.Services.IRenderService>();
```

---

## History

* Introduced for DNN ca. 2sxc 10
* Deprecated in 2sxc 13
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc v20 ca. 2025-06

---

Shortlink to here: <https://go.2sxc.org/brc-20-blocks-irenderservice>
