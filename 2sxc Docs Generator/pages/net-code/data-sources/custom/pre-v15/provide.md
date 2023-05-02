---
uid: NetCode.DataSources.Custom.PreV15.Provide
---

[!include[](_obsolete-docs.md)]

# DataSource API: Provide(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

DataSources always provide data on an [`Out` Stream](xref:NetCode.DataSources.Custom.StreamsOut). The `Provide` method makes it very easy to do. 

## How to use Provide

In general, you need

1. a method like `GetList()` which returns an `IEnumerable<IEntity>`
1. attach that stream to the `Out` - usually on a stream called `Default`

Here's a simple example of the constructor of the [Tutorial Basic DataSource](xref:NetCode.DataSources.Custom.TutorialBasic.Basic), which provides the default stream: 

```cs
/// <summary>
/// Constructor to tell the system what out-streams we have
/// </summary>
public DateTimeDataSourceBasic()
{
  Provide(GetList); // "Default" out; when accessed, will deliver GetList
}

/// <summary>
/// Get-List method, which will load/build the items once requested 
/// Note that the setup is lazy-loading so this code will only execute when used
/// </summary>
private ImmutableArray<IEntity> GetList()
{
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
}

```
This example ensures that the `.Out["Default"]` as well as the `.List` (which is a shorthand for `.Out[Constants.DefaultStreamName].List`) are mounted, ready to deliver.

## Overloads

* `Provide(listfunction)` - default version, which provides the "Default" stream
* `Provide(name, listfunction)` - alternative for named streams when your DataSource has more streams. 

## Providing multiple streams
In case you want to offer multiple streams (like one containing products, the other categories), the common pattern is:

```cs
public SomeConstructor()
{
    Provide(GetProducts);
    Provide("Categories", GetCategories);

    // ...
}
```

## Performance Notes

It's important to know that `Provide` simply prepares the `Out` for use, but will _not_ call the inner function unless this stream is requested. This makes DataSources very performant, as no code is run which isn't needed.

## Read also

* [DataSources Big Picture](xref:NetCode.DataSources.Custom.Guide.BigPicture)
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)

## Demo App and further links

* todo

## History

1. Introduced in EAV 4.x, 2sxc 09.13
