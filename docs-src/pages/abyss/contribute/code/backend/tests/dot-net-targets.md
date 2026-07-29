---
uid: Abyss.Contribute.Backend.Tests.DotNetTargets
---

# Differences in .net 472 and .net Core Targets

[!include[""](../../_contributors-only.md)]


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
