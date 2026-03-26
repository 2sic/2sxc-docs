---
uid: Basics.App.Views.Configuration
---

# View Configuration

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .process-razor, .context-box-summary .data-configuration { visibility: visible; }</style>

A view has a lot of configuration options, but they are all explained in the edit view dialog, so we're not documenting this here. Two things of interest which you may want to read about:

* [View-switching based on url-params](http://2sxc.org/en/Docs/Feature/feature/4680){title="icon:shuffle"}
* [Security protecting views like admin-views](http://2sxc.org/en/Docs/Feature/feature/4737){title="icon:shield-lock"}

## View Configuration in Razor

2sxc 12.02 introduces the ability to access View some Configuration from Razor. 

* The most important properties are available on `CmsContext.View` - this is an [ICmsView](xref:ToSic.Sxc.Context.ICmsView) object with properties like
    * `Id`
    * `Identifier`
    * `Edition`
    * `Name`

## Advanced Topics

* [Switching between views based on the url](https://2sxc.org/en/docs/Feature/feature/4680){title="icon:shuffle"}
* [Differences between features when using Content or App](https://2sxc.org/en/blog/post/2sxc-app-vs-2sxc-content-which-one-should-i-use){title="icon:journal-text"}
* [Protecting Views for certain users using permissions](https://2sxc.org/en/Docs/Feature/feature/4737){title="icon:shield-lock"}
* [Hide advanced features from normal editors](https://2sxc.org/en/docs/Feature/feature/3592){title="icon:eye-slash"}

## History

1. Introduced in 2sxc 1.0
1. Made available to Razor in 2sxc 12.02