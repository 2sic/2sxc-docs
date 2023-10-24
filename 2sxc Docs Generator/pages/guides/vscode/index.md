---
uid: Guides.VsCode.Index
---

# Visual Studio Code - Guide

This guide will help you get VS Code Setup as best as possible for 2sxc development.

## Background

You'll often write code in your 2sxc Apps - either as C#/Razor or JavaScript.
For this you will need an editor.
2sxc is a very open system, so you can use any editor you like.
For quick fixes and simple things, you can also use the built-in editor, which is based on Monaco (VS Code Online).
But for more sophisticated stuff we currently recommend VS Code.

## Prepare VS Code for 2sxc

VSCode is amazing right out of the box, but to really be productive, you need to do a few things:

1. Install VS Code
1. Install the [C# DevKit extensions](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)

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
  </ItemGroup>
</Project>
```

> [!TIP]
> Adding these files helps VSCode provide IntelliSense.
> But be aware that it can't help with `dynamic` code.
> To get the full benefit, use [typed code](xref:NetCode.TypedCode.Index).

## Configure an App for JavaScript IntelliSense

TODO: this is not yet documented

---

## History

* Added v16.07 2023-10

Shortlink: <https://go.2sxc.org/vscode>
