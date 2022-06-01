---
uid: JsCode.Angular.DnnSxcAngular.HttpInterceptor
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# dnn-sxc-angular HttpInterceptor

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

One of the core challenges when using any JavaScript in Dnn is ensuring that WebAPI calls have all the important http headers to make it work. 
This is what the [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) does. 
It ensures that:

1. Security headers like the `RequestVerificationToken` are included
1. Context headers like `ModuleId` are correct
1. Shorthand api urls like `app/data/BlogPost` are mapped to the correct endpoints

## How it works

For this to work, the page must have this data available before Angular loads. Thanks to 2sxc (the non-angular parts) this is automatically provided ahead of time. Here's the initialization process behind the scenes:

1. 2sxc adds important headers to the page on the server for 2sxc and dnn-sxc-angular to work (this happens automatically)
1. When the root module is built (usually called `AppModule`) it must include `DnnSxcRootModule` to register the Http-Interceptor
1. When Angular [bootstraps](xref:JsCode.Angular.DnnSxcAngular.Install) the base class `DnnAppComponent` gets everything from the page when it's constructed. Without this the Http-Interceptor wouldn't have the configuration necessary. 

After this has happened, all calls using the Angular [HttpClient](https://angular.io/guide/http) will automatically behave as expected. 
