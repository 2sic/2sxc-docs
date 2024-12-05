---
uid: Api.Js.SxcJs.SxcGlobalCms
# title: $2sxc.cms - Class SxcGlobalCms
---

### The $2sxc.cms API

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>


The `$2sxc.cms` object is the core JavaScript API to perform CMS actions such as opening edit-dialogs etc. As of now (v9.30 - v13) it only has 1 command `run(...)` but will be enhanced in the future to do more.

You need this in advanced use cases. _otherwise you don't need this_. Such advanced cases are:

1. when you create custom JS buttons to start a content-management action

### How to use v12.10 and newer

2sxc 12.10 enhanced the `cms.run(params: RunParamsWithContext)` to accept an object with parameters. 
This makes it easier to reliably pass in optional parameters, and also supports the use of [Workflow Steps](xref:JsCode.Toolbars.Workflows).

👉 Learn more in the [Cms-Run Docs](xref:JsCode.Commands.Index).

---

### History

1. Introduced in 2sxc 09.30
1. Enhanced with `RunParams` in 2sxc 12.10 to support registering `workflows`
1. Enhanced the Global `run(...)` to also support `context` in addition to `tag` in v13.03

---
