---
uid: NetCode.DataSources.Custom.ConfigMask
---
# DataSource API: ConfigMask

DataSources often need settings which come from the App or from a settings dialog. The ConfigMask builds a configuration token which will be used to get this setting, and also ensures that cachings mechanims vary the cache based on the result of the configuration. 

> [!WARNING]
> These docs are out of date! The real APIs are a bit different but we haven't managed to update them yet. 
> If you're creating your own DataSource, best consult the source code of 2sxc or EAV to get it working

## How to use ConfigMask
Here's a simple example of the constructor of the [DnnFormAndList DataSource](https://github.com/2sic/dnn-datasource-form-and-list), which expects 3 settings: 

```cs
public DnnFormAndList()
{
    // Specify what out-streams this data-source provides. Usually just one, called "Default"
    Provide(GetList);

    // Register the configurations we want as tokens, so that the values will be injected later on
    ConfigMask("ModuleId", "[Settings:ModuleId||0]");
    ConfigMask("TitleField", "[Settings:TitleFieldName]");
    ConfigMask("ContentType", "[Settings:ContentTypeName||FnL]");
}
```
This example adds 3 configuration masks - let's find out what exactly happens.

## Tokens for Configuration Injection
The EAV-System has a sophisticated system to get configuration based on tokens. You can read about  [configuration injection using tokens here](xref:Basics.Query.Parameters.Configuration). 

## Registering and Resolving these Tokens with ConfigMask
Internally a lot happens, but you just need to know the ConfigMask command. The syntax is:

* `ConfigMask(key, mask)`

This will do the following
1. Add this mask (using this name) to the configuration list
1. register this key to be cache-relevant


## Read also

* [Configuration using Tokens](xref:Basics.Query.Parameters.Configuration)
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.EnsureConfigurationIsLoaded)

## Demo App and further links

* [FnL DataSource Demo Code](https://github.com/2sic/dnn-datasource-form-and-list)

## History

1. Introduced in 2sxc 9.13 to aid custom data sources 
