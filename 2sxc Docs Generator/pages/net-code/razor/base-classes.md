---
uid: NetCode.Razor.BaseClasses
---

# `@inherits` Base Classes #todoc / WIP

Every Razor template inherits from a base class - and depending on that the features in the template will change. 

These are the base classes you can inherit from as of v14 (we'll explain each in more detail below)

1. `Custom.Hybrid.Razor14` - new in v14
1. `Custom.Hybrid.Razor12` - new in v12
1. `Custom.Dnn.Razor12` - new in v12; same as Hybrid, but with `Dnn` property
1. `ToSic.Sxc.Dnn.RazorComponent` - new in v10
1. `ToSic.SexyContent.Razor.SexyContentWebPage` - very old since v2 - deprecated, but the default if nothing is set.
1. Default in Oqtane
1. 

Important: If you don't specify an `@inherits` in your code, the system will automatically apply a default base class to your code. This is different in Dnn and Oqtane:

1. In Dnn the default base class is `ToSic.SexyContent.Razor.SexyContentWebPage` as it's specified in a `web.config` in the 2sxc folder of each site.  
  This is the oldest base class and should not be used any more. 
1. In Oqtane the default base is `#todoc` which is the default for .net 5

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Custom.Hybrid.Razor14

This is the newest base class and recommended to use. 
It's almost identical with Razor12 with these differences:

1. the `Kit` property is new, providing access to the ServiceKit called ServiceKit14
1. the `Convert` property is removed, as it caused confusion with `System.Convert`

Note that the hybrid base classes don't have a `Dnn` property as they are hybrid and work on Oqtane and Dnn. 

If you think you need the Dnn property, best first check if the [CmsContext](xref:ToSic.Sxc.Context) can't be used instead. 

Otherwise inherit from `Custom.Dnn.Razor12` and just get the Services you need with GetService.

## Custom.Hybrid.Razor12

This is the newest base class and was introduced in 2sxc 12. It contains the features which will work cross-platform on both Dnn and Oqtane. You should use this base class to create solutions / Apps which work on Dnn and Oqtane. 

### Limitations of Custom.Hybrid.Razor12

Since this base class is meant to work on both Dnn and Oqtane, it only supports features which both of these platforms support. 

1. The property `Dnn` doesn't exist on this base class, as it would lead to code which can't run cross-platform
1. As of now the properties / methods `CustomizeData(...)`, `CustomizeSearch(...)` and `Purpose` do not work, because Oqtane doesn't have a search indexer. We plan on introducing something like this once Oqtane provides search, but as of now it's not yet clear how this would work. 
1. The code-behing `Code` object doesn't work, as we probably cannot implement this in .net 5
1. The `CreateInstance(...)` works only on C# files `.cs` but not with CSHTML files `.cshtml` as this probably won't work in .net 5
1. Koi works differently than before. Previously you just used a global object `Connect.Koi.Koi` to use Koi, but because .net 5 should really use dependency injection, you should now get Koi using `GetService<Connect.Koi.ICss>()`. The old mechanism will still work in Dnn but would not work in Oqtane. 

#### Platform Differences

Internally `Custom.Hybrid.Razor12` is built on the Razor base classes of the .net frameworks, so in Dnn it builds on `#todoc` while in Oqtane it builds on `#todoc`. Because of this, certain features will work in Dnn which don't work in Oqtane and vice versa. 

* If you only want to create Oqtane stuff only, you can just go ahead and use all the new features of the Razor in .net 5
* If you plan on creating real hybrid stuff, you will have to do some testing to ensure you didn't use features that don't exist on the other side
* If you need to code something which is different in each platform, use the `#if` [preprocessor statements](xref:NetCode.Razor.Hybrid.Index)

Some core feature differences

| Feature | Dnn | Oqtane | Comments
| --- | :-: | :-: | ---
| `@inherits` | ✅ | ✅ | 
| `@helper` | ✅ | ⛔ | Doesn't exist in .net 5
| `@model` | ⛔ | ✅ | Doesn't exist in old .net
| #todoc



### ToSic.Sxc.Dnn.RazorComponent

todo #todoc

### The old one... 

todo: #todoc

## Internal Docs: Api Controller Inheritance

> [!WARNING]
> This is internal documentation for the 2sxc core developers.
> You don't need this part.

### Internal Docs: Dnn API Controller Inheritance

Basis for everything:

1. `System.Web.WebPages.WebPageBase`
    1. 🥷🏽 `ToSic.Sxc.Web.RazorComponentBase`
        _internal base for all Razor Pages in DNN_  
        🔹 adds dynamic code context, `Html`, `RenderPage`, etc.  
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
