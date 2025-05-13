---
uid: Abyss.Contribute.Internals.CSharpNullable
---

# How we Use the C# Nullable Features

Using the latest C# language features is important for us, because it allows us to write better code.

For example, we can do this:

```c#
public class MyClass
{
    public SomeObject? MyProperty { get; init; }
}
```

To make this possible, all the `.csproj` files need to have the following settings:

```xml
<PropertyGroup>
  <Nullable>enable</Nullable>
</PropertyGroup>
```

But there is a problem: It's not supported by all the .NET runtimes we are using.
To make it work anyhow, we also have to add the proper [nullable](https://www.nuget.org/packages/Nullable/1.3.1)
nuget package - but only in `net472`.
This is done like this in each `.csproj` file:

```xml
<!-- Support Nullable in .net Framework -->
<ItemGroup Condition="$(TargetFramework) == 'net472'">
  <PackageReference Include="Nullable" Version="1.3.1">
    <PrivateAssets>all</PrivateAssets>
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  </PackageReference>
</ItemGroup>
```