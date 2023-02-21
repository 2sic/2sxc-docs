
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

