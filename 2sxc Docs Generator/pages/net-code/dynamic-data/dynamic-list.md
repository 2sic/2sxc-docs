---
uid: NetCode.DynamicData.DynamicList
---

[!include[](~/basics/stack/_shared-float-summary.md)]
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

## Code example using a Dynamic Entity

We'll assume we have a _Content Type_ called *Book* with the following properties:
* **Title** (text, 1-line)
* **Teaser** (text, multi-line)
* **Description** (text, html)
* **ReleaseDate** (date)
* **Author** (entity - another content item)

Here's a code example in a C# Razor template:

```razor
<!--
  The default variable for the current item is Content, 
  we'll just use another name for this sample
  note that .Title is automatically provided, 
  because the content-type has the property title. 
-->
<h1>@Content.Title</h1>
<div>@Content.Description</div>
<div>Author: @Content.Author.FullName</div>
```
So basically all properties of this book can be shown using `[Object].[PropertyName]` - for example `Content.ReleaseDate`.

## What Dynamic Entity really does - and how...

Technically the dynamic entity object is like a read-helper for the more complex [](xref:ToSic.Eav.Data.IEntity). So actually the _dynamic entity_ object will keep a reference to the underlying read-only `IEntity` item on a property `Entity`, and whenever your code accesses a property, the dynamic entity will query it from the underlying `Entity`.

The main things that the _dynamic entity_ does for you, are

1. Give you a nice, short syntax to access a property - so `Content.FirstName` instead of `Object.Attributes["FirstName"]["en"]` which would be necessary using the more advanced `IEntity` object
2. Ensure that the language used in retrieving a value is the current user language
3. Give conveniant access to related information like the `Presentation` object
4. Automatically handle some data-not-found errors
5. Automatically do conversions, like convert related entities (like `.Children`) into dynamic objects to make your code more consistant  

## How the Property Lookup Works

Internally there are a few things that can returned if you do something like `Content.SomeProperty`

1. If the `SomeProperty` is one of the internal properties like `EntityId` etc. (see below) this will be returned
1. Topmost is a simple property of the underlying Entity, like `FirstName`
1. Similar to that are relationship properties, like `Tags` which will return a special DynamicEntity that behaves as a list (see below)
1. _if the entity is a list_ (for example the result of `var tags = Content.Tags`) then going deeper like `tags.Name` has the following behavior
    1. If the Tags-list had anything, then it will try to find a match on the first item according to these rules. _new in v10.27_
    1. If up till then nothing was found, it will check if any of the items in the list has that `Title` property. This lets you write `Tags.Webdesign.Name` _new in v12.04_
1. Last but not least - if nothing matches, it's `null`

## Properties of a Dynamic Entity

Read the API docs in the [](xref:ToSic.Sxc.Data.IDynamicEntity).

Additional properties that work (they are dynamic, so don't appear in the code)

1. **EntityId** _int_
1. **EntityGuid** _Guid_
1. **EntityType** _string_ - the type name like _Person_
1. **IsPublished** _bool_ - true/false if this item is currently published
1. **_AnyProperty_** _dynamic, but actually bool | string | decimal | datetime | List<DynamicEntity>_ any normal property of the content-item can be accessd directly. It's correctly .net typed (string, etc.)

> [!TIP]
> In 2sxc 10.27 any property that returns a `List<DynamicEntity>` now returns a [](xref:ToSic.Sxc.Data.IDynamicEntity) containing the list. 
> This means that if you expect the list to just return one item, you can directly access its properties like this:  
> `Content.Author.FirstName`.  
> To otherwise enumerate the items, we recommend [](xref:ToSic.Sxc.Code.DynamicCode.AsList(System.Object)) so `AsList(Content.Tags)`

## Working with unpublished/draft items
TODO: write something about how-to-check if published/unpublished, navigating it, etc. - or link to such a page


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Appendix

The following properties/methods exist, but shouldn't be used. They are documented here so that you know that they are not meant for public use:

1. Created - the created date
1. Modified - the modified date
3. Owner - the current owner of the item, usually the author
1. Metadadata - currently use `AsEntity(theObject).Metadata`
4. Permissions - permissions of the current item (if any are defined)

---

## History

1. Introduced in 2sxc 01.00
1. Changed to use interface IDynamicEntity in 6.x
1. Draft/Published introduced in 2sxc 7.x
1. Presentation introduced in 2sxc 7.x
1. Modified introduced in 2sxc 8.x
1. Implemented .net equality comparer in 2sxc 9.42
1. Parents added in 2sxc 9.42
1. Get added in 2sxc 9.42 and added to interface IDynamicEntity in 10.07
1. Parents introduced in 2sxc 9.42, and added to interface IDynamicEntity in 10.07
1. IsDemoItem property added in 2sxc 10.06
1. Changed dynamic access to a property to return a DynamicEntity which is enumerable in 10.27
