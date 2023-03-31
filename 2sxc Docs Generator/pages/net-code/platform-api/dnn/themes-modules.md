---
uid: NetCode.PlatformApi.Dnn.ThemesAndModules
---

<img src="~/assets/features/platform-dnn.svg" width="100%">

# Use 2sxc Data, Services or Output in Dnn Themes/Skins and Modules

Sometimes you want to render a 2sxc Block into a Theme or another Module - or just use 2sxc Data and services.

In general this is a two step process:

1. Get the current Service Provider (with the right Scope) from DNN or HttpContext and ask for the specific service you need
1. Use the service

## Step 1: Get the Service Provider

The service provider is the object which knows how to create all the services.
It will retrieve any services that have been registered before - including all public 2sxc services.

It's important to know about the **scope** of the service provider.
Basically there is a **global scope**, which is doesn't know about the current page or module.
Then there is a **current scope** which is the scope of the current page or module.
So if you ask the _global scope_ for a service, that service will not know about the current user permissions or what page the code is running on.

Dnn creates an own scope for each page request, and places it on the `HttpContext`.
The "real" way to get it is fairly difficult, so 2sxc provides a shortcut
using `this.GetScopedService<T>` ([docs](xref:ToSic.Sxc.Services.DnnExtensions.GetScopedService*)).
Here's an example how to get it in a Theme/Skin or Module:

```html
<%@ Import Namespace="ToSic.Sxc.Services" %>
<script runat="server">
  protected override void OnPreRender(EventArgs e) {
    base.OnPreRender(e);
    var renderService = this.GetScopedService<IRenderService>();
  }
</script>
```

Note: if you want to know the hard way, it's documented [here for themes](xref:NetCode.PlatformApi.Dnn.ThemesExtended)
and [here for modules](xref:NetCode.PlatformApi.Dnn.ModulesExtended).

## Step 2: Do something with the Service

### Example 1: Render a Block

This is the most common use-case: you want to render a 2sxc Block into a Theme or Module.

```html
<%@ Import Namespace="ToSic.Sxc.Services" %>

<script runat="server">
  public dynamic blockHtml;

  protected override void OnPreRender(EventArgs e)
  {
    base.OnPreRender(e);

    int pageId = 42;
    int moduleId = 242;
    blockHtml = this.GetScopedService<ToSic.Sxc.Services.IRenderService>().Module(pageId, moduleId);
  }
</script>

<%= blockHtml %>
```

What's important:

1. The `blockHtml` variable is a dynamic object - this just makes it easier to code. You could specify the type `ToSic.Sxc.Blocks.IBlock` but that adds complexity.
1. Internally the `blockHtml` could do a bit more, but that's not relevant for this scenario.
1. Retrieving the `blockHtml` it inside the `OnPreRender` event is important, because it ensures that any side-effects such as adding JS/CSS to the page work.

### Example 2: Get data in a DNN Razor File

Imagine you have a theme using DDR Menu with Razor Templates. The theme has a MegaMenu and you want to include one or more featured links that will change often and those links are easily managed in the Content App using the Links Content-Type with any of the default Views.

Your C# code in your MegaMenu.cshtml file could get access to those Links like this:

```cs
using ToSic.Sxc.Services;

// the details you need to know
// var appId = 2;       // Content App is usually 2, but thanks to DynamicCode, we don't need this
var tabId = 234;        // this is the page with the Links View on it
var modId = 678;        // this is the module ID of the Links View

// Get the Service for generating DynamicCode
// We must use DnnExtensions.Get... instead of this.GetScopedService because we're in an external Razor
var dynCodeSvc = DnnExtensions.GetScopedService<IDynamicCodeService>();

// the get the DynamicCode instance of the module
var dynCode = dynCodeSvc.OfModule(tabId, modId);

// Note: you could also do this:
// var appId = 27;
// var dynCode = dynCodeSvc.OfApp(appId);

// if we were running "inside" 2sxc, we would just do this:
// var links = AsList(Data["Default"]);
// but instead we use our magical DynamicCode instance like this
var links = dynCode.AsList(dynCode.App.Data["Default"]);

<ul>
foreach (var link in links)
{
  <li>
    @link.EntityTitle, <a href="@link.Link">@link.LinkText</a>
  </li>
}
</ul>
```

### Example 3: Create 2sxc Data

The following example is written in c# to make it easier to read.
Your code could differ depending on where you place it (.cs file, .ascx file, etc.)

```cs
using ToSic.Sxc.Services;
var dynCodeSvc = this.GetScopedService<IDynamicCodeService>();

// the app id
var appId = 42;

// create a simple app object to then access data
var appSimple = dynCodeSvc.App(appId);

// example getting all data of content type Tag
var tags = appSimple.Data["Tag"];

// example accessing a query
var tagsSorted = appSimple.Query["Tags sorted"];

// Creating an entity
var vals = new Dictionary<string, object>();
vals.Add("Tag", "test-tag");
vals.Add("Label", "Test Tag");

App.Data.Create("Tag", vals);
```

---

## History

* 2sxc v1 was for Dnn 4 in 2012
* External use API for DNN Introduced in 2sxc 08.03
* Old API archived for v13 - see [old Dnn Factory Docs](obsolete-dnn.md)
* Created new [IDynamicCodeService](xref:ToSic.Sxc.Services.IDynamicCodeService) in v13
* 2sxc v14 requires Dnn 9.6.1 or newer and is fully integrated in the DNN Dependency injection, so DNN can get 2sxc services and vice versa.

[!include["history"](../../services/_history.md)]
