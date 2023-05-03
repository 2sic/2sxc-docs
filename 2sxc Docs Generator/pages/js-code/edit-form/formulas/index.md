---
uid: JsCode.EditForm.Formulas.Index
---

<img src="~/assets/features/formulas.svg" class="feature">

# Formulas JavaScript Specs

Formulas let you create JavaScript functions to calculate **Values** and **Properties** of things in the edit form.

> Learn about [the Formula concepts](xref:Basics.Edit.Formulas.Index) here.
> It also shows you the UIs, how to configure etc.
>
> Then you should continue with the [Formulas Guide 🎓](xref:JsCode.EditForm.Formulas.Guide)

## Examples

### Set Field _Value_ to _missing-data_ if empty

This formula would be applied to the fields **Value**.

```js
v2((data) => {
  return data.value ? data.value : 'missing-data';
});
```

### Set Field _Visibility_ based on another Toggle Switch

This formula would be applied to the **Setting** `Visible`.

```js
v2((data) => {
  return data.ShowAdvanced;
});
```

### Add an Emoji to a Group-Heading if inside it an important property was set

This formula would be applied to a group headings **Setting** `Name` which is the visible title:

```js
v2((data) => {
  return data.default + (data.EditInstructions || data.ListInstructions ? ' ✅' : ''); 
});
```

_Note that we're returning `data.default` and some more text, not `data.value`. This is because the value would change on each cycle, but `data.default` contains the original value._


---

## History

* Introduced in 2sxc 12.01
* Added `data.parameters` in v13.10
* Added `context.features`, `context.app`, `context.user`, `context.sxc` etc. in v13.10
