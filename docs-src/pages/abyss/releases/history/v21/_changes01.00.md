
### 2sxc v21.01.00 (2026-02-03)

Note: The Oqtane release had a small bug which was fixed in v21.00.01 on 2026-01-05.

#### Enhancements

1. 🩸 Oqtane: Multi-Tenant support should work now! (MAJOR)
1. 🧑🏼‍💻 Code generator (Copilot) - now supports saved configurations and many options such as namespace, prefix/suffix etc.
1. 🧑🏼‍💻 Internal rework of models which provide a typed API for configuration Entities
1. 🧑🏼‍💻 Special new (BETA) API to easily convert entities to these lightweight models in the `ToSic.Eav.Models` namespace TODOC

#### 🧩 Extensions

1. 🧩 Extensions: Published 3 extensions already <https://2sxc.org/en/apps/type/app-extension>
1. 🧩 Extensions: extensive docs for extensions <https://docs.2sxc.org/extensions/app-extensions/index.html>
1. 🧩 Extensions: [Recaptcha Extension](xref:Extensions.AppExtensions.By2sxc.GoogleReCaptchaV3.Index)
1. 🧩 Extensions: [Open Meteo Extension](xref:Extensions.AppExtensions.By2sxc.OpenMeteo.Index)
1. 🧩 Extensions: [Improve app-catalog to better link directly to all extensions](https://2sxc.org/en/apps/type/app-extension)
1. 🧩 Extensions now nicely support C# naming for the AppCode folder, while using kebap-case (JS-Style) in the `/extensions` folder

<!-- #### Minor -->


#### Bugfixes

1. ✏️ Edit UI: tooltip positioning bugfix
1. 🧩 Extensions: various minor fixes


#### Internal and Code Hygiene

1. Introduce a Runtime-Cache-Key which supports multi-tenancy for 🩸 Oqtane and is also used in AppCode caches  
   ☢️ Dnn uses `AppId` as part of the cache key, but 🩸 Oqtane uses `t##-z###-a#####"`
1. Improve various C# unit-tests
1. Improve internal APIs around the `Engine`
1. Improve DI-startup XDocs, place all in similar namespaces and add docs
1. Simplify differences around .net vs. .net Framework regarding download files `HttpResponseMessage`
1. User `record` classes for service dependencies to simplify code and make it more readable

[!include["Changes"](./_brc01.00.md)]
