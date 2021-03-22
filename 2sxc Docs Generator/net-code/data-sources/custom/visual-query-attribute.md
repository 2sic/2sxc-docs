---
uid: NetCode.DataSources.Custom.VisualQueryAttribute
---

# DataSource API: VisualQuery Decorator Attribute

[!include[](~/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

todo #todoc: add pics

DataSources themselves are useful in the 2sxc/EAV data processing - but they really become great when used in the VisualQuery Designer #todoc. 

To help the VisualQuery Designer give queues to the developer what can / can't be done, there is a [VisualQuery](xref:ToSic.Eav.DataSources.Queries.VisualQueryAttribute) decorator Attribute which gives the class some more information. 

## Example

This example is taken from our internally used **SharePoint DataSource**:

```c#
[VisualQuery(
  GlobalName = "ToSic.Eav.DataSources.SharePoint2016, ToSic.Eav.DataSources.SharePoint",
  NiceName = "SharePoint 2016",
  PreviousNames = new[] { "1b7cc60d-9fac-4473-a89a-c19017995307" },
  Type = DataSourceType.Source, 
  ExpectsDataOfType = "e5ee51da-1859-4e2b-9f4c-0ead39bbf4a6",
  HelpLink = "")] 
```

## Use It

To best apply it, you should

1. Check out the [VisualQueryAttribute docs](xref:ToSic.Eav.DataSources.Queries.VisualQueryAttribute)
1. Look at each property and make sure you understand it
1. Look at some DataSources and see what they have defined


## History

1. Introduced ca. in 2sxc 6
