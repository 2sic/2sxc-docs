---
uid: NetCode.DataSources.Custom.ProvideOut
---

# DataSource API: ProvideOut(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

DataSources always provide data on an [`Out` Stream](xref:NetCode.DataSources.Custom.StreamsOut). The `ProvideOut()` method makes it very easy to do.

## How to use ProvideOut

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
  ProvideOut(GetList); // "Default" out; when accessed, will deliver GetList
}

/// <summary>
/// Get-List method, which will load/build the items once requested 
/// Note that the setup is lazy-loading so this code will only execute when used
/// </summary>
private IEnumerable<IEntity> GetList()
{
  var date = DateTime.Now;
  var values = new Dictionary<string, object>
  {
      {DateFieldName, date},
      {"Weekday", date.DayOfWeek},
      {"DayOfWeek", (int) date.DayOfWeek}
  };
  
  // Construct the IEntity and return as ImmutableArray
  var entity = DataFactory.Create(values);
  return new [] {entity};
}

```

This example ensures that the `.Out["Default"]` as well as the `.List` (which is a shorthand for `.Out["Default"].List`) are mounted, ready to deliver.

## Overloads

* `ProvideOut(listfunction)` - default version, which provides the "Default" stream

* `ProvideOut(listfunction, name)` - alternative for named streams when your DataSource has more streams.

* `ProvideOut(listfunction, name: name, options: optionsfunction)` - optimized for conversions when using [CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource).

## Providing multiple streams

In case you want to offer multiple streams (like one containing products, the other categories), the common pattern is:

```cs
public SomeConstructor()
{
    ProvideOut(GetProducts);
    ProvideOut(GetCategories, "Categories");

    // ...
}
```

## Providing Data with Relationships

In some cases you want the created Entities to have relationships to each other.
Examples could be:

* Blog posts with relationships to their tags
* Tree structures such as folders
* etc.

For this you should first understand how relationships are created.
Every created entity is [immutable](xref:NetCode.Conventions.Immutable).
This means that it can't be modified once created.
Now this poses a special challenge, because some of the referenced entities
may not exist when the _referencing_ entity (aka the parent) is created.

So internally there is a lookup concept, which basically works like this:

1. A **Relationship Manager** knows about all the entities and how they can be referenced
1. An entity which needs other entities will get this manager injected
1. A field which references other entities keeps a list of references - either the IDs or special strings like `file-of:/some/path`
1. When the field is accessed, internally it will ask the ReferenceManager to find the entities

For creating relationships you must do two things:

1. Ensure that each new entity provides the keys it should be found on.
    If you are only using IDs, you don't have to do anything, but if you need magic strings, you must provide them.
1. Tell the relationship fields (eg: `MyChildren` or `Parent`) what IDs / keys to use.

Here's a simple example from the tutorial:

```c#
using System.Collections.Generic;

public class TreeBasic : Custom.DataSource.DataSource16
{
  public TreeBasic(MyServices services) : base(services, "My.Magic")
  {
    ProvideOut(() => {     
      return new List<object> {
        // Root has ID 1 and points to 2 children
        CreateNode(1, "Root Node", new [] { 101, 102 }),
        // This is a subnode, with 2 more children
        CreateNode(101, "Sub Item 101", new [] { 1011, 1012 }),
        CreateNode(102, "Sub Item 102"),
        CreateNode(1011, "Sub Item 1011"),
        CreateNode(1012, "Sub Item 1012"),
      };
    });
  }

  private object CreateNode(int id, string title, int[] relationships = null) {
    return new {
      Id = id,
      Title = title,
      // To reference another item in the same list,
      // create an anonymous object with "Relationships" as an Enumerable, Array or List
      SubItems = new { Relationships = relationships }
    };
  }
}
```

This example skips step one, because it only uses IDs.
As you can see, the property `SubItems` creates a special object which contains the references to the children of a parent.

💡 For more examples, check out the [Relationships Tutorial](https://app-dev.2sxc.org/tutorial-razor/Home/data-sources500/page)

## Performance Notes

It's important to know that `ProvideOut` simply prepares the `Out` for use, but will _not_ call the inner function unless this stream is requested. This makes DataSources very performant, as no code is run which isn't needed.

## Read also

* [DataSources Big Picture](xref:NetCode.DataSources.Custom.Guide.BigPicture)
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)
* [](xref:Tut.DynamicDataSources)


---

## History

1. Introduced in EAV 4.x, 2sxc 09.13
1. Changed from `Provide` to `ProvideOut` in v15 (breaking change)