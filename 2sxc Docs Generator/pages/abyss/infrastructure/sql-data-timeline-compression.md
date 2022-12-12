---
uid: Abyss.Infrastructure.SqlDataTimelineCompression
---

# 2sxc Patron Infrastructure - Sql Data Timeline Compression

Every change in 2sxc is logged to a table called `DataTimeline`.
The purpose is to allow editors to roll back changes and restore entities to a previous state.

Websites with a lot of content editing can grow this table until it becomes the largest 2sxc table.

With the feature `SqlDataTimelineCompression` all history-data will be stored as ZIP compressed JSON.
This can easily save you hundreds, if not thousands of MB in DB storage.

## Activate the feature

Do this using the standard mechanisms to become a patron.
If you activate `Patron Infrastructure`, this feature is automatically enabled.

## Compress Previous Data

Older data is not modified by the change, but you can run the following SQL to compress it:

```sql
TODO: @STV
```

## Decompress Previous Data

If you were using this feature before and must opt-out, you can decompress the history data with the following SQL:

```sql
TODO @STV
```

---

## History

1. Added in v15

<!-- Shortlink: <https://r.2sxc.org/lightspeed> -->
