
### 2sxc v17.06 LTS (2024-03-28)

The first LTS (Long-Term-Stable) Release of 2sxc 17.

#### Easter LTS Release

1. ✅ Prepare for Oqtane SSR (Server-Side Rendering)
1. ✅ Provide Code Generator for Content Types, Razor and Services
1. ✅ Improve discoverability of REST APIs
1. ✅ Document new ~~Pro~~ Typed mode
1. ✅ Document new strong-typed mode
1. ✅ Auto-Install more apps from catalog - even after some have already been installed - ca. 1d
    1. ✅ Feature to tell new auto-installer what apps are already installed
    1. ✅ App-Auto-Installer UI to add-install apps later on
1. ✅ LTS

#### Bugfixes

* When accessing an App through another app (eg first going to Apps-Management) it show the data of the original app
* Opening features in Apps-Management didn't work reliably
* Edit-UI Picker / Dropdown code was cleaned up
* Copilot Razor Generator ready to use
* Copilot Service generator ready to use
* Copilot WebApi generator ready to use
* Copilot previously failed if the `AppCode` folder was missing
* Fix to a data-caching issue in 17.05 (this was important)
