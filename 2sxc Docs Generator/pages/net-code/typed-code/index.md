---
uid: NetCode.TypedCode.Index
---

# Typed APIs in 2sxc 16+

**Typed Mode** is a new way to write C# and Razor code in 2sxc 16+.
It is much more robust and easier to debug than the classic _dynamic_ code.

## What does Typed Mode Look Like?

```razor
@inherits Custom.Hybrid.RazorTyped
<h1>@MyItem.String("Title")</h1>
<div>
  @MyItem.Picture("Screenshot")
  @MyItem.Html("Description")
</div>
```

> [!IMPORTANT]
> Older code is _dynamic_.
> The API is quite different, so if you copy old snippets you'll probably need to refactor it.


## Major Differences

1. The compiler can detect many more issues in typed mode
1. If your code isn't correct, you will get much better errors in typed mode
1. Accessing invalid properties will throw an error in typed mode (eg. `MyItem.String("InvalidProperty")` will throw, but `Content.InvalidProperty` will not)
1. Typed code works much better with LINQ, so `MyItem.Children("Authors").Count()` will just work (in dynamic mode you'd need to cast it to `IEnumerable<dynamic>` first)


## Activate Typed Mode

Dynamic and Typed code can coexist in the same app.
Each Razor / C# file can decide which mode it wants to use.
To be in typed mode, your Razor/C# must inherit from a typed base class like this:

* Razor files should begin with:  
  `@inherits Custom.Hybrid.RazorTyped`
* C# files should have something like:  
  `public class YourClassName : Custom.Hybrid.CodeTyped`
* WebApi files should be like:  
  `public class YourControllerName : Custom.Hybrid.ApiTyped`

> [!TIP]
> Changing the base class will completely change the APIs you have available.

## Configure Visual Studio Code for IntelliSense

Now that everything is typed, we highly recommend you setup VSCode to provide IntelliSense.

👉 Check out the [VS Code Setup Docs](xref:Guides.VsCode.Index)



---
