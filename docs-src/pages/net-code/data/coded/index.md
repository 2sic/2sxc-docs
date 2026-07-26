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

See [](xref:NetCode.Data.Coded.Entities)



## Notes (Chaotic)

### Scenarios

1. Data to Entities only --> `Raw` or `anonymous` or object w/`IRawEntityConvertible`; optionally with `[ContentType]` attribute
1. Entities to Model only --> `X...FromEntityModel` w/matching ID/Name???
1. Data to Entities to Model


### Necessary C# Attributes

1. `[ModelSpecs]` - for the model itself, for example to set the name, global identifier etc.
