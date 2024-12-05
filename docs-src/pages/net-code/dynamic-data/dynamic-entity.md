---
uid: NetCode.DynamicData.DynamicEntity
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# Dynamic Entity Objects

Whenever you create a content-type - like _Person_ - and want to work with the data in your C# Razor templates, you'll be working with a _Dynamic Entity_.

👉 also read about [](xref:NetCode.DynamicCode.AsDynamic)

[!include[""](./_include-dyn-ent-sample.md)]

👉 more about this on [](xref:NetCode.DynamicData.DynamicEntityProperties)

## Working with unpublished/draft items

TODO: write something about how-to-check if published/unpublished, navigating it, etc. - or link to such a page


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


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
