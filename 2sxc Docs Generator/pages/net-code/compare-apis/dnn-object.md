---
uid: NetCode.TypedCode.CompareApis.DnnObject
---

# The Dnn Object in Different APIs

The `Dnn` object is a special object which is available in Dnn, but not in Oqtane.

Razor files inheriting from older base classes have a `Dnn` object, such as this example:

```razor
@inherits Custom.Dnn.Razor12
@{
  // Dnn.Tabs is a TabInfo
  // https://docs.dnncommunity.org/api/DotNetNuke.Entities.Tabs.TabInfo.html
  var pageTitle = Dnn.Tab.Title;
}
```

All the new base classes, such as `Custom.Hybrid.RazorTyped` don't have a `Dnn` object, as they are hybrid and work on Oqtane and Dnn.

## Alternative using MyContext / CmsContext

> [!TIP]
> If you think you need the Dnn property (eg. for accessing the Page Title),
> best first check if the [MyContext / CmsContext](xref:ToSic.Sxc.Context) can't be used instead.
>
> It has most of the typical properties which you would look for in `Dnn`.

Example in v16+

```razor
@inherits Custom.Hybrid.RazorTyped
@{
  var pageTitle = MyPage.Title;
}
```

Example in v12+

```razor
@inherits Custom.Hybrid.Razor12
@{
  var pageTitle = CmsContext.Page.Title;
}
```


## Get the Dnn Object in Modern Base Classes

You can also still get the `Dnn` object using this:

```csharp
var dnn = GetService<ToSic.Sxc.Dnn.Run.IDnnContext>();
```

This is the same object as the `Dnn` object in the older base classes.

> [!WARNING]
> Using the `Dnn` object / service will make your code Dnn-specific and not work in Oqtane.

---

## History

* `Dnn` introduced ca. v7
* New base classes without `Dnn` introduced in v12
