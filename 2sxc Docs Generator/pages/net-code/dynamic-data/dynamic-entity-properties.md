---
uid: NetCode.DynamicData.DynamicEntityProperties
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# Dynamic Entity Properties

Whenever you create a content-type - like _Person_ - and want to work with the data in your C# Razor templates, you'll be working with a _Dynamic Entity_.
You can get any value using one of the following:

* the dot-notation like `Content.FirstName`
* the `Get()` method like `Content.Get("FirstName")`
* the `Get()` method with a fallback value like `Content.Get("FirstName", fallback: "John")`
* the typed `Get<T>()` method like `Content.Get<string>("FirstName")`

👉 also read about [](xref:NetCode.DynamicCode.AsDynamic)

[!include[""](./_include-dyn-ent-sample.md)]

## What Dynamic Entity really does - and how

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
1. Next is a simple property of the underlying Entity,
    1. like `FirstName` which would be a string
    1. or a relationship property like `Tags` which will return a special DynamicEntity that behaves as a list (see below)
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
> In 2sxc 10.27 any property that returns a `List<DynamicEntity>` now returns a [](xref:ToSic.Sxc.Data.IDynamicEntity) containing a list.
> This means that if you expect the list to just return one item, you can directly access its properties like this:  
> `Content.Author.FirstName`.  
> To otherwise enumerate the items, we recommend [](xref:ToSic.Sxc.Code.DynamicCode.AsList(System.Object)) so `AsList(Content.Tags)`

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Appendix

The following properties/methods exist, but shouldn't be used. They are documented here so that you know that they are not meant for public use:

1. Created - the created date
1. Modified - the modified date
1. Owner - the current owner of the item, usually the author
1. Metadadata - currently use `AsEntity(theObject).Metadata`
1. Permissions - permissions of the current item (if any are defined)

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
