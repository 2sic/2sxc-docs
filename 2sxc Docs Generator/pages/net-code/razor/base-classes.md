---
uid: NetCode.Razor.BaseClasses
---


# `@inherits` Base Classes

Every Razor template inherits from a base class - and depending on that the features in the template will change.

## Recommendation for v17+

These are the base classes you can inherit from as of v14 (we'll explain each in more detail below)

1. `Custom.Hybrid.RazorTyped` - new in v16
1. `Custom.Hybrid.RazorTyped<TModel>` - new in v17.03
1. `AppCode.Razor.AppRazor` - new in v17.03 - requires that you have this class in your AppCode folder
1. `AppCode.Razor.AppRazor<TModel>` - new in v17.03 - requires that you have this class in your AppCode folder
1. `AppCode.Razor.Anything` - new in v17.03 - requires that you have this class in your AppCode folder

> [!TIP]
> Using these base classes ensures that you have the latest, typed APIs.

For older base classes and the differences, see [Compare Razor @inherits](xref:NetCode.TypedCode.CompareApis.RazorBase)

