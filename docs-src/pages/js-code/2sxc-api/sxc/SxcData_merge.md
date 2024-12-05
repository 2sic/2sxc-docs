---
uid: Api.Js.SxcJs.SxcData
---

### `sxc.data` Services of the Sxc Instance

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

A common need in JS is to read/write data from/to the backend. 

2sxc 13 introduce new JS APIs for this. 

* `data(...)` gets a data service to get one or many items of the same type, and also create/update data (this document)
* `query(...)` gets a query service to call server-side queries 👉 [docs](xref:Api.Js.SxcJs.SxcQuery)

_Note: You can do all what these services do using [webApi.fetchJson(...)](xref:JsCode.2sxcApi.Sxc.WebApi.Fetch), but this is more convenient._

> [!TIP]
> You may sometimes find old code which does something like `data.on(...)` or `data.sourceUrl` - this is obsolete and will not work any more.

👉 Check out the [](xref:Tut.JsData)

> [!TIP]
> The data format is described here: [](xref:Basics.DataFormats.Json.WebApi.Index)

### Get a Data Service

1. Get the [Sxc Instance](xref:JsCode.2sxcApi.Sxc.Index) of the current module
1. Call `.data(contentTypeName)` to get the service

Example:

```js
const modId = @CmsContext.Module.Id;
const sxc = $2sxc(modId);
const authorsSvc = sxc.data('Authors');
authorsSvc.getAll().then(authors => console.log(authors));
```

### Data Service Factory Parameters

The `data(...)` factory just has one parameter: the `contentTypeName`. 

The returned service will always perform actions for this content-type. 

### Data Service APIs

Data Services always return a [modern Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing data. 

A Data Service has the following commands:

* `getAll()` - no parameters, will return an array of all items of this content-type
* `getOne(id)` - `id` is an int - will return a single item of this content-type
* `create(objectWithValues)` - `objectWithValues` is a JS object with keys/values - will create the item and return it
* `create(objectWithValues, metadataFor)` - `metadataFor` creates an item as metadata for something
* `delete(id)` WIP
* `delete(guid)` WIP
* `update(id, objectWithValues)` - performs an update on the targeted item and returns the item. Note that objectWithValues can also just have a few properties, all others will be left as is.


### Create Metadata

When using `create(..., ...)` with two parameters you are creating metadata. The signature of the address-object is 

1. Either a string containing a GUID to an entity (the most common case) - like `31f509f1-e553-4371-bf60-3d5e98937b79`
1. Or a full target identifier with TargetType and the ID as String, Number or Guid - see [](xref:Basics.DataFormats.Json.WebApi.Index)

---
### Tutorial

👉 [](xref:Tut.JsData)


[!include["history"](_data-history.md)]