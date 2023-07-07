---
uid: Basics.Query.Parameters.TestParameters
---

# Query Development - Test Parameters

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query-params, .context-box-summary .lookup { visibility: visible; } </style>

This is how to test your Query with **Test Parameters**:

The [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index) also allows you to set test-values for testing the query. The test-values should define all the full tokens to replace. Example:

```
[QueryString:Id]=27
[QueryString:SortOrder]=Desc
[Params:FilterLastName]=Mettler
[Params:FilterNameSort]=[QueryString:SortOrder||Asc]
```

Here's an example:

<img src="~/pages/abyss/parts/look-up/assets/query-params-for-part.jpg" width="100%" class="full-width">

You will find a full explanation of this here: [](xref:Abyss.Parts.LookUp.Params).

> [!TIP]
> As you can see in the example, even test params can contain more tokens if you need them. 
> In the above example, `Params:FilterNameSort` would resolve to `Desc` 
> because it will first check the `QueryString:SortOrder` which also has a test-value of `Desc`.


## Read also

* [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index)
<!-- * APIs
    * [](xref:ToSic.Eav.DataSources.Queries.Query)
    * [](xref:ToSic.Eav.DataSource.Query.QueryDefinition)
    * [](xref:ToSic.Eav.DataSources.Queries.QueryPartDefinition) -->
* [Blog Posts about VisualQuery Designer](https://2sxc.org/en/blog/tag/visual-query-designer)

---

## History

1. Introduced in 2sxc 07.00
1. [Query Params](xref:Abyss.Parts.LookUp.Params) added in 2sxc 10.22

