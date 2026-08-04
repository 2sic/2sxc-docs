---
uid: NetCode.Data.Coded.Index
---

# Coded Data Handling and Models WIP v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

2sic has a sophisticated data handling system for generic data, centered around
**DataSources** which pass around **Entities**.
These in turn have a **Content-Type Definition** which describes the structure of the data.

For various reasons including communication with the front-end and custom code,
most of the system data should be available in three forms:

1. As **POCOs** - which are "plain old CLR objects" objects or similar structures used in services
1. As **Entities** - which are generic objects with a content-type definition matching the structure of the data
1. As **Models** - which are strongly typed objects with a clear structure, usually defined in code

> [!TIP]
> To reduce the amount of code and documentation,
> we strive to keep the structure of the **Raw Data**, **Entities** and **Models** the same,
> so that they can be converted back and forth without loss of information.



## Work in Progress v22 / Goals

Standardizing this in v22 and explained here.
It's still a work in progress, but the goal is to have a clear and easy to use system for converting between these three forms of data.

The final implementation must make it easy to:

1. Work with (POCOs) in code and services
1. Quickly convert these POCOs to generate entities, which are assigned a content-type definition
1. ... which matches the structure of the data (field names/types)
1. ... these Content-Type Definitions must be auto-generated based on the POCOs, and must be cached for future use
1. Make it easy to quickly back-convert entities to POCO Models.
1. Make it easy to reliably share the structure of POCOs and the Models using interfaces (optional, only when needed)
1. ... and if interfaces are used, make sure that the content-type definition is generated based on the interface as the master



## Terminology

1. **Source Data** - data as it's usually being created internally, usually in code or services, and usually in POCOs or anonymous objects

    1. **POCOs** (Plain Old CLR Objects) - the C# data objects, usually used in services and code

    1. **DTO** (Data Transfer Objects) - the (old) C# data objects, usually used as return-objects from services and APIs _we are working to replace this with POCOs_

    1. **Raw Entity** - POCO objects which can be converted to Entities, usually with a [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) attribute or implementing `IRawEntityConvertible`

1. **Public, Strongly Typed Data** - data in a form which can be used in public APIs

    1. **Model** - the strongly typed _lightweight_ objects with a clear structure, usually defined in code

    1. **Data Interface** - a C# interface which can be used to define the structure of a model, usually used to share the structure between POCOs and Models

    1. **Typed Item** - a special type of model which implements a lot of APIs mainly for use in Razor templating, such as `ITypedItem` and `ITypedEntity`

1. **Generic Data** - data in a generic form, usually used internally in 2sxc and passed around in DataSources

    1. **Entity** - the generic objects with a content-type definition matching the structure of the data

    1. **Content-Type Definition** - the definition of the structure of an entity, usually generated from code or loaded from the database

1. **Conversion** - the process of converting between these forms of data, usually using static extension methods or factories

    1. **Code to Content-Type** - the content-type definition generated from code, usually from POCOs or interfaces, often based on a [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) attribute

    1. **Raw to Entity** - the process of converting a POCO or anonymous object to an Entity,  or implementing `IRawEntityConvertible`

    1. **Entity to Model** - the process of converting an Entity to a strongly typed Model, usually using a factory or static extension methods

1. **Conversion System** - the systems which handle conversions

    1. **Factories** - the classes which handle the conversions like
        `IDataFactory` (raw to entity), `IModelFactory` (to create models),
        `IContentTypeFromCodeFactory` (to create content-type definitions from code).

    1. **Static Extension Methods** - the methods to convert between _Entities_ and _Models_
        when they don't need any context (otherwise a factory must be used, eg. for _Typed Items_).


## Usage Guide

If you are a Dnn / Oqtane developer and simply want to use the data provided by 2sic,
or you want to create DataSources which provide data to the front-end, you should...

### Using Entities to Models

TODO: WRITE GUIDE


### Create Custom Data Sources Providing Entities

TODO: WRITE GUIDE


## Implementation Guide (for 2sxc/EAV developers)

It's important that our code is easy to maintain and extend,
so we want to have a clear system for converting between these forms of data.

Because perfection and consistency matters,
you must really understand what we're doing here,
especially while a lot of the code is not yet in the  final form.


## Step 1 Content Type Definitions

> [!TIP]
> The Content-Type Definition is important for any raw data which
> is expected to be later converted to an Entity.
>
> So for truly internal data which we don't plan to expose to the public API, this is not needed.
> Otherwise you should really do this properly.

See [](xref:NetCode.Data.Coded.ContentTypes)


## Step 2: Conversion of Raw Data to Entities

> [!TIP]
> This is mainly important for our current **SysData** system.
> That's the current focus of documentation.

See [](xref:NetCode.Data.Coded.Entities)


## Step 3: Conversion of Entities to Models

See [](xref:NetCode.Data.Coded.Models)



## Notes (Chaotic)

### Scenarios

1. Data to Entities only --> `Raw` or `anonymous` or object w/`IRawEntityConvertible`; optionally with [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) attribute
1. Entities to Model only --> `X...FromEntityModel` w/matching ID/Name???
1. Data to Entities to Model


### Necessary C# Attributes

1. `[ModelSpecs]` - for the model itself, for example to set the name, global identifier etc.
