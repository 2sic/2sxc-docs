---
uid: Basics.Edit.Logic.Index
---
# Logic and Formulas in the Edit Form (WIP)

> This is WIP for 2sxc v12 - it's not final yet

## Object in v1 function call _Draft #3_

We'll change v1 to be `v1(data, context)` and in most cases it will just be `v1(data)` to keep things much simpler. 

`data` ❤
* `value` - what used to be `value.current` and = `target.value` so it's a shorthand
* `default` - the default value of the current thing = `context.target.default`
* `[FieldName]` - just the value of the other fields
<!-- * `get(...)` - reserved - for future feature to get things like `FieldName.Setting.VisibleInEditUI` -->

Example for the _visibility_ of a field `FullName`

```js
data = {
  "value": true,                        // It's visible because a formula set
  "default": false,                     // Originally hidden till first/last were given
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



`context` - additional information about the context we're running in
* `target` - everything about the target of the formula - usually current field - rarely used
  * `type` = `Field.Value` or `Field.Setting` (Future: `Form.Variable` etc.)
  * `name` - field name or setting-name, so `FirstName` or `VisibleInEditUI`
  * `value` - current value
  * `default` = default value
* `entity`
  * `id`
  * `guid`
* `culture`
  * `code`
  * `name`
* get

**Future, don't implement yet**
* `entities`
  * [entity]
    * `guid`
    * `id`


## Keys for what can be modified (Internal)

* Value - new `Field.Value`
* Core settings
  * Visible - ATM `visible` - new `Field.Settings.VisibleInEditUI`
  * Enabled/Disabled - ATM `enabled` - new `Field.Settings.Disabled`
  * Required - atm `required` - new `Field.Settings.Required`
* Custom things (in future other things must be configurable as well)
  * _in future_ a user would be able to type `Field.Settings.DropDownValues` etc.
  * _in future_ a user would be able to type `Form.Variables.HideAdvanced` to have a function which sets something for pickup in other functions

## Initial function

This is what the user should see if he creates a new function

```
v1(data) { return data.value; }
```

The reason it should be so simple is that in 99% of all cases the data is all you need. In future we'll give them various pre-built templates like: 

```
v1(data, context) { ... }
```


## Reasoning behind these standards (WIP)

* Start with `v1(...)`
  * The function must always start with `v1` so that future enhancements which need a new signature can be created without breaking stuff people made till then
  * We could put the function type into another setting so that we could just write `(data) {...}` but that would cause problems when people post questions, because you would always have to ask which function version is being used. So writing `v1` may seem a bit less elegant, it will save us a lot of problems supporting users. 
* Write a JS function syntax `v1(...) { }`
  * In future we'll probably also support an Excel-like syntax like `=[FirstName] & " " & [LastName]`. For now we assume that the initial `=` will differentiate between the formula types
* Use simple `data` object - this is what 95% of all formulas will need, so it should be there to keep most formulas really simple.
* Offer a more complex `context` object - in rare cases you need to know more about the current situation and maybe access more data from the form. To keep the `data` simple, we must place other stuff on the `context` object.
* Possible collisions on `data` if a field is called `value` - because the `data.value` should point to the current value. Since fields are usualy pascal-case, there should almost never be a name collision (so a field called `value` or `default` in **lower case**). If such a collisions exists, people will have to rename the fields for now. In future, we'll provide all the fields and more information in the `context`.
