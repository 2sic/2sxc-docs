---
uid: NetCode.WebApi.Index
---

# 2sxc Custom C# Web APIs

You can easily create custom C# WebAPIs, and then access them from JavaScript or anywhere. What these endpoints do is completely up to you.

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-web-api { visibility: visible; } </style>
</div>

## Access Endpoints with JavaScript

You can find a good example on [live tutorials](xref:Tut.WebApi) or in the [Mobius Forms App](xref:App.Mobius). Calling these is as follows:

* `.../app/auto/api/[YourName]` when accessing a WebApi of the current app (from a dnn-page with this module), as then 2sxc uses auto-detect
* `.../app/[app-folder]/api/[YourName]` when using this endpoint from external, as auto-detect can't work then.

Most WebApi Actions will require additional parameters. Just add them as url-parameters like `?param1=This&param2=That`


[!include["WebApi Tutorials"](~/shared/tutorials/web-api.md)]


## Basic Example

A file in your app in the `api` folder called `BooksController.cs` could look like the following:

```cs
using DotNetNuke.Security;
using DotNetNuke.Web.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

public class BooksController : ToSic.Sxc.Dnn.ApiController
{
  [HttpGet]
  [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Anonymous)]
  [ValidateAntiForgeryToken]
  public object Persons()
  {
    return new ToSic.Sxc.Conversion.DataToDictionary(Edit.Enabled)
      .Convert(App.Data["Persons"]);
  }
}
```

The custom controller **BooksController** must have the same name as the file and extends the **ApiController** controller. It has a method returning all items of the **Persons** data type. The method is decorated with several attributes:
* `[HttGet]` defines that the method must be invoked with HTTP GET
* `[DnnModuleAuthorize(AccessLevel = ...)]` defines the permission an invoker must have
* `[ValidateAntiForgeryToken]` ensures that a security token from the cookies is validated before the mehod is invoked

The custom controller can be called with JavaScript like this:

```razor
@inherits Custom.Hybrid.Razor14
@{
  // Tell the page that we need the 2sxc Js APIs
  Kit.Page.Activate("2sxc.JsCore");
}

<!-- the button which loads everything -->
<button type="button" class="btn btn-primary" onclick="getPersons(this)">
  Get Persons Custom
</button>


<script>
  // this script does the API call and then shows the result
  function getPersons(moduleContext) {
    $2sxc(moduleContext)
      .webApi.get('app/auto/api/books/persons')
      .then(function (results) {
        alert('Found ' + results.length + ' persons. \n'
          + 'The first one is "' + results[0].FirstName + ' ' + results[0].LastName + '"\n\n'
          + 'The raw JSON: \n' + JSON.stringify(results)
        );
      });
  }
</script>
```

The $2sxc API ensures that the GET request is send to the correct url `/DesktopModules/2sxc/API/app/auto/api/Books/Persons`. You can also read more about the [sxc Controller](xref:JsCode.2sxcApi.Sxc.Index).


## The Awesomeness of these API Controllers

First and foremost, these API controllers let you run your code as you wish. But there's a lot more that make this the ideal choice for your code:

### Fast Development without ever Restarting

1. 2sxc Web API Controllers are stored in your app as pure source code, and you can edit them at runtime.
1. They will be compiled on the fly and don't require Dnn to restart.
1. The built in source-code editor in 2sxc lets you make simple changes through your browser.
1. And if you want more power then just open it in Visual Studio or Visual Studio Code.

### Simple Distribution and Tweaking

2sxc Apps can easily be exported and imported to other solutions.
What's also typical is that new copies of the App may need some modifications to better suit the new needs.
Since the C# files are included as source you can easily adapt the controllers to your needs.

### All 2sxc Objects Initialized

Much of the productivity with 2sxc comes with the fact that so much is already done.
When you create custom 2sxc Web APIs you automatically get everything like `App` and `Data` objects prepared for the context your code is running in.



## Notes

* Instead of **App.Data["MyData"]** you can fetch data from another data source provided by 2sxc (for exmple from the **App.Query["MyQueryData"]**)
* **Sxc.Serializer.Prepare(...)** converts the object returned by App.Data["MyData"].List to a dynamic and serializable object



## Recommended Reading

* [](xref:Tut.WebApi)
* [WebApi](xref:WebApi.Index)
* [Concepts: Polymorphisms](xref:Basics.Polymorphism.Index)




## History

1. Introduced in 2sxc 06.05
1. Enhanced with Polymorph Editions in 2sxc 9.35 (allowing subfolder/api)
