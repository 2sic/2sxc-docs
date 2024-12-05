---
uid: JsCode.Angular.DnnSxcAngular.DataQuery$
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Data.query$\<T\>(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

With **dnn-sxc-angular** it's really easy to access Data from the backend. 

The easiest way to access a [Query](xref:Basics.Query.Index) is to use `data.query$<T>(...)` 
which gets you a _Stream_ (`$`) of Entities from a [Query](xref:Basics.Query.Index).

Here's what it does:

* `data.query$<T>(...)` will get you...
* ...an observable of `T` 
* you'll usually use `<YourType[]>` since you'll get an array back
* the Query name is specified in the `('BusinessUnitTeam')`

## Example

We'll explain how to run a query based on the [Template App](xref:JsCode.Angular.TemplateApp).

Check out the `team.service.ts` - you'll see some code like this:

```js
@Injectable({
  providedIn: 'any',
})
export class TeamService {
  /** This will contain the persons returned from the API */
  team$: Observable<Person[]>;

  constructor(data: Data, context: Context) {
    this.team$ = data.query$<Person[]>(`BusinessUnitTeam?bu=Web`);
  }
}
```

The important line is this:

```javascript
this.team$ = data.query$<Person[]>(`BusinessUnitTeam?bu=Web`);
```

This will query the `BusinessUnitTeam` Query on the backend with parameter `bu` being `Web` (to only get members of the Web-team).
Here's what it does

1. We're using the `Data` object provided by [dnn-sxc-angular](xref:JsCode.Angular.DnnSxcAngular.Index)
1. The `query$<T>(...)` requests an observable stream of `BusinessUnit[]` objects
1. The term `...('BusinessUnitTeam')` is the name of the query
1. The additional parameters like `?bu=Web` is expected by the query (in this case the query could also accept an empty BU)

## Other overloads

The `query$<T>(...)` has various other overloads to include parameters. You'll see them in the intellisense in VS Code.

## Difference to Data.query\<T\>(...)

The `Data` object also has a `query<T>(...)` without the `$`. That doesn't return a stream/observable of data, but instead returns a `Query` object which can be used for multiple calls. As of now it's probably not very usefull, so let's stick to this.

