---
uid: Abyss.Releases.History.V15.Minor
---

# Minor Breaking Changes in v15

## IContentType.Description removed

The internal object `IContentType` used to have a `Description`.
It has been obsolete for a long time and just used internally.
This was removed.

## ToSic.Eav.Repositories.RepositoryInfoOfFolder was removed

This was an old API, please use `ToSic.Eav.Repositories.FolderBasedRepository` instead.

## AppCacheLoader was changed

This is just very internal and only relevant to caching providers.

## .data is now App_Data

An internal folder which was called `.data` is now `App_Data`
