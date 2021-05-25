---
uid: Basics.Edit.Formulas.Specs
---

<img src="./assets/formulas-banner.svg" width="100%" >

# Formulas Technical Specs

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-edit-ui { visibility: visible; }
</style>

These are additional infos so you understand the behavior better. 

## The Target

The target key of a formula determines what your Formula will affect. Since `data.value` contains what would be used if your formula didn't run, then this of course will also contain the previous value of the target. 

**Target Types**

* `Field.Value` - will get / set a value on a field. This is always the full key.
* `Field.Settings` - will get will get/set a setting of the field. This is just the Type identifier. A full key often includes the exact setting to be addressed, like
    * `Field.Settings.Name` - change the label / name / title of a field
    * `Field.Settings.Visible` - Controls the visibility of the field / group. `true` means visible
    * `Field.Settings.Disabled` - controls that the field can be interacted with or is disabled. `true` means it's blocked  
    * `Field.Settings.Required` - shows if a field is required  
        _warning_ required isn't fully implemented ATM - the form will not always reliably enforce this if it's changed dynamically
    * `Field.Settings.`_[Anything]_ - other Settings that can be changed. We have only tested `Collapsed` as of v12.01

> [!TIP]
> Remember that `data.value` contains the value which would be used if the formula didn't run. 
>
> If you need the value in the field/setting at form-load, use `data.default`. 
> And if you are doing some prefill-magic, you can get that on `data.prefill`. 
>
> 👉 Read more about this is the [JS Docs](xref:JsCode.EditForm.Formulas.Index).

## Formulas for General Settings


#### `Field.Settings.Name` - Label of a Field

This can be changed as needed. We recommend that you don't add `*` to the name, as this is the default indicator for required and would confuse users. 

#### `Field.Settings.Visible` - Show/Hide a Field

When you set this on a group, it applies to all properties in the group. So hiding a group hides all fields inside it, showing it shows all fields inside it. 

#### `Field.Settings.Disabled` - Enable/Disable a Field

If you return `true` to set `Disabled=true` it will disable the UI. Of course if the field is already not visible, the user won't see this. 

> [!IMPORTANT]
> Even if you set `Disabled=false` other rules may override this. For example, if the field may not be translated and you're on a secondary language, it will still remain disabled.

> [!IMPORTANT]
> Disabling a group will not disable all the fields in it. We may consider implementing this some day, but as of now it won't happen, so you'll need to disable each field if this is what you need. 

#### `Field.Settings.Required` - Mark Field as Required

This determines if the Field is required. 

> [!IMPORTANT]
> Changing the required changes the `*` indicator on the UI, but as of v12.01 it doesn't yet affect the validity checks in the form. This is an important limitation to be aware of. 

## Formulas for Other Settings

#### `Field.Settings.Collapsed` - for Groups

This is a setting which only would affect group fields. Setting `Collapsed` to `true` collapses the group, to `false` opens it. 

> [!TIP]
> Remember that `data.default` will always give you the initial state of this setting.


#### `Field.Settings.`_[Anything]_

Since many controls can have other settings these can be controlled by formulas as well. 

_Important_ We haven't tried every setting and some may not have the expected result, since the form has never been this dynamic before. We'll work on fixing issues as we hear about them. 




## Formula Lifecycle (WIP)

#### When do Formulas Run?

As of now, they run whenever any data changes in the form. This can mean that they run multiple times because if formulas depend on each other, there may be a few cycles till all values stabilize. 

In future we'll probably provide more settings to control how often they run. 

#### Missing Context Information

As of now the formulas always run on every change detection. The following information is currently _not_ yet given to the formula:

* What phase of the lifecycle the formula is on (init, pre-render, etc.)
* Events which happened before
* Run-count

We'll consider how to handle this best, but for now, you simply don't have the information in your formula.

#### Can Formulas be Disabled?

Stored Formulas can be disabled with a toggle.

But you cannot disable Formulas at runtime (like using another value to control that). Even Formulas whose result is discarded are still run. This is not a final decision but as of now it's just how it works. If you need to conditionally run your formula, just put the condition into the formula itself. 

#### Running Formulas on Specific Events (WIP)

This is not yet possible. 



## Reasoning behind these standards (WIP)

* Start with `v1(...)`
  * The function must always start with `v1` so that future enhancements which need a new signature can be created without breaking stuff people made till then
  * We could put the function type into another setting so that we could just write `(data) {...}` but that would cause problems when people post questions, because you would always have to ask which function version is being used. So writing `v1` may seem a bit less elegant, it will save us a lot of problems supporting users. 
* Write a JS function syntax `v1(...) { }`
  * In future we'll probably also support an Excel-like syntax like `=[FirstName] & " " & [LastName]`. For now we assume that the initial `=` will differentiate between the formula types
* Use simple `data` object - this is what 95% of all formulas will need, so it should be there to keep most formulas really simple.
* Offer a more complex `context` object - in rare cases you need to know more about the current situation and maybe access more data from the form. To keep the `data` simple, we must place other stuff on the `context` object.
* Possible collisions on `data` if a field is called `value` - because the `data.value` should point to the current value. Since fields are usualy pascal-case, there should almost never be a name collision (so a field called `value` or `default` in **lower case**). If such a collisions exists, people will have to rename the fields for now. In future, we'll provide all the fields and more information in the `context`.


---

## History

* Introduced in 2sxc 12.01