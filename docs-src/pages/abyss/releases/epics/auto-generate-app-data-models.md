---
uid: Abyss.Releases.Epics.AutoGenerateAppDataModels
---

# Epic: Auto-Generate App Data Models

Entity schemas can be used to generate models in the App code.
Now we want to do this automatically, as the schema changes.

But it's important that the developer actively chose to do this,
because some changes (such as removing or renaming fields) can result in broken code.

## 📈 Status Overview ⌛ WIP - Updated: 2026-10-17

* Implementation: ca. 70%
* Documentation: ca. 50% (just this document)
* Next Priorities:
    1. Finish all relevant triggers
    1. Optimize performance for asynchronous handling

## Motivation

Faster development, better IntelliSense and better AI coding support.

## Features Needed

### Code Generation (✅ done)

📈 Status: ✅ Done

### Configuration for Auto-Generation (✅done)

📈 Status: ✅ Done

### Triggers on all relevant schema changes (WIP)

TODO: document / verify which of these triggers already correctly work

1. Trigger on Content-Type changes
    1. Create content-type
    1. Rename content-type
    1. Update content-type (description)
    1. ~~Delete~~ (not relevant, as we don't remove code)
1. Trigger on Field changes
    1. Create field
    1. Add existing field definition (shared)
    1. Rename field
    1. ~~Reorder fields~~ (should not be relevant)
    1. Update field (name, type, validations)
    1. Delete
1. Trigger on Field details changes (such as entity-relationships, default values etc.)
    1. Detect if a stored entity has changes that affect the generated code (field-definitions, source-definitions)
    1. Trigger changes in these scenarios

📈 Status: ✅ TODO, but API may still need to mature before widespread use.

### Planned Improvements

As of now, the system feels a bit sluggish, because the code runs synchronously every time a relevant schema change is detected.
Optimizing this process or introducing asynchronous handling could improve performance.
This may be a bit tricky, as async processing could break because the dependency-provider may be deleted during async execution.

## Related Features

1. Code Generation of `ITyped` data classes (✅ done)
1. Code Generation of clean Models (✅ done)
1. Model conversion system (entity --> model) (✅ done)

## History

1. 2026-03 started for v21.14
1. 2026-09 released first version v22.00
1. 2026-10-17 created these docs
