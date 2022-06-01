---
uid: Basics.Configuration.SettingsSystem
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# System Settings in 2sxc ✨ new!

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

_Note: The System Settings feature is new in 12.04 so only a few settings are predefined as of now. This will expand in future releases._

> [!TIP]
> These are just the predefined settings. 
> Remember you can create any other settings on the `App-Settings` ContentType


## Predefined System Settings

### Google Maps Settings

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| GoogleMaps           |                      |                      | v12.04 | *Pls read [special docs](xref:Basics.Configuration.Settings.GoogleMaps)*
| GoogleMaps           | InitialZoom          | # `14`               | v12.04 | Initial maps zoom level
| GoogleMaps           | ApiKey               | $ `AIzaSyAKEFB...`   | v12.04 | The API key used to show a Map
| GoogleMaps           | ShowApiKeyWarning    | b `true`             | v12.04 | Show a warning if it's still the default key, which isn't meant for live sites
| GoogleMaps           | MarkerIcon           | $ (empty)            | v12.04 | empty = google default 📍

### Images Settings

Image settings are very sophisticated, so they are documented on an own page:

👉 see [](xref:Basics.Configuration.Settings.Images.Index)

### WebResources

Find out more about the Settings.WebResources here [](xref:Basics.Configuration.Settings.WebResources)


### Work-in-Progress Settings

_Note: the following QuickEdit Settings exist but have no effect ATM_

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| QuickEdit.Default              | Enable     | b `true`             | v12.04 | 
| QuickEdit.Default              | AddApp     | b `true`             | v12.04 | 
| QuickEdit.Default              | AddContent | b `true`             | v12.04 | 
| QuickEdit.Default              | Select     | b `true`             | v12.04 | 
| QuickEdit.Default              | Paste      | b `true`             | v12.04 | 
| QuickEdit.Default              | Move       | b `true`             | v12.04 | 
| QuickEdit.Module               | Enable     | b `true`             | v12.04 | 
| QuickEdit.Module               | AddApp     | b `true`             | v12.04 | 
| QuickEdit.Module               | AddContent | b `true`             | v12.04 | 
| QuickEdit.Module               | Select     | b `true`             | v12.04 | 
| QuickEdit.Module               | Paste      | b `true`             | v12.04 | 
| QuickEdit.Module               | Move       | b `true`             | v12.04 | 
| QuickEdit.InnerContentArea     | Enable     | b `true`             | v12.04 | 
| QuickEdit.InnerContentArea     | AddApp     | b `true`             | v12.04 | 
| QuickEdit.InnerContentArea     | AddContent | b `true`             | v12.04 | 
| QuickEdit.InnerContentArea     | Select     | b `true`             | v12.04 | 
| QuickEdit.InnerContentArea     | Paste      | b `true`             | v12.04 | 
| QuickEdit.InnerContentArea     | Move       | b `false`            | v12.04 | 
| QuickEdit.InnerContentDynamic  | Enable     | b `true`             | v12.04 | 
| QuickEdit.InnerContentDynamic  | AddApp     | b `true`             | v12.04 | 
| QuickEdit.InnerContentDynamic  | AddContent | b `true`             | v12.04 | 
| QuickEdit.InnerContentDynamic  | Select     | b `true`             | v12.04 | 
| QuickEdit.InnerContentDynamic  | Paste      | b `false`            | v12.04 | 
| QuickEdit.InnerContentDynamic  | Move       | b `false`            | v12.04 | 






## Conventions used in System Settings ⚠ Advanced

The built-in system settings are meant to carry hundreds of settings. To enable that, the structure is always as follows:

1. Every topic - like `GoogleMaps` will have an own configuration ContentType
1. All the names of these will start with the emoji "⚙️" so the ContentType will have a name like `⚙️GoogleMaps`
1. It should always have a field called `SettingsIdentifier` repeating the name like `GoogleMaps`
1. All of these fields should have an empty-state (like empty string, not-set-number) etc.
1. ... `Items` and ... `ItemIdentifier`

---

## History

* Full Settings Stack introduced in 2sxc 12.04