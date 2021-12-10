---
uid: JsCode.2sxcApi.Sxc.Query
---

# Query Services of the Sxc Controller (WIP #v13)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

A common need in JS is to read/write data from/to the backend. 

2sxc 12 / 13 introduce new JS APIs for this. 

* `data(...)` gets a data service to read/write data 👉 [docs](xref:JsCode.2sxcApi.Sxc.Data)
* `query(...)` gets a query service to call server-side queries (this document)

_Note: You can do all what these services do using [webApi.fetch(...)](xref:JsCode.2sxcApi.Sxc.WebApi.Fetch), but this is more convenient._

## Get a Query Service

1. Get the [sxc instance controller](xref:JsCode.2sxcApi.Sxc.Index) of the current module
1. Call `query(queryName)` to get the service

Example:

```csharp
const modId = @CmsContext.Module.Id;
const sxc = $2sxc(modId);
const authorsSvc = sxc.query('BlogPosts');
authorsSvc.getAll().then(data => console.log(data));
```

## Query Service Factory Parameters

The `query(...)` factory just has one parameter: the `queryName`. 

The returned service will always perform actions for this query. 

## Query Service APIs

Query Services always return a [modern Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing data. 

A Query Service has the following commands:

* `getAll()` - no parameters, will return an object with all the streams, each containing an arrays of all the data in that stream
* `getAll(urlParams)` - same as above but with url-parameters as a string or object
* `getAll(urlParams, data)` - same as above but with post-data
* `getStream(streamName)` - Same as GetAll, just using a specific stream name to retrieve
* `getStream(streamName, urlParams)` - Same as `getStream`, just with additional url parameters
* `getStream(streamName, urlParams, data)` - Same as before, just with post-data
* `getStreams(streamName)` - Same as `getStream` but you can have multiple stream names comma-separated
* `getStreams(streamName, urlParams)` - Same as above, just with additional url parameters
* `getStreams(streamName, urlParams, data)` - Same as above, just with post-data


---
## Tutorial

👉 TODO!

---

## Demo App and further links

You should find some code examples in this demo App
* [TimeLineJS](xref:App.TimelineJs)

[!include["history"](_data-history.md)]