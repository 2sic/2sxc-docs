---
uid: NetCode.DataSources.Custom.BaseClasses
---

# Base Classes for Custom DataSources 🆕 v16

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

This is an overview as to the base classes you can inherit from when creating a custom DataSource.

## DataSource16

Dynamic DataSources always inherit from [Custom.DataSource.DataSource16](xref:Custom.DataSource.DataSource16).

This is the easiest base class to use and the easiest to learn.
You can see it live on [](xref:Tut.DynamicDataSources).

It does a few things automatically for you, such as:

1. It automatically registers the DataSource in the VisualQuery with some very good defaults
1. It provides special `ProvideOut` methods which allow you to give it various kinds of data, such as
    1. a single anonymous object or a list thereof
    1. a single RawEntity or a list thereof
    1. a single IEntity or a list thereof
1. In most cases it also automatically parses configurations the way you expect it to.

Internally the DataSource16 uses the [CustomDataSource](#customdatasource).

## CustomDataSource

The [CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource) is the base class for most custom _Compiled_ DataSources.

It has the same benefits as the [DataSource16](#datasource16) except for the automatic registration in the VisualQuery.

## CustomDataSourceAdvanced

The `CustomDataSourceAdvanced` is a more bare-bones base class to use in advanced use cases.
It's used a lot internally, but we don't recommend using it.

## DataSourceBase

The [DataSourceBase](xref:ToSic.Eav.DataSource.DataSourceBase) is the base class for all DataSources.
It's documented because you should know about the API, but we don't recommend that you inherit from it.

---

## History

1. Introduced a long time ago
1. Completely reorganized and renamed in 2sxc 15/16
