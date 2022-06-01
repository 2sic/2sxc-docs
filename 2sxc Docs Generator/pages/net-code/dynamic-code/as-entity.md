---
uid: NetCode.DynamicCode.AsEntity
---
# AsEntity(...) - Get the Underlying Data

In most Razor and WebAPIs you will prefer to use Dynamic Entities allowing you to easily write code like `@Content.FirstName`. 
But in rare cases where you have a [](xref:ToSic.Sxc.Data.IDynamicEntity) and want to access the real underlying [](xref:ToSic.Eav.Data.IEntity) in it's full complexity. 
This is where `AsEntity(...)` is used. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.AsEntity*).

> [!TIP]
> `AsEntity(...)` reverses what [AsDynamic(...)](xref:NetCode.DynamicCode.AsDynamic) does. 

If you have an object or you're not sure if it's either an [](xref:ToSic.Eav.Data.IEntity)  or a [](xref:ToSic.Sxc.Data.IDynamicEntity), just pass it to `AsEntity(...)` and it will detect either one. 


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]



## Example: Type Information

The Dynamic Entity has a property `EntityType` but this will only return a name like `Person`. If you need the full [Content-Type definition](xref:ToSic.Eav.Data.IContentType), this is what you would do:

```cs
// assume that person is a Dynamic Entity
var personTypeName = person.EntityType; // string
var personType = AsEntity(person).Type; // Will return the IContentType

```

## Example: Language Information

If you want to really check in the code, what languages have been translated. This is very sophisticated, but this is kind of how you would do it: 

```cs
var personEntity = AsEntity(person);
var attrName = personEntity["Name"]; // this will return an IAttribute<string> object
```



## History

1. Introduced ca. in 2sxc 1
1. Modified/added signatures in 2sxc 7
