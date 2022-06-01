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

For each piece of configuration your DataSource expects you should expose a normal property which will have that value. Internally it should get the data from the `Configuration` object which is an [IDataSourceConfiguration](xref:ToSic.Eav.DataSources.IDataSourceConfiguration). Here's an example from the [ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter):

```c#
private const string AttrKey = "Attribute";
private const string OperatorKey = "Operator";

/// <summary>
/// The attribute whose value will be scanned / filtered.
/// </summary>
public string Attribute
{
  get => Configuration[AttrKey];
  set => Configuration[AttrKey] = value;
}

/// <summary>
/// The comparison operator, == by default, many possibilities exist
/// depending on the original types we're comparing
/// </summary>
public string Operator
{
  get => Configuration[OperatorKey];
  set => Configuration[OperatorKey] = value;
}
```

Remember that if the type is not string, you'll have to add some type-checking and fallbacks, since the Configuration object only works with strings to handle Tokens. 

## 2. Configure Where the Values come from in the Constructor

```c#
public ValueFilter(ValueLanguages valLanguages)
{
  Provide(GetValueFilterOrFallback);
  ConfigMask(AttrKey, "[Settings:Attribute]");
  ConfigMask(FilterKey, "[Settings:Value]");
  ConfigMask(OperatorKey, "[Settings:Operator||==]");
  ConfigMask(TakeKey, "[Settings:Take]");
}
```

Note that we're using the [ConfigMask](xref:NetCode.DataSources.Custom.ConfigMask) command and using the standard [Token Syntax](xref:Abyss.Parts.LookUp.Tokens). 
The `ConfigMask(...)` will actually add the property to the `Configuration` manager which will later on fill in the tokens from values in the UI. 
Things to note in the example above:

1. The `Attribute` property is going to come from the `Settings`
1. The `Operator` property is also coming from the `Settings` but if it's not supplied, will do a fallback to `==`

## 3. Ensure Tokens are Replaced Before Use

In your code which will generate the List of results, you must first call one important command:

```c#
private IImmutableList<IEntity> GetValueFilter()
{
  var opBefore = Operator;  // would return "[Settings:Operator||==]"
  Configuration.Parse();
  var opAfter = Operator;   // now returns "=="
  // rest of the code to do what this DataSource must do
}
```

This will make sure that all tokens are parsed/converted in the list of values. 
Accessing the `Operator` property _before_ calling this would give your code an unexpected `[Settings:Operator||==]`.
After calling [Configuration.Parse()](xref:NetCode.DataSources.Custom.ConfigurationParse) the `Operator` property will give you `==` or whatever was configured in the settings. 



## History

1. General Tokens introduced in 2sxc 1.0
1. Most enhancements were in 2sxc 07.00
1. 2sxc 10 and 11 changed the Configuration API to better separate the Configuration Manager