---
uid: Extensions.AppExtensions.By2sxc.Radmin.QueryConfiguration
---

# Query Configuration

Use query mode when table data should come from a query instead of directly from a content type.

<div gallery="gallery-radmin-query-configuration">
  <img src="./assets/table-toolbar.png">
  <img src="./assets/query-config.png">
</div>

Open table configuration and go to **Data to Manage**.

Set **Data Query Name** to the query you want to use.

If your query returns data on the default stream, this is usually enough.

If the query uses another stream or needs values from URL or context, enable **Show Advanced Query Options**.

Then set:

1. **Data Query - Stream Name** when needed.
2. **Data Query - Parameters** when your query expects parameters.

Keep advanced options empty unless you need them, so the setup stays easy to maintain.

## Next Step

Continue with [](xref:Extensions.AppExtensions.By2sxc.Radmin.LinkColumnToView){title="Link Column to View"}.
