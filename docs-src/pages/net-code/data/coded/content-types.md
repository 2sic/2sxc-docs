---
uid: NetCode.Data.Coded.ContentTypes
---

# Coded Content-Type Definitions new v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

Content Type Definitions contain the schema of an entity.
They are objects which contain basic information such as a global ID, a name, identifier and all the attribute definitions.

Internally every Content-Type-Definition are _assembled_ using various Builders and Assemblers.
The specs which lead to this assembly are loaded from various sources, including:

1. The SQL database (the "normal" content-types)
1. JSON files (for content-types which are usually loaded from the file system because they are global)
1. Code-based definitions (for content-types which are used in code and should be strongly typed)

The cases "SQL" and "JSON" are documented elsewhere.
Here we want to focus on the code-based definitions.

## Need for Code-Based Content-Type Definitions

There are many cases where we also need strictly typed C# data objects representing the same
data, in which case it's better to use code-based content-type definitions.
This is especially common for data which will be represented as Entities, but does not stem from the database but from environment information - such as a user, a site, statistical information etc.

In such scenarios, the data will be prepared in normal objects and converted to entities for further processing and forwarding to the UI (through REST/JSON) or to Razor (through services or DataSources).

Giving it a clear type helps ensure consistency and also allows for converting the generic entities back to strongly typed objects for further processing.

## Auto-Generated Content-Type Definitions

Code defined types are automatically generated on-the-fly from C# classes, records and/or interfaces,
usually at the time they are needed (during conversion of raw data to entities) and the resulting content-type is cached for future use.

Internally this is handled by two important components:

1. The `ContentTypesFromCodeBuilder` - the system which builds a content-type definition from a C# class, record or interface
1. The `ContentTypesFromCodeManager` - the system which manages and caches the content-type definitions

## General Requirements and how it's Implemented

For this to work we want:

1. To use the same C# POCOs to generate the content-type definition (to avoid separate definitions which can accidentally vary) - done by the `ContentTypesFromCodeBuilder`
1. Automatically convert any POCO class/record to a content-type definition when needed - `ContentTypesFromCodeBuilder`
1. Cache the generated content-type definitions to avoid repeated generation - `ContentTypesFromCodeManager`
1. Reliably detect which type should be used based on the code itself, to use the _same_ definition for each conversion, even on future requests - `IDataFactory` with `ContentTypesFromCodeManager`
    ...with option to manually set a different type, if needed (but should be rarely used)

## Controlled Content-Type Definition Specs

Allow for specifying specs of the content-type definition using these attributes:

1. `ContentTypeSpecs` - for the content-type itself, for example to set the name, global identifier etc.
1. `ContentTypeAttributeSpecs` - for the attributes of the content-type, for example to set the description, is-title etc.
1. `ContentTypeAttributeIgnore` - to exclude internal object properties from being included in the content-type definition

These specs are mainly needed for certain serialization activities (such as `IsTitle` information) and for detecting the type (like when converting back to models later on).

## Remarks about Anonymous Types

These will also be treated as if they were classes/records, without any decoration.
The content-type will be generated based on the properties of the anonymous type.
It will also cache the type, for future re-use, since these will usually be created again (anonymous types in C# are actually real types).

## Maturity of the System as of 2026-07

1. Builder can build from
    1. Anything with or without specs attributes
    1. classes (verified and has unit tests)
    1. records (verified and has unit tests)
    1. interfaces (verified and has unit tests)
    1. anonymous - only without specs attributes (verified and has unit tests)
1. Caching is working
1. Test coverage for all these features and combinations

> [!TIP]
> As of 2026-07-24 it appears that all cases are implemented and have unit tests covering them.
