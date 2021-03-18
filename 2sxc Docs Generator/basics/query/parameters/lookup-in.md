---
uid: Basics.Query.Parameters.In
---

# `In` LookUp in Query Parameters

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

Data Sources in a query can retrieve values from another data-source which is a source. Use the `[In:source-name:attribute-name]` syntax. 
So if you have a Value DataSource which has the `Default`-in with the data to filter, and a `Module`-in comes from the Module Settings, 
you would write `[In:Module:Category]` to filter by the the category as selected in the module settings. 

---

## Read also

* [VisualQuery Parameters](xref:Basics.Query.Parameters.Index)

## History

1. In added in 2sxc 07.00

