

## Breaking Changes in EAV and 2sxc v20 - Moment-of-Truth

> [!IMPORTANT]
> 2sxc v21 has only minor breaking changes.
>
> But 2sxc v20 was a **Moment of Truth** release where we cleaned up a lot of old internal APIs.
>
> These changes should only affect you, if you are accessing exotic/internal APIs,
> or if you have some extremely old/deprecated code.
>
> See also: [](xref:Abyss.Releases.Management.PolicyMot)

1. In Razor/WebApi, the `As<T>(...)` method removed a (probably never used) parameter `mock:`. To create mocks, use the `Kit.Convert.ToMock<...>` or `Kit.Convert.ToMockItem<...>` instead.
1. 🩸 Oqtane: The folder structure of app-files has changed, to prepare for supporting multi-tenant folders. The migration should happen automatically, but if something doesn't work, this is why.
1. 🥫 SQL: The tables `TsDynDataHistory` and `TsDynDataRelationships` has a few minor changes.
1. An internal API to `Reset()` queries has been removed, as today everything should be functional meaning you should recreate the query. (v21.01)
1. An internal `EntityBasedType` API has been removed and superseded by `ModelOfEntity` (v21.01)
1. The **Model** system was completely reworked for more features, and most of it was moved from `ToSic.Sxc.Data.Models` to `ToSic.Eav.Models`.  
    This was never publicly documented, but if you used any of these APIs, please check the new locations and new features. (v21.01)
