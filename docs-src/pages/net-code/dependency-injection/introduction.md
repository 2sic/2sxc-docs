---
uid: NetCode.DependencyInjection.Introduction
---

# What is Dependency Injection?

**Dependency Injection** is a way to **structure applications** and to **get Services** or **Helpers** in your code.

> [!TIP]
> When an application becomes advanced it becomes more difficult to get _Services_ and _Helpers_
> because these may also rely on other Services and Helpers to function.
>
> Dependency Injection makes sure that you don't need to know about the sub-dependencies, and just work with what you need.

Most advanced solutions today use **Dependency Injection** or **Inversion of Control** (IoC) to handle this problem. The concept builds on two core parts:

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

[!include["history"](../services/_history.md)]
