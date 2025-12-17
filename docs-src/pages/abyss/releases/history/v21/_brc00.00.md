

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

1. In Razor/WebApi, the `As<T>(...)` method removed a (probaly never used) parameter `mock:`. To create mocks, use the `Kit.Convert.ToMock<...>` or `Kit.Convert.ToMockItem<...>` instead.
1. 🩸 Oqtane: The folder structure of app-files has changed, to prepare for supporting multi-tenant folders. The migration should happen automatically, but if something doesn't work, this is why.
1. 🥫 SQL: The tables `TsDynDataHistory` and `TsDynDataRelationships` has a few minor changes.
