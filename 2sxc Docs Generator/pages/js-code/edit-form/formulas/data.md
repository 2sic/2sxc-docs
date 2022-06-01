---
uid: JsCode.EditForm.Formulas.Data
---

<img src="~/pages/basics/edit/formulas/assets/formulas-banner.svg" width="100%" >

# `data` Object in Formulas

The data object contains the most commonly used data, specifically

* `value` - the value which would be used if the function didn't run
* `default` - the default value this thing would have based on field configuration (use for reset to default)
* `prefill` - the prefill value
* `initial` - the initial value this setting/field had when it was loaded (use for reset to initial) _new in 12.02_
* `[FieldName]` - all the values of the other fields
* `parameters` `.[paramname]` - all the parameters passed to the dialog, currently the ones in the `prefill` - v13.10

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

### Special Remarks about **Date** Values

Dates are stored as strings, not as Date objects. 
The UI doesn't care about time zones, so the strings always use Zulu time and _not the local time zone_. 
This may cause some challenges which you want to know about.

**Returned Date Objects**

If your function returns a date-object we will assume that you were creating a new date and didn't worry about time zones. 
So we will simply drop the time-zone information and assume that's what you wanted.

So if you do `return new Date();` it will contain something like `Tue Jun 08 2021 11:22:33 GMT+0200 (Central European Summer Time)`. 
We will treat this as `2021-06-08T11:22:33` and ignore the time zone. 
The UI will then also show `2021-06-08 11:22:33`

**Returned Date Strings**

* If you return a date-string without time-zone like `2021-06-08 10:00` we will assume this is what you want, and treat it as such. 
* If you return a date-string with time zone like `2021-06-08 10:00 +0200` we will assume you used something like `new Date().toString()` and ignore the time zone, so we'll keep `2021-06-08 10:00` because you almost certainly didn't realize that the toString() would result in a wrong time. 

**Likely Problems on Date-Formulas**

Basically if you create a `new Date()` object and return that, everything will work as expected. 
And you construct a UTC-only date everything will work too. 

Where things will surprise you is when you convert the `data.value` and simply return it without making corrections. These things will cause problems:

* Problem: `return new Date(data.value);`  
  No Problem: `return new Date();`
* Problem: `var x = new Date(data.value); x.setMinutes(0); x.setSeconds(0); return x;`  
  No Problem: `var x = new Date(); x.setMinutes(0); x.setSeconds(0); return x;`
* Problem: `var otherFieldDate = new Date(data.Birthday).getDay();` _will probably return the wrong day_

This is because our `data.value` doesn't have a time zone, and converting it to `Date(...)` will construct a date in the users time zone resulting in a shift by a few hours. 
So this will only affect formulas which use the existing date, modify it, and are not aware of the time-zones. 

To fix this, make sure that if you convert existing data to a Date, you pretend it's in the time-zone changes of the current browser. 

This example shows a formula that will remove the time on a new date or the existing one.

```js
v1(data, context) {
  // Use existing date (but pretend it's local time by dropping 'Z') or use current Date
  var date = data.value 
    ? new Date(data.value.replace('Z', ''))
    : new Date();

  date.setHours(0,0,0,0); // flush all time parts
  return date;
}
```

Another option is to work with the Zulu time but make sure you UTC it when returning, or work with `.getTimezoneOffset()`. 

---

## History

* Introduced in 2sxc 12.01
* Added `data.parameters` in v13.10

Shortlink to here: https://r.2sxc.org/js-fdata