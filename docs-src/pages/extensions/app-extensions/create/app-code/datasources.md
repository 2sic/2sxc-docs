---
uid: Guides.AppExtensions.AppCode.DataSources
---

# App Extensions - DataSources

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

Extensions can include custom c# DataSources for use in your code or in Visual Queries.

> [!TIP]
> This allows you to create small libraries of DataSources which solve a specific problem,
> and then share them across multiple Apps by installing the extension in each App.

## Location and Namespace

You should place the code for the extension in `/AppCode/Extensions/{ExtensionName}/`.
The `{ExtensionName}` should match the folder of the extension itself,
as it's used in `/extensions/{ExtensionName}/`.

If you mix DataSources with other code, consider placing them in a `/AppCode/Extensions/{ExtensionName}/DataSources/` subfolder.

> [!TIP]
> In the main extension in `/extensions/`, the convention is to use lower-case only,
> but here we recommend using PascalCase to match C# conventions.

For namespaces you should really use `App.Extensions.{ExtensionName}` to avoid conflicts with other extensions.

If you mix DataSources with other code, consider using a `App.Extensions.{ExtensionName}.DataSources` sub-namespace.

## TODO: more instructions @2rb



## Special Compiling Options

If you need to ensure special DLLs are referenced during compilation,
see [](xref:Guides.AppExtensions.AppCode.CompilerOptions).

## Include in the Package Definition

The package export system only exports parts which have been declared to be in use.
So make sure to tick the "App Code" checkbox in the extension's package definition UI.

---

## History

1. Beta in v20.09, to be released in v21.00
