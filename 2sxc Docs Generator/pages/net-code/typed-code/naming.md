---
uid: NetCode.TypedCode.Naming
---

# Typed API Naming Conventions

With the transition to a typed API, we also changed the naming conventions.
These are the conventions for the new API.

## Clear, new Naming Conventions

* Anything beginning with `My...` _belongs_ to the current code and the current context
  * MyItem / MyItems / MyHeader
  * MyData
  * MyModel
  * MyContext / MyPage / MyUser / MyView
* Objects or methods which are singular are/return a single item
  * MyItem / MyHeader
  * MyModel.Item(...) / MyModel.Typed(...)
  * AsItem(...) / AsTyped(...)
* Objects or methods which are plural are/return a list of items
  * Items
  * MyModel.Items(...) / MyModel.TypedList(...)
  * AsItems(...) / AsTypedList(...)
* Anything beginning with `As...` is a helper to convert something to something else
  * AsEntity(...)
  * AsItem(...) / AsItems(...)
  * AsTyped(...) / AsTypedList(...)
  * AsStack(..., ..., ...)
* Settings and Resources are now better named to ensure clarity
  * AllSettings (previously `Settings`)
  * AllResources (previously `Resources`)
  * App.Settings
  * App.Resources


## Naming API of Item-objects

* Object of `ITypedItem` have
  * properties such as `.Id`, `.Guid`, `.Title`
  * methods such as `.Get(fieldName)` `.String(fieldName)`, `.Bool(fieldName)` etc.
  * extended methods such as `.Html(fieldName)`, `.Picture(fieldName)` etc.
  * most methods have additional parameters, such as `.Get(fieldName, required: false)`
* `MyItem` and `MyHeader` are `ITypedItem`s which wraps a content-object (IEntity)
* `MyItems` is a list of TypedItems (`IEnumerable<ITypedItem>`)
* `AsItem(...)` will take a IEntity, a DynamicEntity or a List of these and return one `ITypedItem`
* `AsItems(...)` ...
* `MyModel.Item(...)`
* `MyModel.Items(...)`
* `someItem.Children(fieldName)` + overloads
* `someItem.Child(fieldName)` + overloads
* `someItem.Parents(type: typeName, field: fieldName)` + overloads

