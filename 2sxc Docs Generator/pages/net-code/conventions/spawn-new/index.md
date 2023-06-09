---
uid: NetCode.Conventions.SpawnNew
---

# Convention: Spawn New

In certain cases a service can or should be configured before use.

Some examples:

1. The `ToSic.Eav.Services.IDataFactory` can be configured to specify what data type it should produce
1. The `ToSic.Sxc.Services.IDataService` can be configured with an AppIdentity so that created sources will be tied to that App

Since we use Dependency Injection we can't just add a parameter to the constructor.
Since we want our APIs to be [immutable](xref:NetCode.Conventions.Immutable), we can't just run an `Init` or `Setup` method.

So the solution is to give each of these services the ability to spawn a new service with the new configuration.

This is usually done using a `New(...)` method which specifies the configuration which the new service should have.

---

## History

* Introduced in v15

Shortlink: <https://go.2sxc.org/spawn-new>