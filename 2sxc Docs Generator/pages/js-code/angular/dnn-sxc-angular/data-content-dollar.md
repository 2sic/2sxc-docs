---
uid: JsCode.Angular.DnnSxcAngular.DataContent$
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Data.content$\<T\>(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

With **dnn-sxc-angular** it's really easy to access Data from the backend. 

The easiest way is to use `data.content$<T>(...)` which gets you a _Stream_ (`$`) of Entities of the expected Content-Type.

Here's what it does:

* `data.content$<T>(...)` will get you...
* ...an observable of `T` 
* you'll usually use `<YourType[]>` since you'll get an array back
* the Content-Type name is specified in the `('BusinessUnits')`

Single-Item Call

* you can optionally specify an id, like `('BusinessUnits', 4020)`
* when you use an ID, you'll expert a single item back, so you'll use `<YourType>`

## Example

We'll explain how to get one or many items based on the [Template App](xref:JsCode.Angular.TemplateApp).

Check out the `business-unit-selector.component.ts` - you'll see some code like this:

```js
@Component({ /* ... */ })
export class BusinessUnitSelectorComponent {

  /** Stream of business units, provided back the backend */
  businessUnits$: Observable<BusinessUnit[]>;

  constructor(private data: Data) {
    // Query backend for stream of BusinessUnit[]
    // #ExampleData
    this.businessUnits$ = data.content$<BusinessUnit[]>('BusinessUnit');
  }
}
```

The important line is this:

```javascript
this.businessUnits$ = data.content$<BusinessUnit[]>('BusinessUnit');
```

This will get all `BusinessUnit` Entities from the backend. 
Here's what it does

1. We're using the `Data` object provided by [dnn-sxc-angular](xref:JsCode.Angular.DnnSxcAngular.Index)
1. The `content$<T>(...)` requests an observable stream of `BusinessUnit[]` objects
1. The term `...('BusinessUnit')` means that this is the Content-Type we are looking for. 

## Difference to Data.content\<T\>(...)

The `Data` object also has a [`content<T>(...)`](xref:JsCode.Angular.DnnSxcAngular.DataContent) without the `$`. That doesn't return a stream/observable of data, but instead returns a `Content` object which can be used for multiple `get(...)` calls. 

