---
uid: JsCode.Angular.DnnSxcAngular.Context
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Context with SxcContext

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

`SxcContext` describes the Dnn and 2sxc environment of the current Angular application. It includes:

* The global `$2sxc` object
* The current module's `sxc` instance
* The active application and API editions
* Optional module, content-block, and Angular-path configuration
* Whether the HTTP interceptor should add 2sxc headers

`SxcInitializer` populates this service from the Angular root element during [bootstrap](xref:JsCode.Angular.DnnSxcAngular.Install).

## Example

Inject `SxcContext` wherever context information is required:

```ts
import { SxcApp, SxcContext } from '@2sic.com/sxc-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class TeamService {
  readonly team$: Observable<Person[]>;

  constructor(app: SxcApp, context: SxcContext) {
    const includeGuid = context.sxc?.isEditMode();

    this.team$ = app
      .query<Person[]>('BusinessUnitTeam')
      .getStream('Default', { bu: 'Web', includeGuid });
  }
}
```

In a component template, expose the injected service as a public property:

```ts
constructor(public sxcContext: SxcContext) {}
```

```html
<p>Edition: {{ sxcContext.edition }}</p>
<p>Module: {{ sxcContext.sxc.id }}</p>
```

Use TypeScript IntelliSense to discover the complete `SxcContext` API.
