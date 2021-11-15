---
uid: JsCode.2sxcApi.$2sxc.Cms
---

# The $2sxc.cms API

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>


The `$2sxc.cms` object is the core JavaScript API to perform CMS actions such as opening edit-dialogs etc. As of now (2sxc 9.30) it only has 1 command `run(...)` but will be enhanced in the future to do more.

You need this in advanced use cases. _otherwise you don't need this_. Such advanced cases are:

1. when you create custom JS buttons to start a content-management action

## How to use v12.10 and newer

2sxc 12.10 enhanced the `cms.run(...)` to accept an object with parameters. 
This makes it easier to reliably pass in optional parameters, and also supports the use of [Workflow Steps](xref:JsCode.Toolbars.Workflows).

The `RunParams` object has this structure:

```js
export interface RunParams {

    /** The tag on which the run was triggered - it's used to give the command a context to start from */
    tag: HTMLElement;

    /** The action to perform. Required if you don't have params which themselves have the action */
    action?: string;

    /** The command params, like contentType, entityId etc. */
    params?: CommandParams;

    /** The event which triggered this command - sometimes useful internally further use */
    event?: MouseEvent;

    /** Workflows work the same way as with a toolbar, except that they are added here and not registered on init */
    workflows?: WorkflowStep | WorkflowStep[];
}
```

Here's an example:

```html
<div class="alert alert-primary" style="width: 50%;">
    The following command will open an edit dialog. 
    When you click it and close the dialog again, the page will <em>not refresh</em>. <br>
    Instead, you'll see console messages that a custom JS took over the process. <br>

    <a href="#" onclick="openAndCancelRefreshAfterwards(this, 'new', { contentType: 'UiEmptyHelloWorld'})">Run open command</a>
</div>

<script>

  function openAndCancelRefreshAfterwards(tag, action, params) {

    // This workflow step will run on every action, just to log what's happening
    const workflowToLog = {
      command: 'all',   // Run on every command/action
      phase: 'all',     // Run before and after
      code: (wfArgs) => {
        console.log("Toolbar asked to to something - here are the details.", wfArgs);
      }
    }

    // This is the workflow step we will register to stop page refresh
    const workflowToDisableRefresh = {
      command: 'refresh',   // The command name it's for
      phase: 'before',      // The workflow-step should run before the command is executed
      code: (wfArgs) => {   // The code which should be run
        console.log('Toolbar asked to refresh, will return false to stop it. These are the arguments we got.', wfArgs);
        return false;       // Return false to stop this command from happening
      }
    };

    $2sxc.cms.run({ tag: tag, action: action, params: params, workflows: [workflowToLog, workflowToDisableRefresh]})
      .then(function(data) {
        console.log("after run", data);
        return false;
      });
  }
</script>
```

## How to use (v9.30)

Before you start, ensure you have the necessary JS scripts loaded:

1. in edit-mode this happens automatically
2. if you want to provide this to low-priviledge users, use `@Edit.Enable(...)` in [razor](xref:NetCode.Razor.Edit.Enable)

Simple example:

```razor
@* enable the editing *@
@Edit.Enable(api: true, forms: true, context: true, autoToolbar: false)

<script>
    // simple function to run the command and handle the returned promise
    function addProject(tag) {
        $2sxc.cms.run(tag, "new", { contentType: "Project"})
            .then(function () {
                alert("Thanks - we'll review your entry and publish it.")
            });
    }
</script>

<span onclick='window.addProject(this)'>
    add your project
</span>

```

1. the first parameter is an HTML tag in the DOM, which is used to look up the context automatically (see [edit-context](xref:Basics.Browser.EditUx.EditContext))
1. the second parameter is the verb for the [cms-command](xref:JsCode.Commands.Index) to run
1. the third parameter is additional parameters for that command


## Demo App and further links

* [Tutorial app for Public Forms](https://2sxc.org/en/apps/app/tutorial-public-forms-with-2sxc-9-30)
* [Blog Recipe for using Public Forms with 2sxc](https://2sxc.org/en/blog/post/recipe-create-public-forms-with-2sxc)


## History

1. Introduced in 2sxc 09.30
1. Enhanced with `RunParams` in 2sxc 12.10 to support registering `workflows`