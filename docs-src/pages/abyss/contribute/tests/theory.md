---
uid: Abyss.Contribute.Tests.Theory
---

# xUnit Theory Tests - Data-Driven

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._


## `Theory` for Data-Driven Tests

Note that data-driven simply means that objects / lists of tests are run.

We are basically using the recommendations from
<https://andrewlock.net/creating-parameterised-tests-in-xunit-with-inlinedata-classdata-and-memberdata/>


## Example with InlineData

```csharp
[Theory]
[InlineData(1, 2, 3)]
[InlineData(2, 3, 5)]
[InlineData(3, 4, 7)]
public void ShouldCalculateCorrectly(int a, int b, int expected)
{
  var result = a + b;
  Equal(expected, result);
}
```

## Example with MemberData

This example uses `[MemberData]` to provide the data for the test.

[!code-csharp[](../../../../../../eav-server/ToSic.Eav.StartupTests/ConfigurationOverride/GlobalConfigurationOverride.cs)]
