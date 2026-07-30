---
uid: NetCode.Data.Coded.Models
---

# Entity To Models WIP v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

todo

## Goals

1. Enable strictly typed access to data which is stored in entities.
1. Be able to do this without context, so it works in static code and other internal scenarios.
1. Ensure we have foundational models which have zero default properties (because of various JSON serialization aspects)

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
1. In scenarios where data must be filtered to find the ones to convert, use `[ModelSpecs(ContentType="...")]` to ensure the correct content-type is used for the conversion.
    1. Without this information, it will assume the name is the same as the model class/record name, which may not be true in all cases.
       It will also automatically try derived names such as removing leading `I` or trailing `...Model` or `...Raw` to find the correct content-type, but this is not guaranteed to work in all cases.
    1. if you do specify it, you can specify one or more names (CSV) or use `*` to not filter/restrict what is converted.

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

> [!TIP]
> We really need an interface, because sometimes we will have services returning the same data directly,
> in which case converting it to an entity doesn't make sense.
>
> But because we want API consistency between directly created data
> and data which is created from entities, we need to have a common interface for both.
>
> In general, the interface should be optimized for the use case of reading from entities,
> other raw-convert scenarios are not as important.
> So you may sometimes have attributes which the raw data doesn't need or care about.

As this will usually only be relevant for 2sxc provided objects, the implementation is as follows:

1. There will be an interface, such as the `IPagingModel`.
1. Both the raw data object and the `...ModelFromEntity` will implement this interface.
1. Creating data will use the raw-data-object, and reading data will use the `...ModelFromEntity`.
1. Both Raw and `...ModelFromEntity` will usually be internal, to not bleed out code for accidental use.

### Conventions for own code base

1. The interface should always hold the Content-Type Definition!
1. The ModelFromEntity
    1. must be public (unfortunately) for the `IModelFromEntity<...Model>` to work
    1. Should have a `[PrivateApi]` and a `[ShowApiWhenReleased(ShowApiMode.Never)]` attribute to prevent it from being shown in the docs
    1. should always be named `...Model` as it's shown in the docs, and we want the docs to show how to use it
1. The Raw model should always be called `...Raw` and if possible should be internal
1. Constants - if needed - should be on the interface as a sub-class

### Incomplete Conventions ⚠️⚠️⚠️

1. if we have interface + raw + model, which one should hold the content-type definition? ⚠️
1. If we need the type-name, it should probably be in a `Constants` sub-class of the interface, to be "together".
1. In some cases (such as sub-entity relationships) the interface may need to prefer the model-variant,
    while the raw implementation will choose to do things differently

1. It's still not 100% clear when to use `IModelFromEntity` and `IModelFromData`


## todos

1. probably rename `[ModelSpecs]` to `[Model]` ??
