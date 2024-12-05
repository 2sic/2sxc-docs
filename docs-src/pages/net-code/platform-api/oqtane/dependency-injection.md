---
uid: NetCode.PlatformApi.Oqtane.DependencyInjection
---

# Dependency Injection in Oqtane

Oqtane has used Dependency Injection since day one, so it's much better integrated than with Dnn.

## How Can I Get Oqtane Objects using Dependency Injection?

Oqtane uses the same Dependency Injection like 2sxc, so your Razor-Code can access all Oqtane objects using `GetService<ISomeOqtaneInterface>()`.
Just be aware of the fact that Oqtanes architecture is very different from the classic setup, so many services [documented in the Oqtane docs](https://docs.oqtane.org/) will actually behave as remote services, so they will internally call http-endpoints to perform their work. This makes many Oqtane Services a bit slower than you might expect.

## Can I Use Razor .net Core @inject in Oqtane?

Yes you can, as the 2sxc DI is fully integrated with the Oqtane DI. So your Razor could also do this:

```razor
@inject ICmsContext Context
```

## How can I get 2sxc Objects in Oqtane Blazor Controls?

This is currently not possible, as most of 2sxc runs on the server, while the Blazor controls run in the client.

We're working on this.

[!include["history"](../../services/_history.md)]
