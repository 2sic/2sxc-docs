---
uid: NetCode.ApiChoice.RazorBase
---

# Razor Base Classes - `@inherits`

Every Razor template inherits from a base class.
depending on the base class, the APIs and features in the template will change.
Example:

```razor
// Inherit from the newest base class in 2sxc 16/17
@inherits Custom.Hybrid.RazorTyped
@{
  // more code
}
<div>more html</div>
```

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Typed / Strong-Typed for v16+

These are the **recommended** _Typed_ Razor base classes to inherit today:

1. `Custom.Hybrid.RazorTyped` - new in v16
1. `Custom.Hybrid.RazorTyped<TModel>` - new in v17.03

> [!TIP]
> Using these base classes ensures that you have the latest, **Typed APIs**.
>
> When used in combination with AppCode (v17+) it also allows you to go **Strong Typed**.

In v17.03 we introduced the capability to create your own base classes in the `AppCode/Razor` folder. These are the base classes you can inherit from as of v17 (we'll explain each in more detail below)

1. `AppCode.Razor.AppRazor` - new in v17.03
1. `AppCode.Razor.AppRazor<TModel>` - new in v17.03
1. `AppCode.Razor.Anything` - new in v17.03


For older base classes and the differences, see below.

## Fallback when Missing `@inherits`

If you don't specify an `@inherits` in your code, the system will automatically apply a default base class to your code.
This is different in Dnn and Oqtane:

1. Dnn: `ToSic.SexyContent.Razor.SexyContentWebPage` - specified in a `web.config` in the 2sxc folder of each site.  
  This is the oldest base class and should not be used any more.
1. In Oqtane the default base is `Microsoft.AspNetCore.Mvc.Razor.RazorPage` which is the default for .net 5+.



## Base Classes in the AppCode.Razor Namespace

These are base classes for which the code lies in the `AppCode/Razor` folder of your App.
Some will be auto-generated, others will be made by you.

📖 Read about the Typed API here TODO:

## Custom.Hybrid.Razor14

> [!NOTE]
> `Razor14` ist the last release for **Dynamic API**.
> It and all previous versions use **Dynamic API**.
> See TODO:
>
> See [Custom.Hybrid.Razor14](xref:Custom.Hybrid.Razor14)

Razor14 almost identical with the older Razor12 (see below) with these differences:

[!include["base-12-14"](_base-differences-12-14.md)]

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

> [!NOTE]
> This is internal documentation for the 2sxc core developers.
> You don't need this part.

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
    1. ⭐ `Custom.Hybrid.Razor14` _public_
1. ⭐🌟 `Custom.Hybrid.RazorTyped` **recommended**  
    🔹 changes entire API to typed
    🔹 adds the `MyItem` object and `AsItem(...)` methods
    1. ⭐🌟 `Custom.Hybrid.RazorTyped<TModel>` **recommended**  
       🔹 adds the `Model` object
1. ⭐🌟 `AppCode.Razor.AppRazor` _public, custom - only exists if the App creates it_  
    1. ⭐ `AppCode.Razor.AppRazor<TModel>` _public_

---

## History

* 2sxc 10.20 - changed to `Purpose` from `InstancePurpose` - old code still works
