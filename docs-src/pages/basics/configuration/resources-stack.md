---
uid: Basics.Configuration.ResourcesStack
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Resources Stack in 2sxc ✨ new!

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

Resources come in 2 distinct flavors:

* **Standardized Resources** marked with 📋 are edited in a content-type called `ResourcesSystem` with a predefined structure.  
  These resources are meant to be used across tools and apps.
* **Dynamic Resources** marked with 💪 use content-types called `App-Resources` which you define.  
  These resources can have any keys and values you want.  
  The effect/reach of this depends on the level where you add it (global, site, app).
  The code using these will usually come from you, as these resources are not standardized. 

## Resources are just like Settings

The resources stack behaves just like the settings stack. So to keep things simple, we didn't repeat the documentation here. 

Please read about the [Settings Stack](xref:Basics.Configuration.ResourcesStack) to understand it. 

The only difference is

* The app-resources content-type is called `App-Resources` (this name is inconsistent for historical reason)
* the standard resources ContentType is called `ResourcesSystem` and ContentTypes for sub-configurations will always start with the emoji 🌐.

---

## History

* Full Resources Stack introduced in 2sxc 12.04
* Dropped `ResourcesCustom` as a type in v13, as not needed any more because we changed how the site-level settings work