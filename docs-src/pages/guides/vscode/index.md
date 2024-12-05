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

> [!IMPORTANT]
> In 2024-05 the C# DevKit suddenly stopped working.
> We found a fix - pls update your `app.sln` to the newest sample below.

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

> [!TIP]
> Adding these files helps VSCode provide IntelliSense.
> But be aware that it can't help with `dynamic` code.
> To get the full benefit, use [typed code](xref:NetCode.TypedCode.Index).

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
# Read more and get help for issues on https://go.2sxc.org/vscode
#

# Addition 2024-05
# The following section is suddenly required by the C# DevKit
# See https://github.com/microsoft/vscode-dotnettools/issues/1151
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Any CPU = Debug|Any CPU
		Release|Any CPU = Release|Any CPU
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
EndGlobal
```

**Template for the `/app.csproj` file**

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <!-- This file helps VS Code provide IntelliSense - see https://go.2sxc.org/vscode -->
  <!-- Template v2024-06-19. If you have issues, try getting a newer copy from the url above -->

  <!-- Specify the default Namespace for C# code in this specific App -->
  <PropertyGroup>
    <RootNamespace>AppCode</RootNamespace>
  </PropertyGroup>

  <!-- First: Detect if it's running in Dnn, Oqtane-Production or Oqtane-Dev -->
  <PropertyGroup>
    <RunningInDnn Condition="Exists('..\..\..\..\bin\DotNetNuke.dll')">true</RunningInDnn>
    <RunningInOqtane Condition="Exists('..\..\..\Oqtane.Server.dll') Or Exists('..\..\..\bin\Debug\net8.0\Oqtane.Server.dll')">true</RunningInOqtane>
    <OqtaneIsProd Condition="Exists('..\..\..\Oqtane.Server.dll')">true</OqtaneIsProd>
    <OqtaneIsDev Condition="Exists('..\..\..\bin\Debug\net8.0\Oqtane.Server.dll')">true</OqtaneIsDev>
  </PropertyGroup>

  <!-- Settings for Dnn -->
  <PropertyGroup Condition="'$(RunningInDnn)' == 'true'">
    <!-- Specify .net 4.7.2, C# 8.0 and Bin folder for DNN - see https://go.2sxc.org/vscode -->
    <TargetFramework>net472</TargetFramework>
    <LangVersion>8.0</LangVersion>
    <PathBin>..\..\..\..\bin</PathBin>
  </PropertyGroup>
  
  <!-- Settings for Oqtane -->
  <PropertyGroup Condition="'$(RunningInOqtane)' == 'true'">
    <!-- Oqtane 5+ uses .net 8 and a very new C# language version -->
    <TargetFramework>net8.0</TargetFramework>
    <LangVersion>latest</LangVersion>

    <!-- PathBin Oqtane production, the bin folder is in the root, just up 3 folders, no bin-subfolder -->
    <PathBin Condition="'$(OqtaneIsProd)' == 'true'">..\..\..</PathBin>

    <!-- PathBin Oqtane dev/debug, the bin folder is deeper down, up 3 folders and current build folder -->
    <PathBin Condition="'$(OqtaneIsDev)' == 'true'">..\..\..\bin\Debug\net8.0</PathBin>
  </PropertyGroup>


  <!-- IntelliSense: Load all DLLs which exist in Dnn and Oqtane from the bin folder -->
  <ItemGroup>
    <Reference Include="$(PathBin)\ToSic.*.dll" />
    <Reference Include="$(PathBin)\Connect.Koi.dll" />

    <!-- Common Microsoft DLLs -->
    <Reference Include="$(PathBin)\System.Text.Json.dll" />

    <!-- Also load files in the Dependencies folder of the current App -->
    <Reference Include="Dependencies\*.dll" />
  </ItemGroup>

  <!-- IntelliSense: DNN specific -->
  <ItemGroup Condition="'$(RunningInDnn)' == 'true'">
    <!-- also add System.Web and DotNetNuke DLLs - useful when creating APIs, but be aware that it may make your code less hybrid -->
    <Reference Include="$(PathBin)\DotNetNuke.dll" />
    <Reference Include="$(PathBin)\DotNetNuke.*.dll" />
    <Reference Include="$(PathBin)\System.Web.Http.dll" />
    <Reference Include="$(PathBin)\System.Web.WebPages.dll" />

    <!-- System.Web is not in the DNN folder but in the .net Framework installed on the server -->
    <Reference Include="System.Web" />
    <Reference Include="System.Net.Http" />
  </ItemGroup>

  <!-- Polymorphism - if have files with the same classes confuse IntelliSense - see https://go.2sxc.org/vscode -->
  <!-- Example: exclude /live as we're always working on /staging -->
  <ItemGroup>
    <None Remove="live\**" />
    <Content Remove="live\**" />
    <Compile Remove="live\**" />
    <EmbeddedResource Remove="live\**" />
  </ItemGroup>

</Project>
```

### More About the `.csproj` File

The following are some additional notes about the `.csproj` file, how it works and it's values.

#### Detect Dnn or Oqtane

At the top of the `.csproj` file, we detect if we're running in Dnn or Oqtane like this:

```xml
  <!-- First: Detect if it's running in Dnn, Oqtane-Production or Oqtane-Dev -->
  <PropertyGroup>
    <RunningInDnn Condition="Exists('..\..\..\..\bin\DotNetNuke.dll')">true</RunningInDnn>
    <RunningInOqtane Condition="Exists('..\..\..\Oqtane.Server.dll') Or Exists('..\..\..\bin\Debug\net8.0\Oqtane.Server.dll')">true</RunningInOqtane>
    <OqtaneIsProd Condition="Exists('..\..\..\Oqtane.Server.dll')">true</OqtaneIsProd>
    <OqtaneIsDev Condition="Exists('..\..\..\bin\Debug\net8.0\Oqtane.Server.dll')">true</OqtaneIsDev>
  </PropertyGroup>
```

This sets variables such as `RunningInDnn` and `RunningInOqtane` which you can use later in the file.
You can see it in action in things such as:

```xml
  <!-- Settings for Dnn -->
  <PropertyGroup Condition="'$(RunningInDnn)' == 'true'">
    <!-- this is only applied, if the condition above is true -->
    <TargetFramework>net472</TargetFramework>
  </PropertyGroup>
```

#### About PropertyGroup and ItemGroup

In case you're not familiar with `.csproj` files, here's a quick overview:

* `PropertyGroup` is used to define variables which are used later in the file
* `ItemGroup` is used to define lists of items, like files, references, etc.

Both of these can have conditions, so you can define different settings for different situations.

#### Target Framework and C# Version

The `TargetFramework` is the .net Framework you are targeting.
The value like `net472` or `net48` are called _target framework moniker_ or _TFM_.
You can find a list of them on the [Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/standard/frameworks).
Recommended values:

* Dnn: `net472` or `net48` (officially, Dnn requires 4.7.2, but 4.8 is what is normally installed because of security)
* Oqtane: `net8.0` (Oqtane 5+)

The `LangVersion` is the C# version you are using.
You can find a list of them on the [Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history).
Recommended values:

* Dnn: `8.0` (Dnn 9.6.1+ using 2sxc 17 and Roslyn Compiler)
* Oqtane: `latest` or `12.0` (Oqtane 5+)

#### PathBin

The `PathBin` variable is used to specify the path where the DLLs are.
This allows us to use the same rules for Dnn and Oqtane, just with a different path to start from.
Here's what you should know:

* Dnn usually has the App files in `/Portals/[portal]/2sxc/[app]/` so the DLLs relatively in `..\..\..\..\bin`
* Oqtane has the App files in `/2sxc/[site-id]/app/` but the DLLs are in different locations depending on Dev vs. Production builds
  * in development built it places the DLLs in `\bin\Debug\net8.0` so the relative path is usually `..\..\..\bin\Debug\net8.0`
  * in production builds it places the DLLs in the root folder, so the relative path is usually `..\..\..`

#### Ignoring Files for Polymorphism

If you're working with Polymorphism then you have many of the same files, which confuses IntelliSense.
For example, `/live` and `/staging` have the same files, and `/bs3`, `/bs4` and `/bs5` have the same files.
So intellisense might find the same class in multiple places, and show warnings.

To handle this, you should decide which is your **primary** folder, and then exclude the others.
This is just an example to exclude `/live` as we're always working on `/staging`:

```xml
  <!-- Example: exclude /live as we're always working on /staging -->
  <ItemGroup>
    <None Remove="live\**" />
    <Content Remove="live\**" />
    <Compile Remove="live\**" />
    <EmbeddedResource Remove="live\**" />
  </ItemGroup>
```

## GitIgnore Temporary Folders

Add these lines to your `.gitignore` file to prevent temporary files from being added to your repository:

```text
.vs/
obj/
bin/
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

## Known Issues when C# IntelliSense is not Working

> [!TIP]
> Here we try to collect known issues and solutions.

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

Shortlink: <https://go.2sxc.org/vscode>
