---
uid: NetCode.StrongTypedCode.Index
---

# Strong Typed Code in 2sxc 17+

**Strong Typed Code** is the newest way to write C# and Razor code in 2sxc 17+.
It extends the [Typed Code](xref:NetCode.TypedCode.Index).
As such, it's fully compatible, but ever more type-safe and easier to code and debug.

## What does Strong Typed Code Look Like?

```razor
@inherits AppCode.Razor.ProductRazor
<h1>@MyProduct.Title</h1>
@MyProduct.Picture("Screenshot", imgClass: "float-right")
<ul>
  <li>Teaser: @MyProduct.Teaser</li>
  <li>Launched: @MyProduct.Launched.Year</li>
  <li>Authors: @MyProduct.Authors.Count()</li>
  <li>Maker: @MyProduct.Maker.Name</li>
</ul>
@MyItem.Html("Description")
```

This combines the best of all worlds:

1. Simple syntax, easy to read - just like the [dynamic code](xref:NetCode.DynamicCode.Index)
1. Fully typed, so you get IntelliSense and the compiler will catch many more issues - even better than the [typed code](xref:NetCode.TypedCode.Index)
1. Great dev experience in VS Code - you will see if a field like `Authors` exists or not
1. Great performance, as it's all compiled at runtime
1. Various APIs help you bridge the gap, such as the `As<Product>()` method
1. The auto-generated Content-Types are really smart - eg. `Authors` is a `List<Author>` and `Maker` is a single `Company`

## The Parts that Make it Work

1. The new Copilot generates classes for each Content-Type in the `AppCode.Data` namespace (you can easily extend them)
1. The `As<T>` and `AsList<T>` methods help you convert data into strong-typed objects
1. HotBuild automatically compiles the code on-the-fly, so you can just save and refresh the page to see changes
1. Everything in the `/AppCode` folder - or in editions such as `/staging/AppCode` will be compiled and provided to your razor
1. New base classes such as `RazorTyped<TModel>` make data-handover to sub-components easy
1. New `Customize` APIs help you create new Razor base classes and hide much of the complexity from your Razor templates

## TODO: Sample Apps

As of now (2024-03) we have not published any Apps with this convention yet, as we're still fine-tuning the details.
But we will, ASAP!

## Activate Strong Typed Mode

Old Dynamic, new Typed and brand-new Strong-Typed code can coexist in the same app.
Each Razor / C# file can decide which mode it wants to use.
To be in typed mode, your Razor/C# must inherit from a typed base class like this:

* You must use at least 2sxc 17.03 or later
* Razor files should begin with any one of these:
  * `@inherits Custom.Hybrid.RazorTyped`
  * `@inherits Custom.Hybrid.RazorTyped<TModel>`
  * `@inherits AppCode.Razor.AppRazor` - assuming you have made a custom base class
  * `@inherits AppCode.Razor.AppRazor<TModel>` - assuming you have made a custom base class
* C# files should have something like
  * `public class YourClassName : Custom.Hybrid.CodeTyped`
  * `public class YourClassName : AppCode.Services.ServiceBase`
* WebApi files should be like
  * `public class YourControllerName : Custom.Hybrid.ApiTyped`
* You should generate your data classes using the Copilot in the Admin UI

> [!TIP]
> Changing the base class will completely change the APIs you have available if you're coming from [dynamic code](xref:NetCode.DynamicCode.Index).
> If you already used [typed code](xref:NetCode.TypedCode.Index), then this is already done.

## Configure Visual Studio Code for IntelliSense

Now that everything is typed, we highly recommend you setup VSCode to provide IntelliSense.

👉 Check out the [VS Code Setup Docs](xref:Guides.VsCode.Index)



---

Shortlink: <https://r.2sxc.org/strong-typed>
