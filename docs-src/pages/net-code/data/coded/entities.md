---
uid: NetCode.Data.Coded.Entities
---

# Coded Data Creation of Entities WIP v22

> [!TIP]
> This section is a work in progress for Coded Data in 2sxc v22.

## Background

Often data is provided as a POCO object (class or record) and needs to be converted to an entity for further processing.

This is used both for providing internal data through the **DataSource** system
and for custom DataSources which will provide new data to an application.

So the classic setup is this:

1. Some service prepares data according to specs
1. A DataSource is created to provide this data in the standardized way
1. This DataSource uses the service to retrieve the data - with or without parameters.
1. It then converts the data to entities and returns them to the system.

The conversion of data to entities is done by the `IDataFactory` which can handle various types of data and convert them to entities.

> [!TIP]
> In general, you must provide objects implementing `IRawEntitySource` in some way to the `ProvideOut()` method of the DataSource.
>
> Ideally the original service already create objects which implement this interface,
> to avoid unnecessary conversions and a lot of code.

## Four Common Ways to Provide Raw Entities

1. Either the data object (class/record) implements `IRawEntity` and provides the necessary information itself.  
      This is the most direct way, but forces your objects to have `Id`, `Guid`, `Created`, `Modified` and `Values` properties, which may not be desired in all cases.

2. Or it provides a converter using `IRawEntityConvertible` which provides a `IRawEntityConverter` on the `GetConverter()` method,
   which will then be used to convert the object to an entity.  
      This is recommended when you have to create complex conversions and sometimes need some logic to handle the data.

3. Or it implements `IRawEntityAutoConvert` which will automatically convert the object to an entity using reflection and the property names.  
      This is the least efficient but is usually good enough; it requires your data-objects to be quite clean and only have the properties you expect.

4. Or it's just a plain object and is converted using reflection (which is more time consuming).  
      This is mainly recommended for code inside Apps, but not inside EAV/2sxc which should be more robust.

Bonus: Advanced way

Conversion of data to Entities can also be done by calling a `Create()` method on the `IDataFactory` providing it
with a dictionary of values. This is not common in external code, but often is a quick way to create Entities.

> [!TIP]
> When data is converted, it will assign a **Content-Type** to the generated data.
> Ideally this is done in a controlled way, using `[ContentType]` attributes on the data objects.
>
> 👉🏼 See [](xref:NetCode.Data.Coded.ContentTypes)


## Best Practices

### Avoid Creating many Objects

If possible, make sure that DTOs or similar objects already implement the conversion capability,
so that they are ready-to-convert when provided by the service.
This avoids unnecessary conversions and extra code.


### Prefer Records

As .net matured, it introduced records, which seem to be the best way forward to define data objects.
They can be immutable, have a clear constructor and are easy to use.
They are especially ideal for functional style programming, where new objects copy all the properties of previous objects, but with some changes.


### Differentiate Between Internal Data and External Data

If the raw data is only used for internal purposes, it can be a simple object with the necessary properties.

if the data will probably also be used inside Apps, then it should go a more complex path,
basically placing the Schema on an Interface (not on the Raw object).
Ask @iJungleboy for details until we have more examples.



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

👉🏼 See example in the `EntityRelationship` which uses the `IRawEntityAutoConvert`


### Converting Objects directly (not recommended)

This method is for small-scale/quick-and-dirty implementations, typically for simple DataSources inside Apps.
You can find tutorials how to do this, so it's not explained further.

Note that you must inherit from the `CustomDataSource` to get full anonymous conversion.



## Content-Type Assignment to Converted Data

To make future back-conversions to models easier and better,
it's often important that generated data
knows what content-type it came from - so that `User` data is not confused with `Site` data.

All converted objects will be assigned a `Type` which is an `IContentType` which is either generated from the object itself or provided by the `IRawEntity` or `IRawEntityConverter`.

If nothing is specified, the object itself will be used to create a definition; if it's anonymous, a neutral name will be used.

> [!TIP]
> As of now, the raw entity is always the source of the content-type.
> If ever you need to reference another object to provide the schema,
> use the `[ContentTypeAssign]` attribute on the raw entity to specify the other object which should be used to generate the content-type.
> This allows specifying a different content-type on the raw object.
>
> Alternatively you can specify it in the `Options` on the `IDataFactory`.




## Relationships Connecting Data (very Advanced)

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



## Internal Data Flow

1. Every DataSource will call `ProvideOut()` to provide the data to the system.
1. The `ProvideOut()` method will call the `IDataFactory` to convert the data automatically.
1. It will receive a method to provide the data and options...
1. ...but options are usually not needed any more, since the `[ContentType]` attributes on the data objects are usually enough to determine most of the settings.

> [!TIP]
> Try to avoid using options, and prefer to specify everything important incl. title on the class itself.




Internally this is done by 2 important components:

1. The `IDataFactory` which can handle `IRawEntity` and conversion objects and convert them to entities


TODO: move code from CustomDataSource to specialized Factory and make it more generic, so that it can be used in other places too.


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
