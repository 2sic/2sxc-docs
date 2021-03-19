---
uid: NetCode.DataSources.Custom.EnsureConfigurationIsLoaded
---
# DataSource API: EnsureConfigurationIsLoaded

If a [DataSource](xref:NetCode.DataSources.DataSource) is [configurable](xref:NetCode.DataSources.Custom.Configuration), then the code must parse any [configuration tokens](xref:Basics.LookUp.Tokens) before accessing the values. This is done with `EnsureConfigurationIsLoaded()`.

> [!WARNING]
> These docs are out of date! The real APIs are a bit different but we haven't managed to update them yet. 
> If you're creating your own DataSource, best consult the source code of 2sxc or EAV to get it working

## How to use EnsureConfigurationIsLoaded
Here's a simple example of the [PublishingFilter DataSources](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/PublishingFilter.cs): 

```cs
// get the correct stream, depending on ShowDrafts
private IEnumerable<IEntity> GetList()
{
    EnsureConfigurationIsLoaded();
    Log.Add($"get incl. draft:{ShowDrafts}");
    var outStreamName = ShowDrafts 
        ? Constants.DraftsStreamName 
        : Constants.PublishedStreamName;
    return In[outStreamName].List;
}
```
This example needs ShowDrafts to be boolean (true/false), but the built-in token-template for it is `[Settings:ShowDrafts||false]`. This is why `EnsureConfigurationIsLoaded()` must be called first. 

## Advanced Use Case: Overwrite EnsureConfigurationIsLoaded
In some scenarios you may want to overwrite EnsureConfigurationIsLoaded. An example is the SqlDataSource, which has a custom implementation to protect agains Sql-Injection. You can find a good example in the [source code of the SqlDataSource](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/SqlDataSource.cs).


## Read also

* [DataSource API](xref:NetCode.DataSources.Custom.Api) - DataSource API overview

## Demo Code and further links

* [demo data source code](https://github.com/2sic/2sxc-eav-tutorial-custom-datasource)
* [FnL DataSource](https://github.com/2sic/dnn-datasource-form-and-list)

## History

1. Introduced in EAV 4.x, 2sxc 07.00
