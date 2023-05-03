---
uid: Abyss.Cdn.Index
---

# 2sxc CDNs (Content Delivery Networks)

CDNs (Content Delivery Networks) are the backbone of the internet.
They are usually used to get common files from all over the universe such as:

* Fonts (icons, ...)
* JavaScripts (galleries, ...)
* CSS (bootstrap, ...)

But they have a major problem: It's unclear which CDNs track users.
This can cause major GDPR issues.
For example, many fonts are provided by Google Fonts, which can get you into legal trouble with the EU.
Here's a summary of the problems:

1. Some CDNs are not GDPR compliant - or you simply don't know
1. If you use [CSP (Content Security Policy)](xref:Abyss.Security.Csp.Index) you may have to whitelist many CDNs


## How 2sxc uses CDNs

2sxc is simple to install, use and customize.
Part of this comfort is possible thanks to CDNs.
For example, let's say you have multiple 2sxc Apps which use FancyBox (a cool JavaScript lightbox).
2sxc allows these Apps to just say "I need Fancybox5" using `Kit.Page.Activate("Fancybox5")`
and 2sxc will automatically get it from a CDN.

The reason this is important, is because all parts of the page should use the same version of fancybox.
Otherwise two Apps on the same page could break each other.

So 2sxc has a list of standardized resources which are retrieved on demand when needed.
These are loaded from CDNs by default - to keep the installation small.
An admin can always modify this list to point to other locations, but it's hard work, and it's easy to miss something.

In addition, the Edit UI and some Admin/Dev-UIs use CDNs to load large resources.
The code editor uses Monaco (Visual Studio Code) which can be 20+ MB to download.


## Divide and Conquer the Problem

To solve this, we had to figure out solutions for:

1. efficiently get all the dependencies to create an own CDN
1. create a 2sxc CDN with all important resources which is under our control
1. allow others to use the resources to create their own CDN
1. allow admins to point specific resources to their preferred location
1. create global settings to automatically use a predefined CDN for everything ([Patrons only](xref:Patrons.Sentinel))


## The 2sxc Resources Git Repo

We created / scripted a Git Repository ... TODO:



---

## History

1. Developed in 2sxc 15.04 for the public resources and Edit UI
1. Released in 2sxc 16.00 LTS

Shortlink: <https://r.2sxc.org/cdn>
