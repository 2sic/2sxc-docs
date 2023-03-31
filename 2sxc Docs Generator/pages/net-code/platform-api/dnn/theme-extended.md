---
uid: NetCode.PlatformApi.Dnn.ThemesExtended
---

<img src="~/assets/features/platform-dnn.svg" width="100%">

# Use 2sxc Services in Dnn Themes - Extended

This is some additional information regarding the use of 2sxc Services in Dnn Themes.

👉🏽 Normally you don't need this, you need [](xref:NetCode.PlatformApi.Dnn.ThemesAndModules)

## Get Service Provider on a Theme / Skin

This is unfortunately not prepared well - I guess at the time it was developed this wasn't seen as an important use case. 

* Dnn has Dependency Injection prepared for each request
* Each Request has a separate _Scope_ (to not mix services between requests)
* This scoped Service-Provider is cached on the HttpContext
* Dnn has a special extension method called `GetScope()` to work with this - [see docs](https://github.com/dnnsoftware/Dnn.Platform/blob/develop/DNN%20Platform/Library/Common/Extensions/HttpContextDependencyInjectionExtensions.cs)

To get a 2sxc Service in a Skin, you can write code like this:
Note that this is harder and not recommended.

The general way to get the service provider is:

```html
<%@ Import Namespace="DotNetNuke.Common.Extensions" %>
<%@ Import Namespace="Microsoft.Extensions.DependencyInjection" %>
<%@ Import Namespace="ToSic.Sxc.Services" %>

<script runat="server">
  protected override void OnPreRender(EventArgs e) {
    base.OnPreRender(e);
    var sp = HttpContext.Current.GetScope().ServiceProvider;
    var renderService = sp.GetService<IRenderService>();
  }
</script>
```

or another example

```c#
using DotNetNuke.Common.Extensions;
using System;
using Microsoft.Extensions.DependencyInjection;
using ToSic.Sxc.Services;

var sp = HttpContext.Current.GetScope().ServiceProvider;
var jsonSvc = sp.GetService<IJsonService>();
var json = jsonSvc.ToJson(someObject);
```
