---
uid: JsCode.Angular.DnnSxcAngular.DataApi$
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Data.api$\<T\>(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

With **dnn-sxc-angular** it's really easy to access WebAPIs on the backend. 

The easiest way is to use `data.api$<T>(...)` which gets you a _Stream_ (`$`) of objects from a [custom WebAPI](xref:NetCode.WebApi.Index).

Here's what it does:

* `data.api$<T>(...)` will get you...
* ...an observable of `T` 
* you'll often use `<YourType[]>` if you expect an array
* the controller & route `('simple/hello')`

## Example

We'll explain how to get call the backend based on the [Template App](xref:JsCode.Angular.TemplateApp).

Check out the `api-demo.component.ts` - you'll see some code like this:

```js
@Component({ /* ... */ })
export class ApiDemoComponent {

  numbers$: Observable<number[]>;

  constructor(data: Data) {
    // simple version for just a quick call, not re-using the api object
    this.numbers$ = data.api$<number[]>('simple/Numbers');
   }
}
```

In the above example you'll see this line: 

```javascript
this.numbers$ = data.api$<number[]>('simple/Numbers');
```

This is a quick call to a backend controller called `Simple` and the action `Numbers`. 

## Difference to Data.api(...)

The `Data` object also has a [`api(...)`](xref:JsCode.Angular.DnnSxcAngular.DataApi) without the `$`. That doesn't return a stream/observable of data, but instead returns an `Api` object which can be used for multiple `get<T>(...)` calls. 

