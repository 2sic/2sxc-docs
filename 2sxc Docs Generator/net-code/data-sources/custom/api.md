---
uid: NetCode.DataSources.Custom.Api
---

# DataSource API

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

DataSources are a magic, generic system which can generate new data-items or filter / modify other data. This section explains how they work and the API you need to create your own. 

## Basics

[DataSources](xref:NetCode.DataSources.DataSource) have a few important concepts you must first understand:

1. **Data going in and out of DataSources**
  1. Each data-item is an `IEntity` containing data about a person, product, file-information etc.
  1. A list of items is is a `List<IEntity>` which contains zero, one or many items
  1. A **[Stream](xref:ToSic.Eav.DataSources.IDataStream)** is an object which has list of items and a name
  1. A correctly built Stream will **[Provide](xref:NetCode.DataSources.Custom.Provide)** this list, but only run the code if it's requested
  1. Each DataSource has one or more named `Out` streams
  1. Each DataSource _can_ have one or more named `In` streams coming from other DataSources
1. **Configuration of a DataSource**
  1. Each DataSource has a `ConfigurationProvider`, which gives the DataSource information about the environment (like Portal or Tab information), App-Settings and more
  1. Each [DataSource](xref:NetCode.DataSources.DataSource) can have custom **Settings**, which the user entered in a dialog. Internally this is also an IEntity object
1. **Caching**  
  DataSources also have cache-identity mechanism, to inform any up-stream cache what parameters actually caused this result, so that the data could be cached if needed

## Providing Data

To offer data on the `Out` you will usually use the `Provide` method. If you're generating new items, you'll usually use the `Build.Entity(...)` method. Docs for these: 

* [](xref:NetCode.DataSources.Custom.Provide)
* [](xref:NetCode.DataSources.Custom.BuildEntity)
* [](xref:NetCode.DataSources.Custom.StreamsOut)
* [](xref:NetCode.DataSources.Custom.StreamsIn)

## Receiving Data from In for further processing

if your DataSource performs filtering or similar actions on existing data, then this data comes in on the `In` streams. In such scenarios, you would simply iterate over the `In[streamname].List` and provide the result in your out-stream again. You can find many examples in the EAV DataSources code. 

## Get Configuration

A DataSource gets the configuration from a configuration provider. To better understand this, you should read:

* [](xref:Basics.LookUp.Index)
* [about tokens](xref:Basics.LookUp.Tokens) 
* [](xref:NetCode.DataSources.Custom.Configuration)
* [ConfigMask(...)](xref:NetCode.DataSources.Custom.ConfigMask).

## Configure the UI

There is a special attribute called `VisualQuery` to tell the UI how to show your DataSource and provide help etc. See [](xref:NetCode.DataSources.Custom.VisualQueryAttribute).

## History

1. Introduced in 2sxc 4 or 5
2. enhanced / simplified in 2sxc 9.13

