---
uid: JsCode.EditForm.Formulas.Index
---

<img src="~/basics/edit/formulas/assets/formulas-banner.svg" width="100%" >

# Formulas JavaScript Specs

Formulas let you create JavaScript functions to calculate **Values** and **Properties** of things in the edit form. 

> Learn about [the Formula concepts](xref:Basics.Edit.Formulas.Index) here. 
> It also shows you the UIs, how to configure etc. 

## Examples

### Set Field _Value_ to _missing-data_ if empty

This formula would be applied to the fields **Value**.

```js
v1(data) {
  return data.value ? data.value : 'missing-data';
}
```

### Set Field _Visibility_ based on another Toggle Switch

This formula would be applied to the **Setting** `Visible`.

```js
v1(data) {
  return data.ShowAdvanced;
}
```

### Add an Emoji to a Group-Heading if inside it an important property was set

This formula would be applied to a group headings **Setting** `Name` which is the visible title:

```js
v1(data) { 
  return data.default + (data.EditInstructions || data.ListInstructions ? ' ✅' : ''); 
}
```

_Note that we're returning `data.default` and some more text, not `data.value`. This is because the value would change on each cycle, but `data.default` contains the original value._


## V1 Function Specs

1. All functions must be called `v1`, it must be lower case
   This is important because we cannot guess when the API will change, and we also expect to introduce an Excel-like syntax which would begin with `=`
1. The first line in the code must start with the function name `v1`. You cannot put comments or empty lines before the `v1`
1. Your function _must_ have brackets afterwards and it can have 0, 1 or two params, so you can use one of the following
    * `v1() { ... }`
    * `v1(data) { ... }`
    * `v1(data, context) { ...}`
1. The parameter names are anything you want, but the order of what you get is always `data` and then `context`. You can also write
    * `v1(d, c) { ... }`

## You Must Return a Valid Value

Each field type or property may expect a different data type. Make sure you provide that. 

> [!WARNING]
> If you return nothing, `undefined` or the wrong data type, the result will be ignored and the value/setting will not be changed. 

Common Mistakes

* returning nothing with `return;` - this will be regarded as an error and be ignored.
* returning `undefined`.
* Returning a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) instead of a real `true` or `false` for a boolean value

## The `data` Object

The data object contains the most commonly used data, specifically

* `value` - the value which would be used if the function didn't run
* `default` - the default value this thing would have based on field configuration (use for reset to default)
* `prefill` - the prefill value
* `initial` - the initial value this setting/field had when it was loaded (use for reset to initial) _new in 12.02_
* `[FieldName]` - all the values of the other fields

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

To fix this, make sure that if you convert existing data to a Date, you pretend it's in the time-zone changes of the current browser. This would do that:

```js
v1(data) {
  // Drop 'Z' to pretend it's in local time
  var date = new Date(data.value.replace('Z', '')); 
  date.setMinutes(0);
  date.setSeconds(0);
  return date; // date.toString() would also work
}
```

Another option is to work with the Zulu time but make sure you UTC it when returning, or work with `.getTimezoneOffset()`. 


## The `context` Object

The `context` contain additional information about the context we're running in.

* `cache` - an object which is only for this function and will be persisted across calls - use it to save temporary values
* `debug` - a true/false toggle if the form is in debug mode - Use this to show/hide really advanced fields. _new in 12.02_
* `target` - everything about the target of the formula - the current field
  * `type` = What the function processes `Field.Value` or `Field.Settings` (Future: `Form.Variable` etc.) 
  * `name` - field name or setting-name, so `FirstName` or `Visible`
  * `entity`
    * `id` - the id of the entity - 0 if it's new
    * `guid` - the GUID of the entity, always provided
* `culture`
  * `code`
  * `name` - this will return `undefined` scenarios where no languages are activated
* `experimental` - this is for internal APIs we're testing, they are not public. You can use them, but expect the APIs to change in near future

## Using the `context.cache`

In some cases you may want to remember a result of intermediate work. For this you can use the `context.cache` object. A simple exammple would be if you only want to run something once, in which case you could write something like this

```js
v1(data, context) {
  // don't do anything on following runs / return existing value
  if(context.cache.notFirstRun) return data.value;
  context.cache.notFirstRun = true;
  return true;
}
```

**Future, don't implement yet**
* getSettings(...)
* getEntities(...)
* getFields(entity)
* `entities`
  * [entity]
    * `guid`
    * `id`



## Tips and Tricks

1. You can always add a `console.log(data, context);` or similar in your code to see in real time what's being processed.
1. You can also add a line `debugger;` and the browser will stop at this line so you can inspect the variables and watch your code.
1. For now, we strongly recommend to use Formulas as [pure functions](https://en.wikipedia.org/wiki/Pure_function), but with experience the recommendation may change. 

<!-- 
## Working with `this` _Experimental! ⚠_

The formula is pre-compiled and executed again and again. Because of this, the `this` object will remain the same across all calls. As such, you can use it for remembering stuff - like a previous value you may need again. 
-->

## Future features

1. Ability to read other properties of fields - like check if a field is visible
1. Excel-style formula syntax using `=[Field]`
1. Ability to read other entities / check their types etc.
1. Ability to read fields of other entities


---

## History

* Introduced in 2sxc 12.01