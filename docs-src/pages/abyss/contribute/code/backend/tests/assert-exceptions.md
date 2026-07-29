---
uid: Abyss.Contribute.Backend.Tests.AssertExceptions
---

# Asserting Exceptions / Errors

[!include[""](../../_contributors-only.md)]

When you want to assert that a method throws an exception, you should use `Assert.Throws`.

```csharp
// Example usage
Assert.Throws<Exception>(() => { throw new Exception(); });
```

see also [assert exceptions](https://stackoverflow.com/questions/45017295/assert-an-exception-using-xunit)
