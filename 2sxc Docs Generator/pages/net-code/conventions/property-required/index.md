---
uid: NetCode.Conventions.PropertiesRequired
---

# Convention: Property Required Name Checks

On newer APIs we implement a policy that properties are **required** by default (but you can override this).
This applies to newer base classes such as

* [](xref:Custom.Hybrid.RazorPro)
* [](xref:Custom.Hybrid.ApiPro)
* [](xref:Custom.Hybrid.CodePro)

This means that by _default_, retrieving any property such as `something.String("FirstName")`
will only work, if the underlying Entity has the property `FirstName`.
Otherwise it will throw an error.


## Why?

This should help you find errors earlier, and make your code more stable.
Previously when using `dynamic` objects, it was easy to make a typo and not notice it,
or to be using the wrong object (such as having and underlying `BlogPost` object instead of a `Category` object).


## How to Override

You can override this at object/wrapper creation, or when retrieving the value.

When creating the object, you can override the default behavior by setting the `TODO:` parameter.
Example:

```c#
var lax = AsItem(someEntity, propsRequired: false);
var willBeNull = lax.String("DoesNotExist");
```

When accessing a property, you can override it by using the `required` parameter.
Example:

```c#
var willBeNull = MyItem.String("DoesNotExist", required: false);
```

> [!TIP]
> The `required` parameter is a nullable boolean.
> This is to ensure that it's clear if you set it or not, in which case the default will be used.


## Behavior when providing a fallback value

Most methods which have a `required` also have a `fallback` parameter.
This is a value which will be returned if the property is empty or is not populated.

So there is a slightly different behavior.

* When using it on data-object such as [](xref:ToSic.Sxc.Data.ITypedItem) the `fallback` does not change the behavior of `required`.  
  So if you don't change required, and the field _doesn't exist_, it will throw an error.
* When using the [MyModel](xref:ToSic.Sxc.Code.ITypedModel) the fallback will also affect the `required`.  
  So if you specify a `fallback` which can be distinguished from the `default` (eg. not a `null` on a string, not a `false` on a bool) then 
  `required` will be ignored and the `fallback` will be returned.


---

## History

* First introductions in 2sxc 16.03

Shortlink: <https://go.2sxc.org/immutable>
