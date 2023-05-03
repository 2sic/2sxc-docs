---
uid: JsCode.EditForm.Formulas.TargetsReturn
---

<img src="~/assets/features/formulas.svg" class="feature">

# Formulas Targets and Return Values

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-edit-ui { visibility: visible; }
</style>

These are additional infos so you understand the behavior better.

## The Target

The target key of a formula determines what your Formula will affect.
Since `data.value` contains what would be used if your formula didn't run, then this of course will also contain the previous value of the target.
These are the possible targets:

* `Field.Value` - will get / set a value on a field
* `Field.Settings` - will get will get/set a setting of the field. This is just the Type identifier. A full key often includes the exact setting to be addressed, like
  * `Field.Settings.Name` - change the label / name / title of a field
  * `Field.Settings.Visible` - Controls the visibility of the field / group. `true` means visible
  * `Field.Settings.Disabled` - controls that the field can be interacted with or is disabled. `true` means it's blocked  
  * `Field.Settings.Required` - shows if a field is required  
        _warning_ required isn't fully implemented ATM - the form will not always reliably enforce this if it's changed dynamically
  *. `Field.Settings.Notes` to change the description / help-text (v14)
  * `Field.Settings._[Anything]_` - other Settings that can be changed, eg.
    * `Field.Settings.Collapsed` on a field-group to change if it's open/closed
    * `Field.Settings.DropdownValues` on dropdown fields (new v15)
* `Field.Validation` - show errors/warnings on a field based on the input 🆕 v16

> [!TIP]
> Remember that `data.value` contains the value which is used if the formula doesn't run or doesn't return anything.
>
> If you need the value in the field/setting at form-load, use `data.default`.
> And if you are doing some prefill-magic, you can get that on `data.prefill`.
>
> 👉 Read more about this is the [JS Docs](xref:JsCode.EditForm.Formulas.Data).


## Field Value Formulas

These are the most common formulas, as they are used to get/set the value of a field.
Each field type or property may expect a different data type. Make sure you provide that.
So if you are updating a boolean field, you should return a boolean value.


## Formulas for Common Settings


#### `Field.Settings.Name` - Label of a Field

This can be changed as needed.
We recommend that you never add `*` to the name, as this is the indicator for _required_ and would confuse users.

On field groups we often use this to add emojis such as ✅ or ❌ to indicate if the fields inside are what is needed.

Expected type: `string`


#### `Field.Settings.Visible` - Show/Hide a Field

Shows/hides a field or a group of fields.
When you set this on a group, it applies to all properties in the group.
So hiding a group hides all fields inside it, showing it shows all fields inside it.

Expected type: `boolean`


#### `Field.Settings.Disabled` - Enable/Disable a Field

If you return `true` to set `Disabled=true` it will disable the UI. Of course if the field is already not visible, the user won't see this.

> [!IMPORTANT]
> Even if you set `Disabled=false` other rules may override this. For example, if the field may not be translated and you're on a secondary language, it will still remain disabled.

> [!IMPORTANT]
> Disabling a group will not disable all the fields in it. We may consider implementing this some day, but as of now it won't happen, so you'll need to disable each field if this is what you need.

Expected type: `boolean`

#### `Field.Settings.Required` - Mark Field as Required

This determines if the Field is required.

> [!IMPORTANT]
> Changing the required changes the `*` indicator on the UI, but as of v12.01 it doesn't yet affect the validity checks in the form.
> This is an important limitation to be aware of.

Expected type: `boolean`


## Formulas for Special Settings

#### `Field.Settings.Collapsed` - for Groups

This is a setting which only would affect group fields.
Setting `Collapsed` to `true` collapses the group, to `false` opens it.

> [!TIP]
> Remember that `data.default` will always give you the initial state of this setting.

Expected type: `boolean`


#### `Field.Settings.DropdownValues` - for DropDowns


#### `Field.Settings.`_[Anything]_

Since many controls can have other settings these can be controlled by formulas as well.

_Important_ We haven't tried every setting and some may not have the expected result, since the form has never been this dynamic before.
We'll work on fixing issues as we hear about them.


## Formulas for Validation

#### `Field.Validation` - Show Errors/Warnings

This is a special kind of formula as it only affects the hints below the input field.
Best check out the tutorials to see it in action.

Expected type: json object

```js
{
  severity: 'warning',
  message: 'please use lower case only',
}
```

---

## History

* Introduced in 2sxc 12.01
* Dramatically enhanced with v2 in 2sxc 16.00
