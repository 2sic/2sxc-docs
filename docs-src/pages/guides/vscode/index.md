---
uid: Guides.VsCode.Index
---

# Visual Studio Code - Guide

This guide will help you get VS Code Setup as best as possible for 2sxc development.

> [!TIP]
> You'll often write code in your 2sxc Apps - either as C#/Razor or JavaScript.
> 2sxc is a very open system, so you can use any editor you like.
> For quick fixes and simple things, use the built-in editor, which is based on Monaco (VS Code Online).
> But for more sophisticated stuff we **highly recommend** VS Code.

## Prepare VS Code for 2sxc

VSCode is amazing right out of the box, but to really be productive, you need to do a few things:

1. Install VS Code
1. Install the [C# DevKit extensions](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
1. Configure each App with
    1. Intellisense (see below)
    1. Ignore the `obj` and `.vs` folders (see below)
1. Check possible edge cases (see below)

With these preparations, VS-Code is able to assist in basic C# code.
It can't provide IntelliSense for 2sxc specific APIs yet, so for that, read on.

## Setup IntelliSense

[!include[install](../../extensions/app-extensions/by-2sxc/dotnet-project/_installation.md)]

➡️ See full instructions here: [](xref:Extensions.AppExtensions.By2sxc.DotNetProject.Index)


## GitIgnore Temporary Folders

Add these lines to your `.gitignore` file to prevent temporary files from being added to your repository:

```text
.vs/
obj/
bin/
```

## Warnings when Using IntelliSense

> [!WARNING]
> IntelliSense can show you _internal_ APIs which will change over time.

IntelliSense is an amazing productivity boost, but you should avoid using internal APIs.

To make this unlikely, we spent a LOT of time to clearly mark internal stuff.
Avoid the following:

1. Almost everything in the `ToSic.Eav.*` namespace is usually internal, so avoid using it
    1. Exception: [](xref:ToSic.Eav.Data),  [](xref:ToSic.Eav.DataSource) and [](xref:ToSic.Eav.DataSources) are really public
1. Anything in a `*.Internal` namespace
1. Anything in a `*.Integration` namespace
1. Anything in a `*.Backend` namespace
1. Anything in a `*.Sys` namespace
1. Anything marked with `[Obsolete]`
1. Anything marked with `[EditorBrowsable(EditorBrowsableState.Never)]` - IntelliSense will not show these APIs
1. Properties beginning with an underscore, eg `_Something`

## Known Issues when C# IntelliSense is not Working

Here we try to collect known issues and solutions.

1. A razor file has the same name as a C# class in the AppCode Folder  
    _This will confuse the IntelliSense, since the Razor file will magically be seen as a class with the same name._
    Solution: Rename the Razor file to something else.


## Configure an App for JavaScript IntelliSense

TODO: this is not yet documented

## Other Guides

* [Very helpful guide by Accuraty](https://www.accu4.com/H2R2S/VS-Code-IntelliSense)

---

## History

* Added v16.07 2023-10
* 2024-06-19 - Added more details about the `.csproj` file incl. date-version and correct DNN System.Net.Http reference
* 2026-03-21 major update with complex `.csproj` which is outsourced to the [DotNet Project](xref:Extensions.AppExtensions.By2sxc.DotNetProject.Index) extension.

Shortlink: <https://go.2sxc.org/vscode>
