---
uid: ToSic.Sxc.Services.IPageService
---

This is cross-platform and works for Dnn and Oqtane (Oqtane WIP). 

This is just the interface. When a system implements it, you can get it through [Dependency Injection](xref:NetCode.DependencyInjection.Index).

Example: in 2sxc 12+ you can use 

```C#
var page = GetService<ToSic.Sxc.Services.IPageService>()
page.SetTitle("About 2sxc", "post-placeholder");
```

...and then work with the resulting object.

