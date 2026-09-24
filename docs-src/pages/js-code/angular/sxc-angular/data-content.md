---
uid: JsCode.Angular.DnnSxcAngular.DataContent
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Content with SxcApp.data&lt;T&gt;(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

Use `SxcApp.data<T>(contentType)` to create a typed service for a 2sxc content type.

The returned service supports:

* `getAll()`
* `getOne(id)`
* `create(item)`
* `create(item, metadataFor)`
* `update(id, item)`
* `delete(idOrGuid)`

All operations return RxJS observables.

## Example

```ts
import { SxcApp } from '@2sic.com/sxc-angular';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({ /* ... */ })
export class BusinessUnitSelectorComponent {
  readonly businessUnits$: Observable<BusinessUnit[]>;

  constructor(app: SxcApp) {
    const businessUnits = app.data<BusinessUnit>('BusinessUnit');

    this.businessUnits$ = businessUnits.getAll();

    // Examples:
    // const one$ = businessUnits.getOne(402);
    // const created$ = businessUnits.create({ Name: 'New Unit' });
    // const updated$ = businessUnits.update(402, { Name: 'Renamed Unit' });
    // const deleted$ = businessUnits.delete(402);
  }
}
```

Create, update, and delete calls require the corresponding 2sxc permissions for the current user.
