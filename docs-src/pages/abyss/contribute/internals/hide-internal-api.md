---
uid: Abyss.Contribute.Internals.HideInternalApi
---

# How we Hide Internal APIs

A lot of 2sxc / EAV code is internal, meaning it should not be used outside of the project.

> [!TIP]
> This is really important, because it allows us to change the code without breaking anything.

There are two ways we hide internal APIs:

1. Make sure it doesn't appear in the documentation
2. Make sure it doesn't appear in the intellisense of Visual Studio

## Hide from Documentation

To hide from documentation, we use custom attributes such as `[PrivateApi]` on classes, methods, and properties.

These attributes are in the core library, and are configured for filtering out in the [DocFx](https://dotnet.github.io/docfx/) documentation generator.

## Hide from Intellisense

To hide from intellisense, we use the `EditorBrowsable` attribute on classes, methods, and properties.

```c#
[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
```

> [!WARINING]
> There is a bug in Visual Studio, probably introduced with the newer AI agents.
>
> By default, the behavior of this is documented to be as follows:
>
> 1. If the attribute is set to `Never`, it should not show up in intellisense _for anything using the DLL_.
> 2. If the attribute is set to `Never`, it **should** show up in intellisense _for anything using the project.

Unfortunately, the current IntelliSense in Visual Studio 2022 (and 2023) does not respect this behavior.
So we had to implement a workaround which only applies this attribute to the release DLLs.
Here's how it works:

1. We have a custom attribute which looks the same as the `EditorBrowsable` attribute - called `FakeEditorBrowsableAttribute`
1. We also have a custom enum which looks the same as `EditorBrowsableState` - called `FakeEditorBrowsableState`
1. Both are in the root namespace `FixEditorBrowsable`
1. The implementations of this is in the `ToSic.Sys.Core` project.
1. In addition, we have global usings which swap these during development
1. All of this is in a single file in the `ToSic.Sys.Core` project called `HideInternalApisOnReleaseOnly.cs`;

The magic switching looks like this:

```c#
#if DEBUG
global using ShowApiWhenReleased = FixEditorBrowsable.FakeEditorBrowsableAttribute;
global using ShowApiMode = FixEditorBrowsable.HideInternalApisOnReleaseOnly;
#else
global using ShowApiWhenReleased = System.ComponentModel.EditorBrowsableAttribute;
global using ShowApiMode = System.ComponentModel.EditorBrowsableState;
#endif
```

All other projects should reference this file, so they can use it, with the following in your `.csproj` file:

```xml
  <ItemGroup>
    <Compile Include="..\ToSic.Sys.Core\Shared\HideInternalApisOnReleaseOnly.cs" Link="HideInternalApisOnReleaseOnly.cs" />
  </ItemGroup>
```

Now we can change all of these attributes to be

```c#
[ShowApiWhenReleased(ShowApiMode.Never)]
```

---

## History

1. The Hide-everything was introduced ca. 2sxc 17 when we started to encourage IntelliSense
1. The `FakeEditorBrowsable` was introduced in 2sxc 19.99 (for 2sxc v20)
