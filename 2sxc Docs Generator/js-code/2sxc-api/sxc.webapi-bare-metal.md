---
uid: JsCode.2sxcApi.Sxc.WebApi.BareMetal
---

# The WebApi Helpers on the Sxc Controller - Bare Metal (WIP #v13)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

In most cases you will want to use the new [fetch](xref:JsCode.2sxcApi.Sxc.WebApi.Fetch) APIs in 2sxc 12.10+. 

But there are cases where you want to create your own calls using 
[Axios](https://axios-http.com/docs/intro), 
[jQuery](https://jquery.com/),  
[SuperAgent](https://visionmedia.github.io/superagent/),
[Angular HttpClient](https://angular.io/guide/http)
or whatever API system you want. 

In these cases, you just need some help to...

1. Get the correct URL for the endpoint
2. Probably get all the headers you need for the security tokens

This is what the **Bare Metal** APIs are for.

## Bare Metal APIs

These APIs get you things you need to construct your own `fetch`, `Request`, XHR `XMLHttpRequest` or any of the above framework are these:

* `webApi.url(url, params?)`
* `webApi.headers(verb?)`

## webApi.url(...)

This method will extend short API / Content / Query URLs for you. This means it will handle URLs like this:

1. Simple api-urls like `controller/method` or `controller/method?params` will be converted to the full API needed





TODO: this all isn't right yet


## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)
* all the JS-apps including AngularJS in the [app-catalog](xref:AppsCatalog)

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)

## History

1. Introduced in 2sxc 04.00

[source]: https://github.com/2sic/2sxc-ui/blob/master/src/js-api/2sxc.api/2sxc.api.js
