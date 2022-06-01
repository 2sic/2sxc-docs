---
uid: JsCode.EditForm.Formulas.Index
---

<img src="~/pages/basics/edit/formulas/assets/formulas-banner.svg" width="100%" >

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

## The `data` and `context` Objects

👉🏼 See [data](xref:JsCode.EditForm.Formulas.Data)

👉🏼 See [context](xref:JsCode.EditForm.Formulas.Context)







## Tips and Tricks

1. You can always add a `console.log(data, context);` or similar in your code to see in real time what's being processed.
1. You can also add a line `debugger;` and the browser will stop at this line so you can inspect the variables and watch your code.
1. For now, we strongly recommend to use Formulas as [pure functions](https://en.wikipedia.org/wiki/Pure_function), but with experience the recommendation may change. 


## Future features

1. Ability to read other properties of fields - like check if a field is visible
1. Excel-style formula syntax using `=[Field]`
1. Ability to read other entities / check their types etc.
1. Ability to read fields of other entities


* getSettings(...)
* getEntities(...)
* getFields(entity)
* `entities`
  * [entity]
    * `guid`
    * `id`

---

## History

* Introduced in 2sxc 12.01
* Added `data.parameters` in v13.10
* Added `context.features`, `context.app`, `context.user`, `context.sxc` etc. in v13.10
