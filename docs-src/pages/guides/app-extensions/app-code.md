---
uid: Basics.App.Extensions.AppCode
---

# App Extensions - App Code

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

Extensions can include custom c# code which is either used by the extension itself (e.g. an input-type) or can be used by the App as a whole.

> [!TIP]
> This allows you to create small libraries of code which solve a specific problem,
> and then share them across multiple Apps by installing the extension in each App.

## Location and Namespace

You should place the code for the extension in `/AppCode/Extensions/{ExtensionName}/`.
The `{ExtensionName}` should match the folder of the extension itself,
as it's used in `/extensions/{ExtensionName}/`.

> [!TIP]
> In the original extension, the convention is to use lower-case only,
> but here we recommend using PascalCase to match C# conventions.

You can also create sub folders and sub-namespaces as needed.
Some common sub-folders could be `Services`, `WebApi`, `Controllers`, or `Helpers` depending on the purpose of the code.
For data we recommend `Data` or `Models`.

For namespaces you should really use `App.Extensions.{ExtensionName}` to avoid conflicts with other extensions.

## Special Compiling Options

In rare cases the compiler needs to be instructed to do something special.
The configuration must be in the same folder, to ensure its included in the distribution package.

As of now, you must create an `compile.json` file
in the `/AppCode/Extensions/{ExtensionName}/` folder
with content like this:

```json
{
  // References for .net 10+ (Oqtane)
  "References": [],
  // References for .net4 (DNN)
  "References.net4": [
    "System.Net.Http, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
  ]
}
```

> [!TIP]
> The above example shows how to add a reference to `System.Net.Http` for DNN,
> which is often needed for making HTTP requests.
>
> It's also needed if you have custom WebApi controllers returning `HttpResponseMessage`.
> Without this reference, you may encounter compilation errors.

## Include in the Package Definition

The package export system only exports parts which have been declared to be in use.
So make sure to tick the "App Code" checkbox in the extension's package definition UI.

---

## History

1. Beta in v20.09, to be released in v21.00
