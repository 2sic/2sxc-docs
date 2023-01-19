---
uid: Abyss.Platforms.Differences
---

# Platform Differences

This is a temporary documentation. We'll try to collect differences in behavior and APIs of all the supported platforms and how to work around limitations of each. 

## App / File Management

👉🏻 See [](xref:Abyss.Platforms.Folders) for a list of all folders.

## Razor API

Dnn uses ASP.net Framework MVC v.3 which is much older than Oqtane, but 95% is compatible. 

| Feature                         | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| --------                        | :-: | :----: | --- | ---
| `@helper`                       | ✅ | ⛔ | .net 4 | create a separate file for each helper and use `Html.Partial(...)`
| `Dnn` object                    | ✅ | ⛔ | Dnn only | Use `CmsContext`, a bit more limited. For Oqtane features use Dependency Injection. 
| `Html.Raw(...)`                 | ✅ | ✅ | all .net | 
| `RenderPage(...)`               | ✅ | ⛔ | .net 4 | Use `Html.Partial(...)` instead
| `Html.Partial(...)`             | ✅ | ✅ | .net core | Polyfill added to Dnn in 2sxc 12
| `Request` object                | ✅ | ⛔ | .net 4 | .net core uses a much longer name <br> `ViewContext.HttpContext.Request`
| `Request.QueryString`           | ✅ | ⛔ | .net 4 | .net core uses a much longer name <br> `ViewContext.HttpContext.Request.Query`
| `CmsContext.Page.Parameters`    | ✅ | ✅ | 2sxc 12 | Use this for cross-platform QueryString params

## Razor 2sxc API

These are 2sxc APIs which are often used in Razor.

| Feature                     | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| --------                    | :-: | :----: | --------- | ---
| `Link.To(...)`              | ✅  | ✅    | 2sxc 6    | works cross-platform
| `CreateInstance(.cs)`       | ✅  | ✅    | 2sxc 10   | works cross-platform
| `CreateInstance(.cshtml)`   | ✅  | ⛔    | Dnn only  | Doesn't make sense on .net core, use `.cs`
| `Code.Something()`          | ✅  | ⛔    | 2sxc 11   | Doesn't make sense on .net core, use `.cs`


### Sub-View Data

| Feature           | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| --------          | :-: | :----: | --- | ---
| `Model` object    | ⛔ | ✅ | .net core | Use `DynamicModel`
| `PageData` object | ✅ | ⛔ | .net 4.5 | Use `DynamicModel`
| `DynamicModel`    | ✅ | ✅ | 2sxc 12 | Works in old & new


### RazorBlade Extension

| Feature           | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| --------          | :-: | :----: | --- | ---
| `Tag` object      | ✅ | ✅ | - | 
| `Tags` object     | ✅ | ✅ | - | 
| `Text` object     | ✅ | ✅ | - | 
| `HtmlPage` object | ✅ | ⛔ | - | Use [IPageService](xref:NetCode.Razor.Services.IPageService)
| `IPageService`    | ✅ | ✅ | 2sxc 12.02 | see [IPageService](xref:NetCode.Razor.Services.IPageService)


### Koi Extension

| Feature               | Dnn | Oqtane | Compatibility | Notes / Alternatives |
| --------              | :-: | :----: | --- | ---
| `Koi` static object   | ✅ | ⛔ | Not supported | Use Dependency Injection version of Koi 2
| `Koi` `ICss` Service  | ✅ | ✅ | v12.01 | New Koi 2. See [ICss](xref:NetCode.Koi.Index)

Koi 2 supports the CSS Information API, but not the class-generating API. We probably won't implement it, as it was too complicated. 


### Not yet Implemented features in Oqtane

1. CustomizeData / CustomizeSearch are not implemented yet, we're not yet sure how we want to implement this
1. RazorBlade feature to change page title or set headers etc. cannot work yet


## WebAPIs

1. We should probably create a list of viable base classes and explain the differences

## REST APIs

No relevant differences, except that the root paths to the APIs are different. 
This is automatically handled if you use 2sxc, and for external code you can get the exact endpoints in the admin UI.


## JavaScript Differences

No relevant differences, except that Oqtane doesn't include jQuery by default. 
If you need jQuery, activate it using the [IPageService](xref:NetCode.Razor.Services.IPageService).

## CSS-Frameworks / HTML Differences

No relevant differences.
Note that Oqtane by default uses Bootstrap5 so the output may look a bit different. 

## Image Resizing

In Oqtane, only ADAM files can use the ImageResizer. Files from the normal file management cannot use it. 

---

## History

* Last update 2021-10-25 with regards to 2sxc 12.06 LTS