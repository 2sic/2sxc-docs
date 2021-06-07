---
uid: Basics.Settings.Index
---

# Configuration, Settings and Resources in 2sxc

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

Settings can be a complex issue as the should have an effect on differenc scopes. Here are some examples:

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

This is how it works as of now:

## Global Level

### Global Configuration

As of now (v12) global Configuration only exists for [Features](xref:Basics.Cms.Features.Index) which can be enabled/disabled at the system level. 
This is primarily for security reasons. 

In addition some minor global Configuration exists for alternate Caching systems (like using Redis) but this is only for [2sxc Professional](https://2sxc.org/en/web-farm-cache).

### Global Settings

As of now (v12) there are no Global Settings yet. We're still developing a concept to make this possible. 
If you want to create Apps which have shared, global settings you will need to solve this yourself. Examples for solutions are placing them in `web.config` or in custom shared DLLs.

Note that there is a minor exception: There are some global ADAM Settings that can be configured, but it's not standardized/finalized yet, so not public.

### Global Resources

There are now global resources. 

---

## Site Level (Portal) 

#### Site Configuration

Only [Languages](xref:Basics.Cms.Languages.Index) are configured at Site-Level. 

#### Site Settings

As of now (v12) there are no site-level settings. We're still developing a concept to make this possible.

### Site Resources

There are no site resources. 

---

## App Level 

### App Configuration

Apps have a standard [App-Configuration](xref:Basics.App.Configuration) containing their version, name, folder etc. 

In Razor you can access this on the dynamic `App.Configuration` object.

_App Configuration was introduced in 2sxc 6.0_

### App Settings

Apps can have custom [App-Settings](xref:Basics.App.Settings) which every app manages itself. 
The names/types of these settings can be freely configured, as each App has a Content-Type called **AppSettings** which can have different fields as needed. 

In Razor you can access this on the dynamic `App.Settings` object.

_App Settings were introduced in 2sxc 6.0_

### App Resources

Apps can have custom [App-Resources](xref:Basics.App.Resources) which every app manages itself. 
The names/types of these settings can be freely configured, as each App has a Content-Type called **AppResources** which can have different fields as needed. 

In Razor you can access this on the dynamic `App.Resources` object.

_App Resources were introduced in 2sxc 6.0, availability in Razor as well._

---

## View Level

### View Configuration

Each view has [View-Configuration](xref:Basics.App.Views.Index) containing the name, how it works with data and more.

In Razor you can access basic View information on the `CmsContext.View` object, or the entire configuration on the dynamic `CmsContext.View.Configuration` object.

_View Configuration was introduced ca. v4 and made accessible to Razor in v12.02_

### View Settings

A view can have Views-Settings which apply to all uses of this View. 
Since View-Settings could be re-used in various views, the concept more open than _App Settings_, meaning that you could re-use both the content-type as well as the settings data. 

In Razor you can access this on the dynamic `CmsContext.View.Settings` object.

_New in 2sxc 12.02_

### View Resources

A view can have Views-Resources which apply to all uses of this View. 
Since View-Resources could be re-used in various views, the concept more open than _App Resouces_, meaning that you could re-use both the content-type as well as the resources data. 

In Razor you can access this on the dynamic `CmsContext.View.Resources` object.

_New in 2sxc 12.02_

---

## Content-Type Level

### Content-Type Configuration

Each Content-Type has [Content-Type Configuration](xref:Basics.Data.ContentTypes.Index) with the description, icon and more. 

_Since ca. 2sxc 6.0_

### Content-Type Settings and Resources. 

There are no Content-Type settings or resources, but the Configuration can be multi-language. 

---

## Attribute (Field) Level

### Attribute Configuration

Each [Attribute / Field can be configured](xref:Basics.Data.Fields.Index) as needed. The configuration options depend on the Attribute-Type. 

### Attribute Settings and Resources

There are no Attribute Settings or Resources, but the Configuration can be multi-language. 

---

## Entity (Item) Level

### Entity Configuration, Resources and Settings

An Entity just has the data it caries, and no additional intrinsic Configuration, Settings or Resources. Entities themselves are multi-language.


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