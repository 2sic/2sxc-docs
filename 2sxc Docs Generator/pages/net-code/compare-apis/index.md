---
uid: NetCode.TypedCode.CompareApis.Index
---

# Compare Various C# / Razor APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

This page should give show you old/new APIs to make refactoring easier.

> [!TIP]
> 🎓 Best check out the [tutorial QuickRef](https://go.2sxc.org/quickref) which shows all this!

## Topics

1. General Setup / Inherits
1. Get / Show / Output Values from Items
1. Use Services / Helpers

## General Setup / Inherits

### Razor Files @inherits

The `@inherits` statement is the most important part of a Razor file, as it defines which APIs are available.

👉🏽 See [Razor @inherits](xref:NetCode.TypedCode.CompareApis.RazorBase)

### Code File Base Classes

TODO:

### Web Api Base Classes

TODO:









## TOOLBARS

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `Edit` | `Kit.Edit` | global `Edit` object is gone
| `Edit.TagToolbar(...)` | `Kit.Toolbar.Default(...)` <br> `Kit.Toolbar.Empty(...).` | global `Edit` object is gone
| `Edit.Toolbar(...)` | `Kit.Toolbar.Default(...)...AsTag()` <br> `Kit.Toolbar.Empty(...)...AsTag()` | global `Edit` object is gone



---