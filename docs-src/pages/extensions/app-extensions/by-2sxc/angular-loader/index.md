---
uid: Extensions.AppExtensions.By2sxc.AngularLoader.Index
---

# Angular Loader (JS-Helper)

_This is an extension for 2sxc Apps and can be installed into each App individually._

Whit this Extension, you can easily load Angular apps into your DNN environment.
It handles loading the Angular framework and your app code.

Optionally, it can also handle loading different editions of your app (e.g. dev vs. prod) using the JS App Editions extension.

## Installation

* [](xref:Extensions.AppExtensions.Install.Index){title="icon:journal-arrow-down"} instructions for your first time

## Usage

### [Basic example](#tab/use-in-razor-minimal)

1. First, build your Angular app and place the output files into the appropriate (e.g. `/angular-demo/angular/browser`) folder in your app.
2. Insert this code into your Razor view where you want to load the Angular app:

```cshtml
@inherits Custom.Hybrid.RazorTyped

@Html.Partial("./extensions/angular-loader/Angular Main.cshtml", data: new {
  AngularAppPath = "/angular-demo/angular/browser",
  AngularAppTag = "app-root"
})
```

<img src="./assets/angular-loader.png" alt="Angular Hello World" class="full-width"/>

This will load the Angular app from the specified path (e.g. `/angular-demo/angular/browser`)
regardless of the current edition. For example the hello world app of the Angular Quickstart Guide.

### [With Editions](#tab/with-editions)

1. To use the Angular Loader with Editions, build your Angular app and
    place the output files into the appropriate folders in your app
    (e.g. `/live/dist/ng-app`, `/staging/dist/ng-app`).

2. Insert this code into your Razor view where you want to load the Angular app:

```cshtml
@inherits Custom.Hybrid.RazorTyped

@Html.Partial("./extensions/angular-loader/Angular Main.cshtml", data: new {
  AngularAppPath = "/dist/ng-app",
  AngularAppTag = "app-root",
  Editions = "live,staging"
})
```

This will load the Angular app based on the current edition.
For example, if the current edition is `live`, it will load the Angular app from `/live/dist/ng-app`.

<img src="./assets/angular-loader-with-editions.png" alt="Angular App with Editions" class="full-width"/>

### [With Local Editions](#tab/local-editions)

<img src="~/assets/logos/polymorph/polymorph-logo-wide.svg" width="50%" class="float-right">

The Angular Loader includes the [JS App Editions](xref:Extensions.AppExtensions.By2sxc.JsAppEditions.Index)
extension to develop the app locally with a hot-build,
while loading the production build from DNN for normal users.

The local edition is useful for development,
as it allows you to load the Angular app directly from your local development environment
without having to build and deploy it to the server.

When the local edition is active,
the Angular Loader will load the app from the specified LocalDevServerPath (e.g. `"//localhost:4200"`)
and include the specified LocalDevFiles (e.g. `"runtime.js,polyfills.js,styles.js,vendor.js,main.js"`).
This allows you to see your changes in real-time as you develop your Angular app.

```cshtml
@inherits Custom.Hybrid.RazorTyped

@Html.Partial("./extensions/angular-loader/Angular Main.cshtml", data: new {
  AngularAppPath = "/dist/ng-app",
  AngularAppTag = "app-root",
  Editions = "live,staging,local",
  LocalDevServerPath = "//localhost:4200",
  LocalDevFiles = "runtime.js,polyfills.js,styles.js,vendor.js,main.js"
})
```

<img src="./assets/angular-loader-with-local-edition.png" alt="Angular App with Local Edition" class="full-width"/>

---

## Parameters
```cshtml
var angularConfig = new
{
  // the path to your angular app - this should be the path where the index.html of your angular app is located, relative to the root of your 2sxc app
  AngularAppPath = "relative/path/to/angular/app",
  // usually something like "app-root"
  AngularAppTag = "your-app-root-tag",
  // different editions of your angular app, e.g. live, staging, local - this will be used to switch between compiled and dev code
  // you can leave this empty if you don't need
  Editions = "live,staging,local",
  // the path to your local dev server where angular is running in development mode (usually something like http://localhost:4200)
  LocalDevServerPath = "//localhost:4200",
  // the list of files that angular generates in development mode - you can find these in the index.html that angular generates when running in dev mode
  // depending on your angular configuration, this could be different - make sure to adjust this to your needs
  LocalDevFiles = "runtime.js,polyfills.js,styles.js,vendor.js,main.js"
};
```

## History

1. v01.00 - Initial release for 2sxc 2026-03

Shortlink: <https://go.2sxc.org/ext-ngloader>
