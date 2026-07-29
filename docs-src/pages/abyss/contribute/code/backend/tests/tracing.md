---
uid: Abyss.Contribute.Backend.Tests.Tracing
---

# Tracing / Logging Test Data

[!include[""](../../_contributors-only.md)]

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
