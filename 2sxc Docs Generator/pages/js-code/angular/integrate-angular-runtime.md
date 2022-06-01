---
uid: JsCode.Angular.IntegrateAngularRuntime
---

<img src="./assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Integrate Angular for Runtime in 2sxc / Dnn

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-all { visibility: visible; } </style>

This explains how to best integrate Angular in Dnn. Note that you can find a working demo of this in the [Template Angular App](xref:JsCode.Angular.TemplateApp).

## Goals of the Runtime Integration

1. The Angular App can be compiled using best-practices incl. partial loading and hashed files
1. The Angular solution can be easily distributed to another Dnn/2sxc as a 2sxc App package
1. We can run multiple editions of the same app, like a `live` and a `staging` edition for internal review
1. The final page has the `app` tag and all the script/css resources as the Angular compiler generated them
1. Changes to the Angular App are automatically included without manual changes

## Implementation

In the Template App the compiled Angular SPA is in `[app-root]/live/dist/ng-app/`. The way it's integrated in the template app is that the main file `_AngularApp.cshtml` has some code like this:

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
  @Html.Raw(ngHelpers.ImportAngularHtml(editions.CurrentEdition));
}
```

We've removed some of the code here for simplicity, but the important parts are

1. Add `<base>` header to the page for Angular Routing to work properly
1. `ImportAngularHtml` which will scan the `index.html` which Angular creates, extract all the important parts and add them to the page

Note that there is a bit more magic happening to ensure we can run multiple editions (`live`, `staging`, ...). To see the full source code, get the [](xref:App.Angular11) or browse it here [](xref:App.Angular11.Git)


---

## History

1. First [version for Angular 4](https://github.com/2sic/app-tutorial-angular4-data) created in 2017
1. Enhanced for [Angular 6](https://github.com/2sic/app-template-angular) in 2019
1. Enhanced for Angular 8 in 2020
1. Enhanced for Angular 11 and dnn-sxc-angular 11 in February 2021