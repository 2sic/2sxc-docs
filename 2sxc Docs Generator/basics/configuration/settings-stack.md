---
uid: Basics.Configuration.SettingsStack
---

# Settings Stack in 2sxc WIP ⚠

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>


The Settings are stacked in the following priority

1. `View` - settings configured in the View
1. `App` - the standard AppSettings
1. `AppSystem` - The SystemSettings in the current App
1. `Site` - an optional, manually created `CustomSettings` on the **default Content App** of the current site
1. `SiteSystem` - an optional `SystemSettings` in the **default Content App** of the current site, where the scope is set to Site
1. `Global` - an optional, manually created `CustomSettings` on the **default System App**
1. `GlobalSystem` - an optional `SystemSettings` on the **default System App**
<!-- 1. `Preset` - todo -->
1. `PresetSystem` - the `SystemSettings` which are included in the installation of 2sxc



---

## History

* Full Settings Stack introduced in 2sxc 12.03