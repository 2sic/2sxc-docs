---
uid: Basics.Configuration.PresetOverride
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Overriding Global Presets with JSON Files ✨ new v15

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

This is a new, advanced feature in 2sxc 15.

In some cases you want to reconfigure the global presets, which are stored in JSON files in the `App_Data/system` folder.

If you do this, any update of 2sxc would wipe out your changes.

## Override Feature

Because of this, v15 has a feature to **override** settings-entities, and it works as follows:

* if there is an entity in `App_Data/system-custom/entities`
* with the same GUID as an entity in `App_Data/system/entities`

Then the loader will use it to override the original entity.

## How to Create such A Configuration

1. Find the "original" entity in the `App_Data/system/entities` and import it into any app in 2sxc.
1. Make the changes you want
1. Export it as json
1. Place it in `App_Data/system-custom/entities`

Verify it works, then distribute it to your installations.


---

## History

* Introduced in v15.00
