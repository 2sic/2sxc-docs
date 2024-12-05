---
uid: Basics.Content.Lists
---

# Content Lists

[!include[](../stack/_shared-float-summary.md)]
<style>.context-box-summary .data-entities, .context-box-summary .process-razor-app  { visibility: visible; } </style>

Any [View](xref:Basics.App.Views.Index) can be configured to be a **List** of **Content Items**, and if it is a list, it can also have a **Header** Item. 

When a View is a List...

1. All **Content Items** in the List share the same [Content-Type](xref:Basics.Data.ContentTypes.Index) - like `BlogPost`
1. Each item in the list can have it's own [Presentation Settings](xref:Basics.Content.Presentation) but these settings all share the same [Content-Type](xref:Basics.Data.ContentTypes.Index) - like `BlogPresentation`
1. Lists can have a single **Header** item of another [Content-Type](xref:Basics.Data.ContentTypes.Index) - like `BlogIntro`
1. If the list has a **Header** it can also have a **Header Presentation** of a type like `BlogIntroPresentation`
1. the first item in the List is still given to the Template as the [Content](xref:NetCode.DynamicCode.Content) variable
1. Lists preserve the order of the items added to it
1. The automatic toolbars change a bit when a list is being used

## Use in Code

In C# you will usually do things like `@foreach(var item in AsList(Data)) { ... }` or similar. Check the [C# API Docs for this](xref:NetCode.DynamicCode.Data).

In Tokens you there is a special `<repeat>` tag. Check the [Tokens docs](xref:Basics.Server.Render.Tokens.Index).

## History

1. Introduced in 2sxc v2.0
1. API was improved in 2sxc 8
1. The `Header` name was introduced to replace the confusing `ListContent` name in v10