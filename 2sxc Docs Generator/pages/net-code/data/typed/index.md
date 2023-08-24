---
uid: NetCode.Data.Typed.Index
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all, .context-box-summary .prepare-all { visibility: visible; } </style>

# Typed Data aka `ITypedItem`

In 2sxc 16 we introduced a new way to work with data, which is much more strongly typed.
The objects you will then work with are either

1. `ITypedItem` which is a wrapper around an `IEntity`
1. `ITyped` which is a wrapper around other objects which need to be accessed dynamically
1. `IFile`
1. `IFolder`
1. etc.

> [!NOTE]
> These docs are still being written. Please be patient.

## Things which need documentation

1. Use of the now API
1. Differences to the old API / gotchas
1. Working with strict / required properties/fields
1. Working with files etc.
1. Special actions such as Attribute(), Html(), Picture(), etc.
1. MySettings / MyResources / App.Settings, App.Resources
1. MyContext, MyPage, etc.
1. Use Kit.Data... to get DataSources etc.
1. Improve the "Where data comes from"
1. maybe: configuration data?

## Temporary Notes - to be organized at some other time

### Differences in the App object (`IApp` vs. `IAppTyped`)

* `App.Query[...]` is now `App.GetQuery(...)` - this will also allow for more advanced options in future
* `App.Folder` is now a `IFolder` object
* `App.Path` is replaced by `App.Folder.Url`
* `App.PathShared` is replaced by `App.FolderAdvanced(location: "shared").Url`
* `App.PhysicalPath` is replaced by `App.Folder.PhysicalPath`
* `App.PhysicalPathShared` is replaced by `App.FolderAdvanced(location: "shared").PhysicalPath`
* `App.Thumbnail` is now an IFile object
* `App.Thumbnail` is replaced by `App.Thumbnail.Url`
* `MyView.Path` still works, but you should use `MyView.Folder.Url` for clarity

---


## History

1. Introduced in 2sxc v16
