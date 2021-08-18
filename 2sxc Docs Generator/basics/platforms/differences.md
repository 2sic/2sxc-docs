---
uid: Basics.Platforms.Differences
---

# Platform Differences

This is a temporary documentation. We'll try to collect differences in behavior and APIs of all the supported platforms and how to work around limitations of each. 

Last Update: 2021-04-29

## App / File Management

1. ATM the final location for storing apps hasn't been decided yet, still WIP
1. ATM the final location for ADAM assets hasn't been decided yet

## Razor API

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| Razor APIs
| Razor | `@helper` | ✅ | ⛔ | not in .net core 5 | create a separate file for each helper and use `Html.Partial(...)`
| Razor | `Dnn` object | ✅ | ⛔ | Dnn only | Use `CmsContext`, a bit more limited. For Oqtane features use Dependency Injection. 
| Razor | `Html.Raw(...)` | ✅ | ✅ | all .net | 
| Razor | `RenderPage(...)` | ✅ | ⛔ | .net 4.5 | Use `Html.Partial(...)` instead
| Razor | `Html.Partial(...)` | ✅ | ✅ | .net core | Polyfill added to Dnn in 2sxc 12
| Razor | `Request` object | ✅ | ⛔ | .net 4.5 | .net core uses a much longer name <br> `ViewContext.HttpContext.Request`
| Razor | `Request.QueryString` | ✅ | ⛔ | .net 4.5 | .net core uses a much longer name <br> `ViewContext.HttpContext.Request.Query`
| Razor | `CmsContext.Page.Parameters` | ✅ | ✅ | 2sxc 12 | Use this for cross-platform QueryString params
| 2sxc API | `Link.To(...)` | ✅ | ✅ | 2sxc 6 | works cross-platform
| Shared Code | `CreateInstance(...cs)` | ✅ | ✅ | 2sxc 10 | works cross-platform
| Shared Code | `CreateInstance(...cshtml)` | ✅ | ⛔ | Dnn only | Doesn't make sense on .net core, use `.cs`
| Code-Behind | `Code.xxx` | ✅ | ⛔ | 2sxc 11 | Doesn't make sense on .net core, use `.cs`


### Sub-View Data

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| Razor | `Model` object | ⛔ | ✅ | .net core | Use `DynamicModel`
| Razor | `PageData` object | ✅ | ⛔ | .net 4.5 | Use `DynamicModel`
| Razor | `DynamicModel` | ✅ | ✅ | 2sxc 12 | Works in old & new


### RazorBlade Extension

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| RazorBlade | `Tag` object | ✅ | ✅ | - | 
| RazorBlade | `Tags` object | ✅ | ✅ | - | 
| RazorBlade | `Text` object | ✅ | ✅ | - | 
| RazorBlade | `HtmlPage` object | ✅ | ⛔ | - | Use `IPageService`
| RazorBlade | `IPageService` | ✅ | ✅ | 12.02 | see [IPageService](xref:NetCode.Razor.Services.IPageService)


### Koi Extension

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| Razor | `Koi` static object | ✅ | ⛔ | Not supported | Use Dependency Injection version of Koi 2
| Razor | `Koi` `ICss` Service | ✅ | ✅ | v12.01 | New Koi 2. See [ICss](xref:NetCode.Koi.Index)

Koi 2 supports the CSS Information API, but not the class-generating API. We probably won't implement it, as it was too complicated. 

### WIP

...

### Features implemented / done

1. Razor Base class - you should use `ToSic.Custom.Razor12` as a base class


### Partially Implemented features


### Not yet Implemented features

1. CustomizeData / CustomizeSearch are not implemented yet, we're not yet sure how we want to implement this
1. RazorBlade feature to change page title or set headers etc. cannot work yet


## WebAPIs

1. We should probably create a list of viable base classes and explain the differences

## REST APIs




## JavaScript Differences



## CSS-Frameworks / HTML Differences



## Image Resizing

1. PoC is ready, ATM only works on ADAM files and not on general Oqtane files




## Minor / Re-Verify at end

1. Automatic view switching
1. Image Resizer - installation etc.