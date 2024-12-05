---
uid: NetCode.DataSources.Custom.ConfigurableDataSource
---

# Configurable DataSource

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .datasource-custom,
  .context-box-summary .query-params,
  .context-box-summary .data-configuration
  { visibility: visible; }
</style>

Most Custom DataSources will want to provide a configuration UI to the editor.

Here we'll explain how you must code your DataSource that it can be configurable.

## 1. Create Typed Properties

For each piece of configuration your DataSource expects you should expose a normal property which will have that value.
Internally it should get the data from the `Configuration` object which is an [IDataSourceConfiguration](xref:ToSic.Eav.DataSource.IDataSourceConfiguration).
Here's an example from the [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter):

```c#
/// <summary>
/// The attribute whose value will be scanned / filtered.
/// </summary>
[Configuration]
public string Attribute => Configuration.GetThis();

/// <summary>
/// The comparison operator, == by default, many possibilities exist
/// depending on the original types we're comparing
/// </summary>
[Configuration(Fallback = "==")]
public string Operator => Configuration.GetThis();
```

Remember that if the type is not string, you'll have to add some type-checking and fallbacks, since the Configuration object only works with strings to handle Tokens.
Fortunately the new v16 API does this automatically for you.
Here's an example from the `AppFiles.cs`

```c#
[Configuration(Fallback = false)]
public bool OnlyFolders => Configuration.GetThis(false);
```

## 2. Use the Value

With this setup, everything is automatic. So if your code now does this:

```c#
var x = Operator;
```

...it will get the parsed token with either the value provided by the config, or the fallback.

> [!IMPORTANT]
> In the constructor the Configuration object is not yet populated, so you can't use the properties there.
> So make sure it's accessed later, typically inside the function or lambda which is called by `ProvideOut`.

## History

1. General Tokens introduced in 2sxc 1.0
1. Most enhancements were in 2sxc 07.00
1. 2sxc 10 and 11 changed the Configuration API to better separate the Configuration Manager
1. 2sxc 15/16 changed this completely using the new `[Configuration]` attribute and `Configuration.GetThis()`
