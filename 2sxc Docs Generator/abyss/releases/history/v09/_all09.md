
## Version 9

### Changes Version 9.0
* [x] Change data access to Entity Framework Core 1.1
* [x] Change IoC Layer to use .net Core mechanisms 
* [x] Replace Quick-Dialogs with Angular4 implementation

### Changes Version 9.1
* [x] Move primary quick-dialog GUI to bottom of page

### Changes Version 9.3
* [x] Item-Level versioning, history and rollback

### Changes Version 9.4
* [x] Drop all dependencies to Telerik - file browser using ADAM

### Changes Version 9.5
* [x] [Support for Dnn/Evoq Page Publishing](xref:Basics.Cms.PagePublishing.Index)

### Changes Version 9.6
* [x] [Extensive logging system to watch all internals](https://2sxc.org/en/blog/post/releasing-2sxc-9-6-with-extensive-logging)

### Changes Version 9.7 - the JSON-Content-Types & Entities Upgrade
* [x] New features in entity json serialization
  * [x] Support for schema-free (very dynamic) entities
* [x] new features in content-type json serialization
    * [x] defined json format for content-types
    * [x] full serialization and deserialization of json-based content types
* [x] SQL IRepository storage enhancements
    * [x] extended SQL table Entities to also store AppId and ContentType (name) to ensure that json-entities can be stored
    * [x] Support to persist entities as JSON in repository (DB)
* [x] file-storage implementation of IRepository loader, to created a standard-based app-content-types provider
    * [x] Ability to provide file-based json content-types at a system level, which is probably the better solution for most scenarios (more flexible, easier to spot changes, etc.) 
* [x] global content-types system
    * [x] Support for code-provided content-types, which allows faster feature-evolution
    * [x] ~~Support for JSON based i18n on code-provided content-types, to allow better translation~~ removed again, as not needed
* [x] Ensure export/import of data of these new content-types (req. extensive refactoring)
* [x] extensive automated testing of these new features


### Changes Version 9.8 - the VisualQuery Upgrade
* [x] SqlDataSource in [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer
* [x] Show DataSources which have Fallback-In-Streams in [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer
* [x] UI Updates on [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer, to better fit current needs
* [x] More help documentation for various data sources in [VisualQuery](xref:Basics.Query.VisualQuery.Index) Designer
* [x] Shuffle DataSource now configurable in VisualQuery
* [x] Support for Schema-Free Content (dynamic, without existing content-type)

### Changes Version 9.9 - another VisualQuery Upgrade
* [x] Enhance relationship filter to enable filtering on other fields of related items
* [x] Enhance other data sources with features which so far were not available in the visual designer

### Changes Version 9.10 - Combobox and more DataSources (WIP)
* [x] Combobox input type allowing a [dropdown with values](xref:Basics.Data.Fields.String-Dropdown), but also allowing manual typing (to select pre-defined values, but also use Tokens)
* [x] [StreamMerge DataSource](xref:ToSic.Eav.DataSources.StreamMerge)
* [x] [ItemFilterDuplicates DataSource](xref:ToSic.Eav.DataSources.ItemFilterDuplicates)
* [x] feature to export Json ContentTypes
* [x] multiple file-repos which deliver Content-Types, allows for any module to provide additional contenttypes

### Changes Version 9.11 - Query-Picker & more DataSources
* [x] Entity-Picker delivering items from a query, instead of a type
* [x] string-dropdown-query to pick string-items from a query instead of pre-filled
* [x] query export / import
* [x] multi-select items in a string-query-picker

### Changes Version 9.12
* [x] Json-based global query definitions
* [x] Method to add parameters to a called query (like when using an entity-pickers which uses a query)
* [x] pre-build queries for things like zones, apps, content-types, fields, query-info etc.
* [x] data sources for Zones, Apps, Queries, Attributes, etc.
* [x] limit streams returned by a query

### Changes Version 9.13

* [x] Enhanced API to create custom DataSources + ca. 10 blog posts for that
* [x] Standalone FnL / UDT DataSource (removed it from core distribution)

### Changes Version 9.14 LTS

* [x] New LTS Concept - see [blog post about LTS 9.14](https://2sxc.org/en/blog/post/special-edition-2sxc-9-14-lts-long-term-support)


### Changes Version 9.15-9.42 LTS

Didn't have time to document this yet, sorry. If you need to know, best check the git-history.

