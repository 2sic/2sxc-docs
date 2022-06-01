---
uid: JsCode.TurnOn.Specs
---

<img src="~/assets/features/turn-on.svg" width="100%">

# turnOn JavaScript API Specs (WIP!)

The configuration is always a JSON. The simplest possible **turnOn** would be this:

```html
<em turn-on='{ "run": "window.startSomething()" }'></em>
```

Longer name segments are automatically checked one by one, so this will also work reliably:

```html
<em turn-on='{ "run": "window.appGallery.master.start()" }'></em>
```

Very often you'll then want to include data - either an identifier, a string or object:

```html
<em turn-on='{ "run": "window.startMeaningOfLife()", "data": "42" }'></em>

<em turn-on='{ "run": "window.startMeaningOfLife()", "data": { "answer": "42", "question": null }'></em>
```

In addition you can also specify one or more objects to wait for:

```html
<em turn-on='{ "await": ["window.$", "window.fancybox"], "run": "window.appGallery.master.start()" }'></em>
```

You can also wait for a ready-check to exist and for it to return true:

```html
<em turn-on='{ "await": ["window.appGallery.isReady()"], "run": "window.appGallery.master.start()" }'></em>
```

## turnOn JSON Schema

These are the properties you can set

| Property      | Type              | Comments |
| ------------- | ----------------- | -------------------------------------------------- |
| `await`       | `string[]`        | Strings can be objects on window or functions to call for finding out if it's ready.
| `run` (req.)  | `string`          | The function to call once it exists
| `data`        | `any`             | data to give the run-command
| `debug`       | `boolean`         | will console-log what it's doing

## More on the `await` Property

This is always a string array. As of v0.1 all values...

* must begin with `window`
* can end with just a name like `window.something` or with `()` like `window.something()`
* can have a much longer name like `window.myTopic.mySubtopic.ready`
* if it ends with `()` then it will be called repeatedly until it returns `true`
* experimental: if the node returns a promise object, will wait for that to complete (not fully tested)


## More on the `run` Property

* must begin with `window`
* can have a short name like `window.ready()` or a long name like `window.myTopic.mySubtopic.ready()`
* must end with `()`
* the run can be an isolated function or part of a larger object. It will preserve the `this` if it's part of a larger object

## Debug turnOn

In some cases you may not get what you expect and need to debug what you're doing. There are two options:

* To debug a specific turnOn just add the `"debug": true` to the JSON
* To debug everything in turnOn, set `window.debugTurnOn = true;` anywhere on the page. _this will flood your console_

## Common Problems

The most common cause of issues is an invalid JSON. You'll get errors in the console if you do this. 
This is especially common if you add dynamic data from the CMS to the object, as it could contain `"` characters which break the json. 

Another common problem is converting boolean C# values to inject into the JSON. Here's why:

```html
<!-- this will fail -->
<span turn-on='{ "run": "window.load()", "data": { "show": Settings.Show }}'></span>

<!-- will produce this -->
<span turn-on='{ "run": "window.load()", "data": { "show": True }}'></span>

<!-- this will work -->
<span turn-on='{ "run": "window.load()", "data": { "show": @(Settings.Show ? "true" : "false") }}'></span>

<!-- will produce this -->
<span turn-on='{ "run": "window.load()", "data": { "show": true }}'></span>
```

## Allowed HTML Tags

Any valid HTML tag can be used, incl. existing `div` or `span` tags which just get a `turn-on` attribute added. So you can use `<em>`, `<div>`, `<span>` or even `<turnOn>`

There are a few cases where problems could arise though:

1. If you use a `<script>` tag, this may not work as expected, as additional processing layers may do something with these script tags. This is especially important in Oqtane, as there the script tags are filtered out and treated separately. 
1. If you use a tag which you will later modify in HTML (like using jQuery or Angular) this may fail, because **turnOn** will make status-updates to the tag and this could interfere with your code doing updates as well. 




---

## History

1. Introduced on 2sxc 12.02

## Future features

1. Get await-functions to preserve the `this` scope
1. also await certain DOM events; ATM you can do this easily after turnOn has run it's magic, but it would be nice to specify it in the config
1. load scripts and js
