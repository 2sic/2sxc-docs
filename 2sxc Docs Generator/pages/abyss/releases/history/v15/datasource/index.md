---
uid: Abyss.Releases.History.V15.DataSource
---

# Fix Breaking Change _DataSource_ in v15

**Keywords:** #DataSource #CustomDataSource

2sxc/EAV has a powerful extension system called `DataSource` which allows you to create new data providers.

We completely reworked object hierarchy and Dependency Injection.
Because of this, any custom DataSource will have to be adjusted and recompiled.


## Reason for Change

The DataSource concept was created in times before Dependency Injection.
This means that the architecture was very problematic,
and we had a lot of hacky implementations to make it work.

## History - How it Used to Work

Previously all DataSources inherited from

1. `ToSic.Eav.DataSources.DataSourceBase`
1. `ToSic.Eav.DataSources.ExternalData`
1. ...from another data source

These had empty constructors, so your DataSource could also have an empty constructor.

Internally it still needed some helper objects which were only available because a special factory added them later on.

## What we Changed

### 1. Base Class with Parameters in Constructor

1. The base class was renamed to `ToSic.Eav.DataSources.DataSource`
1. The base class now always expects 2 parameters in the constructor
    1. `Dependencies dependencies` - type TODO
    1. `string logName` - for any messages which appear in Insights

To make this work, any inheriting class must implement a minimal constructor like this:

```c#
class MyDataSource
{
  // Constructor
  public MyDataSource(Dependencies dependencies): base(dependencies, $"My.DataSc")
  {
    //...
  }
}

```

### 2. Changes in Logging

If your DataSource does any logging, see also [breaking changes in logging](xref:Abyss.Releases.History.V15.Logging)


### 3. Removed Old Base Classes

Some old base classes may have still been in use, but because the code must be recompiled anyhow we decided to remove these.

These are the classes and their replacement:

1. ToSic.Eav.DataSources.BaseDataSource - > DataSource
1. ToSic.Eav.DataSources.DataTableDataSource -> ToSic.Eav.DataSources.DataTable
1. ToSic.Eav.DataSources.ExternalDataDataSource: ToSic.Eav.DataSources.ExternalData
1. ToSic.Eav.DataSources.SqlDataSource: ToSic.Eav.DataSources.Sql

Also

1. ToSic.Eav.DataSources.VisualQuery.VisualQueryAttribute -> DataSources.Queries.VisualQueryAttribute


---

## History

* Introduced ca. 2sxc 5
* Completely reworked in 2sxc/eav 15

---

<!-- Shortlink to here: https://r.2sxc.org/brc-15-datasource todo -->