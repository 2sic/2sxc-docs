---
uid: JsCode.Angular.IntegrateAngularDevelopment
---

<img src="./assets/sxc-angular-banner-flat.jpg" width="100%">

# Develop an Angular App inside 2sxc and Dnn

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-all { visibility: visible; } </style>

Use the [Angular Loader extension](xref:Extensions.AppExtensions.By2sxc.AngularLoader.Index) with its `local` edition to develop an Angular app with hot reload inside a real Dnn page. This preserves Dnn authentication, the current 2sxc module context, WebAPI access, and edit toolbars while Angular code is served from your development machine.

## Prepare the App

1. [Install the Angular Loader extension](xref:Extensions.AppExtensions.Install.Index) in the 2sxc app.
1. Follow its [local-edition instructions](xref:Extensions.AppExtensions.By2sxc.AngularLoader.Index) to configure the local development server and generated files.
1. Configure [sxc-angular](xref:JsCode.Angular.DnnSxcAngular.Install) in the Angular application.

The [Angular Template App](xref:JsCode.Angular.TemplateApp) already contains this setup and is the recommended starting point.

## Start Local Development

From the template app's `ng` folder, install the dependencies and start Angular:

```cmd
npm install
npm run local
```

The template starts the Angular development server on `localhost:4200`.

Open the normal Dnn page containing the 2sxc app, then select the `local` edition using the app's edition selector. Do not open `localhost:4200` directly—the Dnn page supplies the authentication and 2sxc context.

If the Dnn site uses HTTPS, start the HTTPS development server instead:

```cmd
npm run local-ssl
```

Your browser may require you to trust the local development certificate before it can load the scripts.

## How Requests Reach 2sxc

The Angular Loader renders the Angular root element inside the Dnn page. During Angular bootstrap, `SxcInitializer.initialize(element)` reads that element's 2sxc context. The interceptor registered by `provideSxc()` then sends data, query, and WebAPI requests to the Dnn/2sxc site with the required headers.

## Build an Edition

The current template provides scripts for deploying production builds into the app's edition folders:

```cmd
npm run build-to-staging
npm run build-to-live
```

Use staging for review before publishing the same app as the live edition.

## Network Shares and Watchpack Errors

Native file watching may fail when the Angular workspace is located on a mapped or UNC network drive. If Watchpack repeatedly reports `UNKNOWN: unknown error, watch`, run Angular with polling:

```cmd
npm run local -- --poll=1000
```

You can also add `--poll=1000` to the template's `local` npm script if this workspace always requires polling.

For loader configuration and edition switching, follow the [Angular Loader documentation](xref:Extensions.AppExtensions.By2sxc.AngularLoader.Index). For the complete implementation, browse the [Angular Template App source](xref:App.AngularTemplate.Git).
