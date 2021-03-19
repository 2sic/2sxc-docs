---
uid: Basics.LookUp.Params
---

# `Params` LookUp in Query Parameters

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup-sources { visibility: visible; } </style>

2sxc 10.22 introduced a new parameter source called `Params`. With this you can write things like `[Params:Sort]`. 

The query now has a special LookUp for the source `Params`. This should help you make nicer, more flexible queries and also allow you to set these query parameters from C# code. 

> [!TIP]
> You can set these params in the Query configuration dialog
> TODO: PIC

> [!NOTE]
> Your queries can also use params that you didn't configure - but they will return nothing unless you would set them in your C# code before you run the query.

> [!TIP]
> We recommend to always use the Params for everything as it's simpler to see all the parameters your query depends on.  
> So if you have a [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter) expecting a value from the url, we recommend that you  
> Create a param `FilterLastName=[QueryString:LastName]`  
> In your data-source configuration, use `[Params:FilterLastName]`

---

## Read also

* [VisualQuery Parameters](xref:Basics.Query.Parameters.Index)

## History

1. Params added in 2sxc 10.22

