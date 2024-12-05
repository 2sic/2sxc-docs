---
uid: JsCode.2sxcApi.Sxc.WebApi.BareMetal
---

# The WebApi Helpers on the Sxc Controller - Bare Metal

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
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
1. Longer API urls like `app/auto/controller/method` will also be converted to the full url
1. Parameters in the object `params` will be added as `?...=...` _v12.11+_


## webApi.headers(verb?)

This will get you an object containing all the headers you need for a common WebAPI request. It includes things like:

1. `ModuleId` and `PageId`
1. Security headers/tokens
1. Encoding headers - this will vary based on the optional verb you pass in

If you don't specify a verb, `GET` is assumed, so it will only have encoding-headers for the response. 

[!include["history"](_webapi-history.md)]