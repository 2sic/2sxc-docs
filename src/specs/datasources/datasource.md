---
uid: Specs.DataSources.DataSource
---

# DataSources

DataSources are [](xref:ToSic.Eav.DataSources.IDataSource) objects which deliver one or many [DataStreams](xref:ToSic.Eav.DataSources.IDataStream), which contain a bunch of content-items. 
There are many data-sources, and most of them will... 

* ...either get data from somewhere external like SQL, CSV, REST or the EAV-cache and provide this for further use - then it's a pure `IDataSource`
* ...or receive data from _another_ DataSource, then process/filter this and provide the result for further use, in which case it's both an `IDataSource` as well as an `IDataTarget` 

So DataSources can be joined together into a [Query](xref:Specs.DataSources.Query) to do amazing things, like

1. a `CsvDataSource` can read a CSV-file and provide the data as a stream on Entities on `csvDs["Default"]`...
2. ...and pipe the result it to a `CacheDataSource` which caches the data for x-minutes
3. ...then pipe it to a `ValueFilterDataSource`, which only shows the items where the _Country_ matches the Url-parameters _country_
4. ...then pipe it to a ValueSortDataSource, ordering it by _LastName_ and then _FirstName_
5. ...then pipe it to _another_ `CacheDataSource` so that this common filter/sort combination will be kept for 5 minutes
6. and then the result can be used in a Template or streamed as JSON to a JavaScript SPA.

## Understanding Data-Flow between DataSource Objects
Each DataSource has a list of out-streams available on the `.Out["StreamName"]` property, but usually access directly just with the `DataSourceName["StreamName"]`. This is what also happens when you use the [Data](xref:HowTo.DynamicCode.Data) object and write `foreach(var item in Data["Default"])`. 

Aside from consuming data in your your template, most data-sources will simply offer the Out-Stream to other DataSources for further processing. Technically it's mapped like this:

* `Cache.Out["Default"]` > `ContentTypeFilter.In["Default"]`
* ... then some magic happens inside the `ContentTypeFilter`
* ... then the `ContentTypeFilter.Out["Default"]` has the resulting items, which can again be used as an In on another DataSource, or simply used in your template

Most DataSources will only have one In-stream and one Out-stream, but this is very variable depending on your need. 

## Creating your own Custom DataSource
* [short instruction to get started](xref:Specs.DataSources.Custom)
* [here's docs about the relevant API](xref:Specs.DataSources.Api)
* [understanding configuration injection](xref:Specs.DataSources.Configuration)

## Understanding Configuration of Each DataSource Object
The configuration uses a sophisticated token system to provide all necessary information. It is explained [here](xref:Specs.DataSources.Configuration).


## Common Use Cases of DataSource in C# Code 

You will usually use DataSource objects in these common cases:

1. when templating in Razor, the [Data](xref:HowTo.DynamicCode.Data) object is a DataSource, usually having a `Default` stream (`Data["Default"]`) and sometimes further streams like `Data["ListContent"]` or `Data["Categories"]` etc.
1. when templating, the [App.Data](xref:HowTo.DynamicCode.App) is also a DataSource providing a stream for each content-type in this app, like `App.Data["BlogPost"]` or `App.Data["Tag"]`
1. every query is technically a DataSource, and in the query you define which DataStreams it has - if ever you use it in code, you'll see that `App.Query["SortedTags"]` would be a DataSource and typically the `Default` stream would contain all these tags.
1. a query is always a chain of DataSource doing one operation and passing it on to the next DataSource. 

## How to use

In your Razor-templates you'll usually work with these three sources:
1. [Data](xref:HowTo.DynamicCode.Data)
1. [App.Data](xref:HowTo.DynamicCode.App)
1. [App.Query[...]](xref:HowTo.DynamicCode.App)

Please read more about these in links. 

## Creating DataSource Objects in C#/Razor Code
Sometimes you want to have full control over what a DataSource does or what parameters it's using. This is easy: 

```c#
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<ToSic.Eav.DataSources.EntityTypeFilter>();
allAuthors.TypeName = "Authors";

// access the data and automatically apply the filter/config
var authors = allAuthors["Default"]; 
``` 

##  Creating a Query in Code by Piping / Chaining Data sources
What the visual-designer does is configure how DataSources are attached, mapping their in/out streams and adding parameters. 

You can also do this in code, but it's fairly advanced. You would usually want to do this, if you want to use a filter or something, but need to provide parameters which aren't available in the Visual Query Designer. Here's a simple example:

```c#
// A source which can filter by Content-Type (EntityType)
var allAuthors = CreateSource<EntityTypeFilter>();
allAuthors.TypeName = "Author";

// Sort by FullName
var sortedAuthors = CreateSource<ValueSort>(allAuthors);
sortedAuthors.Attributes = "FullName";

// Sort by Fullname descending
var sortedAuthorsDesc = CreateSource<ValueSort>(allAuthors);
sortedAuthorsDesc.Attributes = "FullName";
sortedAuthorsDesc.Directions = "desc";

// Sort by 2 fields
var sortedAuthorsMult = CreateSource<ValueSort>(allAuthors);
sortedAuthorsMult.Attributes = "Website,FullName";
sortedAuthorsMult.Directions = "asc, desc";

// sort by internal EntityId
var sortedAuthorsById = CreateSource<ValueSort>(allAuthors);
sortedAuthorsById.Attributes = "EntityId";
```
Because the first `allAuthors` didn't specify an up-stream in the `()` empty brackes, it automatically gets attached to the App-Cache with all the data of the current app. So `var allAuthors = CreateSource<EntityTypeFilter>();` will initially have all content-items at it's disposal. 

The most important thing to notice is that each additional data-source uses the first `allAuthors` DataSource as the default **upstream** DataSource. So when these sort/filter or do something, they will only receive the data already filtered by the allAuthors.


## Developing Your Own DataSource
Maybe you want to create an XML DataSource or a DNN-Users DataSource. This is easy to do. 

[Best read the blog post about this](xref:Blog.CustomDataSource)


## Read also

* about [Data Streams](xref:ToSic.Eav.DataSources.IDataStream)
* [Demo-App showing some coding of DataSources][app-ds-code]
* [Blog about creating your own data-source](xref:Blog.CustomDataSource)


## History

1. Introduced in 2sxc 04.00


[app-ds-code]: http://2sxc.org/en/apps/app/tutorial-use-a-custom-developed-datasource
