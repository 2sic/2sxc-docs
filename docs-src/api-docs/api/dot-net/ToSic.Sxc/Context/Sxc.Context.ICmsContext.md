---
uid: ToSic.Sxc.Context.ICmsContext
---

## CMS Context in your Code

All your Razor and WebApi code will have a property `CmsContext` which provides you information about the environment you're running in. 

Here's a Code Snippet for Razor, showing you what page etc. your code is running on:

```razor

ModuleId: @CmsContext.Module.Id

```



## History

* Added in 2sxc 11.11
