---
uid: NetCode.TypedCode.CompareApis.RazorBase
---

# Razor Base Classes - `@inherits`

Every Razor template inherits from a base class - and depending on that the APIs and features in the template will change.

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Typed / Strongly-Typed for v16+

These are the **recommended** _Typed_ Razor base classes to inherit today:

1. `Custom.Hybrid.RazorTyped` - new in v16
1. `Custom.Hybrid.RazorTyped<TModel>` - new in v17.03

> [!TIP]
> Using these base classes ensures that you have the latest, **Typed APIs**.
>
> When used in combination with AppCode (v17+) it also allows you to go **Strongly Typed**.

In v17.03 we introduced the capability to create your own base classes in the `AppCode/Razor` folder. These are the base classes you can inherit from as of v17 (we'll explain each in more detail below)

1. `AppCode.Razor.AppRazor` - new in v17.03
1. `AppCode.Razor.AppRazor<TModel>` - new in v17.03
1. `AppCode.Razor.Anything` - new in v17.03


For older base classes and the differences, see below.

## Older Base Classes (Dynamic)

These are the older - **Dynamic** base classes - not recommended for new development, but still supported for backwards compatibility.

1. `Custom.Hybrid.Razor14` - new in v14
1. `Custom.Hybrid.Razor12` - new in v12
1. `Custom.Dnn.Razor12` - v12; same as Hybrid, but with `Dnn` property
1. `ToSic.Sxc.Dnn.RazorComponent` - v10
1. `ToSic.SexyContent.Razor.SexyContentWebPage` - very old since v2 - deprecated, but the default if nothing is set.

## Fallback when Missing `@inherits`

If you don't specify an `@inherits` in your code, the system will automatically apply a default base class to your code.
This is different in Dnn and Oqtane:

1. Dnn: `ToSic.SexyContent.Razor.SexyContentWebPage` - specified in a `web.config` in the 2sxc folder of each site.  
  This is the oldest base class and should not be used any more.
1. In Oqtane the default base is `Microsoft.AspNetCore.Mvc.Razor.RazorPage` which is the default for .net 5+.


## Compare Dynamic vs. Typed Razor

The new _Typed_ base classes are much more robust and easier to debug than the classic _Dynamic_ code.
They provide great IntelliSense (when configured in [VS Code](xref:Guides.VsCode.Index)).

When used in combination with Data Models and Services in the AppCode folder, they also allow you to go **Strongly Typed**.
This is the recommended way to write code in 2sxc 16+.

## Custom.Hybrid.RazorTyped

> [!INFORMATION]
> `RazorTyped` and `RazorTyped<TModel>` use **Typed API**.
> See TODO:
>
> See [Custom.Hybrid.RazorTyped](xref:Custom.Hybrid.RazorTyped)


This is the newest base class and recommended to use.
It provides you the full typed API such as the `MyItem` object and `AsItem(...)` methods.

📖 Read about the Typed API here TODO:

## Base Classes in the AppCode.Razor Namespace

These are base classes for which the code lies in the `AppCode/Razor` folder of your App.
Some will be auto-generated, others will be made by you.

📖 Read about the Typed API here TODO:

## Custom.Hybrid.Razor14

> [!INFORMATION]
> `Razor14` and all previous versions use **Dynamic API**.
> See TODO:
>
> See [Custom.Hybrid.Razor14](xref:Custom.Hybrid.Razor14)

Razor14 almost identical with the older Razor12 (see below) with these differences:

1. the `Kit` property is new, providing access to the ServiceKit called [ServiceKit14](xref:ToSic.Sxc.ServiceKit.ServiceKit14).
  It provides access to all the services you need, like `Data`, `Security`, `Koi`, `Convert` and more.

1. the `Convert` property is removed, as it caused confusion with `System.Convert`

Note: hybrid base classes don't have a `Dnn` property. [...more](xref:NetCode.TypedCode.CompareApis.DnnObject)


## Custom.Hybrid.Razor12

> [!INFORMATION]
> `Razor12` uses the **Dynamic API**.
> See TODO:
>
> See [Custom.Hybrid.Razor12](xref:Custom.Hybrid.Razor12)


This was introduced in 2sxc 12.
It contains the features which will work cross-platform on both Dnn and Oqtane.
You should use this base class to create solutions / Apps which work on Dnn and Oqtane.

### Limitations of Custom.Hybrid.Razor12

Since this base class is meant to work on both Dnn and Oqtane, it only supports features which both of these platforms support.

1. The property `Dnn` doesn't exist on this base class, as it would lead to code which can't run cross-platform. [...more](xref:NetCode.TypedCode.CompareApis.DnnObject)

1. As of now the properties / methods `CustomizeData(...)`, `CustomizeSearch(...)` and `Purpose` do not work, because Oqtane doesn't have a search indexer. We plan on introducing something like this once Oqtane provides search, but as of now it's not yet clear how this would work.

1. The code-behing `Code` object doesn't work, as we probably cannot implement this in .net 5

1. The `CreateInstance(...)` works only on C# files `.cs` but not with CSHTML files `.cshtml` as this probably won't work in .net 5

1. Koi works differently than before. Previously you just used a global object `Connect.Koi.Koi` to use Koi, but because .net 5 should really use dependency injection, you should now get Koi using `GetService<Connect.Koi.ICss>()`. The old mechanism will still work in Dnn but would not work in Oqtane.


## Custom.Dnn.Razor12

> [!INFORMATION]
> `Razor12` uses the **Dynamic API**.
> See TODO:
>
> See [Custom.Dnn.Razor12](xref:Custom.Dnn.Razor12)

This is identical with `Custom.Hybrid.Razor12` but with the addition of the `Dnn` property - see also [Dnn Object](xref:NetCode.TypedCode.CompareApis.DnnObject).

## ToSic.Sxc.Dnn.RazorComponent

> [!INFORMATION]
> `Razor12` uses the **Dynamic API**.
> See TODO:
>
> See [RazorComponent](xref:ToSic.Sxc.Dnn.RazorComponent)

This is legacy ad is not documented any more, but you may still find older Apps which have this base class.

## ToSic.SexyContent.Razor.SexyContentWebPage

> [!WARNING]
> `SexyContentWebPage` uses the **Dynamic API**.
>
> It is very old, and regarded as deprecated.
> But you may still find it in older Apps.

## Old Base Class If You Don't use @inherits

If you don't specify `@inherits`, it will automatically use a very OLD API, which is not recommended.

This is because it has always been the default, and we cannot change it.
The great thing is that it's easy to spot if someone chose a different API, because it will be the first line in the file.



## Platform Differences

Internally `Custom.Hybrid.Razor12` is built on the Razor base classes of the .net frameworks.
In Dnn it builds on `System.Web.WebPages.WebPageBase` while in Oqtane it builds on `.net 5+`. Because of this, certain features will work in Dnn which don't work in Oqtane and vice versa.

* If you only want to create Oqtane stuff only, you can just go ahead and use all the new features of the Razor in .net 5

* If you plan on creating real hybrid stuff, you will have to do some testing to ensure you didn't use features that don't exist on the other side

* If you need to code something which is different in each platform, use the `#if` [preprocessor statements](xref:NetCode.Razor.Hybrid.Index)

Some core feature differences

| Feature | Dnn | Oqtane | Comments
| --- | :-: | :-: | ---
| `@inherits` | ✅ | ✅ | Add this to every Razor
| `@helper` | ✅ | ⛔ | Doesn't exist in .net 5
| `@model` | ⛔ | ✅ | Doesn't exist in old .net and can't be combined with `@inherits`

## Internal Docs: Api Controller Inheritance

> [!INFORMATION]
> This is internal documentation for the 2sxc core developers.
> You don't need this part.

### Internal Docs: Dnn API Controller Inheritance

Basis for everything:

1. `System.Web.WebPages.WebPageBase`
    1. 🥷🏽 `ToSic.Sxc.Web.RazorComponentBase`
        _internal base for all Razor Pages in DNN_  
        🔹 adds dynamic code context, `Html` helper, etc.  
        🔹 adds simple `Log` object  
        🔹 Adds logging to insights  
        🔹 Base class for everything

Based on that these public base classes were made:

1. ⭐💀 `ToSic.SexyContent.Razor.SexyContentWebPage` _public, very old/deprecated_  
    _oldest base class, should not be used any more_  
    🔹 TODO: MUST CHECK IF THIS IS STILL THE DEFAULT in web.config  
    🔹 had some exotic propecties such as `List` which contained Content/Presentation pairs  
    1. 🥷🏽 `ToSic.SexyContent.Razor.SexyContentWebPage<T>` _internal, only for technical reasons_
1. ⭐💀 `ToSic.Sxc.Dnn.RazorComponent` _public, old/deprecated_  
    _was the replacement for the previous, without the exotic `List`_
    🔹 Had old APIs such as `CustomizeData` and `CustomizeCode` which isn't needed any more  
    1. ⭐💀 `ToSic.Sxc.Dnn.RazorComponentCode` _public, old/deprecated_  
      _used for deprecated feature: code-behind_
1. ⭐💀 `Custom.Hybrid.Razor12` _public, recommended to move to 14_  
    _works fine, but is missing some newer features_
    🔹 Removed `CustomizeData` and `CustomizeCode`  
    🔹 Had a public object `Convert` which interfered with the `System.Convert`
1. 🥷🏽 `Custom.Hybrid.Advanced.Razor14<TModel, TServiceKit>` _internal_  
    🔹 adds the `Kit` property with all kinds of ready-to-use Services  
    🔹 also removes the `.Convert` object, which is now on Kit.Convert
    1. ⭐🌟 `Custom.Hybrid.Razor14` _public, **recommended**_


---

## History

* 2sxc 10.20 - changed to `Purpose` from `InstancePurpose` - old code still works
