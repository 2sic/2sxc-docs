---
uid: NetCode.Data.Coded.Index
---

# Coded Data Handling and Models WIP v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

For data to be processed it sometimes needs to be treated as an entity - with a corresponding type, and sometimes it needs to be treated as a pure objects.
This is being standardized more in v22 and explained here.

## Goals

The final implementation must make it easy to:

1. Provide raw data (POCO) to generate entities which have a clear content-type assigned
1. Have re-used, strongly typed content-type objects attached to all data explaining the structure
1. Make it easy to quickly back-convert entities to POCO Models.

## Terminology TODO

1. Raw data
1. Model
1. Code based Content-Type

## Step 1 Content Type Definitions

See [](xref:NetCode.Data.Coded.ContentTypes)


## Step 2: Conversion of Data to Entities

This is used both for providing internal data through the DataSource system
and for custom DataSources which will provide new data to an application.

There are a few ways this can happen:

1. Either the data object (class/record) implements `IRawEntity` and provides the necessary information itself
2. Or it provides a converter using TODO
3. Or it's just a plain object and is converted using reflection (which is more time consuming)

TODO: document the RawEntity, the conversion, standardize naming etc.

Internally this is done by 2 important components:

1. The `IDataFactory` which can handle IRawEntity and Conversion objects and convert them to entities
1. The `CustomDataSource` which can also convert anonymous objects

TODO: move code from CustomDataSource to specialized Factory and make it more generic, so that it can be used in other places too.

## Step 2 Bonus: Content-Type Assignment to Converted Data

To make future back-conversions to models easier and better,
it's often important that generated data
knows what content-type it came from - so that `User` data is not confused with `Site` data.

Objects which implement `IRawEntity` or the `Conversion` can also specify which coded-content-type they are associated with, so that the system can use the correct content-type for the entity.
If it is not specified, the object itself will be used to create a definition; if it's anonymous, a neutral name will be used.
Even anonymous object definitions will be cached, as anonymous objects are still strongly typed.

TODO: explain how etc. finalize naming etc.
