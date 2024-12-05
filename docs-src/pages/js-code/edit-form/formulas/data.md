---
uid: JsCode.EditForm.Formulas.Data
---

<img src="~/assets/features/formulas.svg" class="feature">

# `data` Object in Formulas

The data object contains the most commonly used data, specifically

* `value` - the value which would be used if the function didn't run
* `default` - the default value this thing would have based on field configuration (use for reset to default)
* `prefill` - the prefill value
* `initial` - the initial value this setting/field had when it was loaded (use for reset to initial) _new in 12.02_
* `[FieldName]` - all the values of the other fields
* `parameters.[ParamName]` - all the parameters passed to the dialog, currently the ones in the `prefill` - v13.10

Example of the `data` object in a Formula which would set the `Visible` property of a field `FullName`:

```js
data = {
  "value": true,                        // It's visible ATM
  "default": false,                     // Originally hidden till first/last were given
  "prefill": undefined,                 // Would contain prefill information
  "FirstName": "Douglas",               // string
  "LastName": "Adams",                  // string
  "Birthday": "1952-03-11T00:00:00.000Z", // string, always as neutral/Zulu/UTC time
  "Awards": ["guid-guid", "guid-guid"], // IDs pointing to other entities
  "FullName": "Douglas Adams",          // calculated by formula
  "Photo": "file:72",                   // link information
  "Album": "",                          // library fields have no value
}
```

## Special Remarks about **Date** Values

Dates are stored as strings, not as Date objects.
The UI doesn't care about time zones, so the strings always use Zulu time and _not the local time zone_.
This may cause some challenges which you want to know about.

👉🏽 See [returning dates](xref:JsCode.EditForm.Formulas.ReturnDate)


---

## History

* Introduced in 2sxc 12.01
* Added `data.parameters` in v13.10

Shortlink to here: <https://go.2sxc.org/js-fdata>
