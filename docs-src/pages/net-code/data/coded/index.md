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


## Step 3: Conversion of Entities to Models

This will be very common in own code, basically to use typed data access to entities.

This is the general setup

1. We have model classes/records, which implement a setup-method so they can be used to receive an entity and provide a strongly typed model.
1. We have a `ModelFactory` which can take an entity and convert it to a model, using the setup-method of the model class/record.
1. There are various extension methods which can run on various sources to get & convert them to models. They should exist on
    1. `IEntity` - to convert a single entity to a model
    1. `IEnumerable<IEntity>` - to convert a list of entities to a list of models
    1. `IHasMetadata` - to get a specific metadata item according do conventions
1. Internally there will usually be some type-checks to prevent accidental misuse
1. Additional APIs such as on `DataSources` will also pick specific streams or filter by content-type, depending on the exact setup.

For reliability...

1. All things which can be used as models must implement `IModelFromEntity`.
    The interface itself does not have any properties, but it's a marker to ensure that the compiler won't let you try model conversions with objects that don't support any conversion.


Some Tricky bits

1. You can pass in a model directly - and this should just work
1. But often you may also just want to pass in an interface - especially with 2sxc-system provided models, where we don't want to bleed the internals.
    1. These interfaces have a decorator `[ModelSpecs]` which lets the converter know which class to use for the conversion.
    1. The result object should of course implement this interface, otherwise things won't work as the result is typed according to the specified interface.
1. It's not fully clear yet which APIs will test for name of the Content-Type and which not - must be clarified ⚠️
1. It's not fully clear how the name lookup works automatically, for example when using interfaces or `...Model` suffixes - must be clarified ⚠️

### Special note about Context-Free Operations

All of this casting should work without any context, so it can be triggered by static extension methods.
So this is really just meant to improve using data reliably.

In very rare cases, some context or something is needed, in which case
a factory must be supplied of the type `IModelFactory` which can be used to provide the context or other information needed for the conversion.

Objects which must use a factory should declare this by attaching the interface `IModelFactoryRequired` to the model class/record.

### Special case about Interfaces

There are various cases where data must be converted to entities, and back to models.
In these cases we are forced to use different objects (one for creating the Raw data, one for reading the entity).
This is not elegant, but at the moment the most robust setup possible.

As this will usually only be relevant for 2sxc provided objects, the implementation is as follows:

1. There will be an interface, such as the `IPagingModel`.
1. Both the raw data object and the `...ModelFromEntity` will implement this interface.
1. Creating data will use the raw-data-object, and reading data will use the `...ModelFromEntity`.
1. Both Raw and `...ModelFromEntity` will usually be internal, to not bleed out code for accidental use.

### Incomplete Conventions ⚠️⚠️⚠️

1. if we have interface + raw + model, which one should hold the content-type definition? ⚠️
1. If we need the type-name, it should probably be in a `Constants` sub-class of the interface, to be "together".
1. In some cases (such as sub-entity relationships) the interface may need to prefer the model-variant,
    while the raw implementation will choose to do things differently

1. It's still not 100% clear when to use `IModelFromEntity` and `IModelFromData`

## Notes (Chaotic)

### Scenarios

1. Data to Entities only --> `Raw` or `anonymous` or object w/`IRawEntityConvertible`; optionally with `[ContentType]` attribute
1. Entities to Model only --> `X...FromEntityModel` w/matching ID/Name???
1. Data to Entities to Model


### Necessary C# Attributes

1. `[ModelSpecs]` - for the model itself, for example to set the name, global identifier etc.
