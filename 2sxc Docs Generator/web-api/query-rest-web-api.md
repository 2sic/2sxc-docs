---
uid: WebApi.Query
---

# Query REST Web API

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-interact,
  .context-box-summary .process-headless { visibility: visible; }
</style>


Every [VisualQuery](xref:Basics.Query.VisualQuery.Index) you create has a REST URL. If you set the permissions, you can then read from the Query through REST. You can also pass query-parameters in the URL. Queries are Read APIs.


The Query endpoint can be accessed on

* `.../app/auto/query/[your-query-name]` when you're accessing a query of the current App (from a dnn-page with this module), as then 2sxc uses auto-detect
* `.../app/[app-folder]/query/[your-query-name]` using this endpoint from external (other module, other page, other website) as then auto-detect can't work. 


## HTTP GET only

Note that Query endpoints only support the http-verb GET.

## Naming Recommendations

As the query-name is used in the path it's best-practice to use query-names without spaces and special characters. You can get it to work even with such specials, but we recommend you don't do that for simplicity. 

## Setting Security

1. querying a query requires read-permissions on that query

<iframe src="https://azing.org/2sxc/r/34pAzAF2?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>



## History

1. Introduced Content-REST API in 2sxc 5.x
1. Queries introduced ca. 2sxc 6
2. Query-API enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)
