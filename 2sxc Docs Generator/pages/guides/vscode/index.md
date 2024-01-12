---
uid: Guides.VsCode.Index
---

# Visual Studio Code - Guide

This guide will help you get VS Code Setup as best as possible for 2sxc development.

## Background

You'll often write code in your 2sxc Apps - either as C#/Razor or JavaScript.
2sxc is a very open system, so you can use any editor you like.
For quick fixes and simple things, use the built-in editor, which is based on Monaco (VS Code Online).
But for more sophisticated stuff we recommend VS Code.

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

## Configure an App for Razor IntelliSense

Apps are usually opened as a folder in VS-Code.
The problem for IntelliSense is that it doesn't know which DLLs it should use.
So you need to tell it.
This is done by adding a `.sln` solution file and a `.csproj` project file.

Add the following two files to the root of your app:

**Template for the `/app.sln` file**

```text
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.5.002.0
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "App", "app.csproj", "{9F7A078F-99D5-4EF4-8EC0-C6B920FE679C}"
EndProject

#
# Visual Studio .sln File for 2sxc App
# This is necessary so that VS Code can perform intellisense in Razor
# It also requires a csproj file to exist as well
# 
# Read more on https://go.2sxc.org/vscode
#
```

**Template for the `/app.csproj` file**

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <!-- This file helps VS Code provide IntelliSense - see https://go.2sxc.org/vscode -->

  <PropertyGroup>
    <!-- Specify the .net Framework you are targeting - this is usually net4.7.2 or net4.8
      https://learn.microsoft.com/en-us/dotnet/standard/frameworks
      - eg "net472", "net48", "net8.0" etc.
      - net472 is the default for DNN 9.8 and earlier but usually net48 works
      - net8.0 is the default for Oqtane 5
    -->
    <TargetFramework>net472</TargetFramework>

    <!-- Specify the default Namespace for code in this specific App -->
    <RootNamespace>ThisApp</RootNamespace>

    <!-- Specify what C# version to use
      https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history
      - eg. "7.3", "8.0" or "12.0" (Oqtane 5+)
    -->
    <LangVersion>8.0</LangVersion>

    <!-- Variable to path where the DLLs are in Dnn
      - This allows you to easily adjust the path if you have a different location
      - For clarity / consistency, we recommend to not end with a slash
      - Below you will use it using $(PathBin)
    -->
    <!-- PathBin for Dnn -->
    <PathBin>..\..\..\..\bin</PathBin>
    <!-- PathBin Oqtane production, just up 3 folders, no bin-subfolder -->
    <!-- <PathBin>..\..\..</PathBin> -->
    <!-- PathBin Oqtane dev/debug, up 3 folders and current build folder -->
    <!-- <PathBin>..\..\..\bin\Debug\net8.0</PathBin> -->
  </PropertyGroup>

  <ItemGroup>
    <!-- Tell Visual Studio & VSCode to respect all ToSic.* DLLs in the root bin folder -->
    <Reference Include="$(PathBin)\ToSic.*.dll" />

    <!-- also add System.Web and DotNetNuke DLLs - useful when creating APIs, but be aware that it may make your code less hybrid -->
    <Reference Include="$(PathBin)\DotNetNuke.dll" />
    <Reference Include="$(PathBin)\DotNetNuke.*.dll" />
    <Reference Include="$(PathBin)\System.Web.Http.dll" />
  </ItemGroup>

  <!-- Polymorphism
    If you're working with Polymorphism then you have many of the same files, which confuses Intellisense eg.
    - /live and /staging have the same files
    - /bs3 /bs4 / bs5 have the same files
    The following is meant to exclude some of these folders from intellisense
  -->
  <!-- Example: exclude /live as we're always working on /staging -->
  <ItemGroup>
    <None Remove="live\**" />
    <Content Remove="live\**" />
    <Compile Remove="live\**" />
    <EmbeddedResource Remove="live\**" />
  </ItemGroup>
</Project>
```

> [!TIP]
> Adding these files helps VSCode provide IntelliSense.
> But be aware that it can't help with `dynamic` code.
> To get the full benefit, use [typed code](xref:NetCode.TypedCode.Index).


## GitIgnore Temporary Folders

Add these lines to your `.gitignore` file to prevent temporary files from being added to your repository:

```text
.vs/
obj/
```

## Check for Edge Cases - DNN with .net 4.7.2 / 4.8

If you're using DNN with .net 4.7.2 or 4.8, you may have to do some extra work.
We're still not 100% sure what this is, since our dev PCs are always setup with all kinds of build tools where it works.
According to research by [Accuraty](https://www.accu4.com/H2R2S/VS-Code-IntelliSense)
you may need to follow the instructions as noted on the [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp).

The **C#** extension is auto-installed by the Dev-Kit, but there is this (quoted):

> [!NOTE]
> Note: If working on a solution that requires versions prior to .NET 6 or non-solution based projects, install a .NET Framework runtime and MSBuild tooling.
>
> * Set omnisharp.useModernNet to false and set dotnet.server.useOmnisharp to true
> * Uninstall or disable C# Dev Kit **we're not sure if this is correct any more!**
> * Windows: .NET Framework along with MSBuild Tools
> * MacOS/Linux: Mono with MSBuild

According to our current understanding you don't need to do this is you have Visual Studio 2022 installed.
We assume that already includes all the bits which VS Code needs as well.

We haven't been able to verify or simplify this, but if you're having trouble,
do read the blog post by [Accuraty](https://www.accu4.com/H2R2S/VS-Code-IntelliSense) as well.


## Warnings when Using IntelliSense

> [!WARNING]
> IntelliSense can show you _internal_ APIs which will change over time.

IntelliSense is an amazing productivity boost, but you should avoid using internal APIs.

To make this unlikely, we spent a LOT of time to clearly mark internal stuff.
Avoid the following:

1. Almost everything in the `ToSic.Eav.*` namespace is usually internal, so avoid using it
    1. Exception: `ToSic.Eav.DataSource` and `ToSic.Eav.DataSources` are really public
1. Anything in a `*.Internal` namespace
1. Anything in a `*.Integration` namespace
1. Anything in a `*.Backend` namespace
1. Anything in a `*.Sys` namespace
1. Anything marked with `[Obsolete]`
1. Anything marked with `[EditorBrowsable(EditorBrowsableState.Never)]` - IntelliSense will not show these APIs
1. Properties beginning with an underscore, eg `_Something`



## Configure an App for JavaScript IntelliSense

TODO: this is not yet documented

## Other Guides

* [Very helpful guide by Accuraty](https://www.accu4.com/H2R2S/VS-Code-IntelliSense)

---

## History

* Added v16.07 2023-10

Shortlink: <https://go.2sxc.org/vscode>
