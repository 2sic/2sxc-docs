---
uid: NetCode.Data.Coded.Entities
---

# Coded Data Creation of Entities WIP v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

Often data is provided as a POCO object (class or record) and needs to be converted to an entity for further processing.

This is used both for providing internal data through the DataSource system
and for custom DataSources which will provide new data to an application.

## Four Common Ways This Happens

1. Either the data object (class/record) implements `IRawEntity` and provides the necessary information itself

2. Or it provides a converter using `IRawEntityConvertible` which provides a `IRawEntityConverter` on the `GetConverter()` method,
    which will then be used to convert the object to an entity

3. Or it implements `IRawEntityAutoConvert` which will automatically convert the object to an entity using reflection and the property names

4. Or it's just a plain object and is converted using reflection (which is more time consuming)

Bonus: Advanced way

Conversion of data to Entities can also be done by calling a `Create()` method on the `IDataFactory` providing it
with a dictionary of values. This is not common in external code, but often is a quick way to create Entities.

TODO: document the RawEntity, the conversion, standardize naming etc.

Internally this is done by 2 important components:

1. The `IDataFactory` which can handle `IRawEntity` and conversion objects and convert them to entities
1. The `CustomDataSource` which can also convert anonymous objects

TODO: move code from CustomDataSource to specialized Factory and make it more generic, so that it can be used in other places too.

## Core Conversion

### RawEntity

Basically any `IRawEntity` (which automatically is a `IRawEntitySource`) will implement

1. Identifiers: `Id` and `Guid`
1. Dates: `Created`, `Modified`
1. Values (dictionary)

### RawEntityConvertible

On the other hand, any `IRawEntityConvertible` will provide a converter through the `GetConverter()` method.
This returns an `IRawEntityConverter` responsible for the conversion.
It will return an `IRawEntity` which will then be processed as above.

This can be super detailed or sometimes also use some reflection
to save code (for non-performance critical code).

👉🏼 See example in the `UserModelRaw` for half-reflection based conversions.

### RawEntityAutoConvert

If the object implements `IRawEntityAutoConvert`, it will automatically be converted to an entity using reflection and the property names.
This is less efficient than a custom converter, but is often good enough for simple objects
and it's great for many conversions which are not performance critical.

👉🏼 See example in the `EntityRelationship` which uses the `IRawAutoConvert`

## Relationships Connecting Data

Relationships are quite complex, as the final object should have direct access to children and parents.

> [!TIP]
> Since the entities are still being constructed,
> and the relationship should point to the final entity,
> we need to use keys to reference each other during the creation process.

For this to work, we need

1. The ability to provide **own keys** which can be referenced by other objects
1. The ability to **reference** other objects using **keys**
1. During creation, things that reference each other must be processed together (see details later)
   so when the creation is complete, they are mapped to each other.

### Rel #1: Providing Relationship Keys

A raw entity can _optionally_ implement `IRelationshipKeys` to provide keys it will be referenced by.
For this it must implement a property `RelationshipKeys` which is an `IEnumerable<object>?`.

The keys are of type `object`, so they can be numbers, strings or even made-up paths such as `file/4234`.
The paths concept helps to reference entities which may be a mixture of different types such as files and folders,
which may have the same numeric ID but should be differentiated by the relationship.

During entity construction, the final keys will be used to create a map of all these keys to the final entity.

### Rel #2: Referencing Other Entities

Since relationships are treated as normal values - just with a lot of magic attached,
the relationships pointers themselves are also stored in the value dictionary.

For this, values in that dictionary must be defined as `RawRelationship` objects,
listing the `Keys` as a `List<object>` which can contain strings, numbers or paths (like `file/4234`).

For example, a `Categories` which should point to the Categories `web` and `it` would be defined as:

```csharp
var categories = new RawRelationship
{
    Keys = new List<object> { "web", "it" }
};

var values = new Dictionary<string, object>
{
    { "Categories", categories }
};
```

### Rel #3: Processing Relationships Together

This happens internally in the `IDataFactory` which will first create all entities and then map them to each other based on the keys.

## Metadata - not yet finalized or documented TODO:




## Content-Type Assignment to Converted Data

To make future back-conversions to models easier and better,
it's often important that generated data
knows what content-type it came from - so that `User` data is not confused with `Site` data.

All converted objects will be assigned a `Type` which is an `IContentType` which is either generated from the object itself or provided by the `IRawEntity` or `IRawEntityConverter`.

If nothing is specified, the object itself will be used to create a definition; if it's anonymous, a neutral name will be used.

> [!TIP]
> As of now, the raw entity is always the source of the content-type.
> This may change, but as of v22.0 there is no mechanism to provide
> a different content-type on the raw object.
>
> So to specify a different content type requires it to be mentioned in the `Options` on the `IDataFactory`.


## How to Use (in 2sxc/EAV internal)

Data Sources should return objects which are either `IRawEntity` or `IRawEntityConvertible` objects.

Basically you should create a `...Model` such as a `ScopeModel` or `UserModel` and return that from the DataSource.

Some tips:

1. If you inherit from `RawEntity`, you can just return that object and it will be converted automatically.
1. Specific properties such as `Id`, `Guid`, `Created`, `Modified` and `Values` will be used automatically.  
    And they will not be included in the list of Attributes (of the generated content-type)
1. Special properties such as `Values`, `RelationshipKeys` and `Metadata` will be used automatically.  
    And they will not be included in the list of Attributes (of the generated content-type)  
    And if you do have special `Values` which should be included in the Entity, you must derive a class and override it.
    `Values` will only be filtered out if it has the exact name `Values` and is of type `IDictionary<string, object>`.



## Maturity of the System as of 2026-07-24 (2dm)

1. `IRawSource` and `IRawConverter` are working and have unit tests to verify it's handled correctly
1. Base classes such as `RawEntity` are working and have unit tests
1. Other combinations incl. Class vs. Record work
1. Relationships work and have unit tests (but only very limited coverage)
1. Conversion from anonymous works and has unit tests

Not quite finished

1. Relationships should have more unit tests for each part of the chain
1. Conversion from "anything" as is in the data source should be separated out and unit-tests should confirm all cases
1. Metadata inclusion should be improved/formalized and finalized

> [!TIP]
> As of 2026-07-24 it appears that all cases are implemented and have unit tests covering them.


## TODO:

1. Fix title - scope says `null` ⚠️
1. Change the record to be the default RawEntity, I think nobody/nothing uses the RawEntity class, as it's in the Sys namespace
1. Then rename `RawEntityClassic` for the class
