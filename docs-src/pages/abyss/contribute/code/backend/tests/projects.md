---
uid: Abyss.Contribute.Backend.Tests.Projects
---

# 2sxc / EAV Backend Test Projects

[!include[""](../../_contributors-only.md)]

This should explain how the projects are set up and how to create more of them.

As of 2025-03 we use xUnit for all our unit tests.

## Main Structure

We try to have the tests close to the code they are testing, so a typical setup would be:

* `ToSic.Sys.Core` - main project
* `ToSic.Sys.Core.Tests` - unit tests for the main project

In some cases a project may cover a lot of topics, in which case we would want to create isolated test projects for each topic, for example:

* `ToSic.Sys.Core` - main project
  * `ToSic.Sys.Core.Tests` - unit tests for the main project
  * `ToSic.Sys.DI.Tests` - unit tests for dependency injection
* `ToSic.Eav.Data` - main project, contains `ToSic.Eav.Data` and `ToSic.Eav.Models`
  * `ToSic.Eav.Data.Tests` - general unit tests for the main project
  * `ToSic.Eav.Models.Tests` - system tests which require a database

If necessary, some projects also have a `...TestHelper` project containing shared test code for this project and other projects which build on it.
Example: `ToSic.Eav.DataSources` has a `ToSic.Eav.DataSource.TestHelpers` project which is _not_ a unit-test project.


1. Test helpers can contain **TestAccessors** which are static methods matching the original method but ending in `...Tac` (for Test Accessor).
These methods are used to access internal methods for testing. We need them to reduce the method-access count, as otherwise methods which are not in use any more have a large access count.

## How to Set Up

Use this checklist:

<iframe src="https://azing.org/2sxc/r/WGKrDc0_?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe><script src="https://cdn.azing.org/e/1/embed.js"></script>

## Standard xUnit CSProj

Here's a standard xUnit project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <Import Project="../SharedImports/CsProj.Props/AllImportsForTestCode-Eav.props" />

  <ItemGroup>
    <ProjectReference Include="..\ToSic.Eav.Data\ToSic.Eav.Data.csproj" />
  </ItemGroup>

</Project>
```

The imports take care of everything, including:

1. Test projects should set nullable to `<Nullable>enable</Nullable>`
1. Test projects should use c# latest `<LangVersion>preview</LangVersion>`
1. Test projects should set `<ImplicitUsings>enable</ImplicitUsings>` [See implicit usings](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/#implicit-usings)


## Testing Project Root Namespace

With the default project above, the namespace will be `ToSic.Eav`.
We recommend against changing this, but instead just create the correct folders to go deeper and match the namespace of the code being tested.

We do this on purpose, because it often happens that some tests should fit into sibling folders, which would not be possible if the root namespace is too deep.

If you do need to change the namespace, add something like this to the xml file:

```xml
  <PropertyGroup>
    <RootNamespace>ToSic.Eav.Data.Stack</RootNamespace>
  </PropertyGroup>
```

