---
uid: Abyss.Contribute.Code.Frontend.EavUi.CustomInputHandling
---

# Input Field Fallback Behavior

## Overview

The edit UI supports custom input fields (e.g. `string-*`, `number-*`,
`boolean-*`) which can be provided by extensions.

If a configured custom input field is **not available**, the
system will automatically **fall back to the default input field**.

This ensures the UI remains functional even if extensions are missing or
misconfigured.

------------------------------------------------------------------------

## When does fallback happen?

Fallback is triggered when:

- A field is configured with a custom input type.
- The input component is **not registered or not
    loaded**

### Common causes

- Extension not installed
- Extension not loaded correctly

------------------------------------------------------------------------

## What happens during fallback?

1. The system detects that the configured input type cannot be resolved
2. It selects the **default input component** for the field type:
    - `string-*` -> `string-default`
    - `number-*` -> `number-default`
    - `boolean-*` -> `boolean-default`
3. The field is rendered using the default input
4. A **warning message** is shown in the UI

------------------------------------------------------------------------

## Why this exists

Without fallback, missing custom inputs would break the edit UI.

Fallback ensures:

- Editors can still work with content
- Data remains editable
- Errors are visible but not blocking

------------------------------------------------------------------------

## How fallback is detected in code

Default input components use:

``` ts
fieldState.isNotExpectedType([...expectedTypes])
```
