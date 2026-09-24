---
uid: JsCode.Angular.DnnSxcAngular.DataApi$
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Migrating Data.api$() to SxcApp.api()

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

The old `Data.api$<T>(...)` shortcut is not part of sxc-angular v22.

Inject `SxcApp`, create an API service, and call the required HTTP method instead:

```ts
import { SxcApp } from '@2sic.com/sxc-angular';
import { Observable } from 'rxjs';

export class ApiDemoComponent {
  readonly numbers$: Observable<number[]>;

  constructor(app: SxcApp) {
    this.numbers$ = app.api('simple').get<number[]>('Numbers', '');
  }
}
```

The result remains an RxJS observable. See [Custom WebAPIs with SxcApp.api()](xref:JsCode.Angular.DnnSxcAngular.DataApi) for parameters and other HTTP methods.
