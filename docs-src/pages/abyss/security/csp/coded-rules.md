---
uid: Abyss.Security.Csp.CodedRules
---

<img src="~/assets/features/content-security-policy.svg" class="feature">

# Content Security Policy (CSP) Coded Rules Guide

In case automation doesn't fulfil all your needs, you can always add additional rules in your C# / Razor code like this.

```c#
Kit.Page.AddCsp("default-src", "'self'");
```

Note that the above example uses the [IPageService](xref:ToSic.Sxc.Services.IPageService).

The `Kit` object is the new v14 ServiceKit which gives you quick access to common services. 
