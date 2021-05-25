---
uid: JsCode.EditForm.Formulas.Index
---

<img src="~/basics/edit/formulas/assets/formulas-banner.svg" width="100%" >

# Formulas JavaScript Specs

Formulas let you create JavaScript functions to calculate **Values** and **Properties** of things in the edit form. 

> Learn about [the Formula concepts](xref:Basics.Edit.Formulas.Index) here. 
> It also shows you the UIs, how to configure etc. 

## Examples

### Set Field _Value_ to _TODO_ if empty

This formula would be applied to the fields **Value**.

```js
v1(data) {
  return data.value ? data.value : 'TODO';
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

```



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
* `default` - the start value this thing would have
* `prefill` - the prefill value
* `[FieldName]` - all the values of the other fields

Example of the `data` object in a Formula which would set the `Visible` property of a field `FullName`:

```js
data = {
  "value": true,                        // It's visible ATM
  "default": false,                     // Originally hidden till first/last were given
  "prefill": undefined,                 // Would contain prefill information
  "FirstName": "Douglas",               // string
  "LastName": "Adams",                  // string
  "Birthday": Date(1952, 03, 11),           // JS date object; format not yet final
  "Birthday": "1952-03-11T00:00:00.000Z",   // JS date object; format not yet final
  "Awards": ["guid-guid", "guid-guid"], // IDs pointing to other entities
  "FullName": "Douglas Adams",          // calculated by formula
  "Photo": "file:72",                   // link information
  "Album": "",                          // library fields have no value
}
```

## The `context` Object

The `context` contain additional information about the context we're running in.

* `target` - everything about the target of the formula - the current field
  * `type` = What the function processes `Field.Value` or `Field.Setting` (Future: `Form.Variable` etc.) 
  * `name` - field name or setting-name, so `FirstName` or `Visible` - TODO: UNSURE IF THIS IS ALREADY HAPPENING
  * `value` - current value
  * `default` = default value
  * `entity`
    * `id` - the id of the entity - 0 if it's new
    * `guid` - the GUID of the entity, always provided
    * `type` - TODO
      * `id`
      * `name`
* `culture`
  * `code`
  * `name`
* `experimental` - this is for internal APIs we're testing, they are not public. You can use them, but expect the APIs to change in near future

**Future, don't implement yet**
* getSettings(...)
* getEntities(...)
* getFields(entity)
* `entities`
  * [entity]
    * `guid`
    * `id`



## Tips and Tricks

* You can always add a `console.log(data, context);` or similar in your code to see in real time what's being processed.
* You can also add a line `debugger;` and the browser will stop at this line so you can inspect the variables and watch your code.



## Working with `this` _Experimental! ⚠_

The formula is pre-compiled and executed again and again. Because of this, the `this` object will remain the same across all calls. As such, you can use it for remembering stuff - like a previous value you may need again. 



Future features

1. Ability to read other properties of fields - like check if a field is visible
1. Excel-style formula syntax using `=[Field]`
1. Ability to read other entities / check their types etc.
1. Ability to read fields of other entities


---

## History

* Introduced in 2sxc 12.01