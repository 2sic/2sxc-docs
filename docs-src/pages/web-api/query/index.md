---
uid: WebApi.Query
---

# Query REST Web API

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-interact,
  .context-box-summary .process-headless { visibility: visible; }
</style>


Every [VisualQuery](xref:Basics.Query.VisualQuery.Index) you create has a REST URL. If you set the permissions, you can then read from the Query through REST. You can also pass query-parameters in the URL. Queries are Read APIs.

## Standard Query Calls

The Query endpoint can be accessed on

* `.../app/auto/query/[your-query-name]` when you're accessing a query of the current App (from a dnn-page with this module), as then 2sxc uses auto-detect
* `.../app/[app-folder]/query/[your-query-name]` using this endpoint from external (other module, other page, other website) as then auto-detect can't work. 

👉 read more about [different URLs depending on how you access it](xref:WebApi.Specs.UrlSchema)

## Read Only Certain Streams

A query may have many streams that your client may not necessarily need. To limit the results to only specific streams, add the stream name to the url, like this:

`.../app/auto/query/[your-query-name]/Default`

## HTTP GET only

Note that Query endpoints only support the http-verb GET.

## Naming Recommendations

As the query-name is used in the path it's best-practice to use query-names without spaces and special characters. You can get it to work even with such specials, but we recommend you don't do that for simplicity. 

## POST with GUID filter (WIP)

In 2sxc 11.20 we're experimenting with a post-access to the query which will allow you to also specify GUIDs to filter. This is not final yet. 

## Setting Security

Querying a query requires read-permissions on that query. 

<iframe src="https://azing.org/2sxc/r/34pAzAF2?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>



## History

1. Introduced Content-REST API in 2sxc 5.x
1. Queries introduced ca. 2sxc 6
2. Query-API enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)
1. Option to provide GUIDs to limit what is returned 2sxc 11.20 WIP