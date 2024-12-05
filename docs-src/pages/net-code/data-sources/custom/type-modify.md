---
uid: NetCode.DataSources.Custom.TypeModify
---

# DataSource API: Modify Data DataSources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource takes an `In` stream and _changes the properties_ of the items forwarded it's called a **Modify DataSource**.

You can find some simple examples in our DataSources like the [AttributeRename](xref:ToSic.Eav.DataSources.AttributeRename) or [AttributeFilter](xref:ToSic.Eav.DataSources.AttributeFilter).

> [!WARNING]
> Modify DataSources are the most complex and require much more understanding of the internals of the EAV.
> As such, they are not a good starting point for learning how to create DataSources.
>
> You will also need to use some internal APIs which are currently not documented.

## Recommendations

1. Inherit from the [CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource) base class
1. Use `ProvideOut` and give it a lambda or method which returns the modified data - usually as RawEntity objects
1. If applicable, also use the `options` on `ProvideOut(..., options: ...)` to customize how the data is converted to IEntities.
1. Mark your sources in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) as `DataSourceType.Modify`.


## Read Also

* no additional information as of now


## History

1. Introduced ca. EAV / 2sxc v6
