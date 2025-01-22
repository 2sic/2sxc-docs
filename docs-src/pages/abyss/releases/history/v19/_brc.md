

## Breaking Changes in EAV and 2sxc v19

We try to minimize breaking changes, and most breaking changes won't affect your work, because it's internal API.
We're documenting it here to ensure you know what happened, in case you still run into this.

### Summary

1. ⬇️ An interface called `ToSic.Sxc.DataSources.IBlockInstance` was removed since it was identical to `ToSic.Eav.DataSource.IDataSource` and should not be used anywhere.
1. ⬇️ Core objects like Entity, Attribute etc. were changed to `record` - this would only affect you if you inherited from them
1. ⬇️ Cleanup internal APIs on an internal interface `IEntityLight` which is not public. Properties: `Title`, `Attributes` and `this[...]`
1. ⚠️ Enhancement in the `Pages` DataSource - property renames `Visible` to `IsNavigation` and `Clickable` to `IsClickable`
1. ⚠️ Enhancement to the `Roles` DataSource - renamed to `UserRoles` - breaking change!
1. ⚠️ Renamed the system query `System.Roles` to `System.UserRoles` - breaking change!
