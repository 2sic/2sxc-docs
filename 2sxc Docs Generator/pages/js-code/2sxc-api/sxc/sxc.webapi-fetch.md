---
uid: JsCode.2sxcApi.Sxc.WebApi.Fetch
---

# The WebApi Helpers on the Sxc Controller using Fetch

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

Modern browsers all support `fetch` and this is now the preferred way to get data. 

2sxc 13 introduce new JS APIs for this. 

_Note: If you want to use other AJAX libraries, check out the [Bare Metal APIs](xref:JsCode.2sxcApi.Sxc.WebApi.BareMetal)._

## Simple APIs

The simple APIs perform a browser `fetch` and return a promise. This is very similar to jQuery. 

* `webApi.fetchRaw(...)` performs a basic [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and returns a standard promise containing a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object
* `webApi.fetchJson(...)` performs a `fetch` and returs a promise containing an object which came from JSON **recommended**

## Parameters

All of these methods can be called with just 1 parameter, the `url`. But for more control, you can have these parameters: 

1. `url` - short api url like `controller/method?params` or other variations (see below)
2. `data` - optional POST data, empty by default. Can be a string or an object. If it's an object, it will auto-convert to JSON
3. `method` - optional method name, default is `GET`, unless you specify data, in which case it defaults to `POST`

## Url

The url can be any one of these:

1. Api URL pointing to a WebAPI of the app - short like `controller/method` or long like `app/auto/controller/method`
1. Query url with a query name like `app/auto/query/queryName`
1. Data url pointing to the data like `app/auto/data/contentType`

These can also have parameters like `controller/method?id=27` or `app/auto/data/contentType/574` depending on what the endpoint expects. 

## Helper for URLs with Parameters _v13_

2sxc 13 enhances the `webApi.url(...)` function to build a url using a parameters object. 
So you can do either one of these examples:

```js
var webApi = $2sxc(moduleId).webApi;

var jsonPromise1 = webApi.fetchJson('blog/rss?category=17');

var jsonPromise2 = webApi.fetchJson(webApi.url('blog/rss', { category: 17 }));
```

---
## Tutorial

👉 We've updated the simple [web api tutorials](https://2sxc.org/dnn-tutorials/en/razor/webapi110/page) to demo this

---

## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)

[!include["history"](_webapi-history.md)]