
### 2sxc v21.02.00 (2026-02-18)

#### General Enhancements

1. 🩸 Oqtane: Multi-Tenant support still being enhanced (previous release had some upgrade bugs.)
1. 📖 Improve docs - especially the [Contribute to Code](xref:Abyss.Contribute.Code.Index) section

<!-- #### 🧩 Extensions

1. 🧩 Extensions: WIP -->

#### 💲 OData (Major Updates)

1. 💲 OData: Introduce `$casing` query option to control casing of returned JSON properties (`$casing=camel`)
1. 💲 OData: Make sure that OData parameters on a query only apply to the primary `Default` stream.
1. 💲 OData: Introduce ability to specify other parameters by stream, so that `$select` applies to the `Default` stream, but `Books$select` applies to the `Books` stream. (BETA, may still change)
1. 💲 OData: Reorg code structure (internal)


#### 🌪️ Data Sources and Visual Query (Major Updates)

1. 🌪️ Create generic `SysData` DataSource to provide quick access to all kinds of data to the UI.
1. 🌪️ Introduce **Confidentiality** model for data sources, so that `SysData` doesn't leak data to the UI which the user shouldn't see.
1. 🌪️ Create query `System.SysData` to provide access to `SysData` in queries and REST APIs.
1. 🌪️ Introduce `*` (internal) wildcard Visual Query connections to pass all streams from one DataSource to another without having to specify them all. This is especially useful for `SysData` which can have many streams.
1. 🌪️ ✏️ Improve VisualQuery UI to properly support `*` wildcard connections, and to show them in the UI with a different style to indicate that they are dynamic.
1. 🌪️ ✏️ Improve VisualQuery UI to show tabs by stream name, making it easier to see the results

#### 🧑🏼‍💻 Code generator / Copilot (Major Updates)

1. 🧑🏼‍💻 Improve log to indicate which **CodeGenerator** created the changes
1. 🧑🏼‍💻 🌪️ Create DataSources for use with `SysData` to provide `CodeGenerators` and `Editions`
1. 🧑🏼‍💻 ✏️ Enhance code-generation configurations to specify `Edition`
1. 🧑🏼‍💻 ✏️ Enhance code-generation configuration to specify "generate all" vs. "generate specific content-types"
1. 🧑🏼‍💻 ✏️ Enhance UI to manage code-generation configurations

#### 💃🏼 Models

1. Introduce `TryGetMetadata<T>` to get metadata of a content-type, which is especially useful for code-generation scenarios where you want to check if a content-type exists and get its metadata without throwing an exception.
1. Improve Model lookup to support interfaces which can define which class/record to use
1. Introduce the `INoteModel` to access Notes Metadata on items/pages/modules etc.


#### Minor

(none)

#### Bugfixes

1. 🐞 Fix UI to configure Pickers - problem was with the Attributes DataSource.
1. 🐞 Fix Polymorphism in Admin UI (Views), broken in v21.01

#### Internal and Code Hygiene

1. 🧑🏼‍💻 EAV-UI: Introduce a generic `SysData` service to easily work with SysData endpoints
1. 🌪️ Move various classes related to DataSource Queries to a better namespace
1. 🌪️ Visual Query: Refactor models, simplify
1. 🌪️ Improve internal DataSource construction, to use our new standardized `Setup(options)` mechanism
1. 🌪️ Shrink down surface of the DataSourceService
1. 🌪️ Refactor DS - DataSourceLink, unit tests etc.
1. 🔌 API: Move Polymorphism info to use Datasources instead of APIs
1. 🔌 API: Move RecycleBin to use DataSources instead of APIs

#### Experimental / WIP

1. Introduce `IDataProcessor` to customize how data gets stored / loaded
1. Introduce `DataStorageDecorator` to specify how ContentTypes get processed
    1. Introduce a max-items limit to prevent accidental creation of too many items (for some content types, only 1 is allowed)
    1. 🌪️ Create DataSource to show all possible DataProcessors
    1. Allow configuring a preferred DataProcessor for a content-type, so that it gets used automatically when working with that content-type in the UI
1. Implement DataProcessing for `pre-load` and `pre-save`
1. Create a DataProcessor which restricts any editing on certain content-types to host-users only and test in on permissions.

[!include["Changes"](./_brc02.00.md)]
