---
uid: JsCode.EditForm.Formulas.Context
---

<img src="~/basics/edit/formulas/assets/formulas-banner.svg" width="100%" >

# `context` Object in Formulas

The `context` contain additional information about the context we're running in.

* `app` - contains information about the current app _new 13.07_
  * `appId`
  * `zoneId`
  * `isContent`
  * `isSite`
  * `isGlobal`
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
* `features` _new v13.10_
  * `isEnabled('FeatureName')` - will return true if this feature is enabled.  
  _Important: only admins users will know about all available features, non-admins will only have a subset marked as public._  
  * `get('FeatureName')` - will return the feature object
* `form` _new v13.10_
  * `runFormulas()` - will run all formulas in the current form. This is typically meant for use in fetch-promises after the data returned and was put in the cache _new 13.07_
* `user` _new in v13.11_
  * `id`
  * `isAnonymous`
  * `isSiteAdmin`
  * `isSystemAdmin`
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


---

## History

* Introduced in 2sxc 12.01
* Added `context.features.isEnabled('FeatureName')` in v13.10
* Added `context.features.get('FeatureName')` in v13.10
* Added `context.app` in v13.10
* Added `context.user` in v13.11
* Added `context.form.runFormulas()` in v13.11

Shortlink to here: https://r.2sxc.org/js-fcontext