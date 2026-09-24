---
uid: JsCode.Angular.TemplateApp
---

<img src="./assets/sxc-angular-banner-flat.jpg" width="100%">

# Angular Template App for Dnn and 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-all { visibility: visible; } </style>

The [Angular Template App](xref:App.AngularTemplate) is the quickest way to start an Angular application inside Dnn and 2sxc. The current v20.3 template uses Angular 20.2 and `@2sic.com/sxc-angular` v22.

`@2sic.com/dnn-sxc-angular` is end of life. New and upgraded apps should use `@2sic.com/sxc-angular`.

## Requirements

The current template requires:

1. Dnn 9.6.1 or later.
1. 2sxc 16.04 or later.
1. A supported Node.js version for Angular 20 when developing or building the Angular project.

It demonstrates how to:

1. Load production, staging, and local-development Angular editions from a 2sxc Razor template.
1. Develop with Angular hot reload while the app runs inside a real Dnn page.
1. Register `provideSxc()` and initialize the current module with `SxcInitializer`.
1. Call 2sxc content, queries, and custom WebAPIs through `SxcApp`.
1. Read the current page and module through `SxcContext`.
1. Add in-page editing with the standalone `SxcTagToolbarDirective`.

The app also contains example screens for content, queries, custom WebAPI controllers, context information, routing, and edit toolbars.

## Install the Template

Install the [Angular Template App](xref:App.AngularTemplate) from the 2sxc App Catalog. The installed app already contains built production files, so Node.js is only required when you want to modify and rebuild its Angular source.

For development, open the app's `ng` folder, install its npm dependencies, and use the scripts defined in `ng/package.json`. Continue with the [local-development guide](xref:JsCode.Angular.IntegrateAngularDevelopment) for the Dnn integration and hot-reload workflow.

## Next Steps

1. Browse its [source repository](xref:App.AngularTemplate.Git).
1. Learn how the [runtime integration](xref:JsCode.Angular.IntegrateAngularRuntime) selects local, staging, and live builds.
1. Learn about [local development](xref:JsCode.Angular.IntegrateAngularDevelopment).
1. Read the [sxc-angular guide](xref:JsCode.Angular.DnnSxcAngular.Index) for setup and API examples.

## Introduction Video

<iframe width="100%" height="400px" src="https://www.youtube.com/embed/I4trJvuSSIM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## History

1. 2017: First template for Angular 4.
1. 2019: Updated for Angular 6.
1. 2020: Updated for Angular 8.
1. 2021: Updated for Angular 11 and the original dnn-sxc-angular integration.
1. 2022: Updated for Angular 14 and the renamed sxc-angular package.
1. 2024: Updated for Angular 18.
1. 2025: Updated for Angular 20.
1. 2026: Template v20.3 included the Angular Loader extension and migrated to the standalone sxc-angular v22 APIs.
