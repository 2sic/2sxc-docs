---
uid: NetCode.DataSources.Custom.ConfigMask
---

[!include[](_obsolete-docs.md)]

# DataSource Configuration: ConfigMask(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .datasource-custom,
  .context-box-summary .query-params,
  .context-box-summary .data-configuration
  { visibility: visible; }
</style>

DataSources often need settings which come from the App or from a settings dialog.
The ConfigMask is part of the [Configuration System](xref:NetCode.DataSources.Custom.Configuration) and initializes a configuration value.

This value will later be used for

1. Parsing [Tokens](xref:Abyss.Parts.LookUp.Tokens) to find the correct parameter to use
1. Use as part of the Cache-Key for high-performance caching.
  This ensures that DataSources which have different data based on dynamic configuration (like using a URL parameter) will have separate caches for each value used.

## How to use ConfigMask

Here's a example of the constructor of our SharePoint 2019 DataSource, which expects lots of settings:

```cs

public SharePoint2019()
{
  // Specify what out-streams this data-source provides. Usually just one: "Default"
  Provide(GetList);

  // Register the configurations as tokens; values will be injected later on
  ConfigMask(ListNameConfigKey, $"[Settings:ListName]");
  ConfigMask(SiteUrlConfigKey, $"[Settings:SiteUrl]");
  ConfigMask(UserNameConfigKey, $"[Settings:UserName]");
  ConfigMask(PasswordConfigKey, $"[Settings:Password]", false);
  ConfigMask(FieldsConfigKey, $"[Settings:Fields]");
  ConfigMask(TitleFieldConfigKey, $"[Settings:TitleField||Title]");
  ConfigMask(ViewConfigKey, $"[Settings:View]");
  ConfigMask(MaxItemsConfigKey, $"[Settings:MaxItems]");
}
```

This example adds 8 configuration masks - let's find out what exactly happens.

1. Most of them just add a simple `[Settings:SOMEKEY]` so they will just take the value which the developer will configure in the UI
1. The password has a special parameter `false` to ensure that it won't be used in the cache key (which would show it in certain debug scenarios)
1. The title field has a fallback - so if it's not supplied, it will use `Title` by default


---

## Read also

* [Configuration using Tokens](xref:Abyss.Parts.LookUp.Index)
<!-- * [ConfigMask in the API](xref:ToSic.Eav.DataSources.DataSource.ConfigMask*) -->
* [](xref:NetCode.DataSources.Custom.Configuration)
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)

## Demo App and further links

* #todoc

## History

1. Introduced in 2sxc 9.13 to aid custom data sources
