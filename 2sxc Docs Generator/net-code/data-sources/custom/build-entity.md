---
uid: NetCode.DataSources.Custom.BuildEntity
---

# DataSource API: Build.Entity(...)

Many data sources generate new content items - either because they deliver some kind of information, or because they convert data from another source into standardized entities. This is where `Build.Entity(...)` helps. 

Just fyi: Here are the [API docs](xref:ToSic.Eav.Data.Build.Entity*) for single or multiple Entities.

## How to use Build.Entity(...)

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
var entity = Build.Entity(values, titleField: DateFieldName);
return new [] {entity}.ToImmutableArray();

```

This example shows how an entity-object is build using `Build.Entity(values)` on the `ToSic.Eav.Data` namespace.

## Concept Behind Build.Entity(...)

Internally it will generate a simplified `IEntity` object.
It's also missing some advanced features like multi-language and repository identity (which would be important in edit-scenarios). 

The simplest way is to just use `Build.Entity(someDictionary)`, more advanced uses also tell the system which field is the title, some numeric or Guid IDs and more. 


## Building Lists of Entities

You can loop through your data and call `Build.Entity(someDictionary)` many times. 
You can also use the overload `Build.Entity(IEnumerable<someDictionary>)`. Best read the [API docs](xref:ToSic.Eav.Data.Build.Entity*).


## More Parameters on Build.Entity(...)

All paramaters are optional, except the first one containing the values. Here's what each one does:

* `string titleField` is the title field name, so the entity then also knows which one is the title and can support `.EntityTitle` property
* `string typeName` is a nice name for the type, allowing for type-filtering later in other data sources
* `int id` gives a number identity, so `.EntityId` is useful and filtering by EntityId (like when having details-pages needing this id) works
* `Guid guidId` is a UUID identity, so `.EntityGuid` is useful
* `DateTime modified` would allow to filter / sort by the `.Modified` property
* `int appId` could be used to pretend it's part of another app. This only affects the AppId property, and ATM there is no important reason to do this. 


## Read also

* [DataSource API](xref:NetCode.DataSources.Custom.Api) - DataSource API overview
* [](xref:NetCode.DataSources.Custom.Provide)
* [](xref:ToSic.Eav.Data.Build.Entity*)

## Demo Code and further links

* [demo data source code](https://github.com/2sic/2sxc-eav-tutorial-custom-datasource)
* [FnL DataSource](https://github.com/2sic/dnn-datasource-form-and-list)

## History

1. Introduced in EAV 4.x, 2sxc 09.13
