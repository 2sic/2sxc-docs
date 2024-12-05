---
uid: JsCode.EditForm.Formulas.Context
---

<img src="~/assets/features/formulas.svg" class="feature">

# `context` Object in Formulas

The `context` contain additional information about the context we're running in.

* `app` - contains information about the current app _new 13.07_
  * `appId`
  * `zoneId`
  * `isContent`
  * `isSite`
  * `isGlobal`
* `cache` - an object which is only for this function and will be persisted across calls - use it to save temporary values
* `debug` - a true/false toggle if the form is in develop/debug mode - Use this to show/hide really advanced fields. _new in 12.02_
* `target` - everything about the target of the formula - the current field
  * `type` = What the function processes `Field.Value` or `Field.Settings` (Future: `Form.Variable` etc.)
  * `name` - field name or setting-name, so `FirstName` or `Visible`
  * `entity`
    * `id` - the id of the entity - 0 if it's new
    * `guid` - the GUID of the entity, always provided
    * `type` - entity type information
      * `guid`
      * `name`
      <!-- 2dm v16 - plan to rework metadata and prefer to not publish this API since it would probably change again -->
    <!-- * `for` - Metadata For information - a target pointer to another thing which this entity describes _new in 15.04_ -->
      <!-- * `targetType` (int) - the type of the target, eg. `CmsItem` = 10, `Entity` = 4, etc. -->
      <!-- * `guid` (string) - the guid of the target as string - if it's using a guid-key, otherwise null -->
      <!-- * `number` (int) - the number of the target, if it's using a number-key, otherwise null -->
      <!-- * `string` (string) the string of the target, if it's using a string-key, otherwise null -->
* `culture`
  * `code`
  * `name` - this will return `undefined` scenarios where no languages are activated
* `features` _new v13.10_
  * `isEnabled('FeatureName')` - will return true if this feature is enabled.  
  _Important: only admins users will know about all available features, non-admins will only have a subset marked as public._  
  <!-- 2022-12-23 removed this again, believe it's never used and adds problems to the edit-ui -->
  <!-- * `get('FeatureName')` - will return the feature object -->
* `form` _new v13.10_
  * ~~`runFormulas()`~~ (deprecated in v2) - will run all formulas in the current form. This is typically meant for use in fetch-promises after the data returned and was put in the cache _new 13.07_
* `user` _new in v13.11_
  * `email` _new v16.00_
  * `guid` _new v16.00_
  * `id` user id or `-1` if anonymous
  * `isAnonymous` - `true` if the user is not logged in
  * `isContentAdmin` _new v16.00_
  * `isSiteAdmin`
  * `isSystemAdmin`
  * `name` _new v16.00_
  * `username` _new v16.00_
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

Shortlink to here: <https://go.2sxc.org/js-fcontext>
