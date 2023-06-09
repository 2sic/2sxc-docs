---
uid: Abyss.Releases.History.V13.EavFactoryStartUp
---

# Fix Breaking Change _Static EAV Factory StartUp_ in v13

**Keywords:** #Deprecated #Factory #Build #DependencyInjection

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

The `ToSic.Eav.Factory.ActivateNetCoreDi(...)` is removed and will not work any more.

## Reason for Removal

2sxc used to be the first and only Module in Dnn which supported Dependency Injection, so there was a need to patch this in somehow. 

`ActivateNetCoreDi` was used to register services startup, but caused issues in special cases. 

## Upgrade to Newer functionality

2sxc 13 is now fully integrated in Dnn 9.4 DI, so registering services must use the Dnn Mechanisms for this - see [Dnn Services](xref:NetCode.DependencyInjection.Dnn).

There is no alternative for Dnn 7, so you must either remain on an older 2sxc (v12 or lower) or upgrade to Dnn 9.4 or newer.

---

## History

* Introduced in 2sxc 7 with Dependency Injection based on .net Standard 1.6
* It only ever worked in Dnn, Oqtane never had this feature
* Removed in 2sxc 13 with the integration of Dnn 9.4 DI - API still exits, but doesn't do anything except for log an error
* Planned for full removal in 2sxc 14 ca. middle of 2022

---

Shortlink to here: https://go.2sxc.org/brc-13-eav-factory-startup