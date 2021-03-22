---
uid: NetCode.DataSources.Custom.ConfigurationParse
---

# DataSource Configuration: Configuration.Parse()

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .datasource-custom, 
  .context-box-summary .query-params,
  .context-box-summary .data-configuration
  { visibility: visible; } 
</style>

If a [DataSource](xref:NetCode.DataSources.DataSource) is [configurable](xref:NetCode.DataSources.Custom.Configuration), then the code must parse any [configuration tokens](xref:Basics.LookUp.Tokens) before accessing the values. 

This is done with `Configuration.Parse()`. It will cycle through all settings previously added by [ConfigMask](xref:NetCode.DataSources.Custom.ConfigMask) and resolve the tokens. 

## How to use Configuration.Parse()

Here's a simple example of the [PublishingFilter DataSources](xref:ToSic.Eav.DataSources.PublishingFilter): 

```cs
public PublishingFilter()
{
  Provide(PublishingFilterList);
  ConfigMask(QueryConstants.ParamsShowDraftKey, "[Settings:ShowDrafts||false]");
}

const string ParamsShowDraftKey = "ShowDrafts";
public bool ShowDrafts
{
  get => bool.Parse(Configuration[ParamsShowDraftKey]);
  set => Configuration[ParamsShowDraftKey] = value.ToString();
}

private IImmutableList<IEntity> PublishingFilterList()
{
  var before = ShowDrafts;  // here it's "[Settings:ShowDrafts||false]" which would fail
  Configuration.Parse();
  var after = ShowDrafts;   // here it's `false` (or `true` if user is editor)
  var outStreamName = ShowDrafts 
    ? Constants.DraftsStreamName 
    : Constants.PublishedStreamName;
  return In[outStreamName].Immutable;
}
```

If we would read the `ShowDrafts` property before running `Configuration.Parse()` then the tokens would not be resolved yet. After calling `Configuration.Parse()` all tokens/values have been resolved and it works as expected. 

## Breaking Change

This command used to be called `EnsureConfigurationIsLoaded()` but was changed in 2sxc 10 or 11. We didn't notice until the new API was already widespread in use that older systems still used the previous mechanism. 


## Read also

* [DataSource API](xref:NetCode.DataSources.Custom.Api) - DataSource API overview

## Demo Code and further links

* [demo data source code](https://github.com/2sic/2sxc-eav-tutorial-custom-datasource)
* [FnL DataSource](https://github.com/2sic/dnn-datasource-form-and-list)

## History

1. Introduced in EAV 4.x, 2sxc 07.00
1. Modified from `EnsureConfigurationIsLoaded` to `Configuration.Parse` (breaking change, sorry) ca. 2sxc 11