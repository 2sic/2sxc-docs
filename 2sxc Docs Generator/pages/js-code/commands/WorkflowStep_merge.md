---
uid: Api.Js.SxcJs.WorkflowStep
---

### WorkflowStep

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .interact-2sxc { visibility: visible; } </style>


The workflow step contains

1. a `command` for which it will trigger
    1. see the [Commands List](xref:JsCode.Commands.Index)
    1. There is also a special command called `refresh` which isn't a normal command used on a button, but an internal command called when refreshing the page through reload or ajax. This too can be handled and cancelled
1. a `phase` (before/after) - possible `phase` values: `before`, `after`, `all`
1. a `code` what is to be done

See also: [](xref:JsCode.2sxcApi.Cms.CommandWorkflows)

### History

1. Introduced in 2sxc 11.12
1. Enhanced so it also works on inline toolbars in v12.10

---
