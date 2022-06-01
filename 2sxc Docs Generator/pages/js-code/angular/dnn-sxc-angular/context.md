---
uid: JsCode.Angular.DnnSxcAngular.Context
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Context (dnn-sxc-angular)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

**dnn-sxc-angular** can give you a lot of _Context Information_ like this:

* what Page the app is on
* what Module it's on
* the `$2sxc` object of the page
* the `sxc` object of the current module

...and more

## Example

We'll explain how to get one or many items based on the [Template App](xref:JsCode.Angular.TemplateApp).

Check out the `team.service.ts` - you'll see some code like this:

```js
@Injectable({ /* ... */ })
export class TeamService {
  private selectedBu$ = new BehaviorSubject<string>('');

  /** This will contain the persons returned from the API */
  team$: Observable<Person[]>;

  constructor(data: Data, context: Context) {
    // also get guid if in edit mode
    const withGuid = context.sxc?.isEditMode() ? '&includeGuid=true': '';
    this.team$ = this.selectedBu$.pipe(switchMap(bu => data.query$<Person[]>(`BusinessUnitTeam?bu=${bu}${withGuid}`)));
  }
}
```

In the above example you'll see these lines: 

```js
const withGuid = context.sxc?.isEditMode() ? '&includeGuid=true': '';
```

Here we're asking the `context` object for the current `sxc` instance (of this module) to find out if we're in edit-mode. In this example it will then affect the Query to include more data for the in-page editing experience. 

## More APIs

The `Context` has more to offer - just check out the intellisense in VS Code.