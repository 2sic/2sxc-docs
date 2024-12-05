---
uid: NetCode.DataSources.Custom.Errors
---

# DataSource API: Error Handling

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

Custom DataSources sometimes need to throw an error, for example if a SQL isn't found, a remote WebAPI fails or the configuration is faulty.

Since 2sxc 11.13 we changed the behavior so that [DataSource Errors](xref:Basics.Query.Debug.Index) will not break code execution but just make the stream contain just one Error entity. This helps a lot in debugging.

## You Don't Have to Do Anything

If your code just raises a .net Exception, the execution engine will catch this and wrap it in an error. The Exception will also be logged to [Insights](xref:NetCode.Debug.Insights.Index) for the admin/developer to see.

## ...but You can do Better

Instead of raising the normal exception, your DataSource can also return an `ErrorStream` which contains more specific information about the problem. This greatly helps the developer (and that could be you 😉) figure out what to fix. There are three tools at your disposal:

1. The [Error](xref:ToSic.Eav.DataSource.DataSourceErrorHelper) property ([DataSourceErrorHelper](xref:ToSic.Eav.DataSource.DataSourceErrorHelper)) to create error streams
1. The [TryGetIn()](xref:ToSic.Eav.DataSource.DataSourceBase.TryGetIn*) helper to get an `In` stream which must be available - or null so you can return an error

Read the API docs above or check out examples in the 2sxc EAV code base for more guidance.


## Example using TryGetIn

[TryGetIn](xref:ToSic.Eav.DataSource.DataSourceBase.TryGetIn*) ensures that we get a stream we really need, or null if something went wrong.

```c#
private IEnumerable<IEntity> GetEntities()
{
  // This will resolve the tokens before starting
  Configuration.Parse();

  var source = TryGetIn();
  if (source is null) return Error.TryGetInFailed(this);

  var results = ...;

  return results;
}
```

## Create Custom Error Messages

If you need an error which is not a predefined type, you can create your own using [Error.Create](xref:ToSic.Eav.DataSource.DataSourceErrorHelper.Create*):

---

## Read also

* [DataSources Big Picture](xref:NetCode.DataSources.Custom.Guide.BigPicture)
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)

## Demo App and further links

* todo

## History

1. Introduced in EAV / 2sxc 11.13
1. Error API completely rewritten in 2sxc 15 (breaking change)
