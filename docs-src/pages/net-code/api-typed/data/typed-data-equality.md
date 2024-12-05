---
uid: NetCode.TypedCode.Data.DataEquality
---

# ITypedItem Equality in 2sxc 16+

Items of type `ITypedItem` are wrappers around `IEntity` objects, and as such, there is always the question how to check equality.

>[!TIP]
> The key take away: **use the `.Equals()` method** and **use `.GroupBy()`** as you would expect.
>
> Do not use the `==` operator, it will not work as expected.
>
> We have done special modifications to the wrappers, so the `item.Equals(item2)` (and `GroupBy`) will work as expected.
> But it is technically not possible to make the `==` operator work as expected.

Let's explain:

```c#
var someEntity = App.Data.GetStream("BlogPosts").First();
var item1 = AsItem(someEntity);
var item2 = AsItem(someEntity);

var isEqual = item1 == item2; // should this be true or false?
```

Technically the wrappers are different objects, as they were created independently.
So in terms of what really happens, they are different,
but for practical purposes they should behave as if they are the same.
Here's why:

```c#
// Get a list of all blog posts, then group by category
var blogPosts = AsItems(App.Data.GetStream("BlogPosts"));
var grouped = blogPosts.GroupBy(p => p.Child("Category"));
```

Internally every item was wrapped as a `ITypedItem`.
Each one will also get the `Category` which was also wrapped independently.
But for grouping by something, the should be considered equal.

## Equality Implementation

1. we have implemented the `.Equals()` method to compare the underlying `IEntity` objects.
2. we **did not** overloaded the `==` and `!=` operators, as this is technically not possible.

This means that you can use `.Equals()` method as you would expect.
It also means that LINQ operations such as `GroupBy` will work as expected.

The `==` and `!=` operators will not work as expected.

## Difference to Custom Strong Typed Items (v17.03+)

> [!IMPORTANT]
> This is a different than the implementation on `Custom.Data.CustomItem`.
> There the `==` and `!=` also work. See [CustomItem Equality](xref:NetCode.StrongTypedCode.DataEquality)

---

## History

* `.Equals()` implemented in ca. v16.07
