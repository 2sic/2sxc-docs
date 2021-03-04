---
uid: NetCode.Razor.OrganizeCode
---
# How To Organize your Code in Razor

In simple scenarios you have some Razor files containing a bit of HTML and some code. As your solution grows, you'll want to organize your work better to ensure that you can maintain it. 2sxc offers various ways to do this:

1. Use the `@helper` syntax in Razor
1. Reuse a Partial-View Razor file with `@RenderPage()`
1. You can have a shared razor file which is used as a library (v9)
1. You can have a shared .cs file as a library (v10)
1. You can split a Razor file into a Template and Code-Behind



## Reuse Snippets with @helper in Razor 

Razor has a `@helper` syntax which allows you to create fragments and re-use them. 
Discover this in the [tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse/home).


## Reuse a Partial View with @RenderPage()

Razor templates can _include_ other razor files with more Razor code inside them, using `RenderPage(...)`. This is a standard asp.net function to render another Razor file where you need it. You usually use it to make small component Razor files which might just show a button or something, and then call that file. 

You can find examples in the [tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse110/page)




## Share a .cshtml File as Library of Sub-Templates

When you have a **lot of components** it may be easier to create a library of `@helper` commands. This library is just a normal `.cshtml` file - usually in a folder called `shared` or something, and you can then call these snippets and helpers from all your template files. 

To use it, you need something like:

```cs
@{
  var helper = CreateInstance("_Helper.cshtml");
}
```

See [examples in the tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse210/page)



## Share a .cs File as Library

Sometimes you want to share C# code which isn't meant for HTML-output. For example, a security check. You can do this using `CreateInstance(...)`. 

If you:

1. need to share code with razor and Webapi
1. don't need razor specific features like `@helper`

You can create a `.cs` class file and share this across razor files AND WebAPI files. 

To use it, you need something like:

```cs
@{
  var helper = CreateInstance("_Helper.cs");
}
```

> [!TIP]
> The helper file should ideally inherit from `ToSic.Sxc.Dnn.DynamicCode`, in which case it will have have the same full APIs incl. the `App` and `Content` object just like the main file. 

See [examples in the tutorials](https://2sxc.org/dnn-tutorials/en/razor/reuse320/page)



## Razor Code-Behind

If your Razor file is getting kind of large because of C# functions, best place it in a [Razor Code-Behind](xref:NetCode.Razor.CodeBehind). 



## History

1. RenderPage has always been part of Razor so part of 2sxc v2
1. CreateInstance for `.cshtml` was introduced ca. v6
1. CreateInstance for `.cs` was introduced in 2sxc v10.01
1. Code-Behind Introduced in 2sxc 11.0