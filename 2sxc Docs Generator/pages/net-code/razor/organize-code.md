---
uid: NetCode.Razor.OrganizeCode
---
# How To Organize your Code in Razor

In simple scenarios you have some Razor files containing a bit of HTML and some code. As your solution grows, you'll want to organize your work better to ensure that you can maintain it. 2sxc offers various ways to do this:


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Recommended Methods v12+

### Reuse a Partial View with @Html.Partial(...) v12+

Razor templates can _include_ other razor files with more Razor code inside them, using `Html.Partial("_Something.cshtml")`.
This is a standard asp.net function to render another Razor file where you need it.
You usually use it to make small component Razor files which might just show a button or something, and then call that file. 

You can find examples in the [tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse110/page)

### Share a .cs File as Library v10+

Sometimes you want to share C# code which isn't meant for HTML-output. For example, a security check. You can do this using `CreateInstance(...)`. 

If you:

1. need to share code with razor and Webapi
1. don't need razor specific features like `@helper`

You can create a `.cs` class file and share this across razor files AND WebAPI files. 

To use it, you need something like:

```razor
@{
  var helper = CreateInstance("_Helper.cs");
}
```

> [!TIP]
> The helper file should ideally inherit from `Custom.Hybrid.Code14` (or similar [base classes](xref:Custom.Hybrid)). 
> in which case it will have have the same full APIs incl. the `App` and `Content` object just like the main file. 

👉🏼 See [examples in the tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse320/page)

### Reuse a Template Delegate Function generating HTML v5+

[Template Delegates](https://medium.com/@isaac.d.adams/reusing-html-blocks-without-partials-or-view-components-6db59b86eab7)
are a very old Razor feature, but they are quite hard to use. 

They are similar to `@helpers` but work in both Oqtane and DNN. 

👉🏼 See [tutorial example](https://2sxc.org/dnn-tutorials/en/razor/reuse101/page).



## Older / Alternative Methods (DNN only)

### Reuse Snippets with @helper in Razor 

Razor has a `@helper` syntax which allows you to create fragments and re-use them. 

👉🏼 Discover this in the [tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse/home).

This will not work in Oqtane, as the newer Razor engines don't support this. 


### Reuse a Partial View with @RenderPage()

`@RenderPage(...)` does the same thing as `@Html.Partial(...)` (see above) but it will only work on DNN, not Oqtane. 


### Share a .cshtml File as Library of Sub-Templates

When you have a **lot of components** it may be easier to create a library of `@helper` commands. This library is just a normal `.cshtml` file - usually in a folder called `shared` or something, and you can then call these snippets and helpers from all your template files. 

To use it, you need something like:

```razor
@{
  var helper = CreateInstance("_Helper.cshtml");
}
```

👉🏼 See [examples in the tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse210/page)

### Razor Code-Behind

If your Razor file is getting kind of large because of C# functions, best place it in a [Razor Code-Behind](xref:NetCode.Razor.CodeBehind). 

---

## History

1. RenderPage has always been part of Razor so part of 2sxc v2
1. CreateInstance for `.cshtml` was introduced ca. v6
1. CreateInstance for `.cs` was introduced in 2sxc v10.01
1. Code-Behind Introduced in 2sxc 11.0
1. Code-Behind deprecated in 2sxc 12 because it's not compatible with Oqtane