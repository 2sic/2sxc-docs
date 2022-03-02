---
uid: NetCode.Conventions.ProxyControllers
---

# Convention: Proxy and Real Controllers

[!include["This is for integration only"](../_include-for-integration.md)]

EAV and 2sxc have about 30 WebAPI Controllers which must work on every platform (Dnn/Oqtane) and custom integrations. 

To keep code maintenance low, we have a setup with **Real** controllers and **Proxy** Controllers which just serve as the entry-point in each platform. 
Here's how it works:

1. The code which actually does work is called the **Real** controller and it's code is in `ToSic.Sxc.WebApi` or `ToSic.Eav.WebApi`
1. The platform has the surface **Proxy** controller which just ensures that the endpoint is available on that platform

> [!NOTE]
> This concept is still being developed in v13 so it's not final. 
> 
> As of 2022-02 it's only been implemented for ca. 4 controllers, the others are still not fully migrated into this model. 

## The Real Controller

The real controller is responsible for doing all the work, getting all the dependencies etc. 
It must be programmed in a way that the _Proxies_ have as little code as possible.

As of 2022-02, they are all named `...ControllerReal` to better identify them. 
Once all controllers are built this way, they will probably be renamed just to `...Controller`

## The Proxy Controller

Each platform and integration will just have the minimal _Proxy_ Controller which has the following functions:

1. Make the endpoint available on this platform, on the correct address
1. Ensure basic endpoint security as the platform does it (like ensure authentication, etc.)
1. Forward all calls to the _Real_ controller
1. In rare cases, convert data which is treated differently on that platform to the format the _Real_ Controller expects.

---

## History

* Introduced in v13

Coverage: ca. 95% of all Controllers implement this as of 2022-03-01:

1. Adam
    * `Sxc.AdamControllerReal`
    * ~~AppAssetsController~~ - Oqtane only, proxy/real concept doesn't apply
1. Admin
    * ApiExplorer
    * `Sxc.AppControllerReal<T>` - 95% - there is still a bit of code left
    * `AppFilesControllerReal`
    * `Eav.AppPartsControllerReal` - 300seconds?
    * `Sxc.DialogControllerReal`
    * `Eav.EntityControllerReal`
    * `Eav.FeaturesControllerReal`
    * `Sxc.FieldControllerReal`
    * `Eav.MetadataControllerReal`
    * `Sxc.QueryControllerReal`
    * `Sxc.TypeControllerReal` - 300seconds?
    * `Sxc.ViewControllerReal` - 300seconds?
    * `Eav.ZoneControllerReal`
1. App
    * ~~AppAssetsController~~ - Oqtane only, proxy/real concept doesn't apply
    * `Sxc.AppDataControllerReal`
    * `Sxc.AppQueryControllerReal`
1. CMS
    * ** Block
    * `Sxc.ContentGroupControllerReal`
    * `Sxc.EditControllerReal` (almost?)
    * `Sxc.HistoryControllerReal`
    * ~~Item~~
    * `Sxc.ListControllerReal`
1. Sys
    * `Eav.InsightsControllerReal`
    * ** Install
    * `Eav.LicenseControllerReal`
    * Log


Shortlink: https://r.2sxc.org/proxy-controllers