---
uid: Api.Js.SxcJs.SxcGlobalHttp
---

### The $2sxc.http Api

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>

The `$2sxc.http` object contains information for doing custom API calls.

> [!TIP]
> In most cases you won't use this, but instead get the Sxc object for the current instance
> and use either the data, query or webApi service.

Internally this information is automatically retrieved from the html-header. 
The environment looks for a special meta-tag called `_jsApi` which contains all this information. 

> [!NOTE]
> Internally all these commands need the [env](xref:Api.Js.SxcJs.SxcGlobalEnvironment) to be ready. 
> This means that the entire html `<head>` tag was processed by the browser. 
> A very safe way to do this is to run your code on-document-ready, 
> or just to ensure that whatever bootstraps your application runs inside the `<body>` tag. 

The `http` also has some internal methods which are not documented here.

### History

1. Introduced in 2sxc 10.25

---
