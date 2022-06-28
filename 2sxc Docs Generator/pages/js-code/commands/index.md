---
uid: JsCode.Commands.Index
---
# CMS Commands in JavaScript

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

Whenever you press a button in the edit-ui, a edit-command is handled by the javascript layer. These commands  are things like:

* `edit` an item on the screen
* open the `layout`-picker dialog for a content-block

Each command needs 3 things

1. a short [CommandName](xref:Api.Js.SxcJs.CommandNames) like `new`
1. **parameters** `entityId` which differ for each command 
1. a context - usually the current module

It always [returns a promise](#returned-promise).


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Run Commands and Parameters

Two commands in the 2sxc APIs allow running CMS commands

* `$2sxc.cms.run(params: RunParamsWithContext)`  
    This is the `run` on the [Global Cms object](xref:Api.Js.SxcJs.SxcGlobalCms)
* `sxc.cms.run(params: RunParams)`  
    This is the `run` on the [Instance Cms object](xref:Api.Js.SxcJs.SxcCms)

Both of these commands will run a CMS command with parameters. 

> [!IMPORTANT]
> There are some possibilities for confusion which you should be aware of.
> 
> The `$2sxc.cms.run(...)` has a few [old overloads](xref:JsCode.2sxcApi.Obsolete.$2sxc.CmsV9) with other parameters. 
> We plan to discontinue these, as it had to do some magic to figure out what is what.
> So even if you find such code, please use the method described here. 
> 
> Read more: [](xref:JsCode.Commands.RunVariations)


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

Both commands take one object with named properties, to help keep the API stable across changes. 

> [!TIP]
> The Instance call on `sxc.cms.run(...)` uses the [RunParams](xref:Api.Js.SxcJs.RunParams).
> It will throw an error if a `context` is also provided, because that indicates
> you're doing something wrong. 
> 
> On the other hand the Global call on the `$2sxc.cms.run(...)` explicitly needs [RunParamsWithContext](xref:Api.Js.SxcJs.RunParamsWithContext)
> either `tag` or `context`, and will throw an error if both are missing. 





## Command Workflow Example

Commands can be called with additional workflow steps which are processed before or after certain steps. For example, you can prevent the page from refreshing - to trigger an own JS-Reload or something. 

👉 Read more about [Workflows and Steps](xref:JsCode.2sxcApi.Cms.CommandWorkflows).



## Command With Custom Code

There is a command called **custom** which is meant to be used for this. Check out the example on [Custom Code](xref:Api.Js.SxcJs.CommandCodeParams)

## All Commands & Parameters

👉🏼 [](xref:Api.Js.SxcJs.CommandNames)

Details about some specific commands: 

1. [ContentItems with Filters](xref:Api.Js.SxcJs.CommandDataParams)
1. [Delete](xref:Api.Js.SxcJs.CommandDeleteParams)
1. [Custom Code](xref:Api.Js.SxcJs.CommandCodeParams)

## Demo App and further links

You should find some code examples in this demo App

* [JS Manage / Toolbar API Tutorial App](http://2sxc.org/en/apps/app/tutorial-for-the-javascript-apis-and-custom-toolbars)
* Blog post about [Calling commands from links](http://2sxc.org/en/blog/post/create-links-which-run-cms-commands-new-2sxc-8-6)


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## History

1. Global `$2sxc.cms.run(...)` introduced in 2sxc 09.30
1. Enhanced with `RunParams` in 2sxc 12.10 to support registering `workflows`
1. Use with `context` instead of `tag` added in v13.03
1. Instance version added in v13.03
