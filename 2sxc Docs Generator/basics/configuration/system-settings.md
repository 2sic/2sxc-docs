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

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| Images.Content       |                      |                      | v12.03 | *For sizing Content-Images*
| Images.Content       | Width                | # `1400`             | v12.03 | Full-Content-Width images
| Images.Content       | Height               | # `865`              | v12.03 | Based on golden ratio
| Images.Content       | Quality              | # `75`               | v12.03 | Good average jpg/png compression
| Images.Content       | AspectRatio          | # `1.618`            | v12.03 | Golden Ratio
| Images.Content       | ResizeMode           | $ `crop`             | v12.03 | Will fill area exactly
| Images.Content       | ScaleMode            | $ `both`             | v12.03 | Up-scale small images
| Images.Lightbox      |                      |                      | v12.03 | *For Lightbox-Images*
| Images.Lightbox      | Width                | # `2000`             | v12.03 | Full-screen Lightboxes
| Images.Lightbox      | Height               | # `1500`             | v12.03 | 4:3
| Images.Lightbox      | Quality              | # `75`               | v12.03 | Good average jpg/png compression
| Images.Lightbox      | AspectRatio          | # `1.333`            | v12.03 | 4:3
| Images.Lightbox      | ResizeMode           | $ `max`              | v12.03 | Will keep image shape 
| Images.Lightbox      | ScaleMode            | $ `down`             | v12.03 | Only down-scale, never up-scale
| Images.Screen        |                      |                      | v12.03 | *For Screen-Size related images like backgrounds*
| Images.Screen        | Width                | # `2000`             | v12.03 | Full-Content-Width images
| Images.Screen        | Height               | # `1500`             | v12.03 | 4:3
| Images.Screen        | Quality              | # `60`               | v12.03 | Stronger jpg/png compression
| Images.Screen        | AspectRatio          | # `1.333`            | v12.03 | 4:3
| Images.Screen        | ResizeMode           | $ `crop`             | v12.03 | Will fill area exactly
| Images.Screen        | ScaleMode            | $ `both`             | v12.03 | Up-scale small images
| Images.Section       |                      |                      | v12.03 | *For Backgrounds in Content-Area*
| Images.Section       | Width                | # `1600`             | v12.03 | Full-Content-Width images
| Images.Section       | Height               | # `1200`             | v12.03 | Based on golden ratio
| Images.Section       | Quality              | # `60`               | v12.03 | Stronger jpg/png compression
| Images.Section       | AspectRatio          | # `1.333`            | v12.03 | 4:3
| Images.Section       | ResizeMode           | $ `crop`             | v12.03 | Will fill area exactly
| Images.Section       | ScaleMode            | $ `both`             | v12.03 | Up-scale small images




_Note: the following QuickEdit Settings exist but have no effect ATM_

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| QuickEdit.Default              | Enable     | b `true`             | v12.03 | 
| QuickEdit.Default              | AddApp     | b `true`             | v12.03 | 
| QuickEdit.Default              | AddContent | b `true`             | v12.03 | 
| QuickEdit.Default              | Select     | b `true`             | v12.03 | 
| QuickEdit.Default              | Paste      | b `true`             | v12.03 | 
| QuickEdit.Default              | Move       | b `true`             | v12.03 | 
| QuickEdit.Module               | Enable     | b `true`             | v12.03 | 
| QuickEdit.Module               | AddApp     | b `true`             | v12.03 | 
| QuickEdit.Module               | AddContent | b `true`             | v12.03 | 
| QuickEdit.Module               | Select     | b `true`             | v12.03 | 
| QuickEdit.Module               | Paste      | b `true`             | v12.03 | 
| QuickEdit.Module               | Move       | b `true`             | v12.03 | 
| QuickEdit.InnerContentArea     | Enable     | b `true`             | v12.03 | 
| QuickEdit.InnerContentArea     | AddApp     | b `true`             | v12.03 | 
| QuickEdit.InnerContentArea     | AddContent | b `true`             | v12.03 | 
| QuickEdit.InnerContentArea     | Select     | b `true`             | v12.03 | 
| QuickEdit.InnerContentArea     | Paste      | b `true`             | v12.03 | 
| QuickEdit.InnerContentArea     | Move       | b `false`            | v12.03 | 
| QuickEdit.InnerContentDynamic  | Enable     | b `true`             | v12.03 | 
| QuickEdit.InnerContentDynamic  | AddApp     | b `true`             | v12.03 | 
| QuickEdit.InnerContentDynamic  | AddContent | b `true`             | v12.03 | 
| QuickEdit.InnerContentDynamic  | Select     | b `true`             | v12.03 | 
| QuickEdit.InnerContentDynamic  | Paste      | b `false`            | v12.03 | 
| QuickEdit.InnerContentDynamic  | Move       | b `false`            | v12.03 | 

WebResources.Bootstrap4
WebResources.Bootstrap5
WebResources.fancybox3
WebResources.FontAwesome5

Images.Content
Images.Lightbox

Images.Section
Images.Screen


## Conventions used in System Settings

The built-in system settings are meant to carry hundreds of settings. To enable that, the structure is always as follows:

1. Every topic - like `GoogleMaps` will have an own configuration ContentType
1. All the names of these will probably start with the emoji "⚙️" so the ContentType will have a name like `⚙️GoogleMaps`
1. It should always have a field called `SettingsIdentifier` repeating the name like `GoogleMaps`
1. All of these fields should have an empty-state (like empty string, not-set-number) etc.
1. ... `Items` and ... `ItemIdentifier`

---

## History

* Full Settings Stack introduced in 2sxc 12.03