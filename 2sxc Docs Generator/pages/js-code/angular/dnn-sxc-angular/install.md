---
uid: JsCode.Angular.DnnSxcAngular.Install
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Installing and Bootstrapping dnn-sxc-angular

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

## Step 1. Install the Package

Just run `npm i "@2sic.com/dnn-sxc-angular"`

This will download [](xref:Npm.Dnn-Sxc-Angular) and add it to your `package.json`.

## Step 2. Add to your Root module

Here's an extract from [Template Angular App](xref:JsCode.Angular.TemplateApp) - in `/ng/src/app/app.module.ts`:

```js
/*  ---------------------------------------------------------------------------
    Tutorial
    ---------------------------------------------------------------------------
    This main module configuration has two special things it includes
    - DnnInterceptor: this ensures all http-requests will have the neecessary Dnn headers
    - ContentManagerModule: this enables attributes like sxc-toolbar for editing UIs
    ---------------------------------------------------------------------------
*/
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ContentManagerModule, DnnSxcRootModule } from "@2sic.com/dnn-sxc-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TitleComponent } from "./layout/title.component";
import { NavigationComponent } from "./layout/navigation.component";

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,        // this tells Angular to run in a browser
    AppRoutingModule,     // this contains the application link-structure
    HttpClientModule,     // this enables web-api calls and should only be included in the App root

    // Impontant: don't load sub-modules here if you want lazy-loading to work
    // ExamplesModule,    // not added here, as it should lazy-load

    // 2sxc Module #StepBootstrap
    DnnSxcRootModule,     // this is important in the app-root, as it ensures that context is shared in sub-modules
    ContentManagerModule, // this is needed for edit-toolbars to work
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The most important bit is to ensure that

1. `HttpClientModule` is imported here
1. `DnnSxcRootModule` is imported here

## Step 3. Ensure Correct Bootstrapping

**dnn-sxc-angular** must do some initial work when loading, so the `AppComponent` must inherit from the `DnnAppComponent`. Heres' the code from `/ng/src/app/app.component.ts`:

```js
/*  ---------------------------------------------------------------------------
    Tutorial
    ---------------------------------------------------------------------------
    This entry component extends the DnnAppComponent
    By doing this, it will
    - pick up any configuration attributes on the <app-root> tag
    - automatically initialize all http adapters to auto-set Dnn headers
    - ensure that hitting an enter-key on an input field doesn't submit the page, because asp.net would do that

    #StepBootstrap
    ---------------------------------------------------------------------------
*/

import { Component, ElementRef } from '@angular/core';
import { DnnAppComponent, Context } from '@2sic.com/dnn-sxc-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends DnnAppComponent {
  constructor(el: ElementRef, context: Context) {
    super(el, context);
  }
}
```

This ensures that `DnnAppComponent` has a chance to initialize the Http-Interceptor and pick up any other configuration the `app-root` tag may have. 
