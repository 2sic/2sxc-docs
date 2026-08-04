---
uid: NetCode.Data.Coded.Models
---

# Entity To Models WIP v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

To use strongly typed C# objects to work with data, we need to be able to convert **Entities** to **Models**.
There are various reasons for doing this:

1. You have an object which has entity-metadata, and you want a strongly typed object to read the data.
1. You have a data-source which provides information, and you want to use strongly typed objects to read the data.
1. You have a list of entities, and you want to extract/convert the ones you need, based on Id/Guid/Content-Type etc.

## Goals

1. Enable strictly typed access to data which is stored in entities.
1. Be able to do this **without context**, so it works in **static code** and other internal scenarios.
1. Ensure we have foundational models which have zero default properties (because of various JSON serialization aspects)

> [!IMPORTANT]
> The main difference between **Models** and **Typed Items** is that
> _Typed Items_ have context. For example, they can lookup `file:72` to get the link to the file,
> while _Models_ are context free and cannot do this.
>
> This makes it much simpler to use models.

> [!TIP]
> Technically the conversion systems can convent both _Models_ and _Typed Items_,
> but the _Typed Items_ need the help of a _Factory_.
> The Razor API such as `As<TModel>()` will work for both Models and Typed Items,
> while the extension methods like `ToModel<TModel>()` will only work for Models,
> _unless_ you also provide a factory, like `ToModel<TModel>(factory)`.

## Common Usage

### Razor (with Context)

In Razor you can use the `As<TModel>()` extension method to convert an entity to a model.
This works for both _Models_ and _Typed Items_.

```csharp
// Convert a single entity to a model
var model = entity.As<IPagingModel>();
// Convert a list of entities to a list of models
var models = entityList.AsList<IPagingModel>();
```

### C# Elsewhere

In most cases, you can convert a single entity to a model,
or a list of entities to a list of models, using the `ToModel` extension method.

```csharp
// Convert a single entity to a model
var model = entity.ToModel<IPagingModel>();
// Convert a list of entities to a list of models
var models = entityList.ToModels<IPagingModel>();
```

There are also many helper methods such as `FirstModel<TModel>` and more.

All these methods can also be used with a factory, which can provide context or other information needed for the conversion.
TODO: explain where the factory would come from.

```csharp
// Convert a single entity to a model with a factory
var model = entity.ToModel<IPagingModel>(factory);
// Convert a list of entities to a list of models with a factory
var models = entityList.ToModels<IPagingModel>(factory);
```

## Using `ToModelOptions` for Conversion

You can also provide options which regulate how conversions work, using the `ToModelOptions` class.

```csharp
// Convert a single entity to a model with options
var model = entity.ToModel<IPagingModel>(options: new ToModelOptions { /* set options here */ });
// Convert a list of entities to a list of models with options
var models = entityList.ToModels<IPagingModel>(options: new ToModelOptions { /* set options here */ });
```

The most common options would be

* `NullHandling` (an enum) - to determine how null values are handled during conversion
* `TypeName` (string) - to specify the content-type name for the conversion, if needed; set to `*` to not filter/restrict what is converted

## Automatic Content-Type Name Detection

Various Model conversions perform content-type name detection
to prevent accidental conversion to an incorrect model
or to filter out data which is not relevant for the conversion.
So for situations where this name matters, here's how it's detected.

Note that if the conversion methods is called using an interface, the
lookup behavior will respect both the interface and the referenced model class/record.

Also note that of the criteria below, the first match will be used.
So if you specifically determine the type name, that's the only one which will be respected, and the others will be ignored.

1. If conversion options are used (`ToModelOptions`) the given type name of the options are used, if present; CSV or `*` are possible.
1. Then the `[ModelSpecs]` on the specified type (class or interface) are used, if present; CSV or `*` are possible.
1. Then the [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) on the specified type (class or interface) are used, if present; this is a single value as it uses the specified name of the content-type, not a CSV list.
1. If an interface was specified, then the target type is retrieved, and the `[ModelSpecs]` and [`[ContentType]`](xref:ToSic.Eav.Data.ContentTypes.ContentTypeAttribute) on the target type are evaluated.
1. If none of these conditions are met, then the name of the specified type (and if it was an interface, the target type) is used (including derivations of it)  
    Derived names are created by removing leading `I` or trailing `...Model` or `...Raw`


## Conversion of Entities to Models

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
