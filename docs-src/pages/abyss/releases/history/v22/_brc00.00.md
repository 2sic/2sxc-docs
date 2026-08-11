

#### Breaking Changes in EAV and 2sxc v22.00

1. ⚠️ Minimum DNN ☢️ now v10.00.00
1. ⚠️ Minimum Oqtane ☢️ now v10.02.00 but we recommend the latest version of Oqtane
    If you did, you can use the new `IEntityField` interface instead, which is very similar to the old `IField` interface.
1. ⬇️ a vCard API extension was removed. We believe it has never been used since v20 where the folders changed, so we don't think this will affect anyone.
1. ⬇️ The interface `IContentTypeAttribute` was renamed to `IContentTypeField`.  
    This is an internal API but was used once in `Radmin`, so for compatibility we're keeping the old interface for a while but will update the extension.
1. ⬇️ An internal `GetOnce<T>` API was changed to be `LazyGet<T>`
1. ⬇️ Some internal `Field` setters for `Url`, `Raw` and `Value` were removed as they should not be used.
