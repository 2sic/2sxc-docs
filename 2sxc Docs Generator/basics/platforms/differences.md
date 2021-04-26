---
uid: Basics.Platforms.Differences
---

# Platform Differences

This is a temporary documentation. We'll try to collect differences in behavior and APIs of all the supported platforms and how to work around limitations of each. 

Last Update: 2021-04-19 20:00

## App / File Management

1. ATM the final location for storing apps hasn't been decided yet, still WIP
1. ATM the final location for ADAM assets hasn't been decided yet

## Razor API

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| Razor APIs
| Razor | `@helper` | ✅ | ⛔ | not in .net core 5 | create a separate file for each helper and use `Html.Partial(...)`
| Razor | `Dnn` object | ✅ | ⛔ | DNN only | Use `CmsContext`, a bit more limited. For Oqtane features use Dependency Injection. 
| Razor | `RenderPage(...)` | ✅ | ⛔ | .net 4.5 | Use `Html.Partial(...)` instead
| Razor | `Html.Partial(...)` | ✅ | ✅ | .net core | Polyfill added to DNN in 2sxc 12

### Sub-View Data

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| Razor | `Model` object | ⛔ | ✅ | Part of .net core | Use `DynamicModel`
| Razor | `PageData` object | ✅ | ⛔ | Part of old .net | Use `DynamicModel`
| Razor | `DynamicModel` | ✅ | ✅ | part of 2sxc | Works in old & new


### RazorBlade Extension

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| RazorBlade | `Tag` object | ✅ | ✅ | - | 
| RazorBlade | `Tags` object | ✅ | ✅ | - | 
| RazorBlade | `Text` object | ✅ | ✅ | - | 
| RazorBlade | `HtmlPage` object | ✅ | ⛔ | uncertain | evaluating best practices


### Koi Extension

| Collection | Feature | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| ---------- |-------- | :-: | :----: | --- | ---
| Razor | `Koi` static object | ✅ | ⛔ | Not supported | Use Dependency Injection version of Koi 2
| Razor | `Koi` Service | ✅ | ✅ | core functionality | New in v12 (Koi 2) Unclear if the full functionality will be re-implemented, as it had some design flaws

### WIP

1. `Link.To(...)` isn't implemented yet, and it could have some issues because Oqtane always has a base-ref html-header tag

### Features implemented / done

1. Razor Base class - you should use `ToSic.Custom.Razor12` as a base class
1. Razor Code-Behind - probably done, should verify


### Partially Implemented features

1. Koi supports the CSS Information API, but not yet the class-generating API. We're not sure if we will implement this. 


### Not yet Implemented features

1. CustomizeData / CustomizeSearch are not implemented yet, we're not yet sure how we want to implement this
1. RazorBlade feature to change page title or set headers etc. cannot work yet


## WebAPIs

1. A new base class has been defined but not fully tested; 
1. We should probably create a list of viable base classes and explain the differences

## REST APIs




## JavaScript Differences



## CSS-Frameworks / HTML Differences



## Image Resizing

1. PoC is ready, ATM only works on ADAM files and not on general Oqtane files




## Minor / Re-Verify at end

1. Automatic view switching
1. Image Resizer - installation etc.