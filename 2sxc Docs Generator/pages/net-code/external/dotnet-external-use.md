---
uid: NetCode.External.Index
---
# Use 2sxc Instances or App-Data from External C# Code 

Sometimes you want to leverage 2sxc to create a solution, provide data input etc. but want to output or re-use the data in your own Module, Skin, Script or something else. This is easy to do.

> [!IMPORTANT]
> We massively improved this in 2sxc 13 which integrates with Dnn 9 Dependency Injection.
> These examples require Dnn 9.5+ and 2sxc 13.02+

## Simple Example

The following example assumes you're working with Dnn 9.5+ and have a Module. 

* for Skins, the Dependency-Injection is a bit different - see [Dnn Dependency Injection](xref:NetCode.DependencyInjection.Dnn)
* for Oqtane Dependency-Injection is much simpler, and not documented here

Imagine this was your C# code in your WebForms Module Code-Behind:

```cs
using Microsoft.Extensions.DependencyInjection;
using ToSic.Sxc.Services;
var ServiceProvider = DependencyProvider;
var dynCodeSvc = ServiceProvider.GetService<IDynamicCodeService>();

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

_Important: if you try to do this in a Dnn Skin/Theme it will fail, because the `DependencyProvider` object is missing. In that case use this:_

```cs
using DotNetNuke.Common.Extensions;
var ServiceProvider = HttpContext.Current.GetScope().ServiceProvider;
```

## Example of Gaining Access to Links Managed in a simple 2sxc Content App
 
Imagine you have a theme using DDR Menu with Razor Templates. The theme has a MegaMenu and you want to include one or more featured links that will change often and those links are easily managed in the Content App using the Links Content-Type with any of the default Views.

Your C# code in your MegaMenu.cshtml file could get access to those Links like this:

```cs
using Microsoft.Extensions.DependencyInjection;
using ToSic.Sxc.Services;
using DotNetNuke.Common.Extensions;
var ServiceProvider = HttpContext.Current.GetScope().ServiceProvider;

// the details you need to know
// var appId = 2;       // Content App is usually 2, but thanks to DynamicCode, we don't need this
var tabId = 234;        // this is the page with the Links View on it
var modId = 678;        // this is the module ID of the Links View

// Get the Service for generating DynamicCode 
var dynCodeSvc = ServiceProvider.GetService<IDynamicCodeService>();

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

## Read also

* [Dnn Factory API](xref:ToSic.Sxc.Dnn.Factory)
* To dive deeper, you must check the [blog post](http://2sxc.org/en/blog/post/using-app-data-outside-of-2sxc-in-razor-custom-webapi-skin-or-another-module-300)


## History

1. Introduced in 2sxc 08.03
1. Archived the old docs for v13 - see [old Dnn Factory Docs](obsolete-dnn.md)
1. Created new [IDynamicCodeService](xref:ToSic.Sxc.Services.IDynamicCodeService) in v13