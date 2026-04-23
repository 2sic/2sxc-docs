---
uid: Extensions.AppExtensions.Create.AppCode.Index
---

# App Extensions - App Code

AppCode extensions let you ship reusable C# code with your App Extension.

> [!TIP]
> Use this for business logic, integrations, APIs, and custom data providers you need in multiple apps.

## Location and Namespace

Place extension code in:

```text
/AppCode/Extensions/{ExtensionName}/
```

`{ExtensionName}` should match the related extension in `/extensions/{ExtensionName}/`.

> [!TIP]
> In the main extension in `/extensions/`, the convention is to use lower-case only,
> but here we recommend using PascalCase to match C# conventions.

You can also create sub folders and sub-namespaces as needed.
Some common sub-folders could be `Services`, `WebApi`, `Controllers`, or `Helpers` depending on the purpose of the code.
For data we recommend `Data` or `Models`.

Use namespaces like:

```text
AppCode.Extensions.{ExtensionName}
```

## What You Can Build in AppCode

Typical things implemented in extension AppCode:

- **Custom DataSources** (for Visual Query and code)
- **WebAPI controllers** (endpoints used by the app or UI)
- **Reusable services** (API clients, business logic, calculations)
- **Models / DTOs** shared across controllers and DataSources
- **Helper utilities** used by Razor, APIs, or DataSources

If you only need small helper methods for a single view, keep them in the Razor file.
If the logic is reused across multiple views/apps, put it into AppCode.

## Related Topics

- Custom DataSources: [DataSource extensions](xref:Extensions.AppExtensions.Create.AppCode.DataSources)
- Custom input types, toolbars, etc.: see the other pages in this App Extensions section

## Special Compiling Options

If you need to ensure special DLLs are referenced during compilation,
see [Compiler options](xref:Extensions.AppExtensions.Create.AppCode.CompilerOptions).

## Include in the Package Definition

The package export system only exports parts which have been declared to be in use.
So make sure to tick the **"App Code"** checkbox in the extension's package definition UI.

## History

1. Beta in v20.09, planned stable release in v21.00
