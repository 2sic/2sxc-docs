---
uid: NetCode.DynamicData.DynamicStack
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# Dynamic Stack Objects

_Important: this is new in 2sxc 12.02 and may still have minor issues_

In some scenarios you want to ask multiple Entities if they have an Value. 
For example you may need i18n Resources (like the label of a button). 
This could be in the [View Resources](xref:Basics.App.Views.Resources) or in the [App Resources](xref:Basics.App.Resources).

It would be cumbersome to write code to check all this, which is there the **DynamicStack** comes in.

> The DynamicStack will hold a stack of [Entities](xref:NetCode.DynamicData.Entity) or [DynamicEntities](xref:NetCode.DynamicData.DynamicEntity).
> It will ask them in sequence if they have the value you need, and return the first match. 
> The order of the stack is important, as the first entity to provide an answer will be used. 

Dynamic Stacks behave as if they were [Dynamic Entities](xref:NetCode.DynamicData.DynamicEntity).

## Examples of Dynamic Stacks

In Razor and WebApi you will find these objects are Dynamic Stacks:

1. [Settings](xref:NetCode.DynamicCode.Objects.Settings) 
1. [Resources](xref:NetCode.DynamicCode.Objects.Resources)


## Why Use Dynamic Stacks?

Our core goal is the consolidation of spread out Settings and Resources. 
We're not yet sure if developers will find other uses for this, but we're pretty sure there are some cool reasons to do this. 
Some Ideas we have are:

1. Make your code simpler by merging 2-3 objects which describe the same thing, like a Person and Profile
1. Merge Presentation settings with Defaults from another Entity


## How to Create a Dynamic Stack

In 2sxc 12.02 there is an _experimental_ overload of `AsDynamic(...)` to create your own stacks. Here's how it works:

```c#
// the personEntity and profileEntity are Entity objects
var person = AsDynamic(personEntity);
var name = person.Name;
var profile = AsDynamic(profileEntity);
var favoriteColor = profile.FavoriteColor;

var stack = AsDynamic(personEntity, profileEntity);
var nameFromStack = stack.Name;
var colorFromStack = stack.FavoriteColor;
```

## Possible Gotchas with Dynamic Stacks

#### Proritized by Source, not Language

As of now, the stack always checks each entity one by one to see if it can supply an answer. 
This means that if one source has an answer from the fallback language it will supply it, even if a later source might have the perfect answer in the primary language. 
We're not sure how relevant this is, but it's something you will want to keep in mind. 

#### Empty Values are Treated as No Value

To detect if a value should be used the code checks for emptyness.
This means an empty string or an empty list of relationships will be treated as no-hit and the search will continue through the stack. 

This also means that it may be difficult to "nullify" a value in a higher-level source, as that will be ignored.

## Read Also

👉 API docs for [IDynamicStack](xref:ToSic.Sxc.Data.IDynamicStack)

---

## History

1. Introduced in 2sxc 12.02