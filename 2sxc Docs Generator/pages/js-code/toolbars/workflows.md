---
uid: JsCode.Toolbars.Workflows
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Workflows

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

2sxc Toolbars do a lot of things automatically, but in some cases you want to...

* ... prevent certain actions/commands under certain conditions (like no edit if something on the page isn't as expected)
* ... do a custom page / data refresh instead of the default

This can be done using **Toolbar Workflows**. It's especially useful in SPA applications (think React, Angular and custom SPAs) which don't want a page reload. 

## Demo

👉 Here's a live demo with source of the [2sxc Toolbar Workflow](https://2sxc.org/dnn-tutorials/en/razor/ui130/page)

```razor
<div id='tagWithToolbar1' @Edit.TagToolbar(
  toolbar: new [] { "toolbar=empty", "+new?contentType=UiEmptyHelloWorld" },
  settings: new { hover = "left", show = "always" } )>
  Float over this box to get a (+) button. 
  When you click it and close the dialog again, the page will <em>not refresh</em>. <br>
  Instead, you'll see console messages that a custom JS took over the process.
</div>
```

```javascript
  // This workflow definition will run on every action, just to log what's happening
  const workflowToLog = {
    command: 'all',   // Run on every command/action
    phase: 'all',     // Run before and after
    code: (wfArgs) => {
      console.log("Toolbar asked to to something - here are the details.", wfArgs);
    }
  }

  // This is the workflow definition we will register to stop page refresh
  const workflowToDisableRefresh = {
    command: 'refresh',   // The command name it's for
    phase: 'before',      // The workflow-step should run before the command is executed
    code: (wfArgs) => {   // The code which should be run
      console.log('Asked to refresh, will return false to stop it. These are the arguments we got.', wfArgs);
      return false;       // Return false to stop this command from happening
    }
  };

  // Attach event-listener to the TagToolbar parent, so we can register the workflow when the toolbar is created
  var parent = document.getElementById('tagWithToolbar1');
  parent.addEventListener('toolbar-init', (initEvent) => {
    console.log("Workflow Demo: Tag Toolbar was initialized - event kicked in - will now register");
    const workflow = initEvent.detail.workflow;

    workflow.add(workflowToLog);
    workflow.add(workflowToDisableRefresh);

    // Stop the event here, otherwise parent elements which have an event listener would get triggered as well
    initEvent.stopPropagation();
  });
```

## How Workflows Work

👉 Learn more about [Workflows](xref:JsCode.2sxcApi.Cms.CommandWorkflows)

## How Toolbars Register the Workflows

Each toolbar can have different workflows attached. 
The toolbars are generated on-the-fly and sometimes re-generated on partial reloading.
So you must register your workflow-steps when the toolbar reports that it's ready. 
So this is the flow of logic:

1. A toolbar is created - often on mouse-over
1. It will fire a `toolbar-init` event contains a lot of internal information on the `event.details` and also a `workflow` object which is the **Workflow Manager** for this toolbar. 
1. Your code will pick up the `event.details.workflow` and then
    1. `add(...)` a workflow step - see [Workflow Step Object](xref:JsCode.2sxcApi.Cms.CommandWorkflows)
    1. probably call `event.stopPropagation()` or similar to prevent other event listeners from also adding stuff. 
This is especially important if you have entities within entities, in which case there may be listeners for each toolbar at various DOM levels. 

👉 Learn more about [Workflows](xref:JsCode.2sxcApi.Cms.CommandWorkflows)

* TagToolbar workflows created using `@Edit.TagToolbar(...)` should attach the init-listener to that tag
* Toolbar workflows created using `@Edit.Toolbar(...)` should attach the init-listener to a parent tag

## Angular Implementation

In `dnn-sxc-angular` there is a directive for toolbars, which hides all this and just allows you to do a custom `refresh` as you need it. 
See [](xref:JsCode.Angular.DnnSxcAngular.Toolbars)

## React Implementation

As of now, there is no pre-built React implementation, but you can easily create your own based on the angular version.


## Demo App and further links

You should find some code examples in this demo App

* Demo of the [2sxc Toolbar Workflow](https://2sxc.org/dnn-tutorials/en/razor/ui130/page)

## History

1. Introduced in 2sxc v11.12
1. Enhanced so it also works on inline toolbars (`Edit.Toolbar(...)`) in 12.10
