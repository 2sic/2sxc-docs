# Use 2sxc Instances or App-Data from External C# Code

> [!WARNING]
> This is obsolete documentation for older versions of 2sxc and _not best practice_.
> We left it here for old-timers who may still need to use this.
>
> Please use [](xref:NetCode.External.Index) instead.
>
> If you can in any way, do not use this, these APIs are deprecated.

---

Sometimes you want to leverage 2sxc to create a solution, provide data input etc. but want to output or re-use the data in your own Module, Skin, Script or something else. This is easy to do.

## Simple Example

Imagine this was your C# code in your WebForms Code-Behind:

```cs
// the app id
var appId = 42;
 
// create a simple app object to then access data
var appSimple = ToSic.Sxc.Dnn.Factory.App(appId);
 
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

## Example of Gaining Access to Links Managed in a simple 2sxc Content App

Imagine you have a theme using DDR Menu with Razor Templates. The theme has a MegaMenu and you want to include one or more featured links that will change often and those links are easily managed in the Content App using the Links Content-Type with any of the default Views.

Your C# code in your MegaMenu.cshtml file could get access to those Links like this:

```cs
// the details you need to know
// var appId = 2;       // Content App is usually 2, but thanks to DynamicCode, we don't need this
var tabId = 234;        // this is the page with the Links View on it
var modId = 678;        // this is the module ID of the Links View
 
// get the BlockBuilder
var block = ToSic.Sxc.Dnn.Factory.CmsBlock(tabId, modId);
 
// the get the DynamicCode instance (Code.DnnDynamicCodeRoot) of the block
var dynCode = ToSic.Sxc.Dnn.Factory.DynamicCode(block);
 
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
