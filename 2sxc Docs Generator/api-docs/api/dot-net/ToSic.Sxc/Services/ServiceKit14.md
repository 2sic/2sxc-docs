---
uid: ToSic.Sxc.Services.ServiceKit14
---

<img src="~/assets/features/servicekits.svg" class="feature">

This is the recommended [**Kit** of services](xref:NetCode.Services.ServiceKits).
for base classes of 2sxc 14.

This means that the object has many properties such as `Page`,
which will generate the corresponding service like `IPageService`
to quickly use common services. 

To use them in Razor, you'll do things like:

```
@Kit.Page.Activate("fancybox3")
```
