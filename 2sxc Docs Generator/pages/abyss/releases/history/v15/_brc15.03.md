
### Breaking Changes in 2sxc 15.03

> [!TIP]
> In summary we've made a lot of internal breaking changes.
> But for all normal users it will have no effect at all.

We believe it will only affect you in these scenarios:

1. TODO


#### API Changes that may affect you

1. An internal user property `IUser.IsDesigner` was renamed to `IUser.IsSiteDeveloper`
1. An internal, deprecated user property `IUser.IsAdmin` was removed
1. An internal, deprecated user property `IUser.IsSuperUser` was removed
1. An internal property `IUser.Guid` was changed from `Guid?` to `Guid`
1. The `Users` DataSource had a property called `IncludeSystemAdmins` which was changed from `bool` to `string` to allow for more options
1. The `Users` DataSource had a property called `RoleIds` which returned a non-standard string-array. It has been removed, and the new `Roles` returns standard related entities.
1. Removed static `ToSic.Eav.Data.Build.Entity(...)` method which was deprecated in v12

#### API Changes which should really not affect you

These are internal APIs which we changed to make everything more immutable.
They should never have been in use outside of the internal code.

1. Changed `IValue.Languages` from `IList` to `IEnumerable` and made it immutable
1. Change `IEntity.Attributes` from `Dictionary<string, IAttribute>` to `IImmutableDictionary<string, IAttribute>` as a step to later make it immutable
1. Removed some old, probably never used APIs on `IAttribute<T>` such as
    * `IAttribute<T>[int[] languageIDs]`
    * `IAttribute<T>[string]`
    * `IAttribute<T>[string[]]`
    * `IAttribute[string[] languageKeys]` - was always marked as private
1. Changed the type of `Attribute.Type` from string to `ValueTypes` to make it more strongly typed
1. Removed the property `Attribute.ControlledType` which previously contained the ValueType