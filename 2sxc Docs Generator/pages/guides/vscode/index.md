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
    <TargetFramework>net4.7.2</TargetFramework>
    <RootNamespace>App</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <!-- Tell Visual Studio & VSCode to respect all ToSic.* DLLs in the root bin folder -->
    <Reference Include="..\..\..\..\bin\ToSic.*.dll" />

    <!-- also add DotNetNuke DLLs - we don't recommend this, because then your code will never be hybrid -->
    <!-- <Reference Include="..\..\..\..\bin\DotNetNuke.*.dll" /> -->
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


## Configure an App for JavaScript IntelliSense

TODO: this is not yet documented

## Other Guides

* [Very helpful guide by Accuraty](https://www.accu4.com/H2R2S/VS-Code-IntelliSense)

---

## History

* Added v16.07 2023-10

Shortlink: <https://go.2sxc.org/vscode>
