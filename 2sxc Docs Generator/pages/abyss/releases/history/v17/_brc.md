

## Breaking Changes in EAV and 2sxc v17

We try to minimize breaking changes, and most breaking changes won't affect your work, because it's internal API.
We're documenting it here to ensure you know what happened, in case you still run into this.

### Summary

Minor breaking changes which probably won't affect you, unless you're using some very advanced features.

#### v17.00

1. `ToSic.Eav.App.AppData` is renamed to `ToSic.Eav.Apps.DataSources.AppDataWithCrud`
1. In Typed mode, the `App.Data` now has a different interface `ToSic.Sxc.Apps.IAppDataTyped`
1. `AppState` changes...
1. `App` object had a hidden `AppState` property which was never documented and is now removed.  
   If you were using it, then probably to access `GetContentType(string)`. You can find a replacement on `App.Data.GetContentType(...)`.

---

Shortlink: <https://go.2sxc.org/brc-17>
