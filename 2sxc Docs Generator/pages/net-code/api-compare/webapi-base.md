---
uid: NetCode.TypedCode.CompareApis.WebApiBase
---

# C# WebApi Base Controller Classes

Every Custom C# WebApi Controller inherits from a base class.
depending on the base class, the APIs and features in the template will change.

> [!TIP]
> This is basically identical with the [C# base classes](xref:)
> , just with slightly different names.
>
> Because of this, we're not repeating the entire text here, but just listing the class names.

## Typed / Strong-Typed for v16+

These are the **recommended** _Typed_ C# base classes to inherit today:

1. `Custom.Hybrid.ApiTyped` - new in v16

## Older Base Classes (Dynamic)

These are the older - **Dynamic** base classes - not recommended for new development, but still supported for backwards compatibility.

1. `Custom.Hybrid.Api14` - new in v14
1. `Custom.Hybrid.Api12` - new in v12
1. `Custom.Dnn.Api12` - v12; same as Hybrid, but with `Dnn` property

## C# WebApi Controllers Classes Which Don't Inherit

If you don't specify a base class, the class will behave as a standard, new class.
This will probably just not work.
