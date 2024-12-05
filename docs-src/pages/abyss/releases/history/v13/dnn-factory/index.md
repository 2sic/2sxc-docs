---
uid: Abyss.Releases.History.V13.DnnFactory
---

# Fix Breaking Change _Static Dnn Factory_ in v13

**Keywords:** #Deprecated #Factory #Build #DependencyInjection

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

The `ToSic.Sxc.Dnn.Factory.[various]()` are being deprecated, and will be removed in v14. 

## Reason for Removal

2sxc used to be the first and only Module in Dnn which supported Dependency Injection, so there was a need to patch this in somehow. 

The solution we used was to have static object `ToSic.Sxc.Dnn.Factory` which managed this, but this is actually bad practice and encourages bad code. 

This was mainly used in WebForms, specifically Skins/Themes to access 2sxc data, 
but we've created a much better replacement using:

* [](xref:ToSic.Sxc.Services.IDynamicCodeService) 
* [](xref:ToSic.Sxc.Services.IRenderService)


## History - How it Used to Work

Previously you could write code like this in your ascx Theme:

```html
<%@ Import Namespace="System.Linq" %>
<script runat="server">
  public string OldFactoryUse()
  {
    var appId = 6;
    var app = ToSic.Sxc.Dnn.Factory.App(appId);
    var questions = app.Data["Question"];
    var title = questions.First().GetBestValue("EntityTitle");
    return "Questions: " + questions.Count() + ": First Title:" + title;
  }

  public string OldRender()
  {
    var pageId = 21;
    var moduleId = 380;
    var block = ToSic.Sxc.Dnn.Factory.CmsBlock(pageId, moduleId);
    var result = block.Render();
    return result;
  }

  public string OldDynamicCode()
  {
    var pageId = 21;
    var moduleId = 380;
    var blockBuilder = ToSic.Sxc.Dnn.Factory.CmsBlock(pageId, moduleId);
    var dynCode = ToSic.Sxc.Dnn.Factory.DynamicCode(blockBuilder);
    var questions = dynCode.App.Data["Question"];
    var title = dynCode.AsDynamic(questions.First()).EntityTitle;
    return "Questions: " + questions.Count() + ": First Title:" + title;
  }
</script>
```

## What we Changed

1. In 2sxc 13.00 we integrated our Dependency Injection with the Dnn 9.4+ built-in Dependency Injection. 
This allows you to get 2sxc services from DI. 
1. In 2sxc 13.02 we created the [](xref:ToSic.Sxc.Services.IDynamicCodeService) which is a replacement for the old Factory.

You must use this from now on. 

## Reasons for Change

The newer code may seem a bit more complex, but you'll see in the API docs that we've actually improved the API.

The reason the code looks so messy is because Dnn doesn't fully embrace Dependency Injection yet, so to get it, you need that complex looking

```c#
var codeSvc = HttpContext.Current.GetScope().ServiceProvider.GetService<IDynamicCodeService>();
```

We hope and believe that Dnn will improve on this soon.


## Upgrade to Newer functionality

So the previous example would look like this:

```html
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="DotNetNuke.Common.Extensions" %>
<%@ Import Namespace="Microsoft.Extensions.DependencyInjection" %>
<%@ Import Namespace="ToSic.Sxc.Services" %>
<script runat="server">
  public IServiceProvider ServiceProvider { get { return HttpContext.Current.GetScope().ServiceProvider; }}
  
  public string NewApp()
  {
    var codeSvc = ServiceProvider.GetService<IDynamicCodeService>();
    var app = codeSvc.App(appId: 6);
    var questions = app.Data["Question"];
    var title = questions.First().GetBestValue("EntityTitle");
    return "Questions: " + questions.Count() + ": First Title:" + title;
  }

  public string NewRender()
  {
    var renderSvc = ServiceProvider.GetService<IRenderService>();
    var result = renderSvc.Module(pageId: 21, moduleId: 380);
    return result.ToString();
  }

  public string NewDynamicCode()
  {
    var pageId = 21;
    var moduleId = 380;
    var codeSvc = ServiceProvider.GetService<IDynamicCodeService>();
    var dynCode = codeSvc.OfModule(pageId, moduleId);
    var questions = dynCode.App.Data["Question"];
    var title = dynCode.AsDynamic(questions.First()).EntityTitle;
    return "Questions: " + questions.Count() + ": First Title:" + title;
  }
</script>
```

If you were using this from outside of 2sxc Razor / WebApi, you will need to use the [Dnn specific DependencyInjection (available in Dnn 9.4+)](xref:NetCode.DependencyInjection.Dnn).

---

## History

* Introduced in 2sxc 7 with Dependency Injection based on .net Standard 1.6
* Deprecated in 2sxc 13 with the integration of Dnn 9.4 DI
* Planned for full removal in 2sxc 14 ca. middle of 2022

---

Shortlink to here: https://go.2sxc.org/brc-13-dnn-factory