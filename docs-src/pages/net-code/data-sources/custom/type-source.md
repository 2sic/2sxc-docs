---
uid: NetCode.DataSources.Custom.TypeSource
---

# DataSource API: Root DataSources which Introduce Data

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

If your DataSource creates new items - like from memory or elsewhere - it's called a **Root DataSource**.

Examples would be DataSources which...

* ...get data from a WebApi
* ...list files in a Folder
* ...reads image file properties

## Recommendations

1. Inherit from the [CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource) base class
1. Use `ProvideOut` and give it a lambda or method which returns the data either as...
    1. Anonymous objects
    1. RawEntity objects
1. If applicable, also use the `options` on `ProvideOut(..., options: ...)` to customize how the data is converted to IEntities.
1. Mark your sources in the [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) as `DataSourceType.Source`

## Read Also

* Check out the [](xref:Tut.DynamicDataSources) for some easy examples
* Check out some DataSources in 2sxc which do this, such as the [Sites DataSource](xref:ToSic.Sxc.DataSources.Sites)

## History

1. Introduced ca. EAV / 2sxc v6
