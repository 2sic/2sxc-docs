

#### Breaking Changes in EAV and 2sxc v22.02

There was a concept to call 2sxc APIs from a theme or module, called `IDynamicCodeService`.
This is being removed, as the `[](xref:ToSic.Sxc.Services.ITypedApiService)` now covers the same functionality.
Since the old API is probably still being used in DNN but not Oqtane, it was moved _down_ to a compatibility layer for DNN only.
In cases where it was used in Oqtane (truly unexpected), you will need to refactor the code to use the `[](xref:ToSic.Sxc.Services.ITypedApiService)` instead.

1. ⬇️🩸 Oqtane: `IDynamicCodeService` removed.


