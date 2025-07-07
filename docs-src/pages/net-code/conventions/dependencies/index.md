---
uid: NetCode.Conventions.Dependencies
---

# Convention: Dependencies Class

2sxc and EAV prefer to use [Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance).
But in some cases this is not possible, and we need to use inheritance.

The problem that then arises is that the base class needs services, and the list of services can change with time.
This would make it very hard to keep inherited objects working, as upgrades would break the constructor.

So we invented a special convention. Here's how it works:

## Basic Setup

This is what a typical base class would look like

```c#
/// <summary>
/// Class inheriting from ServiceBase, which expects dependencies to be of type ExampleBase.Dependencies.
/// This is a convention which allows the base class to change its dependencies without breaking the constructor.
/// </summary>
public abstract class ExampleBase: ServiceBase<ExampleBase.Dependencies>
{
  /// <summary>
  /// Public ExampleBase.Dependencies which actually gets all the dependencies.
  /// Must be registered in DI.
  /// </summary>
  public class Dependencies
  {
    public Dependencies(ISomething something, IElse somethingElse)
      : DependenciesBase(connect: [something, somethingElse]) // This will make sure the logs are connected
    {
      internal ISomething Something { get; } = something;
      internal IElse SomethingElse { get; } = somethingElse;
    }
  }

  /// <summary>
  /// The normal constructor of ExampleBase, asking for these services
  /// </summary>
  protected ExampleBase(Dependencies services): base(services, "My.Example")
  {
    // You can now use Services.Something and Services.SomethingElse to access the dependencies
  }
}
```

Or in the shorter form using the new C# 12 constructors (will not work in Dnn Razor, as that has an older C# version):

```c#
public abstract class ExampleBase(Dependencies: services): ServiceBase<ExampleBase.Dependencies>(services, "My.Example")
{
  // Public ExampleBase.Dependencies which actually gets all the dependencies
  public class Dependencies
  {
    public Dependencies(ISomething something, IElse somethingElse): DependenciesBase(connect: [something, somethingElse])
    {
      internal ISomething Something { get; } = something;
      internal IElse SomethingElse { get; } = somethingElse;
    }
  }
}
```

This class is then registered with normal DI and just works.

## Inheritance

When you inherit such a class, this is what you do:

```c#
public class YourClass : ExampleBase
{
  public YourClass(Dependencies services, ISomeOtherService xyz) : base(services)
  {
    // ...
  }
}
```

When you do this (assuming you registered your `YourClass`) in DI, it will automatically use the `Dependencies` from the base class.

This way the base class can change the list of it's dependencies as it needs, while preserving a constructor that never changes.

## Good to Know

Internally the system does quite a bit more, but this is all you need to know to get it to work 😉.

> [!NOTE]
> You may be tempted to use something which is available on Dependencies.
> But you shouldn't as this is regarded as a private API and may change at any time.


## Use in DataSources

The most common place for you to see this is when creating custom DataSources.
You will usually inherit from [](xref:ToSic.Eav.DataSource.CustomDataSource).
It too has a `Dependencies` class.

## Coverage

As of March 2023, all DataSources use this convention.
Many other objects use this as well, but we don't expect that you'll be needing that.

---

## History

1. Introduced in 2sxc 15
1. First published code which uses it in 2sxc 16
1. Changed the term `MyServices` to `Dependencies` in v20.  
    for compatibility reasons, the old `MyServices` is still available on `DataSource16`, but deprecated and will be removed some day.

Shortlink: <https://go.2sxc.org/myservices>
