---
uid: NetCode.StrongTypedCode.CustomServices
---

# Custom C# Services in AppCode in 2sxc 17+

To be SOLID and DRY, you will often want to create custom C# **services** in the `/AppCode` folder to share code you with your Razor files.

> [!TIP]
> This is similar to shared C# files before, which were created using `CreateInstance("path-to-c#file")`
> but the major difference is that this new solution is strong-typed and provides IntelliSense.

> [!TIP]
> This is different from Custom [**Helpers**](xref:NetCode.StrongTypedCode.CustomHelpers), which are much simpler.

## Simple Example

Here is an example of such a file in `/AppCode/MyHelpers.cs`:

```csharp
using System.Collections.Generic;
using System.Linq;
namespace AppCode
{
  // Must inherit from CodeTyped to have the full context
  public class LinkService: Custom.Hybrid.CodeTyped
  {
    // The Kit.Link is magically made available so the code can use it
    public string LinkToCurrentPage => Kit.Link.To();

    // The App is magically made available so the code can use it
    public List<Person> GetPeople() => AsList<Person>(App.Data["People"]).ToList();
  }
}
```

You can then use this in your Razor files like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode
@{
  var linkService = GetService<LinkService>();
  var pageLink = linkService.LinkToCurrentPage;
  var people = linkService.GetPeople();
}
```

## Difference to Helpers

The main difference to [**Helpers**](xref:NetCode.StrongTypedCode.CustomHelpers) is that a service can have context information such as the `Kit` object, and can also be used to provide more complex services like a `LinkService` which provides the `LinkToCurrentPage` method.
So such a service has access to objects and properties such as:

* `Kit`
* `MyContext`
* `App`
* `MyPage`
* `UniqueKey`
* ...

It also has all the typical APIs such as

* `AsItem(...)`
* `AsItems(...)`
* `As<T>(...)`
* `AsList<T>(...)`

---

## History

* Introduced in v17.03
