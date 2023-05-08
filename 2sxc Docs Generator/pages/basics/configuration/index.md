---
uid: Basics.Configuration.Index
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Configuration, Settings and Resources in 2sxc ✨ new

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

Settings can be a complex issue as the should have an effect on different scopes. Here are some examples:

1. An input-field may have a setting to show/hide a button
1. An App may have a setting which affects the entire App
1. A system may have a setting which affects the entire installation

In an ideal world, these settings can compound each other to determine defaults, fallbacks and overrides.
2sxc has some of this ready, other parts are still in development.

> [!TIP]
> In 2sxc/EAV we talk about **Configuration** when something has a standard set of properties and about **Settings** when the properties can vary dynamically.
>
> So an _App-Configuration_ contains standardized aspects like the Folder it's in, while _App-Settings_ can be a dynamic set of properties that are different in each App.
>
> **Resources** on the other hand are simply meant for language/culture specific labels, logos and similar.
> They are also dynamic, so they can have as many values as you need.

## Settings and Resources are Stacked

Settings and Resources can be configured at any level of the application. This is how it stacks up:

<img src="./assets/settings-stack.png" width="100%" class="full-width">

👉 Learn more about the [](xref:Basics.Configuration.SettingsStack) and the [](xref:Basics.Configuration.ResourcesStack)

👉 Learn about the [predefined System-Settings](xref:Basics.Configuration.SettingsSystem)

👉 Learn about the [predefined System-Resources](xref:Basics.Configuration.ResourcesSystem)

## Global Level

### Global Configuration

As of now (v12) global Configuration only exists for [Features](xref:Basics.LnF.Features.Index) which can be enabled/disabled at the system level.
This is primarily for security reasons.

In addition some minor global Configuration exists for alternate Caching systems (like using Redis) but this is only for [2sxc Professional](https://2sxc.org/en/web-farm-cache).

### Global Settings and Resources

Global Settings and Resources were introduced in 2sxc 12.04.
Read about configuring them in the [](xref:Basics.Configuration.SettingsStack).

In C#/Razor you can access the [Settings Stack](xref:Basics.Configuration.SettingsStack) using the [`Settings` object](xref:NetCode.DynamicCode.Objects.Settings)
and the [Resources Stack](xref:Basics.Configuration.ResourcesStack) using the [`Resources` object](xref:NetCode.DynamicCode.Objects.Resources).

Note: _there are some global ADAM Settings that can be configured in a different way, but it's not standardized/finalized yet, so not public, and we'll try to move that into the new standard._

---

## Site Level (Portal)

### Site Configuration

Only [Languages](xref:Basics.Cms.Languages.Index) are configured at Site-Level.

### Site Settings and Resources

Site-Wide Settings and Resources were introduced in 2sxc 12.04.
Read about configuring them in the [](xref:Basics.Configuration.SettingsStack).

In C#/Razor you can access the [Settings Stack](xref:Basics.Configuration.SettingsStack) using the [`Settings` object](xref:NetCode.DynamicCode.Objects.Settings)
and the [Resources Stack](xref:Basics.Configuration.ResourcesStack) using the [`Resources` object](xref:NetCode.DynamicCode.Objects.Resources).

---

## App Level

### App Configuration

Apps have a standard [App-Configuration](xref:Basics.App.Configuration) containing their version, name, folder etc.

In Razor you can access this on the dynamic `App.Configuration` object.

### App Settings and Resources

Apps can have custom [App-Settings](xref:Basics.App.Settings) and [App-Resources](xref:Basics.App.Resources) which every app manages itself.
The names/types of these settings can be freely configured, as each App has a Content-Type called **App-Settings** which can have different fields as needed.

You can also configure the standardized `SettingsSystem`/`ResourcesSystem`.

In C#/Razor you can access the [Settings Stack](xref:Basics.Configuration.SettingsStack) using the [`Settings` object](xref:NetCode.DynamicCode.Objects.Settings)
and the [Resources Stack](xref:Basics.Configuration.ResourcesStack) using the [`Resources` object](xref:NetCode.DynamicCode.Objects.Resources).

---

## View Level

### View Configuration

Each view has [View-Configuration](xref:Basics.App.Views.Index) containing the name, how it works with data and more.

In Razor you can access basic View information on the `CmsContext.View` object, like the `Identifier` or the `Edition`. See [](xref:ToSic.Sxc.Context.ICmsView)

_View Configuration was introduced ca. v4 and made accessible to Razor in v12.02_

### View Settings and Resources

A view can have Views-Settings and View-Resouces which apply to all uses of this View.
Since View-Settings could be _re-used_ in various views, the concept more flexible than _App Settings/Resources_, meaning that you could re-use both the content-type as well as the settings data.

In C#/Razor you can access the [Settings Stack](xref:Basics.Configuration.SettingsStack) using the [`Settings` object](xref:NetCode.DynamicCode.Objects.Settings)
and the [Resources Stack](xref:Basics.Configuration.ResourcesStack) using the [`Resources` object](xref:NetCode.DynamicCode.Objects.Resources).

---

## Content-Type Level

### Content-Type Configuration

Each Content-Type has [Content-Type Configuration](xref:Basics.Data.ContentTypes.Index) with the description, icon and more.
The Configuration can be multi-language.

### Content-Type Settings and Resources

There are no Content-Type settings or resources.

---

## Attribute (Field) Level

### Attribute Configuration

Each [Attribute / Field can be configured](xref:Basics.Data.Fields.Index) as needed. The configuration options depend on the Attribute-Type.
The Configuration can be multi-language.

### Attribute Settings and Resources

There are no Attribute Settings or Resources.

---

## Entity (Item) Level

### Entity Configuration, Resources and Settings

An Entity just has the data it caries, and no additional intrinsic Configuration, Settings or Resources.
Entities themselves are multi-language.


### Per Entity-Use (Item-Use) Settings aka Presentation Settings

Items can have a per-use setting called **Presentation** - see [Content-Presentation](xref:Basics.Content.Presentation).
This means that when the item is shown in a specific view, there may be settings which configure how it's to be shown.
Since each View may need different settings (a map View could need other presentation-settings than a text/image View) this is specific to each _use_ of an Entity.


### Per List-Use Settings aka Header-Presentation Settings

If a View is configured to be a List then it can also have a **Header** and also **Header Presentation Setttings** which work just like [Content-Presentation](xref:Basics.Content.Presentation).



---

## History

* View Configuration introduced ca. v4
* App Configuration, Settings and Resources introduced in v6.0
* View Settings and Resources introduced in v12.02
* Site and global settings introduced in 2sxc 12.04
* Full Settings Stack introduced in 2sxc 12.04
* Full Resources Stack introduced in 2sxc 12.04
