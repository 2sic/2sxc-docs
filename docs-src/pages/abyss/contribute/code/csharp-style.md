---
uid: Abyss.Contribute.Code.CSharpStyle
---

# C# Style Guide for 2sxc / EAV

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

## Concept

We want a consistent C# style across all 2sxc and EAV code, so that it is easy to read and maintain.
This is why we have a C# Style Guide, which is based on the [Microsoft C# Style Guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions).

> [!TIP]
> We highly recommend using ReSharper or Rider.
> They will recommend all of the style rules in this document, and it will also help you to automatically apply them.
>
> In many cases you can use it for free on open source projects, or you can use the free [Rider Community Edition](https://www.jetbrains.com/rider/).

## Style Guide

* Use PascalCase for class names, method names, and property names.
* Use camelCase for local variables and method parameters.
* Use meaningful names for classes, methods, and properties.
* Use `var` when the type is obvious from the right-hand side of the assignment - even for `out` parameters.
  * Do use explicit types when the type is not obvious or when it improves readability.
* Clean up after yourself: remove unused namespaces, variables, methods, and classes.
* Use `global using` for common global namespaces from core libraries such as `ToSic.Sys.DI`.
* Use `async` and `await` for asynchronous programming.

## 2. Use Latest (Preview) C# Features

We want to use the latest C# features, so we can use the latest language features and improvements.
This means we will use the latest C# version available in the .NET SDK we are using.
By default, this is already enabled in all `.csproj` files using `<LangVersion>preview</LangVersion>`.

Important features to use are:

* [Record Types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record)
* [Init-only Properties](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/init)
* [Pattern Matching](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns)
* [Nullable Reference Types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types)

### 2.1 Use File Scoped Namespaces

[File Scoped Namespaces](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-10.0/file-scoped-namespaces)

#### [File Scoped Namespaces](#tab/file-scoped-namespaces)

```csharp
namespace ToSic.Sxc.Example;

public class ExampleClass
{
  public void ExampleMethod()
  {
    // Method implementation
  }
}
```

#### [Avoid Nested Namespaces](#tab/avoid-nested-namespaces)

```csharp
namespace ToSic.Sxc.Example
{
    public class ExampleClass
    {
        public void ExampleMethod()
        {
            // Method implementation
        }
    }
}
```

---

### 2.2 Use `field` Keyword and Init Setters

* [Use `field` Keyword](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/field)
* [Init-only Properties](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/init)

#### [Use `field` Keyword for Property Declarations](#tab/use-field-keyword)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string InitOnly { get; init; }

  public string ExampleOne { get => field ??= "default value"; set; }

  public string ExampleProperty 
  {
      get => field ?? "fallback value";
      set;
  } = "default value";
}
```

#### [Avoid Using Unnecessary Private Variables](#tab/avoid-field-keyword)

```csharp
namespace ToSic.Sxc.Example;

public class ExampleClass
{
  private string _exampleOne = "default value";
  private string _exampleField = "default value";

  public string InitOnly { get; set; }

  public string ExampleOne
  {
    get => _exampleOne ?? "default value";
    set => _exampleOne = value;
  }

  public string ExampleProperty
  {
    get => _exampleField ?? "fallback value";
    set => _exampleField = value;
  }
}
```

---

### 2.4 Use `[]` for Collection Initializers

* [Use `[]` for Empty Initializers](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/object-and-collection-initializers)
* [Use C# 12 Collection Expressions](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#collection-expressions)

#### [Use `[]` for Empty Initializers](#tab/use-square-brackets)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public List<string> ExampleList { get; set; } = [];

  public Dictionary<string, string> ExampleDictionary { get; set; } = [];

  public List<string> ExampleListWithItems { get; set; } = ["item1", "item2"];

  // Using C# 12 Collection Expressions to Copy Lists
  public List<string> ExampleListWithExpression { get;  } = [..ExampleListWithItems, "item3", "item4"];
}
```

#### [Avoid Using `new List<Something>()`](#tab/avoid-new-list)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
    public List<string> ExampleList { get; set; } = new List<string>();

    public Dictionary<string, string> ExampleDictionary { get; set; } = new Dictionary<string, string>();

    public List<string> ExampleListWithItems { get; set; } = new List<string> { "item1", "item2" };

    // Don't use old APIs or Modify Existing Lists
    public List<string> ExampleListWithExpression { get; } = new List<string>(ExampleListWithItems)
    {
        "item3",
        "item4"
    };
}
```

---

### 2.5 Use `=>` for Simple Methods and Properties

* [Use `=>` for Simple Methods](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-expressions)

#### [Use `=>` for Simple Methods](#tab/use-lambda-expressions)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input) => $"Hello, {input}!";

  public string ExampleProperty => $"Hello, {input}!";
}
```

#### [Avoid Using Full Method Bodies for Simple Methods](#tab/avoid-full-method-bodies)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    return $"Hello, {input}!";
  }

  public string ExampleProperty
  {
    get
    {
      return $"Hello, {input}!";
    }
  }
}
```

### 2.6 Use Target Typed `new()` for Object Creation

* [Use Target Typed `new()`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/target-typed-new)
* [new operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/new-operator#target-typed-new)

#### [Use Target Typed `new()`](#tab/use-target-typed-new)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public ExampleObject ExampleObject { get; set; } = new();

  public ExampleClass()
  {
    var specs = GetSpecs(new() { PropertyOne = "Value" });
  }

  public ExampleObject GetSpecs(ExampleObject exampleObject) => exampleObject;

}
```

#### [Avoid Using Full Type Names with `new`](#tab/avoid-full-type-names)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public ExampleObject ExampleObject { get; set; } = new ExampleObject();

  public ExampleClass()
  {
    var specs = GetSpecs(new ExampleObject { PropertyOne = "Value" });
  }

  public ExampleObject GetSpecs(ExampleObject exampleObject) => exampleObject;
}
```

## 3. Keep Code Flat

We want to keep the code flat, so that it is easy to read and maintain.
This means we will avoid unnecessary nesting and indentation, and keep the code as flat as possible.

It also means using conventions such as returning early, and avoiding unnecessary `else` statements.

### 3.1 Use Early Returns

* [Use Early Returns](https://www.c-sharpcorner.com/article/early-return-pattern-in-c-sharp/)

#### [Use Early Returns](#tab/use-early-returns)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    if (string.IsNullOrEmpty(input))
      return "Input is empty";

    return $"Hello, {input}!";
  }
}
```

#### [Avoid Nested `if` Statements](#tab/avoid-nested-if)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    if (string.IsNullOrEmpty(input))
    {
      return "Input is empty";
    }
    else
    {
      return $"Hello, {input}!";
    }
  }
}
```

---

### 3.2 Prefer Ternary Operators

* [Use Ternary Operators](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/conditional-operator)

#### [Use Ternary Operators](#tab/use-ternary-operators)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    return string.IsNullOrEmpty(input)
      ? "Input is empty"
      : $"Hello, {input}!";
  }
}
```

#### [Avoid Using Full `if` Statements](#tab/avoid-full-if)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    string value;
    if (string.IsNullOrEmpty(input))
    {
      value = "Input is empty";
    }
    else
    {
      value = $"Hello, {input}!";
    }
    return value;
  }
}
```
---

### 3.3 Use `switch` Expressions

* [Use `switch` Expressions](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression)

#### [Use `switch` Expressions](#tab/use-switch-expressions)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    return input switch
    {
      null => "Input is null",
      "" => "Input is empty",
      _ => $"Hello, {input}!"
    };
  }
}
```

#### [Avoid Using Full `switch` Statements](#tab/avoid-full-switch)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    switch (input)
    {
      case null:
        return "Input is null";
      case "":
        return "Input is empty";
      default:
        return $"Hello, {input}!";
    }
  }
}
```

---

### 3.4 Use Ternary Throws

* [Use Ternary Throws](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/conditional-operator#using-the-conditional-operator-to-throw-exceptions)

#### [Use Ternary Throws](#tab/use-ternary-throws)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    return input ?? throw new ArgumentException("Input cannot be null or empty", nameof(input))
  }

  public string ExampleMethodWithEmptyCheck(string input)
  {
    return string.IsNullOrEmpty(input) ? throw new ArgumentException("Input cannot be null or empty", nameof(input)) : input;
  }
}
```

#### [Avoid Using Full `if` Statements for Throws](#tab/avoid-full-if-throws)

```csharp
namespace ToSic.Sxc.Example;
public class ExampleClass
{
  public string ExampleMethod(string input)
  {
    if (input == null)
    {
      throw new ArgumentException("Input cannot be null or empty", nameof(input));
    }
    return input;
  }

  public string ExampleMethodWithEmptyCheck(string input)
  {
    if (string.IsNullOrEmpty(input))
    {
      throw new ArgumentException("Input cannot be null or empty", nameof(input));
    }
    return input;
  }
}
```

---

## 4. Use LINQ properly

LINQ is easy to learn and hard to master.
Here are some tips to use LINQ properly:

* Use `Select` and `Where` to filter and transform collections.
* Use `FirstOrDefault` and `SingleOrDefault` to get single items from collections.
* Use `Any` and `All` to check conditions on collections.
* Use `Aggregate` to combine collections into a single value.
* Use `ToList` and `ToArray` to convert collections to lists or arrays.
* Use `AsEnumerable` to convert collections to `IEnumerable<T>` before using LINQ methods.
* Use `IEnumerable<T>` instead of `List<T>` or `Array` when possible, to allow for more flexibility.
* Use `IReadOnlyList<T>`, `IReadOnlyCollection<T>` or `IImmutableList<T>` for read-only collections.

> [!TIP]
> It's usually better to use a `ToList()` or `ToArray()` at the end of a LINQ query, so that it is clear that the query is executed at that point.
> This also helps to avoid performance issues with deferred execution, where the query is executed multiple times.
>
> It also helps debug issues where they occur, and not later when the query is executed.

## 5. Use `IServiceProvider` for Dependency Injection

We use `IServiceProvider` for dependency injection, and register services in the `Startup.cs` file.
This allows us to easily inject dependencies into classes and methods, and makes the code more testable and maintainable.

## 6. Use Proper Nullability Annotations

We use proper nullability annotations to indicate whether a parameter or return value can be null or not.
This helps to avoid null reference exceptions and makes the code more readable.

> [!TIP]
> As of v20, all the core libraries are now using nullable reference types.
> This include `ToSic.Sys`, `ToSic.Sxc`, and `ToSic.Eav`.
>
> The Dnn / Oqtane libraries are not fully nullable yet, but will be in the future.


## History

* New in 2023-09 v16.06

Shortlink: <https://go.2sxc.org/build>
