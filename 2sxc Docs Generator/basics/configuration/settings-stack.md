---
uid: Basics.Configuration.SettingsStack
---

# Settings Stack in 2sxc WIP ⚠

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>


The Settings are stacked in the following priority

1. `View` - settings configured in the View
1. `App` - the standard `AppSettings` of an App
1. `AppSystem` - The SystemSettings in the current App
1. `Site` - an optional, manually created `Settings` on the **default Content App** of the current site
1. `SiteSystem` - an optional `SystemSettings` in the **default Content App** of the current site, where the scope is set to Site
1. `Global` - an optional, manually created `Settings` on the **default System App**
1. `GlobalSystem` - an optional `SystemSettings` on the **default System App**
<!-- 1. `Preset` - todo -->
1. `PresetSystem` - the `SystemSettings` which are included in the installation of 2sxc


Next we'll explain where you can configure settings for different effects / scopes.

## Global Settings which Affect All Sites

Global Settings for all sites are configured in the default System App. It's usually on Zone `1` and App `1`.

todo: explain how to get there

#### Global System Settings

To globally override system settings which are predefined by 2sxc:

1. go to the **default System App** 
1. Switch scopes to `Configuration`
1. Check if the ContentType `SystemSettings` already has an entry - if yes, edit that, if not, create a new one
1. To test the result, create a Razor file which accesses this setting in another Site or App. 

#### Global Custom Settings

To create own settings which are available globaly...

1. go to the **default System App** 
1. Switch scopes to `Configuration`
1. Check if the ContentType `Settings` exists - if not, create one
1. Check if the fields you need already exist, otherwise create them
1. To test the result, create a Razor file which accesses this setting in another Site or App. 

## Site Settings which Affect an Entire Site

These are configured in the **Content App** of the site you want to configure. 

#### Site System Settings

To override system settings which are predefined by 2sxc on a Site:

1. go to the **Content App** on the Site you want to configure
1. Switch scopes to `Configuration`
1. Check if the ContentType `SystemSettings` already has an entry - if yes, edit that, if not, create a new one
1. To test the result, create a Razor file which accesses this setting in another App on the same Site. 


#### Site Custom Settings

To create own settings which are available globaly...

1. go to the **Content App** on the Site you want to configure
1. Switch scopes to `Configuration`
1. Check if the ContentType `Settings` exists - if not, create one
1. Check if the fields you need already exist, otherwise create them
1. To test the result, create a Razor file which accesses this setting in another App on the same Site. 


## App Settings which Affect an Entire App

These settings override previous settings but only for a specific App. 

#### App System Settings

To override system settings which are predefined by 2sxc on a Site:

1. go to the **Content App** on the Site you want to configure
1. Switch scopes to `Configuration`
1. Check if the ContentType `SystemSettings` already has an entry - if yes, edit that, if not, create a new one
1. To test the result, create a Razor file which accesses this setting in another App on the same Site. 


---

## History

* Full Settings Stack introduced in 2sxc 12.03