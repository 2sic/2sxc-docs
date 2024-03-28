---
uid: NetCode.StrongTypedCode.GetStarted.1Helper
---

# #1 Your First Helper

> Get Started with Strong Typed Code
>
> A Strong Typed Helper

This will guide you through making the first strong-typed Apps.
In the end you'll have a simple helper which you can use in your Razor files.


## 1. Create a new AppCode Helper

First we'll create a helper with a static `Hello(...)` method.

Create a new file in the `/AppCode` folder, like `/AppCode/MyHelpers.cs` and add this code:

```csharp
namespace AppCode
{
  /// <summary>
  /// A simple helper class
  /// </summary>
  public class MyHelpers
  {
    /// <summary>
    /// A simple method to say hello
    /// </summary>
    public static string Hello(string input) => "Hello " + input;
  }
}
```

## 2. Use it in a Razor File

Now create a Razor file in the root of your app `UseHelper.cshtml` like this:

```razor
@inherits Custom.Hybrid.RazorTyped
@using AppCode
@MyHelpers.Hello("World")
```

## 3. Test

1. Go to the App Admin and configure the view to use your newly created Razor file.

2. Then add it to a page in Dnn or Oqtane, and see the result.

### Explanations

This is a very simple example, but it shows the basic concepts.
Heres's what's happening:

1. All files in the `/AppCode` folder are automatically compiled and available to your Razor files.

2. The `@inherits` statement tells the Razor file which APIs are available. This is important, since the new `AppCode` feature only works with strong-typed Razor files - eg. inheriting from `Custom.Hybrid.RazorTyped`.

3. The `@using AppCode` has 2 functions. It will activate the Roslyn compiler (instead of the old asp.net compiler) and will also make sure that compiled **AppCode** is used in the compile process.

4. The `@MyHelpers.Hello("World")` is a simple call to the static method in the `MyHelpers` class.
