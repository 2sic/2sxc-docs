---
uid: Basics.Configuration.ResourcesStack
---

<img src="./assets/settings-stack-banner.svg" class="feature">

# Resources Stack in 2sxc ✨ new!

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

Resources come in 2 distinct flavors:

* **Standardized Resources** marked with 📋 are edited in a content-type called `ResourcesSystem` with a predefined structure.  
  These resources are meant to be used across tools and apps.
* **Dynamic Resources** marked with 💪 use content-types called `ResourcesCustom` which you define.  
  These resources can have any keys and values you want.  
  These will usually only affect a single App or a single Installation.  
  The code using these will usually come from you, as these resources are not standardized. 

## Resources are just like Settings

The resources stack behaves just like the settings stack. So to keep things simple, we didn't repeat the documentation here. 

Please read about the [Settings Stack](xref:Basics.Configuration.ResourcesStack) to understand it. 

The only difference is

* The app-resources content-type is called `App-Resources` (this name is inconsistent for historical reason)
* the standard resources ContentType is called `ResourcesSystem` and ContentTypes for sub-configurations will always start with the emoji 🌐.
* the custom resources ContentType is called `ResourcesCustom`

---

## History

* Full Resources Stack introduced in 2sxc 12.04