---
uid: NetCode.TypedCode.CompareApis.AppData
---

# App and App Data Differences in APIs

2sxc has changed a lot over time.
So you'll find old code snippets and new ones, and it helps to see which one is being used.
Sometimes you'll also want to convert old code to new code, and this page should help you with that.

## App and App Data Objects

### Dynamic Code

In Dynamic Code, the objects you'll use are usually:

- `App` - a [IApp] with all app data
- `App.Data` - a [IAppData] with all app data

### Typed Code

In Typed Code, the objects you'll use are usually:

- `App` - a [IAppTyped] with all app data
- `App.Data` - a [IAppDataTyped] with all app data

### Strong Typed Code

In Strong Typed Code - inheriting from `AppCode.Razor.AppRazor`, the objects you'll use are usually:

- `App` - a [IAppTyped<TSet, TRes>](xref:ToSic.Sxc.Apps.IAppTyped`2) with all app data
- `App.Data` - a [IAppData] with all app data

### Differences in the App object (`IApp` vs. `IAppTyped`)

- `App.Query[...]` is now `App.GetQuery(...)` - this will also allow for more advanced options in future
- `App.Folder` is now a `IFolder` object
- `App.Path` is replaced by `App.Folder.Url`
- `App.PathShared` is replaced by `App.FolderAdvanced(location: "shared").Url`
- `App.PhysicalPath` is replaced by `App.Folder.PhysicalPath`
- `App.PhysicalPathShared` is replaced by `App.FolderAdvanced(location: "shared").PhysicalPath`
- `App.Thumbnail` is now an IFile object
- `App.Thumbnail` is replaced by `App.Thumbnail.Url`
- `MyView.Path` still works, but you should use `MyView.Folder.Url` for clarity


## Access App Data

| Dynamic | Typed | Strong Typed
| --- | --- | ---
| `App` <br> ([IApp]) | `App` <br> ([IAppTyped]) | `App` <br> ([IAppTyped<TSet, TRes>](xref:ToSic.Sxc.Apps.IAppTyped`2))
| `App.Data` <br> ([IAppData]) | `App.Data` <br> ([IAppDataTyped]) | `App.Data` <br> ([IAppDataTyped])
| `App.Data["Tags"]` | `App.Data["Tags"]` <br> `App.Data.GetStream("Tags")` (recommended) | `App.Data["Tags"]` <br> `App.Data.GetStream("Tags")` (recommended)
| | | `App.Data.GetAll<T>()`
| | | `App.Data.GetOne<T>(id)`
| `App.Query("QName")` | `App.GetQuery("QName")` new method allows for more parameters | `App.GetQuery("QName")` new method allows for more parameters
| - | `App.GetQuery("QName", parameters: new { Id = 7 } )` | `App.GetQuery("QName", parameters: new { Id = 7 } )`

## Access App and View Folders / URLs

| Dynamic | Typed | Strong Typed
| --- | --- | ---
| - | `App.Folder` <br> ([IFolder]) new only | `App.Folder` <br> ([IFolder])
| `App.Folder` <br> (`string`) | `App.Folder.Name` <br> (`string`)
| `App.Path` | `App.Folder.Url` |
| `App.PhysicalPath` | `App.Folder.PhysicalPath` |

## Access App Settings

👉🏽 See [](xref:NetCode.TypedCode.CompareApis.SettingsResources)

---

[IApp]: xref:ToSic.Sxc.Apps.IApp
[IAppData]: xref:ToSic.Eav.Apps.IAppData
[IAppTyped]: xref:ToSic.Sxc.Apps.IAppTyped
[IAppDataTyped]: xref:ToSic.Sxc.Apps.IAppDataTyped
[IFolder]: xref:ToSic.Sxc.Adam.IFolder
