
### Breaking Changes in 2sxc 15.06

> [!TIP]
> In summary we've made a lot of internal breaking changes.
> But for all normal users it will have no effect at all.

We believe it will only affect you in these scenarios:

1. TODO


#### API Changes that may affect you on IEntity

These were internal APIs which were not publicly documented, but may have been used by some developers.

1. `IEntity.GetDraft()` was removed to ensure the entity is immutable
1. `IEntity.GetPublished()` was removed to ensure the entity is immutable

Note: `GetDraft()` and `GetPublished()` are still available on DynamicEntity in Razor and WebApi.
They were only removed on `IEntity`.

#### Renamed DataSources

These data sources had uncommon names, and were renamed to be more consistent.
We believe that they were only used in VisualQuery and not in code, so it should not affect you.

1. `CsvDataSource` is now `Csv`
1. `SerializationConfiguration` is now `Serialization`
