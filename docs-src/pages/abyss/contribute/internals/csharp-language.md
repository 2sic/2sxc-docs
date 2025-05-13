---
uid: Abyss.Contribute.Internals.CSharpLanguage
---

# How we Use the Latest C# Language Features

Using the latest C# language features is important for us, because it allows us to write better code.

For example, we can do this:

```c#
public class MyClass
{
    public SomeObject MyProperty { get => field ??= new(); init; }
}
```

To make this possible, all the `.csproj` files need to have the following settings:

```xml
<PropertyGroup>
  <LangVersion>preview</LangVersion>
</PropertyGroup>
```

This allows us to use almost all of the latest C# language features, such as:

- [C# 11](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-11)
- [C# 12](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12)
- [C# 13](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-13)
- [C# 14](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-14)

> [!TIP]
> There are some really edge cases where we cannot use a new feature,
> because it must be supported by the .NET **runtime** we are using.

