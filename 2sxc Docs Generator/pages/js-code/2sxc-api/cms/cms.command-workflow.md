---
uid: JsCode.2sxcApi.Cms.CommandWorkflows
---

# CMS Command Workflows <br> for Commands and Toolbars

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

CMS Commands which are triggered [using JS](xref:JsCode.2sxcApi.Cms.Run) or using the [toolbar](xref:JsCode.Toolbars.Workflows) can also have special workflows to customize what happens. 

Examples of things you can do

1. You can conditionally intercept commands and prevent them
1. You can prevent the page-reload after certain dialogs
1. You can log things to the console for debugging
1. Anything you want

## Simple Example

This is a simple workflow step, which would log what's happening internally on every command which is executed by an action:

```js
// This workflow step will run on every action, just to log what's happening
const workflowToLog = {
  command: 'all',   // Run on every command/action
  phase: 'all',     // Run before and after
  code: (wfArgs) => {
    console.log("We are doing something - here are the details.", wfArgs);
  }
}
```

## Workflow-Step Object Structure

This is the definition of the Workflow Step object:

```js
/**
 * A workflow step (code-sequence) to run before/after specific events.
 */
export interface WorkflowStep {
  /**
   * The name of this step, in case it needs to be replaced or somehow controlled
   * Will be empty by default
   */
  name?: string;

  /**
   * The action this step is for, can be 'any', 'edit', etc.
   * Will be 'all' by default
   */
  command: string;

  /**
   * Action-phase being run, like 'all', 'before', 'after'
   * will be 'before' by default
   */
  phase?: WorkflowPhases;

  /**
   * Execution priority, higher comes first
   * Will be 1 by default.
   */
  priority?: number;

  /**
   * The code which is run, must be a promise-factory.
   * So it's a function that will return a promise.
   * Required.
   */
  code: WorkflowCode;
}
```

The workflow step contains

1. a `command` for which it will trigger
    1. see the [Commands List](xref:JsCode.Commands.Index)
    1. There is also a special command called `refresh` which isn't a normal command used on a button, but an internal command called when refreshing the page through reload or ajax. This too can be handled and cancelled
1. a `phase` (before/after) - possible `phase` values: `before`, `after`, `all`
1. a `code` what is to be done

## Workflow Step Code

The code in the above sample is this:

```js
code: (wfArgs) => {
  console.log("We are doing something - here are the details.", wfArgs);
}
```

1. If your code is triggered, it will receive a `wfArgs` object containing a lot of internal stuff, workflow information and more  
    _note that this object isn't 100% final, it may still change a bit in future versions. We don't expect breaking changes, but be aware of this if you use deep properties._
1. If your code returns `false`, the command (like `refresh`) will stop - this can prevent the dialog from openening and the page from refreshing


## Register Workflow Steps

### Register When Using `cms.run(...)`

When calling Commands from JavaScript, the workflow steps are directly included in the call, like this:

```html
<div class="alert alert-primary" style="width: 50%;">
    The following command will open an edit dialog. 
    When you click it and close the dialog again, the page will <em>not refresh</em>. <br>
    Instead, you'll see console messages that a custom JS took over the process. <br>

    <a href="#" onclick="openAndCancelRefreshAfterwards(this, 'new', { contentType: 'UiEmptyHelloWorld'})">Run open command</a>
</div>

<script>
  function openAndLogEverything(tag, action, params) {

    // This workflow step will run on every action, just to log what's happening
    const workflowToLog = {
      command: 'all',   // Run on every command/action
      phase: 'all',     // Run before and after
      code: (wfArgs) => {
        console.log("We are doing something - here are the details.", wfArgs);
      }
    }

    // This is the workflow step we will register to stop page refresh
    const workflowToDisableRefresh = {
      command: 'refresh',   // The command name it's for
      phase: 'before',      // The workflow-step should run before the command is executed
      code: (wfArgs) => {   // The code which should be run
        console.log('Asked to refresh, will return false to stop it. These are the arguments we got.', wfArgs);
        return false;       // Return false to stop this command from happening
      }
    };

    var steps = [workflowToLog, workflowToDisableRefresh];

    $2sxc(tag).cms.run({ action: action, params: params, workflows: steps})
      .then(function(data) {
        console.log("after run", data);
        return false;
      });
  }
</script>
```

### Register With Toolbars

When calling a command from a toolbar, you can't directly include it. 
Instead, you must add an event to register workflow steps when the toolbar executes an action. 

This is described in detail in [](xref:JsCode.Toolbars.Workflows)


## Demo App and further links 

* TODO


## History

1. Global `$2sxc.cms.run(...)` supporting workflows introduced in v12.10
1. Instance version added in v13.03
