---
uid: NetCode.TypedCode.CompareApis.CSharpBase
---

# C# Base Classes

Every C# helper file / custom service inherits from a base class.
depending on the base class, the APIs and features in the template will change.

Example for `/AppCode/Services/FunnyService.cs` - v17.03+:

```csharp
namespace AppCode.Services
{
  public class FunnyService : Custom.Hybrid.CodeTyped
  {
    public string PageTitle => MyPage.Title;
  }
}
```

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Typed / Strong-Typed for v16+

These are the **recommended** _Typed_ C# base classes to inherit today:

1. `Custom.Hybrid.CodeTyped` - new in v16

> [!TIP]
> Using these base classes ensures that you have the latest, **Typed APIs**.

For older base classes and the differences, see below.

## Older Base Classes (Dynamic)

These are the older - **Dynamic** base classes - not recommended for new development, but still supported for backwards compatibility.

1. `Custom.Hybrid.Code14` - new in v14
1. `Custom.Hybrid.Code12` - new in v12
1. `Custom.Dnn.Code12` - v12; same as Hybrid, but with `Dnn` property

## C# Classes Which Don't Inherit

If you don't specify a base class, the class will behave as a standard, new class.
Example:

```csharp
namespace AppCode.Services
{
  public class FunnyService
  {
    // This can't work, because there is no MyPage object
    public string PageTitle => MyPage.Title;
  }
}
```

## Compare Dynamic vs. Typed C# Code

The new _Typed_ base classes are much more robust and easier to debug than the classic _Dynamic_ code.
They provide great IntelliSense (when configured in [VS Code](xref:Guides.VsCode.Index)).

When used in combination with Data Models and Services in the AppCode folder, they also allow you to go **Strong Typed**.
This is the recommended way to write code in 2sxc 16+.

## Custom.Hybrid.CodeTyped

> [!NOTE]
> `CodeTyped` uses **Typed API**.
> See TODO:
>
> See [Custom.Hybrid.CodeTyped](xref:Custom.Hybrid.CodeTyped)

[!include["base-typed"](_base-typed_.md)]


## Base Classes in the AppCode Namespace

These are base classes for which the code lies in the `AppCode/*` folder of your App.
Some will be auto-generated, others will be made by you.

📖 Read about the Typed API here TODO:

## Custom.Hybrid.Code14

> [!NOTE]
> `Code14` ist the last release for **Dynamic API**.
> It and all previous versions use **Dynamic API**.
> See TODO:
>
> See [Custom.Hybrid.Code](xref:Custom.Hybrid.Code14)

Code14 almost identical with the older Code12 (see below) with these differences:

[!include["base-12-14"](_base-differences-12-14.md)]

## Custom.Hybrid.Code12 & Custom.Dnn.Code12

> [!NOTE]
> `Code12` uses the **Dynamic API**.
> See TODO:
>
> See [Custom.Hybrid.Code12](xref:Custom.Hybrid.Code12) and [Custom.Dnn.Code12](xref:Custom.Dnn.Code12)

This was introduced in 2sxc 12.
It contains the features which will work cross-platform on both Dnn and Oqtane.
You should use this base class to create solutions / Apps which work on Dnn and Oqtane.

`Custom.Dnn.Code12` is identical to `Custom.Hybrid.Code12` but with the addition of the `Dnn` property.
See also [Dnn Object](xref:NetCode.TypedCode.CompareApis.DnnObject).

### Limitations of Code12

[!include["base-12-limitations"](_base-12-limitations-shared.md)]

