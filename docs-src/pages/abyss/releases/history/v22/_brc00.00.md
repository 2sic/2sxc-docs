

#### Breaking Changes in EAV and 2sxc v22.00

1. ⚠️ Minimum DNN ☢️ now v10.00.00; .net 4.8 (from 4.7.2)
1. ⚠️ Minimum Oqtane ☢️ now v10.02.00 but we recommend the latest version of Oqtane
    If you did, you can use the new `IEntityField` interface instead, which is very similar to the old `IField` interface.
1. ⬇️ a vCard API extension was removed. We believe it has never been used since v20 where the folders changed, so we don't think this will affect anyone.
1. ⬇️ The interface `IContentTypeAttribute` was renamed to `IContentTypeField`.  
    This is an internal API but was used once in `Radmin`, so for compatibility we're keeping the old interface for a while but will update the extension.
1. ⬇️ An internal `GetOnce<T>` API was changed to be `LazyGet<T>`
1. ⬇️ Some internal `Field` setters for `Url`, `Raw` and `Value` were removed as they should not be used.
1. ⬇️ The internal base class for dependencies `ToSic.Sys.Services.DependenciesBase` was changed to be a `record` (previously it was a `class`)
1. ⬇️ The internal `PiggyBack` system was simplified.
1. ⬇️🩸 Oqtane: Removed old Razor APIs `GetCode()` and `CreateInstance()` which were probably never used on Oqtane  
    You should only be affected, if you were a very early adopter and used some of the earliest template Apps. If so, please reach out.
1. ⬇️ Extensions in the very old folder `/system` were deprecated in v20, but it seems we missed some cases, so it may still have worked. It's now fully removed.
