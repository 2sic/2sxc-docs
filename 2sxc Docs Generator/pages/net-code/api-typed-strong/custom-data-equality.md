---
uid: NetCode.StrongTypedCode.DataEquality
---

# Data Equality on Custom Data Models in 2sxc 17+

Custom data models such as `AppCode.Data.Product` or `AppCode.Data.BlogPost` are technically a wrapper around
other objects usually coming from `IEntity`s.

As such, there is always the question how to check equality.

>[!TIP]
> The key take away: **use the `==` operator** and **use the `.Equals()` method** and **use `.GroupBy()`** as you would expect.
>
> We have done special modifications to the wrappers, so the `==` operator and `item.Equals(item2)` will work as expected.

Let's explain:

```c#
var item1 = As<Product>(MyItem);
var item2 = As<Product>(MyItem);

var isEqual = item1 == item2; // should this be true or false?
```

Technically the wrappers are different objects, as they were created independently.
So in terms of what really happens, they are different,
but for practical purposes they should behave as if they are the same.
Here's why:

```c#
// Get a list of all blog posts, then group by category
var blogPosts = AsList<BlogPost>(MyItems);
var grouped = blogPosts.GroupBy(p => p.Category);
```

Internally every item was wrapped as a `BlogPost`.
Each one will also get the `Category` which was also wrapped independently.
But for grouping by something, the should be considered equal.

## Equality Implementation

1. we have overloaded the `==` and `!=` operators to compare the underlying `IEntity` objects.
2. we have implemented the `.Equals()` method to compare the underlying `IEntity` objects.

This means that you can use the `==` operator and the `.Equals()` method as you would expect.
It also means that LINQ operations such as `GroupBy` will work as expected.

## Difference to ITypedItem

> [!IMPORTANT]
> This is a different than the implementation on `ITypedItem`.
> There we could only override `.Equals()`, so that and `GroupBy` would work as expected,
> but the `==` operator would not work as expected in `ITypedItem`.

## Edge Cases

If rare cases where you extend the Data Model eg. `BlogPost` with additional properties, such as this

```c#
namespace AppCode.Data
{
  public partial class BlogPost
  {
    public string CustomProperty { get; set; }
  }
}
```

...you may have two different objects, because you set that property on one and not the other.
In this case, you may still want to check for equality and expect it to be `false`,
but the underlying check would compare the inner data and return `true`.

We believe this is a very, very rare scenario.
If you want to do this, and expect two wrappers around the same data to be un-equal,
you'll need to use [ReferenceEquals](https://learn.microsoft.com/en-us/dotnet/api/system.object.referenceequals).


---

## History

* `.Equals` implemented in v17.03
* `==` and `!=` operators implemented in v17.04
