---
uid: Abyss.Contribute.Backend.Tests.AssertTypes
---

# Asserting Types

[!include[""](../../_contributors-only.md)]

Types should use `IsType` instead of `IsInstanceOfType`.
But often it should use `IsAssignableFrom`. There are also `IsNot...` variations.

```csharp
// Example usage
Assert.IsType<ExpectedType>(actualValue); // Correct usage
Assert.IsAssignableFrom<ExpectedBaseType>(actualValue); // Alternative usage
```

See also <https://xunit.net/xunit.analyzers/rules/xUnit2018>.
