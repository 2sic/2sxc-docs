---
uid: Abyss.Releases.History.V17.Breaking
---

# Planned Breaking Changes in EAV and 2sxc 17

[!include["Breaking Changes"](./_brc17-planned.md)]


TODO:

1. `ToSic.Eav.App.AppData` is renamed to `ToSic.Eav.Apps.DataSources.AppDataWithCrud`
1. In Typed mode, the `App.Data` now has a different interface `ToSic.Sxc.Apps.IAppDataTyped`
1. `AppState` changes...
1. `App` object had a hidden `AppState` property which was never documented and is now removed.  
   If you were using it, then probably to access `GetContentType(string)`. You can find a replacement on `App.Data.GetContentType(...)`.

---

Shortlink: <https://go.2sxc.org/brc-17>
