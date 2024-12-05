---
uid: NetCode.DynamicData.DynamicList
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# Dynamic Entity Lists

It's very common to work with a list of items, like a list of blog posts, tags etc.

2sxc has a lot of magic under the hood to just make it work. Here's an example:

```razor
<ul>
@foreach(var tag in blogPost.Tags) {
  <li>@tag.Name</li>
}
</ul>
```

To get really good at coding lists, there are a few things you want to learn:

1. Use list from different sources
    1. Entities which are a property of something (like `blogPost.Tags`)
    1. Entities which belong to the Module
    1. Entities which come from a Query
    1. Entities of a specific Content-Type from App.Data
1. Difference between Entity-lists and DynamicEntity-Lists
1. Looping
1. Using LINQ to sort, filter and more

## Basics First - What Are Lists of Dynamic Entities

In the lingo of C# they are `IEnumerable<IDynamicEntity>` objects.

> But basically lists are objects that can be stepped through (iterated).

You will usually use them to show the list of items (like a list of News items).
And if the list has too much data or is in a weird sorting order, you'll usually want to filter and sort before doing this.

## How to Get a List of Dynamic Entities

In many cases the list is aleady there for you to use.
For example, if your `BlogPost` object has a property `Tags` which is an Entity-Picker in the Edit-UI, then this will automatically work:

```razor
<ul>
@foreach(var tag in blogPost.Tags) {
  <li>@tag.Name</li>
}
</ul>
```

In other scenarios you may get objects which are still IEntity objects. For example, `App.Data["BlogPost"]` will get you a list of `IEntity` objects.
But these don't allow you to just access a property, so you'll have to use `AsList(...)`.

```Razor
@* this won't work *@


```

1. Find some information


Whenever you create a content-type - like _Person_ - and want to work with the data in your C# Razor templates, you'll be working with a _Dynamic Entity_.

👉 also read about [](xref:NetCode.DynamicCode.AsDynamic)


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


---

## History

1. Introduced in 2sxc 01.00
1. Changed to use interface IDynamicEntity in 6.x
