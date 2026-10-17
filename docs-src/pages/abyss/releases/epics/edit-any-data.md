---
uid: Abyss.Releases.Epics.EditAnyData
---

# Epic: Edit Any Data

The edit experience in 2sxc / EAV was meant to edit entities.

However, there are a lot of cases where we need some kind of edit dialog for data,
which when stored will not result in an entity in the DB.

## 📈 Status Overview ⏸️ - Updated: 2026-10-17

* Implementation: ca. 20%
* Documentation: ca. 10% (just this document)
* Next Priorities: ⏸️ paused / wait

## Motivation

To leverage the super-flexible / dynamic edit capabilities of the EAV system for data that doesn't necessarily correspond to entities.
This would allow to easily create dialogs to edit things, without true development of the UIs.

## Examples

The following examples already work as of now:

1. Editing debug levels configuration  
    in system features; stored in the `[Global]/system-custom/features.json` settings file  
    uses JS internal features
1. Edit App Extension definition  
    in app extensions; stored in the `[App]/features/[feature-name]/features.json` settings file  
    uses JS internal features

Note: both implementations currently use the JS features to make this possible.

## Features Needed

### JS Internal Features needed

These are the features which are needed to use the edit-UI from JavaScript.
It's mainly for the internal admin-UI.

1. ✅ Ability to open an edit dialog for arbitrary data objects.
1. ✅ Ability to still specify a schema (from the pre-stored schemas).
1. ✅ Ability to specify that it should not save to the backend, but pass the edited data back to the JS caller.

📈 Status: ✅ Works, but API may still need to mature before widespread use.

### JS External Features needed

1. 🔳 Ability to open the dialog (like using the toolbar) to include data for editing.
1. ✅ Ability to specify a schema for the data being edited.
1. 🔳 Ability to receive the edited data back in the JS caller without saving it to the backend.

📈 Status: Not yet implemented

Implementation would need:

1. Include data when calling the open/edit dialog. - POC ca. 2h; final ca. 8h
1. Return the data to the JS caller without saving it to the backend. - POC ca. 4h; final ca. 8h

### JS Features in Consideration

1. Ability to specify an alternate endpoint to load the data (instead of providing in in the JS call).
1. Ability to specify a alternate endpoint to which the edited data should be sent instead of the default backend.
1. Ability to specify an alternate json-schema to use for sending the data.
1. Ability to specify the Content-Type schema in the caller (instead of retrieving it from the backend, incl. the fields, validations, etc.)

### Toolbar Features Needed

1. 🔳 Ability to open the edit dialog from the toolbar with pre-filled data. - POC ca. 2h; final ca. 8h
1. ✅ Ability to specify the schema for the data being edited when opening from the toolbar.
1. 🔳 Ability to receive the edited data back in the JS caller without saving it to the backend when using the toolbar. - POC ca. 4h; final ca. 8h

📈 Status: Not yet implemented

### Backend Features in Consideration

1. Alternate Data Loaders (like from file, JS, etc.)
1. Alternate Data Savers (like to file, JS, etc.)
1. Alternate data-processing flow (like through configuration etc.) - this would require an extensive standardized architecture - 20%
1. Alternate Content-Type Schema providing (like from eav code, or even app code)


## Related Features

1. HookUp system (for generic data flows)
1. Toolbar API
1. Code Based Content-Type Schemas
1. Alternate Data Loaders and Savers (for flexible backend integration)
1. Alternate Content-Type Schema providing (for dynamic schema handling)

## History

1. 2025-07 started for v20.00.03 (configure logging level at startup and app-load)
1. 2025-12 used same mechanism for app extensions
1. 2026-10 created these docs
