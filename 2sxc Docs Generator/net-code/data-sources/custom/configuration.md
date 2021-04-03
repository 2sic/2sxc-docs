---
uid: NetCode.DataSources.Custom.Configuration
---

# DataSource Configuration

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .datasource-custom, 
  .context-box-summary .query-params,
  .context-box-summary .data-configuration
  { visibility: visible; } 
</style>

Most Custom DataSources will want to provide a configuration UI to the editor. This happens through these parts:

1. A **[Content-Type](xref:NetCode.DataSources.Custom.ConfigurationData)** which describes what fields can be edited
1. The **[VisualQuery Attribute](xref:NetCode.DataSources.Custom.VisualQueryAttribute)** on your DataSource which references that Content-Type
1. The **Configuration manager** on the DataSource which helps you get the configuration
1. The **[LookUp Engine](xref:Basics.LookUp.Engine)** which resolves any Tokens in the configuration

## Examples of Configurations Needed

* a [Paging ](xref:ToSic.Eav.DataSources.Paging) needs to know what page size it should use and what page it's on
* A [CSV Data Source](xref:ToSic.Eav.DataSources.CsvDataSource) needs to know what file it should load
* a [](xref:ToSic.Sxc.DataSources.CmsBlock) needs to know the module ID 
* an [Owner-Filter DataSource](xref:ToSic.Eav.DataSources.OwnerFilter) needs to know who the current user is, to find his items

Some of this information depends on the current context (ModuleId, UserId), others on configured settings (page size) and some on Url-parameters (Page number). In addition, we sometimes want to say _"use the page-size configured in the App-Settings"_ or even more complex _"use from url, but if not specified, try app-settings, and if that isn't defined, use 10"_.


## How to Build a Configurable DataSource

👉 [](xref:NetCode.DataSources.Custom.ConfigurationData)

👉 [](xref:NetCode.DataSources.Custom.ConfigurableDataSource)


## Configuration Basics

Each configuration value of a [DataSource](xref:NetCode.DataSources.DataSource) must be a value (string, int etc.). 
But to allow greater flexibility in configuration, it usually starts as a string [Token](xref:Basics.LookUp.Tokens) like `[Settings:PageNumber]`. 
This token is parsed _before any data is queried_ using [Configuration.Parse()](xref:NetCode.DataSources.Custom.ConfigurationParse) to convert the Token to the expected value type. 
Best read more about [Tokens](xref:Basics.LookUp.Tokens) and how fallbacks, defaults and recursion work.  

The Tokens allow quite some fancy features:

1. Your DataSource will use `[Settings:...]` tokens and will automatically get the settings as they were added in the UI
1. Since tokens also allow for default/fallback values, your code will often have `[Settings:Id||0]`
1. As tokens are recursive, the admin can specify things like `[QueryString:Id||752]` in the UI and your code (asking for `[Settings:Id]`) will get the ID from the URL or the default `752` as the Admin specified it. 
1. Thanks to [Token Stacking](xref:Basics.LookUp.Tokens) a lot more is possible 😉

When a DataSource is configured, it has many parameter LookUp Sources like `Module`, `QueryString`, `App` etc. These are shared and are identical for all objects. Read more about the [LookUp Sources](xref:Basics.LookUp.Sources).

In your code you will usually not use these sources, but only use the [`Settings` source](xref:Basics.LookUp.Settings). This source only exists in C# and contains all the values the Admin/Editor entered in the [Configuration-UI](xref:NetCode.DataSources.Custom.ConfigurationData). So the token `[Settings:PageNumber]` will deliver the number or text in the input-field `pagenumber`. 

## How Tokens are Defined, Settings Edited and Resolved

When you're using the [VisualQuery](xref:Basics.Query.VisualQuery.Index) designer, the configuration created is saved as an Entity (aka Content-Item) which must be injected into the DataSource configuration automatically. But when you use the object is your code, your code must be able to provide other values. But how does this work?

1. Each DataSource object has a property called `Configuration` which is a dictionary containing all configuration properties the data source will care about. For example, the `EntityIdFilter` has a Configuration with only one property which is called `EntityIds`. 
2. The each property is first initialized with a Token-Template. For example, the CsvDataSource has a  
`ConfigMask(DelimiterKey, "[Settings:Delimiter||\t]");`   
This says that the delimiter should come from the Settings-Entity field `Delimiter` and if not provided, fall back to `\t` (which is a tab character)  
_read about [ConfigMask here](xref:NetCode.DataSources.Custom.ConfigMask)_  
3. For the programmer who wants to set a number or whatever, this would be fairly unreliable to access from outside, so the DataSource should also have a real property which internally also modifies the dictionary. For example, the CsvDataSource has a string-property `Delimiter` which internally will get/set the in the Configuration dictionary.  
3. When the DataSource is first _sucked_ from, which happens when something tries to access the Out-Property, it will automatically run a token-engine to resolve the values, then run whatever action the data-source wants. _read about [ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse) here_

So how does each scenario work out?

1. If the programmer overwrote the `Delimiter` property, then internally the `Configuration["Delimiter"]` is now not a token any more, but instead just a character like `,`. So the token-engine won't change anything. 
1. If the programmer didn't do anything but the  [VisualQuery](xref:Basics.Query.VisualQuery.Index)  engine gave a settings-entity to the system, then the token is resolved and whatever the user entered is used. 
1. if the neither the programmer nor the user provided settings, then the token-engine will resolve to the fallback and use the `\t` as was defined.

## Also Read

* [](xref:Basics.LookUp.Index)
* [](xref:Basics.LookUp.Tokens)
* [](xref:NetCode.DataSources.Custom.Api)
* [](xref:NetCode.DataSources.Custom.ConfigurationParse)
* [](xref:ToSic.Eav.DataSources.IDataStream)


## History

1. General Tokens introduced in 2sxc 1.0
1. Most enhancements were in 2sxc 07.00

