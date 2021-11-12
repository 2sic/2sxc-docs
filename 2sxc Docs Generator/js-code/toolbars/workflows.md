---
uid: JsCode.Toolbars.Workflows
---

# Toolbar Workflows

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

2sxc Toolbars do a lot of things automatically, but in some cases you want to...

* ... prevent certain actions/commands under certain conditions (like no edit if something on the page isn't as expected)
* ... do a custom page / data refresh instead of the default

This can be done using **Toolbar Workflows**. It's especially useful in SPA applications (think React, Angular and custom SPAs) which don't want a page reload. 

## Demo

👉 We don't have enough time to document everything - here's a live demo with source of the [2sxc Toolbar Workflow](https://2sxc.org/dnn-tutorials/en/razor/ui130/page).

## How Toolbar Workflows Work

Each toolbar can have different workflows attached. 
Since the toolbars are generated on-the-fly and sometimes re-generated on partial reloading, you must register your workflow-steps when the toolbar reports that it's ready. So this is the flow of logic:

1. A toolbar is created - often on mouse-over
1. It will fire a `toolbar-init` event contains a lot of internal information on the `event.details` and also a `workflow` object which is the **Workflow Manager** for this toolbar. 
1. Your code will pick up the `event.details.workflow` and then
    1. `add(...)` a workflow step
    1. probably call `event.stopPropagation()` or similar to prevent other event listeners from also adding stuff. 
This is especially important if you have entities within entities, in which case there may be listeners for each toolbar at various DOM levels. 
1. The workflow step contains a `command` for which it will trigger, a `phase` (before/after) and a `code` what is to be done
1. If your code is triggered, it will receive a `wfArgs` object containing a lot of internal stuff, workflow information and more
1. If your code returns false, the workflow will stop - this can prevent the dialog from openening and the page from refreshing

## Specs

1. Possible `command` values - see the [Commands List](xref:JsCode.Commands.Index). 
1. There is also a special command called `refresh` which isn't a normal command used on a button, but an internal command called when refreshing the page through reload or ajax. This too can be handled and cancelled. 
1. Possible `phase` values: `before`, `after`, `all`

## Angular Implementation

In `dnn-sxc-angular` there is a directive for toolbars, which hides all this and just allows you to do a custom `refresh` as you need it. 
See [](xref:JsCode.Angular.DnnSxcAngular.Toolbars)

## React Implementation

As of now, there is no pre-built React implementation, but you can easily create your own based on the angular version.

## Limitations

* Toolbar workflows are only available for tag-toolbars created using `@Edit.TagToolbar(...)` or the JS equivalent
* For toolbars which always show using `@Edit.Toolbar(...)` there is currently no way to register a workflow. If you need this, please contact us.
* For custom actions using `$2sxc.cms.run(target, command, ...)` there is currently no way to register a workflow. Normally any before would be handled by your code anyhow, and the `run()` returns a promise which you can cancel to avoid refresh. 


## Demo App and further links

You should find some code examples in this demo App

* Demo of the [2sxc Toolbar Workflow](https://2sxc.org/dnn-tutorials/en/razor/ui130/page)

## History

1. Introduced in 2sxc v11.12

