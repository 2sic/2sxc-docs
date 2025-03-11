---
uid: Abyss.Contribute.Tests.TestAccessors
---

# Test Accessors and Test Constructors

While working with the normal code we often see that a method is used x-times.
Unfortunately the counter counts all calls including test-calls, so the number can be very misleading.
It's even possible that a method is never used in production, but is called 1000 times in tests.

To avoid this problem, tests should prefer to use **Test Accessors**  and **Test Constructors** where applicable to ensure clarity and reduce the access count.
As a rule of thumb, if a method is used more than 3 times in tests, it should be considered for a Test Accessor,
because then the counter cannot easily be used to determine if the method is still in use.

The way this _should_ be implemented is as follows:

1. In some cases, a simple method on the test class like `GetThing(...)` or `ThingTac(...)` is enough, especially if this method is only used in this test class.
1. In most cases, create static extension methods ending with `Tac` - so `IThing.Get(...)` becomes a static `GetTac(this IThing parent, ...)` method.
    1. These can be in the test project where it is used
    2. ... or in a TestHelper project if it's used in multiple test projects

Examples follow.

## Simple Test Constructor in the Class

This shows a method on the class (for use there only) to create a specific class.
It will help to keep the access-count on the constructor low.

[!code-csharp[](../../../../../../eav-server/ToSic.Eav.Core.TestsBasic/Caching/CachePolicyMakerTests.cs#L8-L11)]

## Static Class with Test Accessor

This is a static class with a test accessor method, inside the test-project where it is used.

[!code-csharp[](../../../../../../eav-server/ToSic.Eav.Core.TestsBasic/Caching/TestAccessors.cs)]

## Static Class with Test Accessor in a TestHelper Project

[!code-csharp[](../../../../../../eav-server/ToSic.Eav.Core.TestHelpers/Data/Build/ValueBuilderTestAccessors.cs)]

