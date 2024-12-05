---
uid: Basics.Edit.Formulas.Index
---

<img src="~/assets/features/formulas.svg" class="feature">

# Formulas (Logic) in the Edit Form

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-edit-ui { visibility: visible; }
</style>

2sxc provides _Formulas_ which let you dynamically change all kind of things in the edit UI. With it you can dynamically change

1. the **value** of the field
1. Field settings like
    1. `Visibility` to show/hide a field
    1. `Disabled` to enable/disable a field
    1. `Required` to change required or not
    1. `Name` to change the label
    1. ...and many other settings
1. Field validation messages

## Demo

<img src="./assets/formulas-demo.gif" width="100%" />

## Get Started

Formulas ar written in JavaScript.

🎓 Get Started with the [Formulas Guide](xref:JsCode.EditForm.Formulas.Guide)

## Planned Future features

1. Ability to read other properties of fields - like check if a field is visible
1. Ability to read other entities / check their types etc.
1. Ability to read fields of other entities

---

## History

* Introduced in 2sxc 12.01
* Extended with `Required` ca. v13.00
* Extended with `Notes` ca. v13.10
* Improve formula designer to allow creating new formulas directly in the designer ca. v14.00
* Added formula designer API help ca. v14.00
* Massively improved v2 Formulas in 2sxc 15.07 (officially released in 16.0)

Shortlink to here: <https://go.2sxc.org/formulas>
