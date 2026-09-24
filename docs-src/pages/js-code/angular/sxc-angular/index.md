---
uid: JsCode.Angular.DnnSxcAngular.Index
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# NPM Package @2sic.com/sxc-angular

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

`@2sic.com/sxc-angular` connects a modern Angular application to Dnn and 2sxc.

`@2sic.com/dnn-sxc-angular` is end-of-life. Use `@2sic.com/sxc-angular` for all new and upgraded applications.

Install it from [npm](xref:Npm.Dnn-Sxc-Angular), then follow the [installation and bootstrap guide](xref:JsCode.Angular.DnnSxcAngular.Install).

The library provides:

1. `provideSxc()` to register the Angular HTTP client, 2sxc services, and the HTTP interceptor.
1. `SxcInitializer` to initialize the current Dnn/2sxc module from the Angular root element.
1. `SxcApp` for typed content, query, and custom WebAPI calls.
1. `SxcContext` for the current page, module, edition, `$2sxc`, and `sxc` instance.
1. Standalone toolbar directives for in-page editing.

## Requirements

Version 22 requires:

* Angular 18 or newer
* RxJS 7 or newer
* A page where 2sxc loads `$2sxc` before the Angular application starts

## History

1. 2015: First Angular integration.
1. 2016-2020: Support for newer Angular versions, hot reloading, and improved Dnn context detection.
1. 2021: Angular 11 support, toolbar refresh callbacks, and configurable Angular paths.
1. 2022: Renamed from `@2sic.com/dnn-sxc-angular` to `@2sic.com/sxc-angular` and updated for Angular 14.
1. 2024: Updated for Angular 18.
1. 2025: Updated the template application for Angular 20.
1. 2026: Version 22 introduced standalone providers/directives and the `SxcApp`, `SxcContext`, and `SxcInitializer` APIs documented here.

> [!NOTE]
> Older examples using `Data`, `Context`, `DnnAppComponent`, `SxcAppComponent`, `DnnSxcRootModule`, `SxcRootModule`, or `ContentManagerModule` target earlier package versions and must be migrated.
