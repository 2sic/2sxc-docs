---
uid: NetCode.DataSources.Custom.Errors
---

# DataSource API: Error Handling 🆕

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

Custom DataSources sometimes need to throw an error, for example if a SQL isn't found, a remote WebAPI fails or the configuration is faulty. 

Since 2sxc 11.13 we changed the behaviour so that [DataSource Errors](xref:Basics.Query.VisualQuery.Debugging) will not break code execution but just make the stream contain just one Error entity. This helps a lot in debugging. 

## You Don't Have to Do Anything...

If your code just raises a .net Exception, the execution engine will catch this and wrap it in an error. The Exception will also be logged to [Insights](xref:NetCode.Debug.Insights.Index) for the admin/developer to see. 

## ...but You can do Better

Instead of raising the normal exception, your DataSource can also return an `ErrorStream` which contains more specific information about the problem. This greatly helps the developer (and that could be you 😉) figure out what to fix. There are three tools at your disposal:

1. The [SetError](xref:ToSic.Eav.DataSources.DataSourceBase.SetError*) helper to create an ErrorStream which you can return
1. The [GetRequiredInList](xref:ToSic.Eav.DataSources.DataSourceBase.GetRequiredInList*) helper to get an `In` stream which must be available
1. The [ErrorStream](xref:ToSic.Eav.DataSources.DataSourceBase.ErrorStream) property to pass errors around from deeper functions

Read the API docs above or check out examples in the 2sxc EAV code base for more guidance. 

## Read also

* [DataSource API](xref:NetCode.DataSources.Custom.Api) - DataSource API overview
* [Ensuring configuration is parsed](xref:NetCode.DataSources.Custom.ConfigurationParse)

## Demo App and further links

* todo

## History

1. Introduced in EAV / 2sxc 11.13
