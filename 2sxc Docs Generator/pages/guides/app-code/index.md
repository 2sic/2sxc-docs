---
uid: Guides.AppCode.Index
---

# Hot App Code - Guide (🌟 v17)

2sxc 17 introduces a major new feature: Precompiled App Code.
This guide will help you understand what this is, how it works, and how to use it.

> [!WARNING]
> This is quite a difficult feature to implement.
> Internally there is a LOT of magic happening,
> so as of the first release of 2sxc 17 this feature is still to be considered experimental.

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
@using ThisApp.Code;

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
Because of this, the compiler would already die on `@using ThisApp.Code` because it doesn't know what that is.

## Hot App Code and Intellisense

2sxc 17 introduces a new feature called Hot App Code.
It allows you to write code just like C# would like it.

It also allows VS-Code to assist you with IntelliSense,
but you must [configure VS-Code separately](xref:Guides.VsCode.Index).

## How To Use Hot App Code

### Rules

1. All of the helper code must be placed in the folder `/ThisApp/Code`.
    * _Sub folders are not supported yet._
1. All of the helper code must be in a file with the extension `.cs`.
1. All of the helper classes must be in the namespace `ThisApp.Code`.

## How It Works

Internally 2sxc will setup a file-watcher for this folder.
Whenever a file changes, it will be compiled into a DLL and loaded into some magic place.
This uses the Roslyn compiler, the same compiler used by Visual Studio.
Whenever a Razor or .cs file (outside of the App_Code folder) is compiled, it will also reference this magic place.
Note that this magic hot DLL is only referenced if the Razor or C# has a `using ThisApp.Code`.

> [!IMPORTANT]
> **For Dnn ☢️ Only**
> 
> Since this feature is still very new and we're still working on it,
> the trigger to use the latest Roslyn compiler looks for `@using ThisApp.Code` in the Razor file,
> or `using ThisApp.Code` in the C# file.
> 
> Without this line of code, the standard compiler will be used.
> This means that adding the `using` statement also activates the latest C# 8

## How To Debug Hot App Code

These files are compiled in the background, so you can't see the build process.
This creates a new challenge: how do you debug this?
Eg. when you have invalid helper code, how do you know?

TODO: still WIP


# TODO

1. Plan for sub folders and sub-namespaces
1. Plan for editions


# TODO: Tech-wise

1. Change to use folder `/App_Code/` or `ThisApp.Code` or `App/Code` ? 
1. Change to namespace `ThisApp.Code`
1. Enforce namespace `ThisApp.Code` for all files somehow? maybe auto-add?
1. Create insights page where compiling and errors are shown
    1. also show what was in the compiled DLL - eg. classes?
1. Detect compile issues and offer special button to debug


---

## History

* Added v17.00 2023-12

Shortlink: <https://go.2sxc.org/hot-app-code>
