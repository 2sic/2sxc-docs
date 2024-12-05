---
uid: Abyss.Platforms.Dnn.Index
---

<img src="~/assets/features/platform-dnn.svg" width="100%">

# Dnn Platform

[Dnn](https://www.dnnsoftware.com/) is the most popular open-source CMS platform on .net.
It's been around since ca. 2001.

2sxc has been running on Dnn since it's inception in 2012.

## Dnn and 2sxc Version Compatibilities

| Dnn V.    | Best       | Compatible            | Incompatible       | Comments |
| ---       | -----      | -------------------   | -------------      | --- |
| 6.0       | unknown    | ✅ 1.0 - ca. v4       | ⛔ v4+             | [very old versions](https://github.com/2sic/2sxc/releases/tag/05.05.00)
| 7.0 - 7.1 | unknown    | ✅ 3.4 - 6.04         | ⛔ 9.43+           | [very old versions](https://github.com/2sic/2sxc/releases/tag/05.05.00)
| 7.2+      | 09.43 LTS  | ✅ 6.x - 09.43        | ⛔ 10.00+          |
| 7.4.2+    | 13.x LTS   | ✅ 7.x - 13.x         | ⛔ 14.00+          |
| 8.x       | 13.x LTS   | ✅ 9.x - 13.x         | ⛔ 14.00+          |
| 8.0 - 9.6 | 13.x LTS   | ✅ 9.x - 13.x         | ⛔ 14.00+          |
| 9.6.1+    | latest     | ✅ ca. v9 - latest    | ⛔ old versions    | changes to DI and .net 4.8

## Upgrade Path

We are very focused on making upgrades easy and pain-free.
Here's what you need to know:

1. You can upgrade 2sxc by installing the latest version on a system which already has 2sxc installed.
1. If you have a version _before_ 8.12, you must first upgrade to 8.12.
1. In general when updating from v9 to v14 there are no expected problems.
1. Before going to v14 you must be running DNN 9.6.1 or newer.
1. In _very rare cases_ you may be affected by [breaking changes](xref:Abyss.Releases.History.AllChanges)

## Features currently not implemented

None, all 2sxc features are available in DNN.


---

## History

* 2sxc v1 was for Dnn 4 in 2012
* 2sxc v7 - v13 all run on Dnn 7.4.2 up until the latest Dnn 9.x
* 2sxc v14 requires Dnn 9.6.1 or newer
