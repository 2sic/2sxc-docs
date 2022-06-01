
### Breaking Change Version 12.04

1. DynamicEntity now has a property Count because it's a list as well, this could cause issues if a content-type has a property `Count`
1. DynamicEntity is now always a list. Because of this we removed the `DynamicEntityWithList` object. We believe the type is never referenced in user code, but if it is, this would be a breaking change.
1. Many parts that prepare Entities returned a `Dictionary<string, object>` and now return an `IDictionary<string, object>`.  
   We believe this shouldn't hurt much, since the result would usually be in a `var` or returend directly to the API for streaming, but in case someone had used explicitly typed code, this will require a minor change
