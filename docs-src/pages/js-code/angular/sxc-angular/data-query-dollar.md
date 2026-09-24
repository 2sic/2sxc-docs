---
uid: JsCode.Angular.DnnSxcAngular.DataQuery$
---

<img src="../assets/sxc-angular-banner-flat.jpg" width="100%">

# Queries with SxcApp.query&lt;T&gt;(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

Use `SxcApp.query<T>(queryName)` to run a configured 2sxc [Query](xref:Basics.Query.Index).

The returned service supports:

* `getAll(params?)` to return the object containing all streams.
* `getStream(streamName, params?)` to return one stream.
* `getStreams(streamNames, params?)` to request selected streams.
* Optional POST data as the final argument of each method.

## Example

```ts
import { SxcApp } from '@2sic.com/sxc-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class TeamService {
  readonly team$: Observable<Person[]>;

  constructor(app: SxcApp) {
    this.team$ = app
      .query<Person[]>('BusinessUnitTeam')
      .getStream('Default', { bu: 'Web' });
  }
}
```

To retrieve all query streams as one typed object:

```ts
interface TeamQueryResult {
  Default: Person[];
  BusinessUnits: BusinessUnit[];
}

const result$ = app
  .query<TeamQueryResult>('BusinessUnitTeam')
  .getAll({ bu: 'Web' });
```

The old `Data.query$<T>(...)` shortcut is not part of v22. The result of the new methods is still an RxJS observable.
