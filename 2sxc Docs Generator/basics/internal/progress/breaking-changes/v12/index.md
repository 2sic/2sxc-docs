---
uid: Internal.Progress.BreakingChanges.V12
---

# Breaking Changes in EAV and 2sxc

We try to minimize breaking changes, and most breaking changes won't affect your work, because it's internal API. 
We're documenting it here to ensure you know what happened, in case you still run into this.

## Summary

V12 did a lot of internal rework to get it to run on Oqtane. Almost none of the changes will affect you. 

#### Version 12.04

1. DynamicEntity now has a property Count because it's a list as well, this could cause issues if a content-type has a property `Count`
1. DynamicEntity is now always a list. Because of this we removed the `DynamicEntityWithList` object. We believe the type is never referenced in user code, but if it is, this would be a breaking change.
1. Many parts that prepare Entities returned a `Dictionary<string, object>` and now return an `IDictionary<string, object>`.  
   We believe this shouldn't hurt much, since the result would usually be in a `var` or returend directly to the API for streaming, but in case someone had used explicitly typed code, this will require a minor change

#### Version 12.05

V12 adds new properties to Razor and WebAPI which could result in some surprises: `Path`, `Convert`, `Settings`, `Resources` and `DevTools`. 
Especially the new `Path` and `Convert` could clash with existing code which had `@using System` or `@using System.IO` so the code would just read `Path.GetFileName(...)` or something. 
Because of this, we only give the latest classes `Custom.Dnn.Razor12`, `Custom.Dnn.Code12`, `Custom.Hybrid.Razor12`, `Custom.Hybrid.Api12` etc. these properties. 

This means that previous base classes do not have these by design, and we encourage you to move to these latest base classes. 

> Important: 2sxc 12.00 - 12.04 also had some of these properties on `ToSic.Sxc.Dnn.RazorComponent` as well as `ToSic.Sxc.Dnn.ApiController`.
> So if you were eager to use these properties but didn't change the base class, you were able to use it. 
> To protect thousands of upgrade-scenarios we had to take them away from the old base classes. Sorry!

**Possible Breaking Changes**

1. We believe nothing broke, but it could be that some commands on `EntitiesToDictionary` or `DataToDictionary` were accidentally changed. Pls report so we can fix that. 
1. The `Link.To(...)` now returns safe URLs. This should not be an issue, but in rare cases post-processing of the string returned may expect spaces or something, which are now `%20`
1. We disabled old obsolete APIs on the new Razor12, Api12 and Code12 base classes. In case you were using this (not likely) you'll get an error telling you about this.

