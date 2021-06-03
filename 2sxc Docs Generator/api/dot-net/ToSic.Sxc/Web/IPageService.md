---
uid: ToSic.Sxc.Web.IPageService
---

This Service lets you make changes to the page - usually from Razor. 
This is cross-platform and works for Dnn and Oqtane (Oqtane WIP)

This is just the interface. When a system implements it, you can get it through Dependency Injection.

Example: in 2sxc 12+ you can use 

```C#
var page = GetService<IPageService>()
page.SetTitle("About 2sxc", "post-placeholder");
```

...and then work with the resulting object.

