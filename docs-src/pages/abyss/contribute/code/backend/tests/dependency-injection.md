---
uid: Abyss.Contribute.Backend.Tests.DependencyInjection
---

# Dependency Injection in xUnit Tests

[!include[""](../../_contributors-only.md)]


## Unit Tests Without Dependency Injection

These unit tests are the simplest, and don't need any special setup.
Example:

[!code-csharp[](../../../../../../../../eav-server/ToSic.Sys.Core.Tests/Sys.FunctionalFactory/FunctionalFactoryStringTests.cs#L10-L21)]


## Unit Tests With Dependency Injection _by Namespace_

These tests need DI to be setup, but don't need any configuration (such as Database connections).

First we need a startup class which does all the DI setup - in a Folder, so everything under it will use this:

[!code-csharp[](../../../../../../../../eav-server/ToSic.Sys.DI.Tests/Sys.Services.Switchable/Startup.cs)]

The tests in this folder and sub folders will automatically pick up the DI configuration from this startup class.
This happens through the **namespace**, not through the physical folders.

This setup allows you to quickly reuse a setup, and specify it to be very specific to all the tests in the same namespace.
In will then be available as a service in the test.

[!code-csharp[](../../../../../../../../eav-server/ToSic.Sys.DI.Tests/Sys.Services.Switchable/VerifySwitchableService.cs)]


## Unit Tests With Dependency Injection _by Sub Class_

Every test class can specify its own DI setup by using an `Startup` sub class.
This is the preferred method for many isolated tests, the syntax is like this:

```csharp
/// <summary>
/// Same Tests - but for the public ToModel()
/// </summary>
public class ToModelInheritance
{
    public class Startup : StartupInternal
    {
        public void ConfigureServices(IServiceCollection services)
        {
          // do your work here
          services.AddTransient<IToModelTac, ToModelTacPublic>();
        }
    }
}
```

Or when reusing a base startup class, you can also override the `ConfigureServices` method:

```csharp
/// <summary>
/// Same Tests - but for the public ToModel()
/// </summary>
public class ToModelInheritance
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
            => base.ConfigureServices(services.AddTransient<IToModelTac, ToModelTacPublic>());
    }
}
```


## Unit Tests With Dependency Injection _by Attribute_

Every test class can also specify a specific DI setup by using an attribute.
This is the preferred method, the syntax is like this:

```csharp
[Startup(typeof(StartupTestsEavCore))]
public class LookUpEngineTests(DataBuilder dataBuilder) {
  // ...
}
```

## Unit Tests with Dependency Injection and Startup with Scenario

In various cases you may need to setup a specific DI configuration for a test.
For example, to specify a path or a DB connection.
In xUnit this is done with **Fixtures**.

We also have a concept of **TestScenarios** which describe what DB and folders to use.
This is run as a fixture with the `DoFixtureStartup` class.

```csharp
[Startup(typeof(StartupTestFullWithDb))]
public class AccessItemsInAppState(IAppReaderFactory appReaderFactory, ITestOutputHelper output): IClassFixture<DoFixtureStartup<ScenarioBasic>>
{
  // Add any specific setup or tests related to TestScenarios here.
}
```

> [!TIP]
> Where possible, the startup and fixture class should be a in a `...TestHelper`.
