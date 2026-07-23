

#### Breaking Changes in EAV and 2sxc v21.01

1. ⬇️ An internal API to `Reset()` queries has been removed,
    as today everything should be functional meaning you should recreate the query. (v21.01)
1. ⬇️ An internal `EntityBasedType` API has been removed and superseded
    by [`ModelFromEntity`](xref:ToSic.Eav.Models.ModelFromEntity) (v21.01)
1. ⬇️ The **Model** system was completely reworked for more features,
    and most of it was moved from `ToSic.Sxc.Data.Models` to [`ToSic.Eav.Models`](xref:ToSic.Eav.Models).  
    This was never publicly documented, but if you used any of these APIs, please check the new locations and new features. (v21.01)
