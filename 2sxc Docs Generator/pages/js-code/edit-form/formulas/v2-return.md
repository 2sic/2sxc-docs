---
uid: JsCode.EditForm.Formulas.V2Return
---

<img src="~/assets/features/formulas.svg" class="feature">

# Formulas JavaScript V2 Return Values 🆕 v16

In v2, the return values of a formula are more flexible and powerful.
This should help you understand the possible return values and how to use them.

## Return Values on v2

You can return the same data as you did in v1 but we now have more options:

1. return the value which should be used, like `return true;` or `return data.value;` (same as v1)

1. return a special `FormulaResult`-object (specs below) like `return { value: true, stop: true };`

1. return a promise which will resolve to one of the above

1. return a special validation object (specs below)

For the next part of the documentation, we'll refer to the value to be used as the **Value** and if a special object is returned, we'll call it the **FormulaResult**.

## Returning _Simple_ Values

The returned value is either a simple value returned directly using `return '...';` or the `value` property of the **FormulaResult** object.

Each field type or property may expect a different data type. Make sure you provide that.
So if you are updating a boolean field, you should return a boolean value.

> [!WARNING]
> If you return nothing, `undefined` or the wrong data type, the result will be ignored and the value/setting will not be changed.

Common Mistakes

* returning nothing with `return;` - this will be regarded as an error and be ignored.
* returning `undefined`.
* Returning a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) instead of a real `true` or `false` for a boolean value
* returning a date with the wrong timezone - see [returning dates](xref:JsCode.EditForm.Formulas.ReturnDate)

## Returning FormulaResult Object

For advanced features, the formula must be able to return multiple values, which is why we have the **FormulaResult** object.
It has the following properties - all of which are _optional_:

* `value` - the value to be used as the result of the formula
* `stop` - if true, the formula will stop and not execute any other formulas
* `promise` - a promise to run - eg. in scenarios where we returned a value for now, and a promise for later
* `fields` - an array of fields to be set, each with a `name` and `value` property

Example

```js
return {
  value: 'new value',
  stop: true,
  fields: [
    { name: 'Field1', value: 'new value 1' },
    { name: 'Field2', value: 'new value 2' },
  ]
};
```

## Returning a Promise

This is a highlight in v2.
Any formula can now return a promise, or a **FormulaResult** object with a `promise` property.

The promise itself can then return a value or a **FormulaResult** object.

> [!TIP]
> When a promise is returned, it behaves as if `stop` was set to true.
> So returned promises deactivate the formula to not run again.
>
> If your code is more sophisticated and needs to run again,
> then the promise should also return something like `{ value: 'new value', stop: false }`.


## Returning Validation Information

Field Validations are errors/warnings about the contents of the field.
The purpose is to do very special validations,
or to show a warning for values which could be ok, but are not recommended.

A validation object return looks like this:

```js
{
  value: {
    severity: 'warning',
    message: 'please use lower case only',
  }
}
```

Since the this kind of _return value_ is an object, in can easily be confused with a **FormulaResult** object.
So to return this object, it _must_ be wrapped in a **FormulaResult** object like this:

```js
return {
  value: {
    severity: 'warning',
    message: 'please use lower case only',
  }
};
```

You can see an example of this in the [tutorial](xref:Tut.Formulas).


---

## History

* Introduced in 2sxc 12.01
* Massively improved in v2 in 2sxc 16.00
