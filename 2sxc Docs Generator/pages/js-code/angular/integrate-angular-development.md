---
uid: JsCode.Angular.IntegrateAngularDevelopment
---

<img src="./assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Integrate Angular for Runtime in 2sxc / Dnn

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-all { visibility: visible; } </style>

This explains how to best integrate Angular development in Dnn so you can enjoy hot-reloading while developing, and still use Dnn/2sxc Endpoints at the same time. Note that you can find a working demo of this in the [Template Angular App](xref:JsCode.Angular.TemplateApp).

## Goals of the Runtime Integration

1. The Angular App can be developed using best-practices incl. partial loading and hashed files
1. We can see the dev-build in Dnn in real-time
1. The dev-build can access Dnn endpoints as if it were running in production
1. Hot-reload works, so saving files automatically reloads the Dnn page

## Implementation

The Template App is installed in Dnn and we have the full copy of it on our local dev environment. Dev-server will run on `localhost:4200`. The way it's integrated in the template app is that the main file `_AngularApp.cshtml` has some code like this:

```razor
@inherits Custom.Hybrid.Razor12
@using ToSic.Razor.Blade;
@{
  // ...

  // Add <base> tag using RazorBlade - Angular needs this so that links changing dialogs (routes) work properly
  HtmlPage.AddBase((Link.Base()));

  // ...

  // Create helper to integrate angular best-practice
  var ngHelpers = CreateInstance("./shared/_Angular.cshtml");

  // ...
  @ngHelpers.LoadFromNgServe()
  // ...
}

```

We've removed some of the code here for simplicity, but the important parts are

1. Add `<base>` header to the page for Angular Routing to work properly
1. `LoadFromNgServe` will load the standard Angular files from `localhost:4200`

To see the full source code, get the [](xref:App.Angular11) or browse it here [](xref:App.Angular11.Git)

---

## History

1. First [version for Angular 4](https://github.com/2sic/app-tutorial-angular4-data) created in 2017
1. Enhanced for [Angular 6](https://github.com/2sic/app-template-angular) in 2019
1. Enhanced for Angular 8 in 2020
1. Enhanced for Angular 11 and dnn-sxc-angular 11 in February 2021