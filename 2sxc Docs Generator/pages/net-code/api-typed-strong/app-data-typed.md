---
uid: NetCode.StrongTypedCode.AppDataTyped
---

# Strong Typed App Data in 2sxc 17+

The `App.Data` object provides a **DataSource** to all the data inside the App.

In some scenarios, your code will want to work with this data as if it were a database, but in a strong-typed way.

There are a few ways to do this.

## New using GetAll and GetOne

The most common operations will be to get all or get a specific item.
This is now much easier:

```csharp
// Get all and convert to Person
var people = App.Data.GetAll<Person>();

// Get one and convert using int-id - will be null if not found
var person72 = App.Data.GetOne<Person>(72);

// Get one and convert using Guid - will be null if not found
var personFromGuid = App.Data.GetOne<Person>(Guid.Parse("..."));
```

## Basic using As and AsList

```csharp
// Get all and convert to Person
var people = AsList<Person>(App.Data.GetStream("Person"));
// Get all and convert the first to person - will be null if there is no data
var onePerson = As<Person>(App.Data.GetStream("Person"));
// Get all, convert, then find the one with the ID - null if no match
var person45 = AsList<Person>(App.Data.GetStream("Person")).FirstOrDefault(p => p.Id == 45);
// Get one and convert to Person - null if no match; faster
var person72 = As<Person>(App.Data.GetStream("Person").List.FirstOrDefault(e => e.EntityId == 72));
```

This all works, but it's a bit verbose and you will sometimes do too much work, which is not ideal for performance.

## Good to Know

* To make the magic work, `GetAll(...)` and `GetOne(...)` will use the **class name** to determine the stream it should retrieve.
* If the stream does not exist, it means that the Content-Type doesn't exist, and it will throw an error
* If the stream exists, but the data is empty, it will return an empty list or null, depending on the method used

---

## History

* Introduced in v17.03
