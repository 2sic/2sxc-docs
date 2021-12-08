---
uid: Internal.Progress.BreakingChanges.V13.Conversion
---

# Upgrading from Breaking Change in v13 #DeprecatedConversion #DeprecatedDataToDictionary

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

Specifically, these features were removed which convert data to a simple JSON:

1. `ToSic.Eav.Conversion.EntitiesToDictionary`
1. `ToSic.Sxc.Conversion.DataToDictionary`

## Reason for Removal

These features were removed because they relied on objects which need Dependency Injection, and calling this object directly cannot give us DI.
These features were rarely used, and newer mechanisms are much more appropriate than that old stuff. 

## History - How it Used to Work

Some code samples suggested to use this in WebApis. Based on StackOverflow questions, we believe it has been used a few times.


## Upgrade to Newer functionality

We suggest you search for `EntitiesToDictionary` and `DataToDictionary` in your code, and replace it with `GetService<ToSic.Eav.DataFormats.EavLight.IConvertToEavLight>()`.

Example before:

```csharp
using ToSic.Eav.Conversion;
var convert = new EntitiesToDictionary();

var result = convert.Convert(...);
```

Example after fix:

```csharp
var convert = GetService<ToSic.Eav.DataFormats.EavLight.IConvertToEavLight>();

var result = convert.Convert(...);
```
