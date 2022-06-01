---
uid: JsCode.Angular.DnnSxcAngular.DataContent
---

<img src="../assets/dnn-sxc-angular-banner-flat.jpg" width="100%">

# Data.content\<T\>(...)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .spa-2sxc-js { visibility: visible; } </style>

With **dnn-sxc-angular** it's really easy to access Data from the backend. 

One way to do this is using a helper-object which is pre-configured to a specific Content-Type, and can be re-used for multiple requests. 

This is what the `.content<T>(...)` will get you. 

On this page we'll explain how to get a object to manage a specific content-type using the `Data.content<T>()` command.

## Example

This is some example code 

```js
@Component({ /* stuff */ })
export class BusinessUnitSelectorComponent {
  constructor(private data: Data) {
    // Query backend for stream of BusinessUnit[]
    // This creates a content-manager object (note the missing $)
    const businessUnits = data.content<BusinessUnit>('BusinessUnit');

    // now get all
    const businessUnits$ = businessUnits.get();

    // or just one by ID
    const oneBu$ = businessUnits.get(402);
    oneBu$.subscribe((bu) => console.log(`Got BU ${bu.Name}`, bu));
    
    // update a value (note: not implemented yet as of dnn-sxc-angular v11.01)
    businessUnites.post(402, { Name: 'New Name' });
  }
}
```
## Difference to Data.content$\<T\>(...)

In most cases you'll prefer to use the [content$<T>(...) API](xref:JsCode.Angular.DnnSxcAngular.DataContent) which is single use.

The only really good case to use this is for updating data, but that hasn't been implemented yet. 

If you want to update data for now just use the normal `sxc` object on the `Context`

