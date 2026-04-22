---
uid: Extensions.AppExtensions.Create.Data.Index
---

# App Extensions - Data and Schema (ContentType)

Data extensions package reusable schema and optional starter content.
Install them in any app to get the same ContentTypes and baseline data.

> [!TIP]
> This is ideal for shared configuration types, lookup lists, and starter datasets.

## What Can Be Included

1. **ContentTypes**: schema definitions
2. **Default data**: initial entities for those ContentTypes
3. **Visual Queries**: optional query entities
4. **View definitions**: optional view entities

## How It Works

### 1. ContentTypes (Schema)

- Imported when the extension is installed
- Behave like normal app ContentTypes after import
- Can be used by the extension or by the app itself

Typical use cases:

- Configuration entities
- Shared reusable schemas
- Structured content models used by multiple apps

### 2. Default Data

- Imported together with the schema
- Can be modified or removed after installation
- Useful for sample data, default settings, and lookup values

### 3. Queries

- Stored as entities
- Can target extension ContentTypes and app data
- Must be included in the extension export configuration

See also: [Visual query extensions](xref:Extensions.AppExtensions.Create.VisualQuery.Index)

### 4. View Definitions

- Optional
- Lets the app immediately select extension views
- Must be included in the extension data bundle/export settings

## Packaging Checklist

Before exporting, verify all required parts are marked as included:

1. ContentTypes are part of the extension data
2. Default entities are in the bundle
3. Queries are flagged for export if needed
4. View definitions are flagged for export if needed

## Include Settings in Extension Export (Optional)

If your extension also ships a settings ContentType (for example `@{extension-name}`),
use this workflow to include it in export/import:

[!include[](~/shared/extensions/app-extensions/include-settings-in-export.md)]

## Installation Flow

1. Install the extension in a target app
2. ContentTypes and data are imported
3. Optional queries and views are available
4. The target app can extend or override everything as needed

## History

1. Beta in v20.09, to be released in v21.00
