
### Breaking Change Version 12.05

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

