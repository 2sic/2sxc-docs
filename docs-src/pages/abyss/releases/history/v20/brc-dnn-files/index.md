---
uid: Abyss.Releases.History.V20.DnnFiles
---

# Fix Breaking Change Dnn Files / Folders in v20

**Keywords:** #Deprecated

2sxc v20 cleans up some historic, deprecated functionality.
They were not used much, but if you have code which used this, here's how to fix any code in production.

1. The Dnn folder for the program changed from `/DesktopModules/ToSic_SexyContent/` was changed to `/DesktopModules/ToSic.Sxc/`.
1. We stopped adding a `web.config` to the `/Portals/[name/number]/2sxc` folder.

## Details Regarding the Folder Rename

Years ago 2sxc was called "Sexy Content" and the folder was named accordingly. Since then, the name changed to 2sxc, but we kept the old folder name for compatibility.
So we had to change it.

When upgrading to v20, this is what happens:

1. The module will be installed as `ToSic.Sxc` and will automatically be placed in that folder
1. The old subfolder `/App_Data/system-custom` will be copied automatically, as it contains custom, shared content-types
1. The old subfolder `/system/` will be copied automatically, as it contains custom, shared javascripts and content-types (v20.00.01)
1. Most of the old folders will be deleted, but a few are preserved, in case something was there which you want to get back to
1. The `js/2sxc.min.js` file is replaced with another file which shows a warning when loaded.

## Details Regarding the web.config Removal

In the past, 2sxc added a `web.config` to the `/Portals/[name/number]/2sxc` folder.
This was responsible for telling the compiler that the default Razor base class was a 2sxc class.
It turns out this was a bad idea, since today we don't recommend that base class any more,
but every `.cshtml` without an `@inherits` directive will use the ancient Razor base class, which is `ToSic.SexyContent.Razor.SexyContentWebPage`.

---

## History

* Removed / cleaned in 2sxc v20

---

Shortlink to here: <https://go.2sxc.org/brc-20-dnn-factory>
