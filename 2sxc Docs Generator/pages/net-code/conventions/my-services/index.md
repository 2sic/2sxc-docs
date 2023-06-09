---
uid: NetCode.Conventions.MyServices
---

# Convention: MyServices

2sxc and EAV prefer to use [Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance).
But in some cases this is not possible, and we need to use inheritance.

The problem that then arises is that the base class needs services, and the list of services can change with time.
This would make it very hard to keep inherited objects working, as upgrades would break the constructor.

So we invented a special convention. Here's how it works:

## Basic Setup

This is what a typical base class would look like

```c#
public abstract class ExampleBase
{
  // Public ExampleBase.MyServices which actually gets all the dependencies
  public class MyServices
  {
    public MyServices(/* dependencies */)
    {
      // ...
    }
  }

  // The normal constructor of ExampleBase, asking for these services
  protected ExampleBase(MyServices services)
  {
    // ...
  }
}
```

This class is then registered with normal DI and just works.

## Inheritance

When you inherit such a class, this is what you do:

```c#
public class YourClass : ExampleBase
{
  public YourClass(MyServices services, ISomeOtherService xyz) : base(services)
  {
    // ...
  }
}
```

When you do this (assuming you registered your `YourClass`) in DI, it will automatically use the `MyServices` from the base class.

This way the base class can change the list of it's dependencies as it needs, while preserving a constructor that never changes.

## Good to Know

Internally the system does quite a bit more, but this is all you need to know to get it to work 😉.

> [!NOTE]
> You may be tempted to use something which is available on MyServices.
> But you shouldn't as this is a private API and may change at any time.


## Use in DataSources

The most common place for you to see this is when creating custom DataSources.
You will usually inherit from [](xref:ToSic.Eav.DataSource.CustomDataSource).
It too has a `MyServices` class.

## Coverage

As of March 2023, all DataSources use this convention.
Many other objects use this as well, but we don't expect that you'll be needing that.

---

## History

* Introduced in 2sxc 15

Shortlink: <https://go.2sxc.org/myservices>
