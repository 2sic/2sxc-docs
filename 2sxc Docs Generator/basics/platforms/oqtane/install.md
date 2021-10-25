---
uid: Basics.Platforms.Oqtane.Install
---

<img src="./assets/oqtane-logo.png" width="250px" align="right">

# Install Oqtane and 2sxc

Read the [blog + video + checklist](https://2sxc.org/en/blog/post/install-oqtane-2-from-scratch-with-language-packs-and-2sxc-video) 
we created on installing Oqtane and 2sxc. 

## Oqtane and 2sxc Version Compatibilities

> [!TIP]
> Oqtane is still being heavily improved and growing with the newest .net core frameworks. 
> Because of this, extensions like 2sxc can quickly become incompatible with the latest enhancements, 
> so here we'll maintain a list of Oqtane / 2sxc versions.

| Oqtane V. | Best | Compatible | Incompatible | Comments |
| --- | --- | --- | --- | --- | 
| 2.0 | 12.00 | ✅ 12.00 - 12.02 | ⛔ 12.04+ |
| 2.1 | 12.04 | ✅ 12.04         | ⛔ 12.04+ | Changes in Multi-Language
| 2.2 | 12.04 | ✅ 12.04+        | ⛔ pre 12.04 | Changes in Bootstrap / jQuery & Authentication
| 2.3 | 12.04 | ✅ 12.04+        | ⛔ pre 12.04 | 
 next | ? | ? | pre 12.04 |

## Upgrade Existing Installations

When upgrading an existing Oqtane/2sxc you should follow these steps: 

1. make sure that a compatible 2sxc exists
1. upgrade Oqtane first - possibly 2sxc then stops working
1. then upgrade 2sxc
