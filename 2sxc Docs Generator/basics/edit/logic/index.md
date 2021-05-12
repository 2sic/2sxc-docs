---
uid: Basics.Edit.Logic.Index
---
# Logic and Formulas in the Edit Form (WIP)

> This is WIP for 2sxc v12 - it's not final yet

## Object in v1 function call 

This object has the following properties

### Draft 2 2021-05-11 (will be changed to next draft below)
`context`

* `value`
  * `current` - ❤
  * `default`
* `field`
  * `name`
  * `type`
  * `value`
* `fields`
  * `FieldName`
    * `name` - rarely needed
    * `value` - ❤
    * `type` - rarely needed
* `culture`
  * `code`
  * `name`
* `entity`
  * `guid`
  * `id`

### Draft 3

We'll change v1 to be `v1(data, context)` and in most cases it will just be `v1(data)` to keep things much simpler. 

OR `(data) { return data.value; }` ? and put the version in another field

`data` ❤
* `value` - what used to be `value.current` and = `target.value` so it's a shorthand
* `default` - the default value of the current thing = `context.target.default`
* `[FieldName]` - just the value of the other fields
<!-- * `get(...)` - reserved - for future feature to get things like `FieldName.Setting.VisibleInEditUI` -->

_Since fields are usualy pascal-case, there should almost never be a name collision (so a field called `value` or `default` in lower case). If such a collinios exists, people will have to rename the fields to work or differentiate in the `context` - because it's much simpler like this_


`context` - additional information about the context we're running in
* `target` - everything about the target of the formula - usually current field - rarely used
  * `type` = `Field.Value` or `Field.Setting` (Future: `Form.Variable` etc.)
  * `name` - field name or setting-name, so `FirstName` or `VisibleInEditUI`
  * `value` - current value
  * `default` = default value
* `culture`
  * `code`
  * `name`

**Future, don't implement yet**
* `entity`
  * `guid`
  * `id`
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