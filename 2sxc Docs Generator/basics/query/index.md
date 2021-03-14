---
uid: Basics.Query.Index
---

# Query and Visual Query

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query { visibility: visible; } </style>

2sxc Templates and Headless APIs can use **Queries** to access data. This is pretty amazing:

1. You create such queries using a **[Visual Query](xref:Basics.Query.VisualQuery.Index)** designer
1. Queries can then be assigned to a [View](xref:Basics.App.Views) so the template recieves this as the data to work with
1. Queries can also be used directly in the [Headless API](xref:Basics.Server.Headless.Index) if you configure the permissions for this
1. The Edit-UI can also use queries in dropdown fields (both string and entity)
1. You can also access queries using [App.Query["QueryName"]](xref:NetCode.DynamicCode.App)

In addition, there are also some built-in [System Queries](xref:Basics.Query.SystemQueries) built-in which will get system data for you like a list of Content-Types or Apps in the System.

This is super-powerfull. 

## Technical Implementation

When queries run they behave like [Data-Sources](xref:NetCode.DataSources.Index) while internally chaining various other Data-Sources to query the underlying data. 

## Building Queries in VisualQuery or Code

Queries can be built in two ways:

1. Directly in your code
1. Built from a configuration which is itself stored as a set of entities

Such queries are then used to give data to a view, to a JavaScript SPA (throug a simple REST API) or to your code, which can then perform other operations with the data. 



TODO: DOCUMENT MORE 😉

Learn more about...
