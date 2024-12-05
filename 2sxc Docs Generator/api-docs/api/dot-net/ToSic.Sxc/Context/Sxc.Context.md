---
uid: ToSic.Sxc.Context
summary: Context information for the current request / scenario. 
---

The Context gives your code information about the page / site / module etc. it's currently running in. All your code (Razor, WebApi) will have a property `CmsContext` which is of type [](xref:ToSic.Sxc.Context.ICmsContext).

> [!NOTE]
> Your code will always have these objects, but they may sometimes be referencing unknown information. 
> For example, if the current context doesn't have a known Module (like in API scenarios) 
> then `CmsContext.Module` will return a valid object, but the ID will be < 0. 