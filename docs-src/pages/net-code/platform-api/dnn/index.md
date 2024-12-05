---
uid: NetCode.PlatformApi.Dnn.Index
---

<img src="~/assets/features/platform-dnn.svg" width="100%">

# Dnn Platform API Guide

This section is about special topics / APIs when programming with 2sxc in DNN.

👉🏽 For the general platform topics such as installation, see the [Dnn Platform Guide](xref:Abyss.Platforms.Dnn.Index).

Sometimes you want to leverage 2sxc to create a solution, provide data input etc. but want to output or re-use the data in your own Module, Skin, Script or something else. This is easy to do.

> [!IMPORTANT]
> We massively improved this in 2sxc 13 which integrates with Dnn 9 Dependency Injection.
> These examples require Dnn 9.5+ and 2sxc 14+

## Dnn Platform API Basics

1. In general, everything in 2sxc is the same for all platforms.
1. For Dnn it's important to realize that its based on some older Frameworks
    1. .net Framework 4.7.2 as of DNN 9.6.1, or .net Framework 4.8 for the latest DNN
    1. Razor uses the fairly old MVC 3
    1. C# is also an older version, we believe ca. 6.0. For example, you cannot use `var x = x?.y?.z` because it's not supported in this version.
1. Dependency Injection is still fairly new in DNN
    1. not all DNN services are available in dependency injection
    1. not all DNN controls can use dependency injection
    1. certain uses of dependency injection cause some surprises

With this in mind, let's see how we can solve some common challenges.

## Use Dnn Objects and Services in 2sxc

1. General user, site (portal) and similar information
    1. Just use the `CmsContext` objects - eg. `CmsContext.User` or `CmsContext.Site`
    1. This is the same across platforms, so code written like this will also run on Oqtane
1. Access really specific DNN objects
    1. Use the normal [DNN API](https://docs.dnncommunity.org/api/) which is not dependency injection based.
    1. For most objects you will use the _old_ static API to get the _Current_ objects.
       For example, to get the current portal, use [PortalSettings.Current](https://docs.dnncommunity.org/api/DotNetNuke.Entities.Portals.PortalSettings.html#DotNetNuke_Entities_Portals_PortalSettings_Current)
    1. Some objects can also be retrieved through Dependency Injection, using `GetService<ISomeDnnType>()`
    1. In general we recommend against using DNN specific objects this, because your work can then not be transported to another platform.
1. Get DNN SQL Data
    1. Use standard DNN APIs
    1. You can also use Visual Query to retrieve data from DNN tables

## Use 2sxc Objects and Services in Dnn Skins and Modules

👉🏽 See [Guide to using 2sxc in Dnn Skins and Modules](xref:NetCode.PlatformApi.Dnn.ThemesAndModules)



---

## History

* 2sxc v1 was for Dnn 4 in 2012
* 2sxc v14 requires Dnn 9.6.1 or newer and is fully integrated in the DNN Dependency injection, so DNN can get 2sxc services and vice versa.

[!include["history"](../../services/_history.md)]
