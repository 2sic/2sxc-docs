---
uid: NetCode.DataSources.DataSource
---

# Data Sources (IDataSource)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .datasource, .context-box-summary .query-datasource { visibility: visible; } </style>

**Root DataSources** are [](xref:ToSic.Eav.DataSource.IDataSource) objects which deliver one or many [DataStreams](xref:ToSic.Eav.DataSource.IDataStream), which contain a bunch of content-items.

## Two Core Types

### 1. Root DataSources

This kind of DataSource generates or retrieves data from somewhere external like SQL, CSV, REST or the EAV-cache. This is a Root `IDataSource`.

An example is the [Csv DataSource](xref:ToSic.Eav.DataSources.Csv).
Note that even this DataSource can have use Data on the `In`-Stream.
But in this case the `In` provides configuration data, not raw data to process.

### 2. Processing DataSources

**Processing DataSources**  receive data from _another_ DataSource, then process/filter this and provide the result for further use, in which case it's both an `IDataSource` as well as an `IDataTarget`

An example of this is the [Shuffle DataSource](xref:ToSic.Eav.DataSources.Shuffle).
It receives items on the `In["Default"]`, randomly reorganizes them and provides them on the `Out["Default]`.

## DataSource `Out` can be another DataSources `In`

Datasources can be **chained** so that processing steps happen in a sequence. Here's a very simple example:

1. The root DataSource would be the [App.Data](xref:NetCode.DynamicCode.Objects.App.Data) which has all the data in the App
1. It can then be connected to a [EntityTypeFilter DataSource](xref:ToSic.Eav.DataSources.EntityTypeFilter) which will limit the data to all `BlogPost` items
1. We can then connect it to a [Shuffle DataSource](xref:ToSic.Eav.DataSources.Shuffle) to keep 3 random posts

This can be done both in code as well as in a prepared [VisualQuery](xref:Basics.Query.VisualQuery.Index).

## Queries: Reusable DataSource Wirings

As described above, DataSources can be joined together and the configuration can be saved as a [Query](xref:NetCode.DataSources.Query.Index).
Here's another example:

1. a Root [`Csv DataSource`](xref:ToSic.Eav.DataSources.Csv) can read a CSV-file and provide the data as a stream on Entities on `csvDs["Default"]`...
2. ...and pipe the result it to a [`CacheAllStreams`](xref:ToSic.Eav.DataSources.Caching.CacheAllStreams) which caches the data for 60 minutes  
    _this would ensure that the slow reading process only happens every hour_
3. ...then pipe it to a [`ValueFilter`](xref:ToSic.Eav.DataSources.ValueFilter), which only shows the items where the _Country_ matches the Url-parameters _country_
4. ...then pipe it to a [`ValueSort`](xref:ToSic.Eav.DataSources.ValueSort), ordering it by _LastName_ and then _FirstName_
5. ...then pipe it to _another_ [`CacheAllStreams`](xref:ToSic.Eav.DataSources.Caching.CacheAllStreams) so that this common filter/sort combination will be kept for 5 minutes

The result can be used in a Template or streamed as JSON to a JavaScript SPA using the [Headless API](xref:WebApi.Headless.Index).

## Understanding Data-Flow between DataSource Objects

Each DataSource has a list of out-streams available on the `.Out["StreamName"]` property, but usually access directly just with the `DataSourceName["StreamName"]`. This is what also happens when you use the [Data](xref:NetCode.DynamicCode.Data) object and write `foreach(var item in Data["Default"])`.

Aside from consuming data in your your template, most data-sources will simply offer the Out-Stream to other DataSources for further processing. Technically it's mapped like this:

* `Cache.Out["Default"]` > `ContentTypeFilter.In["Default"]`
* ... then some magic happens inside the `ContentTypeFilter`
* ... then the `ContentTypeFilter.Out["Default"]` has the resulting items, which can again be used as an In on another DataSource, or simply used in your template

Most DataSources will only have one In-stream and one Out-stream, but this is very variable depending on your need.

## How to use

 👉 [](xref:NetCode.DataSources.Use.Guide)

## Create your own Custom DataSource

👉 [](xref:NetCode.DataSources.Custom.Index)

## Configuration of Each DataSource

The configuration uses a sophisticated token system to provide all necessary information. It is explained [here](xref:NetCode.DataSources.Custom.Configuration).





## Read also

* about [Data Streams](xref:ToSic.Eav.DataSource.IDataStream)
* [Dynamic Code CreateSource(...)](xref:NetCode.DynamicCode.CreateSource)
* [.net API](xref:ToSic.Sxc.Code.IDynamicCode.CreateSource*)
* [Demo-App showing some coding of DataSources][app-ds-code]
* [Blog about creating your own data-source](xref:Blog.CustomDataSource)


## History

1. Introduced in 2sxc 04.00


[app-ds-code]: http://2sxc.org/en/apps/app/tutorial-use-a-custom-developed-datasource
