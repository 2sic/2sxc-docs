---
uid: JsCode.Angular.DnnSxcAngular.HttpInterceptor
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# sxc-angular HTTP Interceptor

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

Calls to Dnn and 2sxc APIs require security and context information. The sxc-angular interceptor:

1. Adds security headers such as `RequestVerificationToken`.
1. Adds context headers for the current page and module.
1. Converts shorthand URLs such as `app/auto/query/...` to the correct 2sxc endpoint.
1. Applies an API edition or application name configured in `SxcContext`.
1. Leaves cross-origin requests unchanged.

## Registration and Initialization

Register the interceptor and HTTP client once with `provideSxc()`:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideSxc()],
};
```

Initialize the current root element before making API calls:

```ts
export class AppComponent {
  constructor(element: ElementRef, initializer: SxcInitializer) {
    initializer.initialize(element);
  }
}
```

The 2sxc Razor template must load `$2sxc` and render the context attributes on the Angular root element before Angular starts. The [Angular Template App](xref:JsCode.Angular.TemplateApp) demonstrates this setup.

After initialization, calls made through `SxcApp` or Angular's `HttpClient` use the configured interceptor automatically.

> [!NOTE]
> Version 22 no longer uses `DnnSxcRootModule`, `SxcRootModule`, `DnnAppComponent`, or `SxcAppComponent`.
