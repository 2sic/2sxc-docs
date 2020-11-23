---
uid: WebApi.Query
---

# 2sxc Query REST Web API for Read Operations

Every Visual Query you create has a REST URL. If you set the permissions, you can then read from the Query through REST. You can also pass query-parameters in the URL.


The Query endpoint can be accessed on

* `.../app/auto/query/[your-query-name]` when you're accessing a query of the current App (from a dnn-page with this module), as then 2sxc uses auto-detect
* `.../app/[app-folder]/query/[your-query-name]` using this endpoint from external (other module, other page, other website) as then auto-detect can't work. 

Note that Query endpoints only support the http-verb GET.

## Setting Security

1. querying a query requires read-permissions on that query

<iframe src="https://azing.org/2sxc/r/34pAzAF2?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>


TODO: CONTINUE HERE


## History TODO

1. Introduced Content-REST API in 2sxc 5.x
2. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)
