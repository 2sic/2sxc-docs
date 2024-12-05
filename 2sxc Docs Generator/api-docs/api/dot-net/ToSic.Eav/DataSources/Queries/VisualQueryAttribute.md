---
uid: ToSic.Eav.DataSources.Queries.VisualQueryAttribute
---
# DataSource API: VisualQuery Attribute

To help the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer properly guide the user, there is a C# _Attribute_ called **VisualQuery** to configure everything. 

## How to use VisualQuery

Here's a simple example of the [Tutorial DataSource](xref:NetCode.DataSources.Custom.TutorialBasic.Index): 

```cs
[VisualQuery(
  NameId = "81dd49a7-fa70-4e98-b73d-8299bb3231f0",
  Icon = "event",
  Type = DataSourceType.Source,
  NiceName = "DateTime Configurable",
  // Guid of the Content-Type which must be exported with this DataSource
  // It's located in .data/contenttypes
  // The class RegisterGlobalContentTypes ensures that 2sxc/EAV will find it
  ConfigurationType = "677210a2-cf08-46e5-a6b2-86e56e27be99",
  HelpLink = "https://go.2sxc.org/DsCustom")]
```

This example shows how the the FormAndList DataSource tells the UI things like:

* the global name
* the nice name to use in the UI
* that it's a source (and not a filter) - affecting the icon shown
* that it has a content-type which should be used for the UI to configure it
* the help-link in the UI

## Read also

* [DataSources Big Picture](xref:NetCode.DataSources.Custom.Guide.BigPicture)

## Demo Code and further links

* [DataSource Tutorial](xref:NetCode.DataSources.Custom.TutorialBasic.Index)

## History

1. Introduced in EAV 4.x, 2sxc 09.13

[!include["Start-APIs"](../shared-api-start.md)]