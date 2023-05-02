---
uid: NetCode.DataSources.Custom.DataBuilder
---

[!include[](_obsolete-docs.md)]

> [!IMPORTANT]
> Before v15, the DataBuilder was used in custom DataSources to create entities.
> In v15+ you should use the [IDataFactory](xref:ToSic.Eav.Services.IDataSourcesService) instead.
>
> The following docs are out of date and will be upgraded soon.

# DataSource API: DataBuilder.Entity(...)

Many data sources generate new content items - either because they deliver some kind of information, or because they convert data from another source into standardized entities. This is where `DataBuilder.Entity(...)` helps.

Just fyi: Here are the [API docs](xref:ToSic.Eav.Data.IDataBuilder.Entity*). There is also an `Entities` for multiple Entities.

## How the DataBuilder is added

The DataBuilder is a [IDataBuilder](xref:ToSic.Eav.Data.IDataBuilder) which is automatically given as a property `DataBuilder`. The DataSource-Factory creates it.

## How to use DataBuilder.Entity(...)

Here's a simple example of the tutorial [DateTime DataSource](https://github.com/2sic/2sxc-eav-tutorial-custom-datasource/):

```cs
const string DateFieldName = "Date";
var date = DateTime.Now;
var values = new Dictionary<string, object>
{
    {DateFieldName, date},
    {"Weekday", date.DayOfWeek},
    {"DayOfWeek", (int) date.DayOfWeek}
};

// Construct the IEntity and return as ImmutableArray
var entity = DataBuilder.Entity(values, titleField: DateFieldName);
return new [] {entity}.ToImmutableArray();

```

This example shows how an entity-object is build using `DataBuilder.Entity(values)` on the `ToSic.Eav.Data` namespace.

## Concept Behind DataBuilder.Entity(...)

Internally it will generate a simplified `IEntity` object.
It's also missing some advanced features like multi-language and repository identity (which would be important in edit-scenarios).

The simplest way is to just use `DataBuilder.Entity(someDictionary)`, more advanced uses also tell the system which field is the title, some numeric or Guid IDs and more.


## Building Lists of Entities

You can loop through your data and call `DataBuilder.Entity(someDictionary)` many times.
You can also use the overload `DataBuilder.Entities(IEnumerable<someDictionary>)`. Best read the [API docs](xref:ToSic.Eav.Data.IDataBuilder.Entities*).


## More Parameters on DataBuilder.Entity(...)

All paramaters are optional, except the first one containing the values. Here's what each one does:

* `string titleField` is the title field name, so the entity then also knows which one is the title and can support `.EntityTitle` property
* `string typeName` is a nice name for the type, allowing for type-filtering later in other data sources
* `int id` gives a number identity, so `.EntityId` is useful and filtering by EntityId (like when having details-pages needing this id) works
* `Guid guidId` is a UUID identity, so `.EntityGuid` is useful
* `DateTime modified` would allow to filter / sort by the `.Modified` property
* `int appId` could be used to pretend it's part of another app. This only affects the AppId property, and ATM there is no important reason to do this.


## Read also

* [DataSources Big Picture](xref:NetCode.DataSources.Custom.Guide.BigPicture)
* [](xref:NetCode.DataSources.Custom.PreV15.Provide)
* [](xref:ToSic.Eav.Data.IDataBuilder.Entity*)

## Demo Code and further links

* [Tutorial DataSource](xref:NetCode.DataSources.Custom.TutorialBasic.Index)

## History

1. Introduced in EAV 4.x, 2sxc 09.13
