---
uid: Abyss.Contribute.Backend.Tests.Theory
---

# xUnit Theory Tests - Data-Driven

[!include[""](../../_contributors-only.md)]

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



## Simple Example with `static` `MemberData` of a simple type

```csharp
public static TheoryData<string?> OkNamesIfSetupOk =>
[
    null,                   // null, do checks, but should work because underlying names are ok
    "*",                    // asterisk - disable checks
    nameof(MockForInherit), // exact correct name
];

public static TheoryData<string?> ThrowingNamesIfSetupOk =>
[
    "",                         // empty - will check and return bad
    "WRONG NAME",               // incorrect name - will check and return bad
    nameof(IMockForInherit),    // incorrect name
];

[Theory, MemberData(nameof(OkNamesIfSetupOk))] 
public void FromModel_Class_NotNull(string? typeNameCheck)
    => NotNull(GetModel<MockForInherit>(typeNameCheck));

[Theory, MemberData(nameof(ThrowingNamesIfSetupOk))]
public void FromModel_Class_BadNames_Throws(string? typeNameCheck)
    => Throws<InvalidCastException>(() => GetModel<MockForInherit>(typeNameCheck));
```



## Improved Example with names (recommended for readability)

```csharp
public record TestCase(string? Name, string Notes);

public static TheoryData<TestCase> OkNamesIfSetupOk =>
[
    new(null, "null, do checks, but should work because underlying names are ok"),
    new("*", "* - disable checks"),
    new(nameof(MockForInherit), "exact correct name")
];

public static TheoryData<TestCase> ThrowingNamesIfSetupOk =>
[
    new("", "empty - will check and return bad"),
    new("WRONG NAME", "incorrect name - will check and return bad"),
    new(nameof(IMockForInherit), "incorrect name - will check and return bad")
];


[Theory, MemberData(nameof(OkNamesIfSetupOk))] 
public void FromModel_Class_NotNull(TestCase testCase)
    => NotNull(GetModel<MockForInherit>(testCase.Name));

[Theory, MemberData(nameof(ThrowingNamesIfSetupOk))]
public void FromModel_Class_BadNames_Throws(TestCase testCase)
    => Throws<InvalidCastException>(() => GetModel<MockForInherit>(testCase.Name));
```

> [!TIP]
> For readability, we suggest placing the notes/description at the end of the data-record.



## Example with MemberData with More Complex Types

This example uses `[MemberData]` to provide the data for the test.

[!code-csharp[](../../../../../../../../eav-server/ToSic.Eav.StartupTests/ConfigurationOverride/GlobalConfigurationOverride.cs)]


## Code Generated Test Cases using `[MethodData]`

In some scenarios you will want to generate the test cases but not in a static way.

For this you must use the `Xunit.DependencyInjection` package, which allows you to use `[MethodData]` to generate the test cases.

1. Make sure you have the `Xunit.DependencyInjection` package installed.
1. Create the object which will generate the test cases.
1. Register it in DI
1. Add attributes like this: `[Theory, MethodData(nameof(TestCaseGenerator.ValidTypesWithGoodNames), typeof(TestCaseGenerator))]`

Short example of a generator class:

```csharp
public class TestCaseGenerator(MockDataGenerator<MockForInherit> generator) : ToModelTestsBase(generator, false)
{
    private static TestCaseName[] OkNamesIfSetupOk =>
    [
        new(null, "null, do checks, but should work because underlying names are ok"),
        new("*", "* - disable checks"),
        new(nameof(MockForInherit), "exact correct name")
    ];

    public IEnumerable<object[]> OkTypesAndNamesIfSetupOk()
    {
        return OkNamesIfSetupOk
            .SelectMany(testCase => new object[][] {
                [CreateTestCaseTypeAndName<MockForInherit>(testCase)],
                [CreateTestCaseTypeAndName<MockForInheritDerivedSpecsGood>(testCase)],
                [CreateTestCaseTypeAndName<MockForInheritDerivedSpecsAsterisks>(testCase)],
                [CreateTestCaseTypeAndName<IMockForInherit>(testCase, typeof(MockForInherit))],
                [CreateTestCaseTypeAndName<IMockForInherit_ReApplyingInterfaceWithSpecsAsterisks>(testCase, typeof(MockForInherit))],
            });
    }

    private TestCaseTypeAndName CreateTestCaseTypeAndName<TModel>(TestCaseName testCase, Type? expected = null) where TModel : class, IModelFromEntity
        => new(testCase.Name, this.GetModel<TModel>(testCase.Name), expected ?? typeof(TModel), testCase.Notes);
}
```

Used in a test like this:

```csharp
public abstract class ToModelInheritanceTests(MockDataGenerator<MockForInherit> generator, bool useInternal)
    : ToModelTestsBase(generator, useInternal)
{

    [Theory, MethodData(nameof(TestCaseGenerator.OkTypesAndNamesIfSetupOk), typeof(TestCaseGenerator))]
    public void FromVarious_NotNull(TestCaseTypeAndName testCase)
        => NotNull(testCase.GeneratedObject);
}
```

Important to know:

1. External test cases must return a `IEnumerable<object[]>` where each object[] is a set of parameters for the test method.
1. In most cases we use, we'll prefer to just return a strongly typed `TestCase` object and therefore just 1 parameter per row.

## Advanced Tips for the `[MethodData]` approach

So far we're not using it much, but for testing the models we used a special concept where we really just need the generator for one test class.

In this case, we decided to make the generator a sub-object of the test class, and use `partial` to spread out the code,
making it clearer what test-setups are used.
This looks like this:

```csharp
public abstract class ToModelInheritanceTests(MockDataGenerator<MockForInherit> generator, bool useInternal)
{
    #region Test Case Generator - Prepare for later Partials

    public partial class TestCaseGenerator(MockDataGenerator<MockForInherit> generator): TestCaseGeneratorBase(generator);

    #endregion

    #region Test cases which should all just work as expected - Tests from external Generator combining object creation and name combinations

    public partial class TestCaseGenerator
    {
        private static TestCaseName[] SkipNameCheck =>
        [
            new("*", "Skip type Check"),
        ];


        private static TestCaseName[] OkNamesIfSetupOk =>
        [
            new(null, "null, do checks, but should work because underlying names are ok"),
            new("*", "* - disable checks"),
            new(nameof(MockForInherit), "exact correct name")
        ];

        public IEnumerable<object[]> ValidTypesWithGoodNames()
            => CreateTestCases<TestCase_IsValidAttribute>(OkNamesIfSetupOk);
    }

    [Theory, MethodData(nameof(TestCaseGenerator.ValidTypesWithGoodNames), typeof(TestCaseGenerator))]
    public void Valid_NotNull(TestCaseTypeAndName testCase)
        => NotNull(testCase.Generator());

    [Theory, MethodData(nameof(TestCaseGenerator.ValidTypesWithGoodNames), typeof(TestCaseGenerator))]
    public void Valid_PropertyMatchesData(TestCaseTypeAndName testCase)
        => Equal((int)TargetTypes.Entity, ((MockForInherit)testCase.Generator()!).TargetType);
}
```

To explain a bit:

1. We have a base class `TestCaseGeneratorBase` which has some helper methods to create the test cases.
    This is to declutter the main test class.
1. We then create the true generator as a sub-class of the main test and have the initializer at first
1. Then we use partials throughout the file to always keep the specs near the tests.

In this case we also did something more: since we have a lot of tests related to
C# classes and interfaces, we decided to decorate them with `[TestCase_...]` attributes
which we then index to create the tests.

Without this special approach, it became very hard to be sure which tests we have and what they were for.
