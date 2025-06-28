

## Breaking Changes in EAV and 2sxc v20 - Moment-of-Truth

> [!IMPORTANT]
> 2sxc v20 is a milestone clean-up release, so it contains a lot of breaking changes.
>
> This is the **Moment of Truth** where you see if you accidentally used internal or very old APIs.
>
> These changes should only affect you, if you are accessing exotic/internal APIs,
> or if you have some extremely old/deprecated code.
>
> See also: [](xref:Abyss.Releases.Management.PolicyMot)

Note that we marked the breaking changes like this

* ⚠️ things which may affect you
* ⬇️ things which are extremely unlikely to affect you

> [!TIP]
> Note that the focus of breaking changes is on the **Razor** code.
> But there are also [2 small breaking changes in **Formulas**](#breaking-formulas-api-changes).

### Highlights

> [!TIP]
> Despite this being a breaking change, we want to emphasize that much of this is great news.
> It removes a lot of old cruft, and cleans up some history such as "SexyContent".
>
> These changes only affect you, if you were doing some really nasty things, such as accessing the DB directly.

1. ⚠️ All SQL tables and restructured - see [](xref:Abyss.Db.ChangesV20)

1. ⚠️ In Dnn, the module is now installed in `/DesktopModules/ToSic.Sxc/` instead of `/DesktopModules/ToSic_SexyContent/`  
    This could affect you, if you had direct links to
    * the `$2sxc.min.js` file in your templates
    * were using the extremely old image resizer on the path `/DesktopModules/ToSic_SexyContent/Extensions/Thumbnailer.aspx`  
      🔨 see [](xref:Abyss.Releases.History.V20.BrcThumbnailer)
    * used one of the recommended base themes such as **2shine** and now quick-edit doesn't automatically appear on empty pages.  
      🔨 see [](xref:Abyss.Releases.History.V20.BrcDnnQuickEditOnEmptyPage)

1. ⚠️ In Dnn we stop auto-creating a `web.config` file in the `/2sxc/` folder, so Razor files will no longer automatically use the old base class `SexyContentWebPage`.
    This should not affect you, you're installing old Apps in newer DNNs.  
    🔨 see [](xref:Abyss.Releases.History.V20.RazorStopsDefaultingToOld)

1. ⬇️ The minimum Dnn version for v20 is now Dnn 9.11.02 (previously it was 9.6.1)  
    This is because older DNNs have important security issues, and we want to force people to update.  
    As of now, 2sxc v20 will still run on older DNNs, but we will not support it or test it.

1. ⬇️ The image resizer only includes the 64 bit binaries, the 32 bit binaries were removed.
    This makes the distribution smaller, and I don't think anyone is using 32 bit servers anymore.

1. ⬇️ All code was restructured to create smaller, more focused assemblies.  
    This should not affect you, but if you were using some very old code, it may have been moved to a different assembly.
    This can affect you if you were using compiled code which referenced the old assemblies (not common).

1. ⬇️ Most internal APIs were moved into `Sys` namespaces, so it's easier to see if you're using internal APIs.  
    This should not affect you, unless you were already using internal APIs.

1. ⬇️ In Dnn, the modules name is now `2sxc` instead of `SexyContent`



### Breaking `IEntity` API Changes (Razor)

> [!TIP]
> If your code just used the normal DynamicEntity or TypedEntity / Items APIs, you are not affected by these changes.
>
> But in rare cases, especially in older Apps, some workarounds were used to access the `IEntity` interface directly.
>
> This is usually done by first running `AsEntity(someObject)` to get the `IEntity` underlying data.

1. ⚠️ A very old interface `ToSic.Eav.Interfaces.IEntity` has been removed, please use `ToSic.Eav.Data.IEntity` instead.  
    Some very old code may have used this to work around LINQ limitations.
    Just use the new one, it's the same thing (but with fewer APIs, according to clean-up below).  
    We've added some error handling to find out if this is the problem you have, and should lead you to this page.

1. ⚠️ `IEntity` has `object Get(name, ...)` and 2 special `Get<TVal>(...)` methods to get a value and convert it to `string`, `int` etc.
    The special typed `<TVal>` variants were moved into extension methods.  
    Normally this should not affect you, if you are `@using ToSic.Eav.Data` in your code, since it will just work.
    If you did this is a more exotic way, add the `@using ToSic.Eav.Data` to your code, and it will work again.

1. ⚠️ `IEntity` had various `GetBestValue(...)` APIs which were removed.
    We believe that about 2-3% of all code used this, so it may affect you.
    🔨 see [](xref:Abyss.Releases.History.V20.GetBestValue)

1. ⬇️ APIs on `IEntity` were modified

    1. `.Children(...)` and `.Parents(...)` now return `IEnumerable<IEntity>` instead of `List<IEntity>`.  
        This will only affect you if you are using `.Count` on the result, in which case you should use `.Count()` instead.

1. ⬇️ Old, deprecated APIs `IEntity` were removed.  
    These have not worked properly for many years.  
    We've added some error handling to find out if this is the problem you have, and should lead you to this page.

    1. `object GetBestValue(string attributeName, bool resolveHyperlinks)` - didn't work for a long time, is being removed

    1. `TVal GetBestValue<TVal>(string name, string[] languages, bool resolveHyperlinks)` - didn't work for a long time, is being removed

    1. `object GetBestValue(string attributeName, string[] languages, bool resolveHyperlinks)` - didn't work for a long time, is being removed

    1. `object Value(string field, bool resolve = true)` - didn't work for a long time, is being removed

    1. `T Value<T>(string field, bool resolve = true)` - didn't work for a long time, is being removed

1. ⬇️ Some unofficial APIs on `IEntity` were removed

    1. `object PrimaryValue(string attributeName)`  
        The term `PrimaryValue` was an idea which we never pursued further. please just use `Get(...)` instead

    1. `TVal PrimaryValue<TVal>(string attributeName)`  
        The term `PrimaryValue` was an idea which we never pursued further. please just use `Get(...)` instead

    1. `object Value(string attributeName)`  
        The term `Value` was an idea which we never pursued further. please just use `Get(...)` instead

    1. `TVal Value<TVal>(string attributeName)`  
        The term `Value` was an idea which we never pursued further. please just use `Get(...)` instead

1. ⬇️ An API giving access to the ContentType Description `IContentType.Metadata.Description` were removed
    We don't believe anyone used this.

### Other Breaking Razor API Changes (Dnn only)

1. ⚠️ The behavior to auto-load jQuery for very old Razor base classes was removed.  
    A long time ago 2sxc accidentally loaded jQuery automatically in DNN.  
    In those days, jQuery was used a lot. We stopped doing this for newer Razor base classes, but preserved the behavior for very old Razor base classes.  
    This was removed in v20, so if you were using the old Razor base classes, you will need to add jQuery manually.  
    _Note: code for this was commented out with `#RemovedV20 #OldDnnAutoJQuery`._

1. ⚠️ Three old APIs on old Razor Base classes such as `SexyContentWebPage` were removed. All have been deprecated since v12.  
    They were originally meant to use the same Razor file to also create a WebApi and fill the DNN search index, but was deprecated a long time ago.
    1. `Purpose` - this was meant to tell Razor if it should prepare data for search or for view.
    1. `CustomizeSearch(...)` this was meant to customize the data for the search index. The functionality was moved to separate code many years ago.
    1. `CustomizeData(...)` this was a patchy way to specify the data for the razor template.

1. ⚠️ The `SexyContentWebPage` had a `List` property which provided `Element` objects to loop through.  
    They were deprecated since v12, and replaced with the new Razor base classes which are much better.
    If you were using these, please switch to the new Razor base classes and use the more modern approaches such as `MyItem`, `MyItem.Presentation`, `Content`, etc.
    🔨 To fix, see [](xref:Abyss.Releases.History.V20.ListElement).
    _Note: code for this was commented out with `#RemovedV20 #Element`._

1. ⬇️ There is a `/system` folder in the DesktopModules which had extensions. Each could have a `.data` folder - this must now be `App_Data`.  
    This is probably not an issue, as we will auto-rename this during the upgrade of v20.00.01

1. ⚠️ Every App _can_ have a similar `/system` folder. Each could have a `.data` folder - this must now be `App_Data`.  
    This is rarely used, but you would have to manually rename this folder to `App_Data` if you had it.

1. ⬇️ An old interface `ToSic.Sxc.Blocks.IRenderService` was removed, since it's been superseded by `ToSic.Sxc.Services.IRenderService`.
    We believe it was used in 2-3 v12 Apps, so if you encounter this, just switch to `ToSic.Sxc.Services.IRenderService` instead.

1. ⬇️ An internal interface called `ToSic.Sxc.Data.IEntityLight` was removed  
    We don't believe anyone used this, but if you did, please use `ToSic.Eav.Data.IEntity` instead.

1. ⬇️ A very old interface called `SexyContent.Interfaces.IDynamicEntity` was removed.  
    If you really had this in your code, please use `ToSic.Sxc.Data.IDynamicEntity` instead.

1. ⬇️ Some internal objects were consolidated, such as `IAttributeBase` which nobody should have used anyway  
    We don't believe anyone used this.

1. ⬇️ lots of internal namespaces and classes/interfaces were renamed, including but not limited to:
    1. `DynamicEntity.GetEntityValue(string name)` (removed)

1. ⬇️ An old API used by some of the first Mobius Apps used `App.Data.Cache.GetContentType`.  
    This has been obsolete since v10 and is now removed in v20.  
    We suggest you use a newer Mobius App or if you're really desperate, see 🔨 [](xref:Abyss.Releases.History.V20.IAppDataCache).

1. ⬇️ An old internal interface called `ToSic.SexyContent.IAppAndDataHelpers` was removed.  
    It was implemented by `ToSic.SexyContent.Razor.SexyContentWebPage` and `ToSic.SexyContent.WebApi.SxcApiController`.
    The APIs on it still work, but the interface was removed; you should not notice the clean-up.
    See [](xref:Abyss.Releases.History.V20.DnnFiles)


### Breaking Formulas API Changes

#### V1 `form.runFormulas()` Was Removed

The V1 formulas were not async, so they had a patchy solution for using formulas which requested data from the server.
The old solution was to use fetch and in the promise, call `form.runFormulas()` to retrigger the formulas after the data was loaded.

2sxc 16 in early 2023 introduced V2 formulas which can return a promise.
This will automatically trigger recalculations when the promise resolves,
and allows for better control over what happens (like if the same formula should run again, or not).

Since v16 was released, any use of the old `form.runFormulas()` resulted in a warning in the console.

In v20, this method was disabled showing a JS error.
If you were using it, please remove it and use the new V2 formulas instead.

#### Internal Formula Changes

An internal API which placed some experimental commands in the formula calls were moved to the context.
Since it was only used internally, it should not affect anyone.
