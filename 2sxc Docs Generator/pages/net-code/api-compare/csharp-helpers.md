---
uid: NetCode.TypedCode.CompareApis.CSharpHelpers
---

# Razor Sub-Components  Differences in APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

> This is about how a Razor can call other Razor files, and pass parameters to them.

## Calling Sub Components

...

| `var helper = CreateInstance("helper.cs")` | `var helper = GetCode("helper.cs")` |

## Access Model Data from Child Razor

When a razor is called using `Html.Partial(..., new { ... })` it passes parameters to the child razor.

These can be picked up in the child as follows:

| Dynamic | Typed | Comments / Differences
| --- | --- | ---
| `DynamicModel` <br> (`dynamic`) | `MyModel` <br> ([ITypedModel]) | Model of the child
| `var name = DynamicModel.Name` <br> (`dynamic`) | `var name = MyModel.String("Name")` <br> (`string`)
| `var birthday = DynamicModel.Birthday` <br> (`dynamic`) | `var birthday = MyModel.DateTime("Name")` <br> (`DateTime`)

`MyModel` has many more methods to ensure you can pass type-safe data to the child.
See [MyModel](xref:ToSic.Sxc.Code.ITypedModel)


[ITypedModel]: xref:ToSic.Sxc.Code.ITypedModel
