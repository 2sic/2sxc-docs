---
uid: Abyss.Contribute.Backend.Tests.Index
---

# Contribute to 2sxc / EAV Tests

[!include[""](../../_contributors-only.md)]

2sxc has about 3'500 unit tests and growing.
This is a guide to help you understand how to run them, and how to contribute to them.

## Pre-Requisites

* all the pre-requisites for building 2sxc

## Background

On 2sxc and the EAV project we strive to have many unit tests, but as always it's hard to keep up.

One of the challenges is also that some of the tests were written when we were less experienced, so we would do it better today.
So if you do review some tests, note that they may not use the latest best practices.


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
