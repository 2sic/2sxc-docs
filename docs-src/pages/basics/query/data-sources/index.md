---
uid: Basics.Query.DataSources.Index
---

# All DataSource Objects in 2sxc / EAV

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query { visibility: visible; } </style>

2sxc provides a large set of [DataSource](xref:NetCode.DataSources.DataSource) objects which either get data from somewhere (SQL, CSV, ...) or modify data on the `In` and passing it to `Out`. This page will give you an overview and link you to further sources if you need to know more.

## All Public DataSources

These are all the data sources which are either provided in the default installation of 2sxc.


<table>
  <tr>
    <td><strong>Data Source</strong></td>
    <td><strong>Purpose</strong></td>
    <td><strong>Description &amp; Details</strong></td>
    <td><strong>Ver.</strong></td>
  </tr>

  <tr>
    <td>

[App](xref:ToSic.Eav.DataSources.App)</td>
    <td>Get Data</td>
    <td>Provides each content-type on the out-stream </td>
  </tr>

  <tr>
    <td>

[AppRoot](xref:ToSic.Eav.DataSources.AppRoot)</td>
    <td>Get Data</td>
    <td>This is the root cache node per App</td>
  </tr>

  <tr>
    <td>

[AttributeFilter](xref:ToSic.Eav.DataSources.AttributeFilter)</td>
    <td>Modify</td>
    <td>Removes properties/attributes.</td>
  </tr>

  <tr>
    <td>

[AttributeRename](xref:ToSic.Eav.DataSources.AttributeRename)</td>
    <td>Modify</td>
    <td>Renames properties/attributes.</td>
  </tr>

  <tr>
    <td>

[CacheAllStreams](xref:ToSic.Eav.DataSources.Caching.CacheAllStreams)</td>
    <td>Caching</td>
    <td>Cache all streams passing through</td>
  </tr>

  <tr>
    <td>

[Children](xref:ToSic.Eav.DataSources.Children)</td>
    <td>Relationships</td>
    <td>Get all related child entities</td>
    <td>v12.10</td>
  </tr>

  <tr>
    <td>

[CmsBlock](xref:ToSic.Sxc.DataSources.CmsBlock)</td>
    <td>Get Data</td>
    <td>
      <details>
        <summary>
          Current Module instance data …
        </summary>
          Will get the content-items assigned to a Dnn-Module. This is used internally on each view, but can also be used when using module-data to configure a query.
      </details>
  </tr>

  <tr>
    <td>

[Csv](xref:ToSic.Eav.DataSources.Csv)</td>
    <td>Get Data</td>
    <td>Get data from a CSV-file</td>
  </tr>


  <tr>
    <td>

[DataSourceBase](xref:ToSic.Eav.DataSource.DataSourceBase)</td>
    <td>(base)</td>
    <td>The base class for all DataSources</td>
  </tr>

  <tr>
    <td>

[DataTable](xref:ToSic.Eav.DataSources.DataTable)</td>
    <td>Get Data</td>
    <td>Base class for coding using .net Tables</td>
  </tr>

  <tr>
    <td>

[EntityIdFilter](xref:ToSic.Eav.DataSources.EntityIdFilter)</td>
    <td>Filter</td>
    <td>Get one or more items with specific Ids</td>
  </tr>

  <tr>
    <td>

[EntityTypeFilter](xref:ToSic.Eav.DataSources.EntityTypeFilter) </td>
    <td>Filter</td>
    <td>Get items of a specific content-type</td>
  </tr>

  <tr>
    <td>

[Error](xref:ToSic.Eav.DataSources.Error) </td>
    <td>(internal)</td>
    <td>Generate an error for [testing VisualQuery debug](xref:Basics.Query.Debug.Index)</td>
  </tr>

  <tr>
    <td>

[CustomDataSource](xref:ToSic.Eav.DataSource.CustomDataSource)</td>
    <td>(base)</td>
    <td>Base Class for custom data DataSources</td>
  </tr>


  <tr>
    <td>

[ItemFilterDuplicates](xref:ToSic.Eav.DataSources.ItemFilterDuplicates)</td>
    <td>Logic</td>
    <td>Find and remove OR retrieve duplicate items</td>
  </tr>

  <tr>
    <td>

[LanguageModeler](xref:ToSic.Eav.DataSources.LanguageModeler)</td>
    <td>Modify</td>
    <td>Restructure imported data to be multi-language</td>
    <td>v11.20</td>
  </tr>




  <tr>
    <td>

[OwnerFilter](xref:ToSic.Eav.DataSources.OwnerFilter)</td>
    <td>Filter</td>
    <td>Get items created by specific user</td>
  </tr>

  <tr>
    <td>

[Pages](xref:ToSic.Sxc.DataSources.Pages)</td>
    <td>CMS Data</td>
    <td>All the pages of the current site</td>
    <td>v15</td>
  </tr>

  <tr>
    <td>

[Paging](xref:ToSic.Eav.DataSources.Paging)</td>
    <td>Logic</td>
    <td>Page through items</td>
  </tr>

  <tr>
    <td>

[Parents](xref:ToSic.Eav.DataSources.Parents)</td>
    <td>Relationships</td>
    <td>Get all related parent entities</td>
    <td>v12.10</td>
  </tr>

  <tr>
    <td>

[PassThrough](xref:ToSic.Eav.DataSources.PassThrough)</td>
    <td>(internal)</td>
    <td>Do-Nothing DataSource mainly for testing</td>
  </tr>

  <tr>
    <td>

[PublishingFilter](xref:ToSic.Eav.DataSources.PublishingFilter)</td>
    <td>Filter</td>
    <td>
      <details>
        <summary>
          Filters items the current user shouldn't see …
        </summary>
          This is part of the "Unpublished-Data" concept.
          Since each item could be either published or draft,
          this helps you show the correct ones for the current user based on his edit-rights.
          It's automatically in the default pipeline, unless you explicitly don't want it.
      </details>
    </td>
  </tr>

  <tr>
    <td>

[Query](xref:ToSic.Eav.DataSources.QueryRun)</td>
    <td>(internal)</td>
    <td>Internal system to run [Queries](xref:Basics.Query.Index)</td>
  </tr>

  <tr>
    <td>

[QueryRun](xref:ToSic.Eav.DataSources.QueryRun)</td>
    <td>Sub-Query</td>
    <td>Run another query and use results</td>
  </tr>

  <tr>
    <td>

[RelationshipFilter](xref:ToSic.Eav.DataSources.RelationshipFilter)</td>
    <td>Filter</td>
    <td>Filter items with a specific relationship </td>
  </tr>


  <tr>
    <td>

[Serialization Configuration](xref:ToSic.Eav.DataSources.Serialization)</a></td>
    <td>special</td>
    <td>Control created JSON content for security and optimization</td>
  </tr>

  <tr>
    <td>

[Sites](xref:ToSic.Sxc.DataSources.Sites)</td>
    <td>CMS Data</td>
    <td>All the sites of the current system</td>
    <td>v15</td>
  </tr>


  <tr>
    <td>

[Shuffle](xref:ToSic.Eav.DataSources.Shuffle)</td>
    <td>Logic</td>
    <td>Shuffle/randomize item order</td>
  </tr>

  <tr>
    <td>

[Sql](xref:ToSic.Eav.DataSources.Sql)</td>
    <td>Get Data</td>
    <td>
      <details>
        <summary>
          Get SQL data as entities …
        </summary>
          This lets you get data from any SQL data base.
          It also has powerful script-injection protection, so messy parameters won't hurt it.
      </details>
  </tr>

  <tr>
    <td>

[StreamFallback](xref:ToSic.Eav.DataSources.StreamFallback)</td>
    <td>Logic</td>
    <td>
      <details>
        <summary>
          Returns the first stream having data …
        </summary>
        Use this to choose from multiple in-streams which data to show.
        It will use all the in-streams sorted A-Z, and return the first stream which can deliver data.
        The remaining streams will not be queried.
      </details>
  </tr>

  <tr>
    <td>

[StreamMerge](xref:ToSic.Eav.DataSources.StreamMerge)</td>
    <td>Logic</td>
    <td>Merge multiple streams into one</td>
  </tr>

  <tr>
    <td>

[StreamPick](xref:ToSic.Eav.DataSources.StreamPick)</td>
    <td>Logic</td>
    <td>
      <details>
        <summary>
          Pick a stream by stream-name…
        </summary>
        Use this to pick one of multiple in-streams by name. Often used together with the token [Params:ShowDrafts]
      </details>
  </tr>

  <tr>
    <td>

[SystemStack](xref:ToSic.Eav.DataSources.Sys.SystemStack)</td>
    <td>Get Data</td>
    <td>All the Settings / Resources of the current System and App</td>
    <td>v15</td>
  </tr>


  <tr>
    <td>

[TreeModeler](xref:ToSic.Eav.DataSources.TreeModeler)</td>
    <td>Modify</td>
    <td>Restructure imported data to have tree-relationships</td>
    <td>v11.20</td>
  </tr>


  <tr>
    <td>

[ValueFilter](xref:ToSic.Eav.DataSources.ValueFilter)</td>
    <td>Filter</td>
    <td>Filters by value</td>
  </tr>

  <tr>
    <td>

[ValueSort](xref:ToSic.Eav.DataSources.ValueSort)</td>
    <td>Sort</td>
    <td>Sorts all items by values</td>
  </tr>



</table>

## Dnn DataSources

These are Dnn specific DataSources and won't work on Oqtane.

<table>
  <tr>
    <td><strong>Data Source</strong></td>
    <td><strong>Purpose</strong></td>
    <td><strong>Description &amp; Details</strong></td>
  </tr>



  <tr>
    <td>Dnn FormAndList</td>
    <td>Get Data</td>
    <td>Get data from the old FnL
      <details>
        <summary>
          Use old FnL data in 2sxc …
        </summary>
          Will let you access Form-And-List aka UDT (Universal Data Table) data.
          Note that this DataSource is in external DLLs and has not been maintained, it probably doesn't work any more.
      </details>
    </td>
  </tr>

  <tr>
    <td>

[DnnSql DataSource](xref:ToSic.Sxc.Dnn.DataSources.DnnSql)</td>
    <td>Get Data</td>
    <td>Get data from the Dnn Database</td>
  </tr>

  <tr>
    <td>

[DnnUserProfile](xref:ToSic.Sxc.Dnn.DataSources.DnnUserProfile)</td>
    <td>Get Data</td>
    <td>Get Dnn Users and profiles </td>
  </tr>

</table>


## Internal / System DataSources

These data sources are used internally, like for selecting an App in an edit dialog.

<table>
  <tr>
    <td><strong>Data Source</strong></td>
    <td><strong>Purpose</strong></td>
    <td><strong>Description &amp; Details</strong></td>
    <td><strong>Ver.</strong></td>
  </tr>

  <tr>
    <td>

[Apps](xref:ToSic.Eav.DataSources.Sys.Apps)</td>
    <td>(system)</td>
    <td>Get all Apps in a Zone/Site</td>
  </tr>

  <tr>
    <td>

[Attributes](xref:ToSic.Eav.DataSources.Sys.Attributes)</td>
    <td>(system)</td>
    <td>Get all Attributes of a Content-Type</td>
  </tr>

  <tr>
    <td>

[Block](xref:ToSic.Sxc.DataSources.CmsBlock)</td>
    <td>(system)</td>
    <td>Helper to correct data with Templates</td>
  </tr>

  <tr>
    <td>

[ContentTypes](xref:ToSic.Eav.DataSources.Sys.ContentTypes)</td>
    <td>(system)</td>
    <td>Get all ContentTypes of an App</td>
  </tr>

  <tr>
    <td>

[Features](xref:ToSic.Eav.DataSources.Sys.Features)</td>
    <td>(system)</td>
    <td>All the features in the the current system</td>
    <td>v15</td>
  </tr>

  <tr>
    <td>

[Licenses](xref:ToSic.Eav.DataSources.Sys.Licenses)</td>
    <td>(system)</td>
    <td>All the licenses in the the current system</td>
    <td>v15</td>
  </tr>

  <tr>
    <td>

[MetadataTargetTypes](xref:ToSic.Eav.DataSources.Sys.MetadataTargetTypes)</td>
    <td>(system)</td>
    <td>All the Metadata Target Types in the EAV</td>
    <td>v15</td>
  </tr>

  <tr>
    <td>

[QueryInfo](xref:ToSic.Eav.DataSources.Sys.QueryInfo)</td>
    <td>(system)</td>
    <td>Provide debug info when creating Queries</td>
  </tr>

  <tr>
    <td>

[Scopes](xref:ToSic.Eav.DataSources.Sys.Scopes)</td>
    <td>(system)</td>
    <td>All the sites of the current system</td>
    <td>v15</td>
  </tr>

  <tr>
    <td>

[Zones](xref:ToSic.Eav.DataSources.Sys.Zones)</td>
    <td>(system)</td>
    <td>Get all Zones (Sites) in an installation</td>
  </tr>

</table>





















## Demo App and further links

You should find some code examples in this demo App

* ...

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)

## History

1. Introduced in 2sxc ??.??
2.
