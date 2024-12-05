---
uid: NetCode.TypedCode.CompareApis.Index
---

# Compare Various C# / Razor APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

> [!IMPORTANT]
> This is comparing / picking the right API.
> It's not meant to document all the features, but to help compare and migrate from an old API to a new one.

This page should give show you old/new APIs to make refactoring easier.

> [!TIP]
> 🎓 Best check out the [tutorial QuickRef](https://go.2sxc.org/quickref) which shows all this!

## Base Classes / @inherits Determine API

For **Razor**, the `@inherits` statement is the most important part of a Razor file, as it defines which APIs are available.

👉🏽 See [Razor @inherits](xref:NetCode.TypedCode.CompareApis.RazorBase)


If your **custom C# file** inherits from a base class, it will get more APIs - exactly which ones depends on the base class.

👉🏽 See [C# Base Classes](xref:NetCode.TypedCode.CompareApis.CSharpBase)

If your **Custom WebApi Controller** inherits from a base class, it will get more APIs - exactly which ones depends on the base class.

👉🏽 See [WebApi Base Classes](xref:NetCode.TypedCode.CompareApis.WebApiBase)

## Built-In Objects and Services

Depending on the API generation you have selected with the base class, the built-in objects and services will be different.

👉🏽 [Built-In Data Objects](xref:NetCode.TypedCode.CompareApis.DataObjects)

👉🏽 [Data Object API Differences](xref:NetCode.TypedCode.CompareApis.DataObjectApi)

👉🏽 [Built-In Helpers and Services](xref:NetCode.TypedCode.CompareApis.HelpersServices)

👉🏽 [App & App Data](xref:NetCode.TypedCode.CompareApis.AppData)
  
👉🏽 [Settings & Resources](xref:NetCode.TypedCode.CompareApis.SettingsResources)

## Sub Razor Components and Custom C# Helpers

👉🏽 [Razor Sub Components](xref:NetCode.TypedCode.CompareApis.RazorSubComponents)

👉🏽 [Custom C# Helpers / Services](xref:NetCode.TypedCode.CompareApis.CSharpHelpers)

## Special Dnn Helpers (☢️ Dnn only)

👉🏽 [Dnn helper Object](xref:NetCode.TypedCode.CompareApis.DnnObject)

