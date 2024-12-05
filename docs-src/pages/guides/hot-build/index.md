---
uid: Guides.HotBuild.Index
---

# HotBuild - AppCode - Guide (🌟 v17)

2sxc 17 introduces a major new feature **HotBuild**: Precompiled App Code.
This guide will help you understand what this is, how it works, and how to use it.

➡️ Check out the [HotBuild Introduction Blog](https://2sxc.org/en/blog/post/scale-5-with-2sxc-hotbuild-on-the-5th-day)

## Background

### The Original Problem

In more sophisticated apps, you will often create code which is used in multiple places.
This kind of code would be placed in separate C# files, like `helper.cs` and then used like this.

```c#
// Get the helper - the helper object is dynamic
var helper = GetCode("helper.cs");

// Use the helper to get some info - the someInfo object is dynamic
// Note that the compiler cannot know if helper has a method called GetDetailsFor
var someInfo = helper.GetDetailsFor(something);

// Get some value from the result (which is dynamic)
// this results in isImage being dynamic (not bool, which you could assume)
// the compiler also doesn't know if someInfo has a property called FileIsImage
var isImage = someInfo.FileIsImage;
```

As you can see, the code looks simple, but has a lot of possible traps which are hard to debug.

### The Way C# Would Like it

In C# you would create a class - eg. `public class Helper`, and then use it like this:

```c#
// Reference the namespace of the helper class
@using AppCode;

// Create an instance of the helper class - this is typed, NOT dynamic
var helper = new Helper();

// Use the helper to get some info - the someInfo object is typed
var someInfo = helper.GetDetailsFor(something);

// Get some value from the result (which is typed)
// this results in isImage being bool, just as expected
var isImage = someInfo.FileIsImage;
```

This all appears very obvious.
The reason this didn't work before, is that our helper code is not compiled into a DLL.
Because of this, the compiler would already die on `@using AppCode` because it doesn't know what that is.

## Hot App Code and Intellisense

2sxc 17 introduces a new feature called Hot App Code.
It allows you to write code just like C# would like it.

It also allows VS-Code to assist you with IntelliSense,
but you must [configure VS-Code separately](xref:Guides.VsCode.Index).

## How To Use Hot App Code

### Rules

1. All of the helper code must be placed in the folder `/AppCode/` or in its sub folders.
    * _Sub folders are not supported yet._
1. All of the helper code must be in a file with the extension `.cs`.
1. All of the helper classes must be in the namespace `AppCode` or anything below it eg. `AppCode.Logic`.

## How It Works

Internally 2sxc will setup a file-watcher for this folder.
Whenever a file changes, it will be compiled into a DLL and loaded into some magic place.
This uses the Roslyn compiler, the same compiler used by Visual Studio.
Whenever a Razor or .cs file (outside of the App_Code folder) is compiled, it will also reference this magic place.
Note that this magic hot DLL is only referenced if the Razor or C# has a `using AppCode`.

> [!IMPORTANT]
> **Special Note for Dnn ☢️**
>
> Since this feature is still very new and we're still working on it,
> by default Razor is still compiled using the built in `System.Web.Compilation.BuildManager` which will only support C# 7.3.
>
> The trigger to use the latest Roslyn compiler looks for `@using AppCode` in the Razor file,
> or `using AppCode` in the C# file.
>
> This means that adding the `using` statement also activates the latest C# 8

## Limitations

As of now, only Typed Razor and Typed C# files (inheriting from `RazorTyped` or `CodeTyped`) can use the DLLs created by HotBuild App Code.

## Functionality / Features

1. Takes everything in the `/AppCode/**/*.cs` folder and compiles it into a DLL.
   The DLL is loaded dynamically for C# files elsewhere and Razor so it can be used (see Dnn requirements above).

1. Also takes everything in `/[edition]/AppCode/**/*.cs` and compiles it into separate DLLs.
   This allows you to have different editions of your app, each with different code.
   The DLLs are loaded dynamically for C# files / Razor within that `/[edition]` folder.
   This allows for Open-Heart-Surgery.

1. Monitors the folders and files to recompile the DLLs on the fly.
   This means that you can edit the code, save it, and it will be recompiled and used immediately.

1. Automatically invalidates dependently compiled Razor/C# so they too will be recompiled when used.

## Tips

1. Classes created in the `/AppCode/` folder should be in the namespace `AppCode` or anything below it.

1. If you're using Dnn, you must add `@using AppCode` to the top of your Razor files to activate the new compiler.
   This will also activate C# 8.0.

1. Your Razor can then simply use `var helper = new YourClassName()`

1. You can also access other objects etc. with constants

1. If a C# class in your `AppCode` inherits from `CodeTyped` it may want to access the `Kit` or `MyContext`.
   In this case, the class needs to get some context, which it gets automatically if you use
   `var helper = GetService<YourService>()`.
   Note that for this to work, your class needs no constructor or an empty constructor.

## Debugging

> [!TIP]
> Any compiling / HotBuilding is logged to the insights.
> If problems appear, check that out.


---

## History

* Added v17.00 2023-12
* Added support for sub folders in v17.02
* Added support for editions in v17.02
* Changed namespace from `/ThisApp` to `/AppCode` in v17.02

Shortlink: <https://go.2sxc.org/hot-build>
