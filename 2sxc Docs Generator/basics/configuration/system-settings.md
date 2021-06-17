---
uid: Basics.Configuration.SystemSettings
---

# System Settings in 2sxc WIP ⚠

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

_Note: The System Settings feature is new in 12.03 so only a few settings are predefined as of now. This will expand in future releases._

> [!TIP]
> These are just the predefined settings. 
> Remember you can create any other settings on your own `Settings` ContentType


## Predefined System Settings

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| GoogleMaps           | InitialZoom          | # `14`               | v12.03 | Initial maps zoom level
| GoogleMaps           | ApiKey               | $ `AIzaSyAKEFB...`   | v12.03 | The API key used to show a Map
| GoogleMaps           | ShowApiKeyWarning    | b `true`             | v12.03 | Show a warning if it's still the default key, which isn't meant for live sites
| GoogleMaps           | MarkerIcon           | $ (empty)            | v12.03 | empty = google default 📍


_Note: the following QuickEdit Settings are stored, but have no effect ATM_

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| QuickEdit.Parts.Default              | Enable     | b `true`             | v12.03 | 
| QuickEdit.Parts.Default              | AddApp     | b `true`             | v12.03 | 
| QuickEdit.Parts.Default              | AddContent | b `true`             | v12.03 | 
| QuickEdit.Parts.Default              | Select     | b `true`             | v12.03 | 
| QuickEdit.Parts.Default              | Paste      | b `true`             | v12.03 | 
| QuickEdit.Parts.Default              | Move       | b `true`             | v12.03 | 
| QuickEdit.Parts.Module               | Enable     | b `true`             | v12.03 | 
| QuickEdit.Parts.Module               | AddApp     | b `true`             | v12.03 | 
| QuickEdit.Parts.Module               | AddContent | b `true`             | v12.03 | 
| QuickEdit.Parts.Module               | Select     | b `true`             | v12.03 | 
| QuickEdit.Parts.Module               | Paste      | b `true`             | v12.03 | 
| QuickEdit.Parts.Module               | Move       | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentArea     | Enable     | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentArea     | AddApp     | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentArea     | AddContent | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentArea     | Select     | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentArea     | Paste      | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentArea     | Move       | b `false`            | v12.03 | 
| QuickEdit.Parts.InnerContentDynamic  | Enable     | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentDynamic  | AddApp     | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentDynamic  | AddContent | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentDynamic  | Select     | b `true`             | v12.03 | 
| QuickEdit.Parts.InnerContentDynamic  | Paste      | b `false`            | v12.03 | 
| QuickEdit.Parts.InnerContentDynamic  | Move       | b `false`            | v12.03 | 




## Conventions used in System Settings

The built-in system settings are meant to carry hundreds of settings. To enable that, the structure is always as follows:

1. Every topic - like `GoogleMaps` will have an own configuration ContentType
1. All the names of these will probably start with the emoji "⚙" so the ContentType will have a name like `⚙GoogleMaps`
1. It should always have a field called `SettingsIdentifier` repeating the name like `GoogleMaps`
1. All of these fields should have an empty-state (like empty string, not-set-number) etc.

---

## History

* Full Settings Stack introduced in 2sxc 12.03