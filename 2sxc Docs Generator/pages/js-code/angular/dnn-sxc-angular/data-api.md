---
uid: JsCode.Angular.DnnSxcAngular.DataApi
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Data.api(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

With **dnn-sxc-angular** it's really easy to access WebAPIs on the backend. If you want to make multiple calls to the same controller, the easiest way is to use `data.api<T>(...)`.

Here's what it does:

* `data.api(...)` will get you...
* an `Api` object which will only talk to the controller in `(...)` - like `('simple')`
* You can then use it multiple times with `get()` and `post()`

## Example

We'll explain how to get one or many items based on the [Template App](xref:JsCode.Angular.TemplateApp).

Check out the `api-demo.component.ts` - you'll see some code like this:

```js
@Component({ /* ... */ })
export class ApiDemoComponent {

  apiMessage$: Observable<string>;
  nameMessage$: Observable<string>;
  something$: Observable<Something>;

  constructor(data: Data) {
    // version for using the api-object many times;
    const simple = data.api('simple');

    // short call version - without parameters
    this.apiMessage$ = simple.get<string>('hello');

      // short call version - with parameters
    this.nameMessage$ = simple.get<string>('hello', new HttpParams().set('name', 'Michael'));

    this.something$ = simple.get<Something>('Something', new HttpParams().set('name', 'Samuel Jackson'));
   }
}
```

In the above example you'll see these lines: 

```js
// version for using the api-object many times;
const simple = data.api('simple');

// short call version - without parameters
this.apiMessage$ = simple.get<string>('hello');

  // short call version - with parameters
this.nameMessage$ = simple.get<string>('hello', new HttpParams().set('name', 'Michael'));

this.something$ = simple.get<Something>('Something', new HttpParams().set('name', 'Samuel Jackson'));
```

This shows how to use the `api(...)` to get an object to re-use, and you can also see how parameters are added to the call. 

## Difference to Data.api$\<T\>(...)

The `Data` object also has a [`api$<T>(...)`](xref:JsCode.Angular.DnnSxcAngular.DataApi$) with a `$`. That is for single-call use.