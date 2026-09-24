---
uid: JsCode.Angular.Index
---

<img src="./assets/sxc-angular-banner-flat.jpg" width="100%">

# Using Angular in 2sxc and Dnn

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-all { visibility: visible; } </style>

Angular applications can run inside Dnn and use 2sxc for data, queries, WebAPIs, context, and in-page editing.

The integration has three parts:

* [Run Angular in Dnn](xref:JsCode.Angular.IntegrateAngularRuntime){title="icon:box"}
  Load a compiled Angular application or a local development server from a 2sxc Razor template.

* [Install and bootstrap sxc-angular](xref:JsCode.Angular.DnnSxcAngular.Install){title="icon:plug"}
  Register the HTTP interceptor and initialize the current Dnn/2sxc module.

* [Use 2sxc from Angular](xref:JsCode.Angular.DnnSxcAngular.Index){title="icon:gear"}
  Access content, queries, WebAPIs, context, and editing toolbars.

The old `@2sic.com/dnn-sxc-angular` package is end-of-life. The supported package is `@2sic.com/sxc-angular`.


## Get Started

1. Install the [Angular Template App](xref:JsCode.Angular.TemplateApp) to see the complete integration.
1. Follow the [sxc-angular installation guide](xref:JsCode.Angular.DnnSxcAngular.Install).
1. Adapt the template app or reuse the integration pieces in your own Angular application.

## Introduction Video

<iframe width="100%" height="400px" src="https://www.youtube.com/embed/I4trJvuSSIM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
