---
uid: NetCode.DataSources.Custom.ConfigurationAttribute
---

# DataSource API: Configuration Attribute

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

The `[Configuration]` attribute marks properties on a DataSource as configuration properties.

This allows you to then provide configuration values when getting a DataSource using the [Kit.Data](xref:ToSic.Sxc.Services.IDataService)
or to make it configurable in VisualQuery.

Example:

```c#
/// <summary>
/// Should the Modified date be included in serialization
/// </summary>
[Configuration]
public string IncludeModified => Configuration.GetThis();

/// <summary>
/// Should the Relationships be included as CSV like "42,27,999".
/// Default is `false` in which case they are sub-objects.
/// </summary>
[Configuration(Fallback = false)]
public string IncludeRelationshipsAsCsv => Configuration.GetThis();

/// <summary>
/// Will filter duplicate hits from the result.
/// </summary>
[Configuration(Fallback = true)]
public bool FilterDuplicates => Configuration.GetThis(true);
```

By applying it to a property, the following will happen:

1. Upon creating the DataSource, all these configurations will be initialized - ideally with the fallback value provided
1. The value is now available to be set from outside code or Query
1. If the code (or query) using the data source doesn't change the value, the fallback will be used
1. If the DataSource is configurable using a ContentType in VisualQuery, the value set there will automatically be used in this property

## How to Use Configuration

1. Apply the `[Configuration]` attribute to every property that is configurable
1. Where possible or reasonable, provide a fallback value
1. Use the `Configuration.GetThis()` method to get the value

## Read More

* Look at the [](xref:Tut.DynamicDataSources) for some easy examples
* Check out the API [](xref:ToSic.Eav.DataSource.ConfigurationAttribute) to see what else you can configure
* Also read about the [](xref:ToSic.Eav.DataSource.IDataSourceConfiguration) - especially the `GetThis()` and `GetThis<T>()` methods

---

## History

1. Introduced in 2sxc 16, replacing a more complex configuration system before that
