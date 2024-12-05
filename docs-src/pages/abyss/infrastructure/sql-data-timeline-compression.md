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
-- Will Compress everything and remove the data from the json column
UPDATE [dbo].[ToSIC_EAV_DataTimeline] SET [CJson] = COMPRESS(CAST([Json] AS VARCHAR(MAX))), [Json] = NULL WHERE [Json] IS NOT NULL
```

Alternative (for analysis) - should result in 60-80% reduction

```sql
-- Will compress, but leave the old data there
UPDATE [dbo].[ToSIC_EAV_DataTimeline] SET [CJson] = COMPRESS(CAST([Json] AS VARCHAR(MAX))) WHERE [Json] IS NOT NULL

-- Compare sizes
Select Sum( DATALENGTH([CJSON])) as CompressedSize, Sum(DATALENGTH([Json])) as JsonSize
From [dbo].[ToSIC_EAV_DataTimeline]
```

## Decompress Previous Data

If you were using this feature before and must opt-out, you can decompress the history data with the following SQL:

```sql
UPDATE [dbo].[ToSIC_EAV_DataTimeline] SET [Json] = CAST(CAST(DECOMPRESS([CJson]) AS VARCHAR(MAX)) AS NVARCHAR(MAX)), [CJson] = NULL WHERE [CJson] IS NOT NULL
```

## Query the Json From Compressed

If you need to see the json in SQL for debugging purposes, you can start with the following sample.
This is just a sample, you'll probably want to add a `WHERE` clause to limit the results:

```sql
SELECT TOP (1000) *, CAST(CAST(DECOMPRESS([CJson]) AS VARCHAR(MAX)) AS NVARCHAR(MAX)) as Decompressed
  FROM [dbo].[ToSIC_EAV_DataTimeline]
  order by id desc
```

---

## History

1. Added in v15

<!-- Shortlink: <https://go.2sxc.org/todo> -->
