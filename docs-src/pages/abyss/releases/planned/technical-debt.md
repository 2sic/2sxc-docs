---
uid: Abyss.Releases.Planned.TechnicalDebt
---

# Planned Technical Debt

This page collects planned technical debt items, so that we'll be able to address them all in one go when we do it.

## 1. Logging

In v22 / v23 we plan to move logging to Microsoft.Extensions.Logging.

## 2. Dependency Injection

1. Dependency Injection of exotic context information (Page, ExecutionContext, etc.)

## 3. Nullable Projects

1. Make the DNN project nullable
2. Make the Oqtane project nullable

## 4. Composition over Inheritance

We have a lot of inheritance built into the system,
and this causes a lot of difficulties following code
and making changes without introducing unintended side effects.

We should aim to refactor the system to favor composition over inheritance wherever possible.

### 4.1. How to find problematic inheritance

1. Look for classes that inherit from `ServiceBase<T>` but not from `DataSourceBase` - probably exporting both lists to text and then filter
1. Look for classes that inherit from `ServiceBase` _indirectly_


### 4.2. How to Refactor

TODO

#### 4.2.1. Option 1:Create a Helper for Shared Logic

When refactoring inheritance to composition, identify the logic that is shared across multiple classes and extract it into a helper class or service.
This allows the shared functionality to be reused without relying on a common base class.

This helper can be

1. injected
2. called by the implementation

Example (conceptual, not code):

Suppose multiple classes need to perform logging.
Instead of having them inherit from a common base class that provides logging functionality,
you can create a `LoggingHelper` class that encapsulates the logging logic.
Each class can then either have the `LoggingHelper` injected or call it directly to perform logging.

#### 4.2.2. Option 2: Use Providers

Another approach to refactoring inheritance to composition is to use providers.
Providers encapsulate specific functionality and can be injected into classes that need them.
This allows classes to delegate responsibilities to providers instead of relying on a common base class.

For example, if multiple classes need to access configuration settings,
you can create a `ConfigurationProvider` and inject it into the classes that require it.
So a core service would be the main service (like an `ExportService`)
but it would use an `ExportConfigProvider` which is specific to the implementation.

### 4.3. Candidates

1. `AppsCacheBase` @STV
1. Things inheriting from `AdamWorkBase`
1. Things inheriting from `SerializerBase`
1. `Eav.DataSources.App` and `AppDataWithCrud`
1. `AppBase<SxcAppBase.Dependencies>`
1. `Query` and `TypedQuery`
1. `BlockEditorBase` and `...Entity`, `...Module`
1. Various `...Providers` incl. `SitesDataSourceProvider` (`DnnSitesDsProvider`) `AdamDataSourceProvider`...
1. `CodeApiServiceBase` and derived types
1. maybe `ExecutionContext` - but not sure
1. `ConvertToEavLight` and derived
1. `UiContextBuilderBase` and derived types
1. `AdamSecurityChecksBase` and derived types

Note: Non-candidates are:

1. Things derived from `DataSourceBase`
