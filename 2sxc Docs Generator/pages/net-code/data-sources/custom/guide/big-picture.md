---
uid: NetCode.DataSources.Custom.Guide.BigPicture
---

# Guide DataSources - Big Picture

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

This should give you the big picture as to how [DataSources](xref:NetCode.DataSources.DataSource) work and interconnect.


## Data and Streams in DataSources

1. Every data-item is an `IEntity` containing data about a person, product, file-information etc.

1. A list of these items is a `IEnumerable<IEntity>` which contains zero, one or many items

1. A **[Stream](xref:ToSic.Eav.DataSource.IDataStream)** is an object which has list of items and a name

1. A correctly built Stream will **[Provide](xref:NetCode.DataSources.Custom.ProvideOut)** this list, but only run the code if it's requested

1. Each DataSource has one or more named [`Out`](xref:NetCode.DataSources.Custom.StreamsOut) streams (the default is `Default`, others can have any name you want)

1. Very advanced DataSources can have a dynamic list of `Out` Streams - like the App, which has a stream for each ContentType in the App

1. Each DataSource _can_ have one or more named [`In`](xref:NetCode.DataSources.Custom.StreamsIn) streams coming from other DataSources (usually the first one is called `Default`)


## Building Data / Entities

1. DataSources use [`ProvideOut`](xref:NetCode.DataSources.Custom.ProvideOut) to determine what Streams are provided

1. The parameter of `ProvideOut` is a function which returns a list of items so it's either `ProvideOut(FunctionName)` or `ProvideOut(() => { ... })`

1. The code of each `ProvideOut` is _only run_ if the Stream is requested

1. Different [Base Classes](xref:NetCode.DataSources.Custom.BaseClasses) have different `ProvideOut` signatures accepting different kinds of data
    1. The most basic base class only accepts functions returning `IEnumerable<IEntity>`
    1. Easier base classes accept any of `IEnumerable<IEntity>`, `IEnumerable<RawEntity>`, `IEnumerable<AnonymousType>` or even a single item (not an IEnumerable)

1. Internally the data will always be converted to an `IEnumerable<IEntity>` so that it can be used by other DataSources

1. When using the easier base classes, the conversion is done automatically
    1. You can also configure how the conversion works using `options: new DataFactoryOptions(...)` (see [DataFactoryOptions](xref:ToSic.Eav.Data.Build.DataFactoryOptions))
    1. In very advanced cases you can also convert it to `IEntity` yourself, but this is not documented

1. Generated IEntities can also have **Relationships** - like folders to files and visa versa  
    This is not yet documented, but if you need this, check out the [AppFiles DataSource](xref:ToSic.Sxc.DataSources.AppFiles)


## Receiving Data from In for further processing

If your DataSource performs filtering or similar actions on existing data, then this data comes in on the `In` streams. In such scenarios, you would simply iterate over the `In[streamname].List` and provide the result in your out-stream again. You can find many examples in the EAV DataSources code.

TODO:

## Connections / Links

1. When DataSources are attached to each other, they are connected by one or more **[Links](xref:ToSic.Eav.DataSource.IDataSourceLink)**

1. Only the _downstream_ DataSource (the one with the `In`) knows about the connection, the _upstream_ DataSource (the one with the `Out`) doesn't know about it

1. Data from connections are only accessed when necessary

1. The links are also important for caching, since often caching depends on Upstream refreshes

Links use an [immutable](xref:NetCode.Conventions.Immutable) Fluid API, but this is not yet documented TODO:


## Configuration of a DataSource

1. [DataSource](xref:NetCode.DataSources.DataSource) classes can have many properties like `int AmountToGet`, `bool IncludeDeleted` etc. which change their behavior

1. There is a [Configuration System](xref:NetCode.DataSources.Custom.Configuration) which automates how such configurations are passed to the DataSource

1. To connect the _Properties_ with the _Configuration System_ you need the [`ConfigurationAttribute`](xref:NetCode.DataSources.Custom.ConfigurationAttribute) and `Configuration.GetThis()` - see [Configurable DataSource](xref:NetCode.DataSources.Custom.ConfigurableDataSource)

1. Each DataSource has an own [`ConfigurationProvider`](xref:ToSic.Eav.DataSource.IDataSourceConfiguration), which gives the DataSource information about the environment (like Portal or Tab information), App-Settings and more

1. The reason why each one has an _own_ ConfigurationProvider is because each DataSource can have own configurations

1. Each DataSource can have custom **Configuration** provided by code or entered by the user in VisualQuery

1. Configurations are always string based since they use [**Tokens**](xref:Abyss.Parts.LookUp.Tokens). Keep this in mind when you need `int` or `bool`, because conversions can fail, which is why `Configuration.GetThis(fallback)` has a fallback parameter - see [`ConfigurationProvider`](xref:ToSic.Eav.DataSource.IDataSourceConfiguration)

1. Tokens always use [LookUp Sources](xref:Abyss.Parts.LookUp.Index) so you should read about them

## Configuration in VisualQuery

1. When you use a DataSource in VisualQuery, you can configure it by clicking the cogwheel

1. This is only available if the DataSource has a [VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute) mentioning the `ConfigurationType` or if it's a [Dynamic DataSource](xref:NetCode.DataSources.Custom.Dynamic) which automatically can find the configuration ContentType

1. If the user edited data, internally it's stored as an IEntity object, which is then passed to the DataSource as a configuration

1. Usually the fields in the UI are all string based, even for numbers and bool, because the user may want to use Tokens


## Caching

1. DataSources also have cache-identity mechanism, to inform any up-stream cache what parameters actually caused this result, so that the data could be cached if needed

1. Configurations are taken into account when caching, so that the cache for `AmountToGet=5` is different from `AmountToGet=10`

---

## History

This document mentions too many different aspects of the system, so no detailed history is given here.
