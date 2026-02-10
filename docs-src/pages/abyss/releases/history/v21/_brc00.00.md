

#### Breaking Changes in EAV and 2sxc v21.00

1. ⬇️ In Razor/WebApi, the `As<T>(...)` method removed a (probably never used) parameter `mock:`.
    To create mocks, use the `Kit.Convert.ToMock<...>` or `Kit.Convert.ToMockItem<...>` instead.
1. ⚠️🩸 Oqtane: The folder structure of app-files has changed, to prepare for supporting multi-tenant folders.
    The migration should happen automatically, but if something doesn't work, this is why.
1. ⬇️🥫 SQL: The tables `TsDynDataHistory` and `TsDynDataRelationships` has a few minor changes.
