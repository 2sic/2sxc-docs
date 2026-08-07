

#### Breaking Changes in EAV and 2sxc v22.00

1. ⬇️ a vCard API extension was removed. We believe it has never been used since v20 where the folders changed, so we don't think this will affect anyone.
1. ⬇️ The interface `IContentTypeAttribute` was renamed to `IContentTypeField`.  
    This is an internal API but was used once in `Radmin`, so for compatibility we're keeping the old interface for a while but will update the extension.
