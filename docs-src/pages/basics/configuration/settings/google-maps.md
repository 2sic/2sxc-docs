---
uid: Basics.Configuration.Settings.GoogleMaps
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# GoogleMaps Settings in 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

> [!TIP]
> This documentation is for 2sxc 12.04+. For older versions, [consult this checklist](https://azing.org/2sxc/r/ippFQYkz).

2sxc include centralized settings for Google Maps. 
This ensures that people testing 2sxc can install/use apps which show maps.
It also lets you set the API-Key and other settings at Global, Site or App level. 

## Background

Various Apps include templates which show Google Maps. 
Since 2016, Google requires all new domains using maps to first get a key. 
Because of this, the included maps include a demo-key which works, but you shouldn't use it in production.

## Consequences if you don't Replace the Key

If you only disable the warning we added to the JS, then it would work for a short time.
But it will randomly fail some time in the future, when your site is live. So don't try that.

Why will it fail randomly? 
The included key can only generate a few thousand maps per day. 
If people start using it in production, then these maps will be added up. 
So every day a few thousand maps will work, and the rest will fail. 
This will feel very random, because all the maps generated on other sites are counted too.

👉 _So you must use your own maps API key_


## How to Change the API Key

<iframe src="https://azing.org/2sxc/r/ApSwlItl?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>

---

## History

* Global Maps Settings introduced in v12.04