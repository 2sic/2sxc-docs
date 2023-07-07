---
uid: Basics.Query.Parameters.Index
---

# Parameters for the DataSources and the Query

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-params, .context-box-summary .lookup { visibility: visible; } </style>

DataSources are _parts_ of a query, and each performs certain functions. To do this, it needs parameters which it can get from many sources

1. The Configuration-UI of this specific Data
1. The general [Query-Parameters](xref:Basics.Query.Parameters.Index)
1. Various [Look-Up Sources (Tokens)](xref:Abyss.Parts.LookUp.Index)
1. Other DataSources which give the configuration value on an In-Stream


## Configuration UI of a Part = Settings

Each _part_ is a DataSource. If it's configurable you'll see a button appear when you mouse over it like this:

<img src="./assets/edit-settings-button.jpg" width="100%" class="full-width">

The dialog which appears will be different for each type of DataSource. In the C# code of the DataSource, these parameters are available as [Settings](xref:Abyss.Parts.LookUp.MyConfiguration).

## Configuration can be Values or Tokens

Almost all configuration values are strings, even if the DataSource expects a number. This allows you to write either `27` or `[QueryString:Id]` depending on your needs. Here's an example:

<img src="./assets/value-filter-with-token-params.jpg" width="100%" class="full-width">


Queries can be parameterized with token placeholders like

* `[QueryString:Id]`
* `[App:Settings:PageSize]`
* `[Params:Sort]`

To understand these placeholder tokens, best read up on [](xref:Abyss.Parts.LookUp.Tokens).
There you'll read about how tokens work, where they come from, how to use default/fallback values and more.

Aside from the normal LookUps like `QueryString`, `User` etc. there are two special LookUps which you should know about: **Params** and **In**.

## Global Query Parameters with Params-Token

Each Query can have a list of Parameters which all parts can access through the [Params LookUp](xref:Abyss.Parts.LookUp.Params). This has some great benefits:

1. A developer can always see what parameters affect the Query
1. If you use the same parameter in various places, you can be sure that it's always the same value.
1. These Parameters can also be set from another query calling it

This is what it looks like in VisualQuery:

<img src="~/pages/abyss/parts/look-up/assets/query-params-for-part.jpg" width="100%" class="full-width">

You will find a full explanation of this here: [](xref:Abyss.Parts.LookUp.Params).

> [!TIP]
> You _can_ write the tokens you need like `[QueryString:Id]` directly into any DataSource configuration.
>
> But we _highly recommend_ that you create a param for it and use that instead.
> It just makes it easier for people looking at your query to see what will affect its results.


## Get Configuration from Another DataSource

Often some stored data will be used to change what a DataSource does. Here's an example which will retrieve a **Category** either pre-defined or from the URL, then use that category to apply a filter:

<img src="./assets/query-part-with-in-params.jpg" width="100%" class="full-width">

Here's how the settings of that are configured:

<img src="./assets/query-part-with-in-params-edit.jpg" width="100%" class="full-width">

Read more about the [In LookUp](xref:Abyss.Parts.LookUp.In).

## Settings from the Current Module (CmsBlock)

Another common use case is when a normal Module-Content provides more settings. This uses the [CmsBlock DataSource](xref:ToSic.Sxc.DataSources.CmsBlock):

<img src="~/pages/abyss/parts/look-up/assets/sql-with-in-param.jpg" width="100%" class="full-width">

This shows how the In will look in the `Mod` stream to find the `PortalId`. Read more about this

* [In LookUp](xref:Abyss.Parts.LookUp.In)
* [](xref:ToSic.Sxc.DataSources.CmsBlock)


## Test your Query with Test Parameters

👉 [](xref:Basics.Query.Parameters.TestParameters)

---

## Read Also

* [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index)
* [Set Query Parameters in your Code](xref:NetCode.DataSources.Use.QueryParameters)
<!-- * APIs
    * [](xref:ToSic.Eav.DataSources.Queries.Query)
    * [](xref:ToSic.Eav.DataSource.Query.QueryDefinition)
    * [](xref:ToSic.Eav.DataSources.Queries.QueryPartDefinition) -->
* [Blog Posts about VisualQuery Designer](https://2sxc.org/en/blog/tag/visual-query-designer)


## History

1. Introduced in 2sxc 07.00
1. In added in 2sxc 07.00
1. Params added in 2sxc 10.22
