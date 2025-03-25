---
uid: Abyss.Contribute.Tests.Index
---

# Contribute to 2sxc / EAV Tests

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

2sxc has about 3'500 unit tests and growing.
This is a guide to help you understand how to run them, and how to contribute to them.

## Pre-Requisites

* all the pre-requisites for building 2sxc

## Background

On 2sxc and the EAV project we strive to have many unit tests, but as always it's hard to keep up.

One of the challenges is also that some of the tests were written when we were less experienced, so we would do it better today.
So if you do review some tests, note that they may not use the latest best practices.

## Desired Setup and Conventions

As of 2025-03 we want to use xUnit for all our unit tests.
But only a small fraction of the tests have been migrated.
Other tests still use the old MSTest framework.

This is especially apparent in the setup of the tests, which require **dependency injection** to be properly setup for complex tests.

This is how we _want_ it to be:

1. Every project has one or more separate Tests project. Advanced scenarios need own projects, simple scenarios can share a project.  
   Example: `ToSic.Lib.Core` has
    1. `ToSic.Lib.Core.Tests` - general tests
    1. `ToSic.Lib.DI.Tests` - specific tests which require a DI setup
1. If necessary, some projects also have a `...TestHelper` project containing shared test code for this project and other projects which build on it.  
   Example: `ToSic.Eav.DataSources` has a `ToSic.Eav.DataSource.TestHelpers` project which is _not_ a unit-test project.
    1. Test helpers can contain **TestAccessors** which are static methods matching the original method but ending in `...Tac` (for Test Accessor).
    These methods are used to access internal methods for testing. We need them to reduce the method-access count, as otherwise methods which are not in use any more have a large access count.

## Standard xUnit CSProj

Here's a standard xUnit project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>net9.0;net472</TargetFrameworks>
    <ImplicitUsings>enable</ImplicitUsings>
    <LangVersion>preview</LangVersion>
    <Nullable>enable</Nullable>
    <IsPackable>false</IsPackable>
    <!-- <RootNamespace>ToSic.Eav.Data</RootNamespace> -->
  </PropertyGroup>

  <!-- specific stuff -->
</Project>
```

1. Test projects should set nullable to `<Nullable>enable</Nullable>`
1. Test projects should use c# latest `<LangVersion>preview</LangVersion>`
1. Test projects should set `<ImplicitUsings>enable</ImplicitUsings>` [See implicit usings](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/#implicit-usings)


## Tracing / Logging Test Data

In some cases you want to log more information to the output.
In the old days this was done using `Trace.WriteLine(...)`,
but this doesn't work in xUnit which runs processes in parallel.

So for this, inject the `ITestOutputHelper` output and use it to log messages.

```csharp
public class CompressorTests(ITestOutputHelper output)
{
  [Fact]
  public void Compress()
  {
    output.WriteLine("Starting compression test");
    // do something
  }
}
```

Note: older code which was converted to xUnit may still have `Trace.WriteLine` statements, but they will not appear in the output and should be updated as you find them.

## Differences in .net 472 and .net Core

Some tests need different values depending on the .net framework.
Use `#if` statements for this.

```csharp
public class CompressorTests(ITestOutputHelper output)
{
    // Compression sizes differ between .NET Framework and .NET Core
#if NETCOREAPP
    private const int SizeDeflate = 14980;
    private const int SizeGZip = 14998;
#else
    private const int SizeDeflate = 14898;
    private const int SizeGZip = 14916;
#endif
}
```

## Asserting Types

Types should use `IsType` instead of `IsInstanceOfType`.
But often it should use `IsAssignableFrom`. There are also `IsNot...` variations.

```csharp
// Example usage
Assert.IsType<ExpectedType>(actualValue); // Correct usage
Assert.IsAssignableFrom<ExpectedBaseType>(actualValue); // Alternative usage
```

See also <https://xunit.net/xunit.analyzers/rules/xUnit2018>.

## Asserting Errors

When you want to assert that a method throws an exception, you should use `Assert.Throws`.

```csharp
// Example usage
Assert.Throws<Exception>(() => { throw new Exception(); });
```

see also [assert exceptions](https://stackoverflow.com/questions/45017295/assert-an-exception-using-xunit)


## Conversion to xUnit - Progress

1. ✅ `ToSic.Lib` - 100%
    1. ✅ `ToSic.Lib.Core.Tests`
    1. ✅ `ToSic.Lib.DI.Tests`
1. ✅ `ToSic.Eav.Core` - 100%
    1. ✅ `ToSic.Eav.Core.TestHelpers` (Startup and Test-Accessors)
    1. ✅ `ToSic.Eav.TokenEngine.Tests`
    1. ✅ `ToSic.Eav.Core.TestsBasic` (basic tests)
    1. ✅ `ToSic.Eav.Data.Tests` (data tests)
    1. ✅ `ToSic.Eav.StartupTests` (full tests)
1. ✅ `ToSic.Eav.DataSources` - 100%
    1. ✅ `ToSic.Eav.DataSource.TestHelpers`
    1. ✅ `ToSic.Eav.DataSource.Tests` (unit tests)
    1. ✅ `ToSic.Eav.DataSource.DbTests` (system tests)
