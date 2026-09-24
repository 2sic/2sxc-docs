---
uid: JsCode.Angular.DnnSxcAngular.DataContent$
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Migrating Data.content$() to SxcApp.data()

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

The old `Data.content$<T>(...)` shortcut is not part of sxc-angular v22.

Use `SxcApp.data<T>()` and select the operation explicitly:

```ts
import { SxcApp } from '@2sic.com/sxc-angular';
import { Observable } from 'rxjs';

export class BusinessUnitSelectorComponent {
  readonly businessUnits$: Observable<BusinessUnit[]>;

  constructor(app: SxcApp) {
    const businessUnits = app.data<BusinessUnit>('BusinessUnit');

    this.businessUnits$ = businessUnits.getAll();
    // To retrieve one item:
    // const businessUnit$ = businessUnits.getOne(402);
  }
}
```

See [Content with SxcApp.data()](xref:JsCode.Angular.DnnSxcAngular.DataContent) for create, update, and delete operations.
