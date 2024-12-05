---
uid: NetCode.DataSources.Custom.VisualQueryAttribute
---

# DataSource API: VisualQuery Attribute

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

DataSources themselves are useful in the 2sxc/EAV data processing - but they really become great when used in the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer.

To help the [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer give queues to the developer what can / can't be done,
there is a [VisualQuery decorator attribute](xref:ToSic.Eav.DataSource.VisualQuery.VisualQueryAttribute)  which gives the class some more information.

## Example

This example is taken from our internally used **SharePoint DataSource**:

```c#
[VisualQuery(
  NiceName = "SharePoint 2016",
  NameId = "fd5288d2-5a13-4f58-90a0-e9d207f00121",
  NameIds = new[] { "1b7cc60d-9fac-4473-a89a-c19017995307" },
  Type = DataSourceType.Source, 
  ConfigurationType = "e5ee51da-1859-4e2b-9f4c-0ead39bbf4a6",
  HelpLink = "")] 
```

## Use It

To best apply it, you should

1. Check out the [VisualQueryAttribute API docs](xref:ToSic.Eav.DataSource.VisualQuery.VisualQueryAttribute)
1. Look at each property and make sure you understand it
1. Look at some DataSources and see what they have defined

## Properties

### Streams Information

#### DynamicIn

Determines if this DataSource expects to have a lot of In-Streams, like the [StreamMerge](xref:ToSic.Eav.DataSources.StreamMerge) DataSource.
Default is `false`.
If `true` the UI will indicate this with a yellow In-marker.

#### DynamicOut

Determines if this DataSource can have a lot of Out-Streams like the [App](xref:ToSic.Eav.DataSources.App) DataSource.
Default is `false`.
If `true` the UI will indicate this with a yellot Out-marker.

#### In

Array of In-Streams which the UI will show as prepared landing markers to connect streams to.

### Name and Identity

#### NameId - the Unique Identity

The global name should be super-unique because it will be stored as the ID in [Queries](xref:Basics.Query.Index).
We recommend you get a [new random Guid here](https://www.guidgenerator.com/).

#### NiceName

This will be shown in the [VisualQuery](xref:Basics.Query.VisualQuery.Index) UI. Make sure it's reasonable.

#### NameIds

This is a for historical reasons. In rare cases we had to rename a DataSource and the old GlobalName values are listed here. Avoid using this.

### UI Enhancements

#### Icon

An icon name from the [Material Icons](https://fonts.google.com/icons).

#### Type

A value which tells the [VisualQuery](xref:Basics.Query.VisualQuery.Index) in what group to place this source for the Query developer.
Must be a valid value from [](xref:ToSic.Eav.DataSource.VisualQuery.DataSourceType).

#### HelpLink

A url to a website containing help to this DataSource.

#### UiHint

Additional text to be shown in the UI.

### Configuration

#### ConfigurationType

This is the GUID (aka [StaticName](xref:Basics.Data.ContentTypes.Names)) of the [Content-Type](xref:Basics.Data.ContentTypes.Index) which should be used for configuring the DataSource.
The UI will open a edit dialog for this Content-Type when the Query creator hits Settings on this DataSource.

If this is not provided, the system will check if there is a ContentType with a name matching this DataSource + `Configuration`.
So if your DataSource is called `MyXyz` and a ContentType `MyXyzConfiguration` exists, this will be used automatically. (new in v16)


---

## History

1. Introduced ca. in 2sxc 6
1. Large changes in v15 / v16
    1. Moved from `ToSic.Eav.DataSources.Queries.VisualQueryAttribute` to `ToSic.Eav.DataSource.VisualQuery.VisualQueryAttribute`
    1. Renamed `GlobalName` to `NameId`
    1. Renamed `PreviousNames` to `NameIds`
    1. Renamed `ExpectsDataOfType` to `ConfigurationType`
