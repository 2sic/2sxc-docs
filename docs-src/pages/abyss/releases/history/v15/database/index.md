---
uid: Abyss.Releases.History.V15.Database
---

# Fix Breaking Change _Database_ Clean-Up in v15

**Keywords:** #EAV #Database

2sxc clean up some historical things in the DB which were obsolete:

1. `ToSicEavAttributeGroups.SortOrder` field was removed
1. `ToSicEavEntities.SortOrder` was removed
1. `AttributeSet.Description` was removed
1. `ToSIC_EAV_DataTimeline.NewData` was removed
1. Obsolete SQL-triggers which created data to the `ToSIC_EAV_DataTimeline` were removed


Note that the `IContentType.Description` in the API was also removed.
