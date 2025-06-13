

## Breaking Changes in EAV and 2sxc 20 - Moment-of-Truth

> [!IMPORTANT]
> 2sxc 20 is a milestone clean-up release, so it contains a lot of breaking changes.
>
> This is the **Moment of Truth** where you see if you accidentally used internal or very old APIs.
>
> These changes should only affect you, if you are accessing exotic/internal APIs,
> or if you have some extremely old/deprecated code.

Note that we marked the breaking changes like this

* ⚠️ things which may affect you
* ⬇️ things which are extremely unlikely to affect you

### Highlights

> [!TIP]
> Despite this being a breaking change, we want to emphasize that much of this is great news.
> It removes a lot of old cruft, and cleans up some history such as "SexyContent".
>
> These changes only affect you, if you were doing some really nasty things, such as accessing the DB directly.

1. ⚠️ All the SQL tables were renamed - see [](xref:Abyss.Db.ChangesV20)

1. ⚠️ In Dnn, the module is now installed in `/DesktopModules/ToSic.Sxc/` instead of `/DesktopModules/ToSic_SexyContent/`  
    This could affect you, if you had direct links to the `$2sxc.min.js` file anywhere.

1. ⚠️ The minimum Dnn version for v20 is now Dnn 9.11.02 (previously it was 9.6.1)  
    This is because older DNNs have important security issues, and we want to "force" people to update.

1. ⬇️ In Dnn, the modules name is now `2sxc` instead of `SexyContent`


### Breaking `IEntity` API Changes (Razor)

1. ⚠️ A very old interface `ToSic.Eav.Interfaces.IEntity` has been removed, please use `ToSic.Eav.Data.IEntity` instead.  
    Some very old code may have used this to work around LINQ limitations.
    Just use the new one, it's the same thing (but with fewer APIs, according to clean-up below).  
    We've added some error handling to find out if this is the problem you have, and should lead you to this page.

1. ⚠️ `IEntity` has `object Get(name, ...)` and 2 special `Get<TVal>(...)` methods to get a value and convert it to `string`, `int` etc.
    The special typed `<TVal>` variants were moved into extension methods.  
    Normally this should not affect you, if you are `@using ToSic.Eav.Data` in your code, since it will just work.
    If you did this is a more exotic way, add the `@using ToSic.Eav.Data` to your code, and it will work again.

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


### Other Breaking Razor API Changes

1. ⬇️ An internal interface called `ToSic.Sxc.Data.IEntityLight` was removed  
    We don't believe anyone used this, but if you did, please use `ToSic.Eav.Data.IEntity` instead.

1. ⬇️ Some internal objects were consolidated, such as `IAttributeBase` which nobody should have used anyway  
    We don't believe anyone used this.


### Breaking Formulas JavaScript API Changes

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
