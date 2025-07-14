
### 2sxc v20.00.03 (2025-07-11)

> [!WARNING]
> 2sxc v20 is a [MoT Release](xref:Abyss.Releases.Management.PolicyMot), containing many breaking changes.
>
> See [Breaking Changes in v20](xref:Abyss.Releases.History.V20.Breaking) for details.

This 20.00.03 has really nice enhancements, but since we're still stabilizing v20, we are
not incrementing the next number yet.

#### Enhancements

1. 📤 Introduced [ITypedApi](xref:ToSic.Sxc.Code.ITypedApi) and [ITypedApiService](xref:ToSic.Sxc.Services.ITypedApiService) to improve code quality when using 2sxc in skins or outside of DNN.
1. 🔍 `App.GetQuery(...)` now returns an [ITypedQuery](xref:ToSic.Sxc.Data.ITypedQuery) object which also has `GetAll<T>` and `GetOne<T>` just like [App.Data](xref:ToSic.Sxc.Apps.IAppDataTyped)
1. ⚡ Major performance improvements all over, especially for 🦸🏼 **Patrons Performance**
1. ⚡ Introduced features to reduce logging during normal operations, which should improve performance and lower memory footprint.
1. ⚡ Introduced reduced logging during import/save to better debug large imports / apps.
1. 🧑🏼‍💻 Finally stabilized and released feature to change `Edition` to switch between `live` and `staging`
1. ⚡ Internal performance improvements when generating toolbars (caching of complex lookups)
1. 👩‍👦 Improved `.Child(...)`, `.Children(...)`, `.Parent(...)` and `.Parents(...)` to hide related data which is still draft.
1. 📖 Help enhancement for various use cases and better highlighting using emojis such as ❤️‍🩹 and 🔗


#### Bugfixes

1. 🐞 The first time you added site / global / app settings they would not work until you restarted the system
1. 🐞 GPS picker had a bug which only affected very old apps (those which had the picker and 2 separate number fields for Long/Lat)
1. 🐞 Large Apps couldn't be deleted, this is now fixed
1. 🐞 Edition selection became inaccessible when using incorrect value
1. 🐞 Fixed API `App.Data.GetContentType(...)` which only existed in RazorTyped but not in old `dynamic` APIs.
1. 🐞 Fixed issue with very [old apps not listing razor files in the view configuration](xref:Abyss.Releases.History.V20.FixTemplateSelection)



#### Internal Changes

1. Dropped old WebApi URLs beginning with `app-` (documented in the breaking changes)
1. Removed old `.data` as data folder for app extensions (in the `[AppRoot]/system` folder) - now only the protected `[AppRoot]/App_Data` is supported.
1. Experimental Tweak API `XCustom(prefix, key, value)` for testing newer features which are not yet released.
1. Experimental UI options to modify the behavior and not save data (for dialogs which just show data or only do JS activities)
1. Experimental UI `settings` parameter to control this behavior, which is not yet documented.
1. Experimental `dialogSettings` toolbar UI to change the UI from saving data to just `done` (naming and API not final)
1. 
