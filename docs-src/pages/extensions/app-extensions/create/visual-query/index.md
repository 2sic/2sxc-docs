---
uid: Extensions.AppExtensions.Create.VisualQuery.Index
---

# App Extensions - Visual Queries

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

Extensions can include custom Visual Queries which are either used by the extension itself (e.g. an input-type) or can be used by the App as a whole.

> [!TIP]
> This allows you to create small libraries of Visual Queries which solve a specific problem,
> and then share them across multiple Apps by installing the extension in each App.

## Location and Naming

While developing Visual Query extensions,
just create normal queries in your App and when exporting the extension,
ensure that the queries are included in the package.

We highly recommend that you give the queries a clear and unique name,
such as `{ExtensionName}.{QueryName}` to avoid conflicts with other queries in the App.

We also recommend that you don't use spaces or special characters in the query names,
to ensure easy use in REST API calls.

## TODO: more instructions @2rb


## Include in the Package Definition

> [!TIP]
> Visual Queries are configuration which is stored as Entities.
> To include them in the extension, you must ensure that it's part of the package export.

The package export system only exports parts which have been declared to be in use.
So make sure to tick the "Has Query" checkbox in the extension's package definition UI.

---

## History

1. Beta in v20.09, to be released in v21.00
