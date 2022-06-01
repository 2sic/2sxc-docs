---
uid: Basics.Prepare.Index
---

# Prepare Data for Templates and WebApi

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .prepare-all { visibility: visible; } </style>

A common Step in the [data-flow](xref:Basics.Server.DataFlow) is the **Data Preparation** before the [View](xref:Basics.App.Views.Index) or [Custom WebApi](xref:NetCode.WebApi.Index) work with it. 
This is fully automated and has three common scenarios:

1. **[No Prepare](#no-preparation)** where no Data is used or at least no _Instance Data_ 
1. **[Default](#default-preparation-instance-data)** where content added to a Module by an editor is retrieved and prepared
1. **[Query](#query-preparation)** where a custom [VisualQuery](xref:Basics.Query.VisualQuery.Index) is configured to get the data

_Note: A special case where data is prepared is when it's used for indexing in the full-text search. This is documented in [Search](xref:Basics.Cms.Search.Index)._

## No Preparation

Two cases need no preparation at all

1. Templates / code which don't use any data
1. Templates / code which use only general App data or Queries but not instance data

In these cases the View is configured to not use data and the template or WebApi will either not use data or will only access it through the [App.Data](xref:NetCode.DynamicCode.Objects.App.Data) which has all data at it's disposal. 

## Default Preparation: Instance Data

By default all **Module Instances** can have data which the editor has added manually in the CMS UI. This corresponds to the normal [Content Editing](xref:Basics.Content.Index) scenario. Internally it uses a [Query](xref:Basics.Query.Index) which looks like this:

<img src="./assets/default-prepare.jpg" width="100%" class="full-width">

This does the following (starting from the bottom):

1. The `ICache` is an [IAppRoot](xref:ToSic.Eav.DataSources.IAppRoot) [DataSource](xref:NetCode.DataSources.Index) which hass all data of this App
1. The [PublishingFilter](xref:ToSic.Eav.DataSources.PublishingFilter) will then ensure that editors can see draft-data, and public users can only see published data
1. The `ModuleDataSource` is a [CmsBlock](xref:ToSic.Sxc.DataSources.CmsBlock) which will select all relevant data of this Module instance
1. It then provides the retrieved data on a Stream `Default` (all the items) and `Header` (previously `ListContent`)

The Template or WebApi running for this Module Instance will then have this data

1. `Content` or often `@Content` has the first item on the `Default` stream
1. `Header` or ofter `@Header` has the first and only item on the `ListContent` stream
1. `Data` will contain all the streams as configured in the above query, usually you will use `Data["Default"]` to loop through lists of all the content items

Note that the `ModuleDataSource` also does some more magic like

1. Retrieve the Demo-Item as configured in the View, if no data exists (or a public user is looking at the page, and the data is still draft)
1. Add more information like `IsDemoItem` to each piece of Information

**[_The_ Content App](xref:Basics.App.ContentApp.Index)** only has this kind of preparation. Customs Apps can also use this, but it can also be configured to use custom Queries (see below).


## Query Preparation

If your View is configured to use a [Query](xref:Basics.Query.Index) it will instead run this query. 

> [!NOTE]
> Note that your query can also extend the standard Query as mentioned above and provide _both_ the normal edited content and add more streams as needed.

> [!TIP]
> A common use case for Queries extending the default query is scenarios where the edited content provides parameters for the Query. 
> 
> For example, the Header of the [News App](xref:App.News) could contain a property `Category` which the editor can choose. The rest of the Query could then use this category to filter
> what items are retrieved. 


## Note about Accessing all App Data in your Code

Your template / WebAPI can also always access all the data in the App using [App.Data](xref:NetCode.DynamicCode.Objects.App.Data).


## You may Also want to Learn about

1. [Create queries using VisualQuery](xref:Basics.Query.Index)
1. [Prepare data in code](xref:NetCode.Razor.CustomizeData)
1. [Prepare data for the full-text search index of the platform](xref:NetCode.Razor.CustomizeSearch)
1. [Headless WebAPI](xref:WebApi.Headless.Index)
1. [DataSources](xref:NetCode.DataSources.Index)


---

Read more

* [Queries](xref:Basics.Query.Index)
* Content App
