---
uid: JsCode.TurnOn.Index
---

<img src="~/assets/features/turn-on.svg" class="feature">

# turnOn JavaScript API

## The Problem turnOn Solves

A core problem with all JavaScript is making sure that all scripts and dependencies are loaded, available and ready, and the data needed to init is available (usually in the Html itself).

Even something as simple as this can fail...

```js
$(start);
```

...because even this example requires jQuery to already exist.

> **turnOn** solves this problem with a new architecture. Loading is now configuration based. No matter which parts load in what order, turnOn will work.

> [!TIP]
> **turnOn** is also building an architecture which will reliably work even with very [strict CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced - which we believe will be essential in future. 

👉 Check out the [](xref:Tut.TurnOn)

## Activate turnOn

To use turnOn you must must tell the page that you need it. Here's how:

```c#
var page = GetService<ToSic.Sxc.Services.IPageService>();
page.Activate("turnOn");
```

👉 Read more about the [IPageService](xref:NetCode.Razor.Services.IPageService)

## The turnOn Solution

When using turnOn, the page will request the `turnOn.js` in any way. It can also be `deferred`. Then this will be used to turn-on your code:

```html
<div turn-on='{ "await": ["window.$"], "run": "window.appContent.maps.load()", "data": "some-google-maps-key" }'>
  <!-- more html -->
</div>
```

This is what happens

1. The html will just be loaded and have no effects, throw no errors and nothing
1. Once the `turnOn.js` loads it will find this and process it - it doesn't matter if turnOn was already loaded or deferred
1. turnOn will then wait for all this to exist:
    * `window`
    * `window.$`
    * `window.appContent`
    * `window.appContent.maps`
    * `window.appContent.maps.load`
1. It will then call `window.appContent.maps.load(data)` with the data provided

Here's another example, taken from the new Content-App in 2sxc:

```html
<!-- Instruct turnOn to init this specific Map once everything is loaded -->
<turnOn turn-on='{ "run": "window.appContent.maps.configureMap()", "data": { 
  "domId": "GoogleMap-@DynamicModel.mapId", 
  "marker": "@Text.First(DynamicModel.markerImage, "")",
  "lat": @DynamicModel.mapInfo.GpsLat.ToString("R"),
  "lng": @DynamicModel.mapInfo.GpsLong.ToString("R"), 
  "zoom": @Content.Presentation.Zoom, 
  "info": "@DynamicModel.company",
  "warn": @(Settings.GoogleMapsShowWarning ? "true" : "false")
}}'></turnOn>
```

This example will init a map with the configuration of the map incl. pin-image, coordinates and more. 

## Signature of Run call

The `run` method - in the above example `...configureMap()` is as follows:

```js
public void configureMap(data)
{
  // data is the data provided in the turnOn
}
```

2sxc v14.02 includes turnOn v0.1.2, where the `run` method also has another parameter: `context`. 
The most important property is `context.tag` which is the tag which contained the configuration.
This allows you to use `$2sxc(context.tag)` to [get the Sxc of the tag](xref:JsCode.2sxcApi.GetSxc.Index).

## Advantages of Using turnOn

1. Works, no matter in what order the scripts were loaded
1. Works even if the HTML was created before or after loading the scripts
1. Works for lazy-loaded HTML which can introduce new turnOn configurations


## Responsibility of Your Code

There are a few things turnOn doesn't do, which you should be aware of:

1. It doesn't load JS or CSS files (yet). As of now, you must still do this in the HTML template.
1. The init code must still do it's work properly. If multiple inits should not be called, then your code must ensure that it detects this and skips multiple initializations.
1. Your init-code should not auto-run when loading the script, as this could again be missing dependencies.

## Examples of the Full Challenge

Common things which may be needed before the code starts:

1. The main JS code
1. Additional JS parts
1. Some JS Libraries
1. CSS
1. DOM nodes which the JS should work on
1. Configuration data like ModuleId which should be known.

Dynamic pages make this even harder - like when Oqtane/Blazor reloads just parts of the page multiple times. We must ensure that the JS isn't re-initialized again and again, as that can cause issues like:

1. The same code running in parallel - causing all sorts of damage
1. Memory leaks where the same library and complex object states are loaded many times
1. Issues where some code initialized and was then replaced by new, uninitialized code

Our goal is to simplify this, so that your solution can simply state what it needs, and then run once all that has been provided. 

1. a dom node with a specific id like `#module-57`
1. an object on the window like `window.someLibrary`
1. a js file which should be loaded if it's not loaded yet like `/js/jquery.min.js`
1. a css file like `/css/mycss.js`


---

## History

1. Added v0.1.1 in 2sxc v12.04
1. Updated to v0.1.2 in 2sxc v14.02 providing the `context` as the second parameter

## Future features

1. also await certain DOM events; ATM you can do this easily after turnOn has run it's magic, but it would be nice to specify it in the config
1. load scripts and js
