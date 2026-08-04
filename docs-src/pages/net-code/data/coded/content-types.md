---
uid: NetCode.Data.Coded.ContentTypes
---

# Coded Content-Type Definitions new v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.


## Background

Content Type Definitions contain the schema of an entity.
They are objects which contain basic information such as

1. a unique ID (Guid)
1. a name
1. all the field definitions

Internally every Content-Type-Definition are _assembled_ using various Builders and Assemblers.
The specs which lead to this assembly are loaded from various sources, including:

1. The SQL database (the "normal" content-types)
1. JSON files (for content-types which are usually loaded from the file system because they are global)
1. Code-based definitions (for content-types which are used in code and should be strongly typed)

> [!TIP]
> The cases "SQL" and "JSON" are documented elsewhere.
> Here we only focus on the code-based definitions.


## Need for Code-Based Content-Type Definitions

There are many cases where we have _both_ strictly typed C# data objects and entities,
representing the same data. There are 2 typical scenarios:

1. **DB Data**: Common data which comes from the DB (such as view definitions) which is used in code and services.  
    _This data already has a content-type definition generated, this is not the topic here._

1. **Service Data**: Data which comes from a service, and is converted to entities
    (such as user information, site information, statistical information etc.)  
    _This is what we're looking at._

**Service Data** is prepared in POCO objects
and converted to entities for further processing and forwarding
to the UI (through REST/JSON) or to Razor (through services or DataSources).

> [!TIP]
> Giving **Service Data** a clear type allows for later conversion of the entities to models.

> [!IMPORTANT]
> Not every raw data object needs a content-type definition.
>
> We only need it on raw objects which are converted to entities
> **and** which are expected to be converted back to strongly typed objects later on.
>
> This is because automatic `ToModel` conversion needs to know the exact name.
> Without a custom [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) attribute,
> the name of the content-type will be derived from the class name, which may not be what you want.


## Content-Type Definition - With or Without Attributes

It's important to know that every **Raw** to **Entity** conversion needs a content-type definition.
So it will always be generated automatically.

The only question is whether you need full control of the definition,
or whether you are happy with the automatic defaults.



## Example

Here's an example of an object with attributes to specify the content-type definition:

```csharp
/// <summary>
/// Content-Type for the general settings of a field (attribute) on a content-type.
/// </summary>
/// <remarks>
/// Note that as of 2026-07-26 there is no model yet to use, but it should be added soon.
/// </remarks>
[ModelSpecs(ContentType = Constants.ContentTypeName)]
[ContentType(
    Name = Constants.ContentTypeName,
    Guid = "0bab4be8-e795-4d9f-b50e-f7ec161ed8cb",  // If possible, should match the guid of the real database content-type, if it exists
    Description = "General settings for every Attribute (field) on a Content-Type."
)]
public interface IFieldSettingsGeneral : IModelFromEntity<FieldSettingsGeneralModel>
{
    [PrivateApi]
    public static class Constants { public const string ContentTypeName = "@All"; }

    [ContentTypeField(IsTitle = true)]
    string Name { get; }

    string DefaultValue { get; }

    /// <summary>
    /// Description of this field.
    /// </summary>
    string Notes { get; }

    /// <summary>
    /// The official input-type - usually something like `@string-default`
    /// </summary>
    string InputType { get; }

    //...
}
```

## Controlled Content-Type Definition Specs

These specs are mainly needed for

* serialization activities (such as `IsTitle` information)
* detecting the type name/guid (like when converting back to models later on)

You can define custom specs on auto-generated Content Type Definitions using these attributes:

1. [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) - to set name / guid etc. on the class which defines the content-type

1. [`[ContentTypeUse]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeUseAttribute) - to reference another class which defines the content-type.

1. [`[ContentTypeField]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeFieldAttribute) - to configure a field of the content-type, mainly for description, is-title etc.

1. [`[ContentTypeIgnore]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeIgnoreAttribute) - to exclude object properties in the content-type definition


## Internals

### Auto-Generated Content-Type Definitions

Code defined types are automatically generated on-the-fly from C# classes, records and/or interfaces,
usually at the time they are needed (during conversion of raw data to entities) and the resulting content-type is cached for future use.

Internally this is handled by two important components:

1. The `ContentTypesFromCodeBuilder` - the system which builds a content-type definition from a C# class, record or interface
1. The `ContentTypesFromCodeManager` - the system which manages and caches the content-type definitions



### General Requirements and how it's Implemented

For this to work we want:

1. To use the same C# POCOs to generate the content-type definition (to avoid separate definitions which can accidentally vary) - done by the `ContentTypesFromCodeBuilder`
1. Automatically convert any POCO class/record to a content-type definition when needed - `ContentTypesFromCodeBuilder`
1. Cache the generated content-type definitions to avoid repeated generation - `ContentTypesFromCodeManager`
1. Reliably detect which type should be used based on the code itself, to use the _same_ definition for each conversion, even on future requests - `IDataFactory` with `ContentTypesFromCodeManager`
    ...with option to manually set a different type, if needed (but should be rarely used)


### Remarks about Anonymous Types

These will also be treated as if they were classes/records, without any decoration.
The content-type will be generated based on the properties of the anonymous type.
It will also cache the type, for future re-use, since these will usually be created again (anonymous types in C# are actually real types).

## Maturity of the System as of 2026-07-24 (2dm)

1. Descriptions work with
    1. No attributes at all (automatic defaults)
    1. With [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) and [`[ContentTypeField]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeFieldAttribute) attributes
    1. Also on special properties such as `Id`, `Guid`, `Created`, `Modified` (added as special decorator `ContentTypeBuiltInAttributesDecorator` to the content-type)
1. Ignore attribute works using [`[ContentTypeIgnore]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeIgnoreAttribute) attribute
1. Builder can build from
    1. Anything with or without specs attributes
    1. classes (verified and has unit tests)
    1. records (verified and has unit tests)
    1. interfaces (verified and has unit tests)
    1. all of the above having a [`[ContentTypeUse]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeUseAttribute) attribute to assign a different content-type (verified and has unit tests)
    1. anonymous - only without specs attributes (verified and has unit tests)
1. Caching is working
1. internal properties such as `Id` etc. are excluded in the content-type definition
1. Test coverage for all these features and combinations

> [!TIP]
> As of 2026-07-24 it appears that all cases are implemented and have unit tests covering them.
