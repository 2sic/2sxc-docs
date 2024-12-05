---
uid: NetCode.StrongTypedCode.CustomHelpers
---

# Custom C# Helpers in AppCode in 2sxc 17+

To be SOLID and DRY, you will often want to create custom C# **helpers** in the `/AppCode` folder to share code you with your Razor files.

> [!TIP]
> This is similar to shared C# files before, which were created using `CreateInstance("path-to-c#file")`
> but the major difference is that this new solution is strong-typed and provides IntelliSense.

> [!TIP]
> This is different from Custom [**Services**](xref:NetCode.StrongTypedCode.CustomServices), which are more complex and have context information such as the `Kit` and `MyContext` objects.

## Simple Example with Static Methods

Here is an example of such a file in `/AppCode/MyHelpers.cs`:

```csharp
namespace AppCode
{
  public class MyHelpers
  {
    public static string MyHelperMethod(string input) => "Hello " + input;
  }
}
```

You can then use this in your Razor files like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode
@MyHelpers.MyHelperMethod("World")
```

## Advanced Example with Class Instances Methods

Here is an example of such a file in `/AppCode/MyHelpers.cs`:

```csharp
namespace AppCode
{
  public class MyHelpers
  {
    public string Name { get; set; }
    public string Greeting => "Hello " + Name;
  }
}
```

You can then use this in your Razor files like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode
@{
  var helper = new MyHelpers { Name = "World" };
  var result = helper.Greeting;
}
```


---

## History

* Introduced in v17.03
