---
uid: JsCode.Angular.DnnSxcAngular.Index
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# NPM Package @2sic/dnn-sxc-angular

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

We've created a library to help you connect Angular with Dnn called **dnn-sxc-angular**. 

You can find it here: [](xref:Npm.Dnn-Sxc-Angular).

To start, you should learn how to [install](xref:JsCode.Angular.DnnSxcAngular.Install).

The library contains the following bits of magic to get you going:

1. [Http Interceptor](xref:JsCode.Angular.DnnSxcAngular.HttpInterceptor) which ensures that all calls to Dnn have the necessary security headers
1. Data API to quickly get data from WebAPIs
1. CMS directives to create [toolbars](xref:JsCode.Angular.DnnSxcAngular.Toolbars) in the Angular App for editing content
1. [Context information](xref:JsCode.Angular.DnnSxcAngular.Context) about the page/module and current sxc-objects


---

## History

1. ca. 2015 first version for Angular 2
1. ca. 2016 enhanced for Angular 6 and latest 2sxc features
1. 2019 Enhanced with Hot-Reloading features for Angular 8 and completely reworked how context is detected in Dnn
1. 2020 Improved Hot-Reloading
1. 2021-02 Added tag-toolbar attribute and created refresh callback so the page doesn't reload (requires 2sxc 11.12)
1. 2021-02-26 v.11.01 - added new attribute angular-path to use as base for lazy loading


## To Do Status 2021-03

1. enhance the content-manager to provide write commands (ATM read-only) - you can still do this, but must use the context.sxc... classic JS API
1. enhance the content-manager to provide create-metadata commands - you can still do this, but must use the context.sxc... classic JS API