---
uid: NetCode.DependencyInjection.Index
---

# Depedency Injection in 2sxc and EAV

**Dependency Injection** is a way to **structure applications** and to **get Services** or **Helpers** in your code.

## What is Depedency Injection?

When an application becomes advanced it becomes more difficult to get _Services_ and _Helpers_ because these may also rely on other Services and Helpers to function. 

All complex solutions today use **Dependency Injection** or **Inversion of Control** (IoC) to handle this problem. The concept builds on two core parts:

1. There is a shared **Service Provider** which can give me any Service I need
1. Every piece of code uses this Service Provider to fetch everything it needs

In _.net Core_ and _.net MVC_ this is a standard thing everybody learns early on (even though they probably don't understand it 😉).
But in the .net Classic it was not so common, so older developers tend to not use it, so here some more details to round off the picture how this works in .net:

1. .net provides an _IServiceProvider_ which is this shared ServiceProvider.
1. At application start-up all parts & services are registered and there are specifications if they should be shared (singleton), shared-per-http-request (scoped) or recreated for each use (transient).
1. All parts & services in turn must also get their dependencies from this ServiceProvider. This happens in 2 ways
    1. Either they have a constructor which lists all their dependencies, like `public MyClass(ICmsContext context)` - in this case the ServiceProvider will automatically fetch the `ICmsContext` when the `MyClass` is created.
    1. Or they depend on the service provider to generate new objects later on, using `public MyClass(IServiceProvider sp)` and later running things like `var context = sp.GetService<ICmsContext>()`. This is common in scenarios where you may need multiple separate objects (like to generate a list of objects which again need dependencies).
    1. Or they request **Lazy** dependencies - which are heavier objects that are maybe not used, using `public MyClass(Lazy<ICmsContext> contextLazy)`. These are not automatically created, but will be created if they are used.
    1. Or there is a **Factory** master-object which creates objects and adds their dependencies later on. This is how **Razor** in .net Core works. 

Using this setup anything can easily be requested when needed, and even if it needs dependencies which again have sub-dependencies, all this is automatically taken care of without the final code having to know about the structure. 

This also has 2 more important benefits:

1. Internals can easily change, but the code using a service doesn't need to be updated
1. It's easy to replace parts of the system without affecting the code itself. For example, 2sxc has different Url-Resolvers in Dnn and Oqtane, but your code doesn't need to know about this

## How Can I Use Dependency Injection in Razor?

Previously this was reserved for internal use. 
Starting in 2sxc v11.11 all Razor classes have a command called [GetService](xref:NetCode.DynamicCode.GetService). 
This is how your code would get a service:

```c#
var page = GetService<ToSic.Sxc.Services.IPageService>();
page.AddOpenGraph("video", "https://2sxc.org/videos/intro.mp4");
```

👉 Read more about [GetService](xref:NetCode.DynamicCode.GetService) in the docs or in the [GetService API](xref:ToSic.Sxc.Code.IDynamicCode.GetService*).

## How Can I Use Dependency Injection in WebAPIs?

Just like with with Razor, 2sxc 11.11 added the same GetService to all WebAPIs.

## How Can I Use Dependency Injection in Web Controls and Themes (.ascx)?

Since Web Controls run inside Dnn they don't automatically have access to the ServiceProvider. 
As a workaround there is a global Service Provider called [`ToSic.Eav.Factory`](xref:ToSic.Eav.Factory). 
Here's how you would use it:

```html
<script runat="server">
  var cssInfo = ToSic.Eav.Factory.Resolve<Connect.Koi.ICss>();
  var framework = cssInfo.Framework;
</script>
```

> [!WARNING]
> This is a workaround as it's not how Dependency Injection should work. Use with caution. 
> 
> Dnn 9.4 added Dependency Injection 4 years after 2sxc did. Some day we will connect these, and then there will probably be a better way. 

## Services My Code May Need

You can get just about anything from 2sxc, but the most common services you'll request as of 2sxc 12 are:

1. `ToSic.Sxc.Services.IPageService` - for setting page title, headers, open-graph, JsonLD etc.
1. `Connect.Koi.ICss` for detecting theme properties like the used CSS Framework

## How Can I Get Dnn Objects using Dependency Injection?

Dnn only started using Dependency Injection 4 years after 2sxc, so as of now these ServiceProviders are not connected. 
We're looking into connecting them, but until then you must consult the Dnn APIs to figure this out. 
It's probably hard to do, because there is very little documentation. 


## How Can I Get Oqtane Objects using Dependency Injection?

Oqtane uses the same Dependency Injection like 2sxc, so your Razor-Code can access all Oqtane objects using `GetService<ISomeOqtaneInterface>()`. 
Just be aware of the fact that Oqtanes architecture is very different from the classic setup, so many services [documented in the Oqtane docs](https://docs.oqtane.org/) will actually behave as remote services, so they will internally call http-endpoints to perform their work. This makes many Oqtane Services a bit slower than you would expect. 

## Can I Use Razor .net Core @inject in Oqtane?

Yes you can, as the 2sxc DI is fully integrated with the Oqtane DI. So your Razor could also do this:

```razor
@inject ICmsContext Context
```

---

## History

1. .net Core DI added to 2sxc v9
1. GetService added to all custom-code parts like Razor and WebApi in v11.11