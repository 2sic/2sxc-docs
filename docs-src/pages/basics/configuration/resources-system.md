---
uid: Basics.Configuration.ResourcesSystem
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# System Resources in 2sxc ✨ new!

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

_Note: The System Resources feature is new in 12.04 so only a few settings are predefined as of now. This will expand in future releases._

> [!TIP]
> These are just the predefined resources. 
> Remember you can create any other settings on your own `Resources` ContentType


## Predefined System Resources as of 2sxc 12.04

_As of now there are none, the API was just ensured to already be consistent with Settings_

<!-- 
| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| GoogleMaps           | InitialZoom          | # `14`               | v12.04 | Initial maps zoom level
| GoogleMaps           | ApiKey               | $ `AIzaSyAKEFB...`   | v12.04 | The API key used to show a Map
| GoogleMaps           | ShowApiKeyWarning    | b `true`             | v12.04 | Show a warning if it's still the default key, which isn't meant for live sites
| GoogleMaps           | MarkerIcon           | $ (empty)            | v12.04 | empty = google default 📍

-->


## Conventions used in System Resources

The built-in system settings are meant to carry hundreds of settings. To enable that, the structure is always as follows:

1. Every topic - like `Help` will have an own configuration ContentType
1. All the names of these will probably start with the emoji "🌐" so the ContentType will have a name like `🌐Help`
1. It should always have a field called `SettingsIdentifier` repeating the name like `Help`
1. All of these fields should have an empty-state (like empty string, not-set-number) etc.
1. ... `Items` and ... `ItemIdentifier`

---

## History

* Full Resources Stack introduced in 2sxc 12.04