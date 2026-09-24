---
uid: JsCode.Angular.DnnSxcAngular.DataApi
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Custom WebAPIs with SxcApp.api(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

Use `SxcApp.api(controller)` to call a custom 2sxc WebAPI controller. It returns a reusable API service with `get`, `post`, `put`, `delete`, and `url` methods.

## Example

```ts
import { SxcApp } from '@2sic.com/sxc-angular';
import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({ /* ... */ })
export class ApiDemoComponent {
  readonly message$: Observable<string>;
  readonly greeting$: Observable<string>;

  constructor(app: SxcApp) {
    const simple = app.api('simple');

    this.message$ = simple.get<string>('hello', '');
    this.greeting$ = simple.get<string>(
      'hello',
      new HttpParams().set('name', 'Michael'),
    );
  }
}
```

URL parameters may be a query string, `HttpParams`, or a record containing string, number, boolean, or array values.

```ts
const save$ = app.api('people').post<Person>(
  'save',
  { draft: false },
  person,
);
```

All returned values are RxJS observables. The sxc-angular interceptor adds the required 2sxc headers and rewrites the shorthand URL.
