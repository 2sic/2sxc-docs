---
uid: JsCode.2sxcApi.Cms.Run
---

# How to Use Run() and RunParams

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

Two commands in the 2sxc APIs allow running CMS commands

* `$2sxc.cms.run(params: RunParamsWithContext)`  
    This is the `run` on the [Global Cms object](xref:JsCode.2sxcApi.$2sxc.Cms)
* `sxc.cms.run(params: RunParams)`  
    This is the `run` on the [Instance Cms object](xref:JsCode.2sxcApi.Sxc.Cms)

Both of these commands will run a CMS command with parameters. 

> [!IMPORTANT]
> There are some possibilities for confusion which you should be aware of.
> 
> The `$2sxc.cms.run(...)` has a few [old overloads](xref:JsCode.2sxcApi.Obsolete.$2sxc.CmsV9) with other parameters. 
> We plan to discontinue these, as it had to do some magic to figure out what is what.
> So even if you find such code, please use the method described here. 
> 
> The Instance `sxc` also has an older run on `sxc.manage.run(...)`. 
> We plan to discontinue this, so again please avoid that. 

## Requirements and Prerequisites

For this to work, the CMS JavaScripts must be loaded. 
This is done automatically or manually.

1. If your user is an admin/editor, this happens automatically. 
1. If your user is not defined as an editor, but should still have these commands (possibly because the Content-Type allows editing for this user), you'll need to activate it manually. 

To activate these features manually just use the [IPageService](xref:NetCode.Razor.Services.IPageService) and activate `2sxc.JsCms`.


## How to use (v13.03)

Simple example:

```razor
@{
  // enable editing for all users
  GetService<ToSic.Sxc.Services.IPageService>().Activate("2sxc.JsCms");
}

<script>
  // Run the command and handle the returned promise
  // This uses the Instance object retrieved using $2sxc(tag)
  function addProject(tag) {
    $2sxc(tag).cms.run({ action: "new", params: { contentType: "Project"} })
      .then(function () {
        alert("Thanks - we'll review your entry and publish it.")
      });
  }

  // This is the alternate way to write the code, using the Global object
  function addProjectAlternative(tag) {
    $2sxc.cms.run({ tag: tag, action: "new", params: { contentType: "Project"}})
      .then(function () {
        alert("Thanks - we'll review your entry and publish it.")
      });
  }</script>

<span onclick='window.addProject(this)'>
  add your project
</span>

```

1. the `tag` is an HTML tag in the DOM, which is used to look up the context automatically (see [edit-context](xref:Basics.Browser.EditUx.EditContext))
1. the `action` is the verb for the [cms-command](xref:JsCode.Commands.Index) to run
1. the `params` contains additional parameters for that command


## Returned Promise

The `run` always returns a promise. 
As you can see in the sample above, this lets you show a specific message or do other things after the command has run. 

To handle special cases like prevent a page-refresh or to do custom JS actions at certain points, check out the [Workflows](xref:JsCode.Toolbars.Workflows).


## RunParams and RunParamsWithContext

Both commands take one object with named properties, to help keep the API stable across changes. These are the objects and explanations:

```js
/**
 * Parameters for the Instance cms.run(...) command.
 * New in 13.03
 */
export interface RunParams {
  /**
   * The action to perform.
   * Required if you don't have params which themselves have the action
   */
  action?: string;

  /**
   * The command params, like contentType, entityId etc.
   * Optional for many actions, but can themselves also contain the property `action`, in which case action can be ommited.
   */
  params?: CommandParams;

  /**
   * The event which triggered this command - sometimes useful internally further use.
   * Optional in most cases, but in some cases it will improve the behavior of the code.
   */
  event?: MouseEvent;

  /**
   * Workflows work the same way as with a toolbar, except that they are added here and not registered on init
   */
  workflows?: Workflow | Workflow[];
}

/**
 * Parameters for the Global cms.run(...) command in Addition to the RunParams
 * New in 12.10
 */
export interface RunParamsWithContext extends RunParams {
  /**
   * The tag on which the run was triggered - it's used to give the command a context to start from
   * We always need the tag OR the context, but never both
   */
  tag?: HTMLElement;

  /**
   * The context to run in, basically containing module id, etc.
   * We always need the tag OR the context, but never both
   */
  context?: SxcInstance | SxcEdit | ContextIdentifier;
}
```

> [!IMPORTANT]
> The Instance call on `sxc.cms.run(...)` uses the `RunParams`.
> It will throw an error if a `context` is also provided, because that indicates
> you're doing something wrong. 
> 
> On the other hand the Global call on the `$2sxc.cms.run(...)` explicitly needs
> either `tag` or `context`, and will throw an error if both are missing. 



## Command Workflow Example

Commands can be called with additional workflow steps which are processed before or after certain steps. For example, you can prevent the page from refreshing - to trigger an own JS-Reload or something. 

👉 Read more about [Workflows and Steps](xref:JsCode.2sxcApi.Cms.CommandWorkflows).


## Demo App and further links 

* TODO


## History

1. Global `$2sxc.cms.run(...)` introduced in 2sxc 09.30
1. Enhanced with `RunParams` in 2sxc 12.10 to support registering `workflows`
1. Use with `context` instead of `tag` added in v13.03
1. Instance version added in v13.03
