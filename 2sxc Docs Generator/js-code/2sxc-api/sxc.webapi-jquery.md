---
uid: JsCode.2sxcApi.Sxc.WebApi.jQuery
---

# The WebApi Helpers on the Sxc Controller using JQuery

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

2sxc originally used jQuery and the JS API still has commands which do jQuery AJAX calls. On the `webApi` object they are

* `webApi.delete(...)` for HTTP DELETE calls
* `webApi.get(...)`  for HTTP GET calls
* `webApi.post(...)`  for HTTP POST calls
* `webApi.put(...)`  for HTTP PUT calls
* `webApi.request(...)` for any other HTTP calls

> [!IMPORTANT]
> As of 2sxc 12.10 we don't recommend using this any more.
> It will only work if the page also has jQuery enabled either using 
> `pageService.Activate("jQuery");` (see [IPageService](xref:todo))
> or because something else already loads it.
> 
> From now on we strongly suggest you use `fetch` which is supported by all modern browsers. 

> [!TIP]
> To find out how to get the module sxc-object using $2sxc, check out [](xref:JsCode.2sxcApi.Sxc.WebApi)

## Example

Here's a simple example (assuming you have the $2sxc manager):

```HTML
<a onclick="$2sxc(this).webApi.get('app/auto/content/Category').then(handleResult);">
    get all Categories 
</a>
```

The code above shows

1. how the sxc-object is retrieved using the `$2sxc(...)` manager, based on the current context `this`
2. how all items of type "Category" are requested
3. how the result (promise) is passed on to `handleResults` for updating the view etc.

Here's another quick example, calling a C# web-api endpoint: 

```JavaScript
var sxc = $2sxc(27);
sxc.webApi.post("Form/ProcessForm")
    .success(function(result) {
        // ....
    });
```

## Working with REST / HTTP Async Stuff

Short note: these WebAPIs work using jQuery promises (_not_ JavaScript promises), supporting `.then(...)`, `.error(...)` etc.

The $2sxc(...).webApi has 4 **jQuery** commands

* `.webApi.get(url, ...)` 
* `.webApi.post(url, ...)`
* `.webApi.delete(url, ...)`
* `.webApi.put(url, ...)`

Each of these has the following parameters

1. `url` or `settings` _required_ string|object: a Url for the end-point OR a `{ ... }` settings object  
2. `params` _optional_ object: the url params like `{ id: 27, name: "hello" }`
3. `data` _optional_ object: the data - in case of post / put, like `{ ... }`
4. `preventAutoFail` _optional_ bool: if true, won't automatically show a default message on error, so that you can handle errors differently

Quick examples:

```JavaScript
var sxc = $2sxc(27);
sxc.webApi.post("Form/ProcessForm", {}, data, true)
    .success(function() {
        // ....
    })
    .error(function() {
        // ...
    });
```

This will call the C# WebApi controller `FormController` in the `api` folder and go for its `ProcessForm` command. It will use no url-params, but put a `data` object in the body (as json), and will do error-handling itself. 

_Till we find time to document more, please consult the [source][source]_

## Using App-Queries with $2sxc  (TODO)










Todo: must document more about this

In short: 

1. use `$2sxc(...).webApi.get(...)` or `$2sxc(...).webApi.post(...)` etc.
2. for the path-parameter, use a path starting with `app/auto/query/[queryname]` - 2sxc will take care of all the path resolutions if the path starts with `app/auto/query/` 

_Till we find time to document more, please consult the [source][source]_


## Working with Custom C# App WebAPIs (TODO)
TODO - must document more about what the web-apis are (link to more documentation)

In short: 

1. use `$2sxc(...).webApi.get(...)` or `$2sxc(...).webApi.post(...)` etc.
2. for the path-parameter, use a path starting with `app/auto/api/[controller]/[action]` - 2sxc will take care of all the path resolutions if the path starts with `app/auto/api/` 

You can read more about the [C# WebApi Server Side](xref:NetCode.WebApi.Index)

Short note: the WebAPIs work like classic javascript promises. So not like the data.on(event) implementation which is a bit special, this is very standard jQuery promise. 

_Till we find time to document more, please consult the [source][source]_








## Technical Features Explained
todo





## Additional Properties of a Module Controller

TODO - must document more about properties like

1. isLoaded, lastRefresh, etc.
2. that these are all internal-use and not guaranteed to stay stable in future versions

_Till we find time to document more, please consult the [source][source]_




## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)
* all the JS-apps including AngularJS in the [app-catalog](xref:AppsCatalog)

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)

## History

1. Introduced in 2sxc 04.00

[source]: https://github.com/2sic/2sxc-ui/blob/master/src/js-api/2sxc.api/2sxc.api.js
