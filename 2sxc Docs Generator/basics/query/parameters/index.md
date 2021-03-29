---
uid: Basics.Query.Parameters.Index
---

# Query Parameters / Tokens

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-params, .context-box-summary .lookup { visibility: visible; } </style>

Queries can be parameterized with token placeholders like 

* `[QueryString:Id]`
* `[App:Settings:PageSize]` 
* `[Params:Sort]` 

To understand these placeholder tokens, best read up on [](xref:Basics.LookUp.Tokens). 
There you'll read about how tokens work, where they come from, how to use default/fallback values and more. 

## Example

In [VisualQuery](xref:Basics.Query.VisualQuery.Index) you would specify a Token like this:

<img src="./assets/paging-page-size-app-settings.png" width="100%" class="full-width">

This tells the Query to

1. Get the Page-Size from the `PageSize` value in the App-Settings
1. Get the page number from the URL parameter `page`

## Available Tokens

The tokens you can use are basically all the standard [Token Sources](xref:Basics.LookUp.Sources) plus the ones listed here:

Queries have some additional Sources:

1. Special LookUp: [[Params:...]](xref:Basics.LookUp.Params) (new in v10.22)
1. Special LookUp: [[In:...]](xref:Basics.LookUp.In)
1. Settings
1. Option to override the values during testing with `TestParameters`


## Test your Query with Test Parameters 

👉 [](xref:Basics.Query.Parameters.TestParameters)


## Read also

* [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index)
* [Set Query Parameters in your Code](xref:NetCode.DataSources.Use.QueryParameters)
* APIs
    * [](xref:ToSic.Eav.DataSources.Queries.Query)
    * [](xref:ToSic.Eav.DataSources.Queries.QueryDefinition)
    * [](xref:ToSic.Eav.DataSources.Queries.QueryPartDefinition)
* [Blog Posts about Visual Query Designer](https://2sxc.org/en/blog/tag/visual-query-designer)

---

## History

1. Introduced in 2sxc 07.00
1. In added in 2sxc 07.00
1. Params added in 2sxc 10.22

