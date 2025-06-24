---
uid: Abyss.Releases.History.V20.DynamicEntity
---

# Fix Breaking Change hide internal DynamicEntity object in v20

**Keywords:** #Deprecated

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have old code which used this, here's how to fix any code in production.

## What changed

The `DynamicEntity` object was hidden, since you should use `dynamic` or `IDynamicEntity`.

Note that this only affects old code, which was written in a style from before 2sxc v8.
Newer code we provided used `dynamic` or `IEnumerable<dynamic>` which still works today.

```text
error CS0246: The type or namespace name 'DynamicEntity' could not be found (are you missing a using directive or an assembly reference?)
```

## Background

Old code extensively used `dynamic` objects, which caused a LOT of problems.
One of the key problems was using LINQ, since LINQ does not work with `dynamic` objects.

For example, to use LINQ, it was necessary to cast the `dynamic` object to some kind of list or `IEnumerable<T>`.
The way this was done varied a bit as we mastered the workarounds, but it was always a bit of a hack.
Here's a real life example from an old FAQ Module v1.00.03 which was available for 2sxc v8, ca. 2017:

```razor
<li class="sc-element faq-set" data-tags="@String.Join(",", ((List<DynamicEntity>)q.Categories).Select(a => AsDynamic(a).EntityId))">
```

The important part here was:

```csharp
((List<DynamicEntity>)q.Categories).Select(a => AsDynamic(a).EntityId)
```

Which would have better been written as:

```csharp
((IEnumerable<dynamic>)q.Categories).Select(a => a.EntityId)
```

...but hindsight is always 20/20, and we didn't know better back then.


Here some more examples:

```csharp
// Casting to List<DynamicEntity> to use LINQ
var list = (List<DynamicEntity>)someDynamicObject;
var filtered = list.Where(x => x.SomeProperty == "SomeValue");

// Casting to IEnumerable<DynamicEntity> to use LINQ
var enumerable = (IEnumerable<DynamicEntity>)someDynamicObject;
var filtered = enumerable.Where(x => x.SomeProperty == "SomeValue");

// Casting to IEnumerable<dynamic> to use LINQ
var enumerable = (IEnumerable<dynamic>)someDynamicObject;
var filtered = enumerable.Where(x => x.SomeProperty == "SomeValue");
```

## Reason for Removal

For the Moment-of-Truth (MoT) release v20, we decided to finally remove this API, since it was not used much, and it was a source of confusion for many developers.

There are two key risk of leaving very old APIs alive:

1. maintenance and testing for the developers of 2sxc - who work for free - goes up and up and up.
1. people tend to discover old code and reuse it, spreading bad code practices.

Another problem was that these methods used an old programming style (non-functional)
which relied on side-effects (bad) to achieve their goals, which is not how modern 2sxc works.

So it was time to clean up in this MoT release.

## Recommended fix: Migrate to Newer Code Style, or use `dynamic` or `IEnumerable<dynamic>`

We highly recommend that you migrate your code to use the newer code style, which is more readable and easier to maintain.
This means using Typed Code and Strongly Typed Code.
This migration is a lot of work, so we understand that it's not your priority when you "just want to upgrade".

In that case, you should basically just replace all occurrences these patterns, depending on what the code should do:

* `DynamicEntity` with `dynamic`
* `List<DynamicEntity>` with `IEnumerable<dynamic>`
* `IEnumerable<DynamicEntity>` with `IEnumerable<dynamic>`
* `List<IDynamicEntity>` with `IEnumerable<dynamic>`
* `IEnumerable<IDynamicEntity>` with `IEnumerable<dynamic>`

---

## History

* Introduced for DNN ca. 2sxc 4
* Deprecated in 2sxc 12 ca. 2018
* Planned for full removal in 2sxc 15 ca. middle of 2022
* Finally removed in 2sxc 20 ca. 2025-06

---

Shortlink to here: <https://go.2sxc.org/brc-20-dynamicentity>
