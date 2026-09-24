---
uid: JsCode.Angular.DnnSxcAngular.Install
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Install and Bootstrap sxc-angular

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

## Step 1: Install the Package

From the Angular workspace, run:

```cmd
npm install @2sic.com/sxc-angular
```

This installs [`@2sic.com/sxc-angular`](xref:Npm.Dnn-Sxc-Angular) and records it in `package.json`.

Version 22 expects Angular 18+ and RxJS 7+ as peer dependencies.

## Step 2: Register the Providers

Add `provideSxc()` to the application providers in `app.config.ts`:

```ts
import { provideSxc } from '@2sic.com/sxc-angular';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Registers HttpClient, the 2sxc interceptor, and all sxc services.
    provideSxc(),
  ],
};
```

Do not also register a separate `provideHttpClient(...)` just for sxc-angular. `provideSxc()` already registers the HTTP client with the interceptor from dependency injection.

## Step 3: Initialize the Root Element

Inject `SxcInitializer` into the root component and initialize it with the component's host element:

```ts
import { SxcInitializer } from '@2sic.com/sxc-angular';
import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor(element: ElementRef, initializer: SxcInitializer) {
    initializer.initialize(element);
  }
}
```

Initialization reads the 2sxc attributes from the Angular root element, configures `SxcContext`, and prevents Enter on an input from submitting the surrounding Dnn form.

To retain normal form submission, pass an option:

```ts
initializer.initialize(element, { enableDefaultSubmit: true });
```

## Step 4: Import Standalone Features Where Used

Toolbar support is standalone in v22. Import the directive in each component that uses it:

```ts
import { SxcTagToolbarDirective } from '@2sic.com/sxc-angular';

@Component({
  // ...
  imports: [SxcTagToolbarDirective],
})
export class ExampleComponent {}
```

Continue with [context](xref:JsCode.Angular.DnnSxcAngular.Context), [data access](xref:JsCode.Angular.DnnSxcAngular.DataContent), [queries](xref:JsCode.Angular.DnnSxcAngular.DataQuery$), [WebAPIs](xref:JsCode.Angular.DnnSxcAngular.DataApi), and [toolbars](xref:JsCode.Angular.DnnSxcAngular.Toolbars).

## Migrating from an Older Version

Replace the old APIs as follows:

| Before v22 | Version 22 |
| --- | --- |
| `DnnAppComponent` or `SxcAppComponent` | Inject `SxcInitializer` and call `initialize(element)` |
| `DnnSxcRootModule` or `SxcRootModule` | `provideSxc()` |
| `ContentManagerModule` | `SxcTagToolbarDirective` or `SxcToolbarDirective` |
| `Context` | `SxcContext` |
| `Data` | `SxcApp` |
