---
uid: Extensions.AppExtensions.Create.Data.Index
---

# App Extensions - Data and Schema (ContentType)

<!-- [!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .data-all,
  .context-box-summary .query-app,
  .context-box-summary .process-razor,
  .context-box-summary .process-web-api-app,
  .context-box-summary .edit-ui-custom
  { visibility: visible; }
</style> -->

Extensions can include custom data and schema (ContentType) definitions which are either used by the extension itself or can be used by the App as a whole.

> [!TIP]
> This allows you to create small libraries of data and schema definitions which solve a specific problem,
> and then share them across multiple Apps by installing the extension in each App.

For Data and Schema (ContentType) extensions, you may choose to create one or more of the following:

1. Content-Types: Custom Content-Types to define the structure of your data.
2. Default Data: Predefined data entries that come with the Content-Type.
3. Queries: Visual Queries, which are included in the data bundle.
4. Views: View definitions, which are included in the data bundle.


## How Data & Schema App Extensions Work

Data & Schema App Extensions bundle **schemas and data** into a reusable package that can be installed into any App.  
They are ideal for providing **ready-to-use data models** together with sensible defaults.

At a high level, such an extension consists of the following building blocks.

---

## 1. ContentTypes (Schema)

ContentTypes define the **structure** of the data provided by the extension.

- Imported automatically when the extension is installed
- Can be used:
  - internally by the extension
  - or by the consuming App like any other ContentType

Typical use cases:

- Configuration entities
- Structured datasets
- Shared schemas reused across multiple Apps

Once installed, these ContentTypes behave exactly like native App ContentTypes.

---

## 2. Default Data

Default Data provides **pre‑filled entities** for the ContentTypes included in the extension.

- Imported together with the ContentTypes
- Can be changed, extended, or removed after installation
- Commonly used for:
  - example data
  - default configuration values
  - lookup tables or presets

This allows an App to work immediately without requiring manual data entry.

---

## 3. Queries

Queries are **Visual Queries** that are bundled with the extension.

- Imported as part of the data bundle
- Can reference:
  - extension ContentTypes
  - default data
  - App data

For more information check out [visual queries](xref:Extensions.AppExtensions.Create.VisualQuery.Index).

---

## Installation & Usage Flow

1. Install the App Extension into an App
2. ContentTypes and Default Data are imported automatically
3. Queries and Views become available immediately
4. The App can:
   - use everything as provided
   - extend or override parts
   - combine extension data with App‑specific logic

---

## History

1. Beta in v20.09, to be released in v21.00
