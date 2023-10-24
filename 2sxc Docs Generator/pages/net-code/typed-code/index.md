---
uid: NetCode.TypedCode.Index
---

# Typed Code in 2sxc 16+

Before 2sxc 16, the code was very dynamic.
This looked neat (eg. `<div>@Content.Title</div>`) but relied on dynamic objects which were hard to debug.
2sxc 16 introduces the new **Typed Mode** which is much more robust and easier to debug.

These docs should help you work with typed code.

> [!IMPORTANT]
> You'll often see older code which is _dynamic_.
> The API is quite different, so be aware of this as you copy any old snippets.

## Activating Typed Mode

Dynamic and Typed code can get along in the same app.
Each Razor / C# file can decide which mode it wants to use.

To be in typed mode, your code must inherit from a Typed base class.
This is what you should see in your file to ensure you're in typed mode:

* Razor files should begin with: `@inherits Custom.Hybrid.RazorTyped`
* C# files should have something like `public class YourClassName : Custom.Hybrid.CodeTyped`
* WebApi files be like `public class YourControllerName : Custom.Hybrid.ApiTyped`

> [!IMPORTANT]
> Changing the base class will completely change the API you have available.

## Configure Visual Studio Code for IntelliSense

Now that everything is typed, we highly recommend you setup VSCode to provide IntelliSense.

👉 Check out the [VS Code Setup Docs](xref:Guides.VsCode.Index)

---