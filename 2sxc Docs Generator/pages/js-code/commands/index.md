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




## How to use

> [!TIP]
> These examples are fairly technical - in most cases you just want the commands for custom toolbars. You can find them below.

In most cases you don't have to even think about this, because the hover-buttons will automatically call the command as needed. But there are cases where you may want to do so yourself - for example with very custom buttons or if you want to automate something. Here's an example:

```html
<!-- quick version with name only --> 
<a onclick="$2sxc(this).manage.run('layout', event)">
    change layout
</a>

<!-- expanded version -->
<a onclick="$2sxc(this).manage.run({ action: 'layout' }, event)">
    change layout
</a>

<!-- expanded version with many params -->
<a onclick="$2sxc(this).manage.run({ action: 'new', contentType: 'BlogPost' }, event)">
    createBlogPost
</a>
```

These examples example gets the $2sxc-controller related to the `<a>` tag using `$2sxc(this)` and thereby giving it a context so it knows what module-id, etc. Then it executes the command. 

Here's a fairly realistic setup using Razor and custom buttons in HTML:

```html
@if(Edit.Enabled)
{


<ol>
    <li>
        <a onclick='$2sxc(this).manage.run({"action": "layout"})'>layout</a>
    </li>
    <li>
        <a onclick='$2sxc(this).manage.run({"action": "new", "contentType": "Dummy"})'>new</a>
    </li>
    <li>
        <a onclick='$2sxc(this).manage.run({"action": "edit", "entityId": @Content.EntityId})'>edit #@Content.EntityId</a>
    </li>
    <li>
        <a onclick='$2sxc(this).manage.run({"action": "edit", "useModuleList": true, "sortOrder": 0 })'>edit slot 0 of module list</a>
    </li>
    <li>manage table of <a onclick='$2sxc(this).manage.run({"action": "contentitems"})'>items of the type used in this template</a> or of 
        <a onclick='$2sxc(this).manage.run({"action": "contentitems", contentType: "Quotes"})'>Quotes</a>
    </li>
</ol>
}
```

Maybe you also want to put the command-construction in more code, like this:

```javascript
// the function which does this
function openLayout(moduleId){
    var command = {
        action: "layout"
    }
    $2sxc(moduleId).manage.run(command);
}

// the jquery call to do this on-load
$(function() {
    openLayoutOnPageLoad(740);
})
```


## Running a Command
Always use the sxc-controller of a module, then access the `.manage.run(...)` method to run a command. There are 3 calls you can use:

* `run("layout")` - for simple commands requiring only the name
* `run("new", { contentType: "BlogPost" })` - for additional parameters
* `run({ action: "new", contentType: "BlogPost" })` - does the same as above
* `run(..., event)` - if you had an event like click, it's best to always include it as last parameter

### Some Examples
Every action in the UI is a command, and for it to run, it must know a few things, like

```javascript
    var sxc = $2sxc(7523);  // get sxc for moduleId 7523
    var newCommand = {
        action: "new", 
        contentType: "BlogPost"
    };
    sxc.manage.run(newCommand);

    var editItemCommand = {
        action: "edit",
        entityId: 760
    };
    sxc.manage.run(editItemCommand);

    var editSlot7Params = {
        useModuleList: true,
        sortOrder: 7
    };
    sxc.manage.run("edit", editSlot7Params);
```

## Command With Custom Code
There is a command called **custom** which is meant to be used for this. Check out the example on [Custom Code](xref:Api.Js.SxcJs.CommandCustomParams)

## All Commands & Parameters (todo - update)

To understand the internals, check out the [source code](https://github.com/2sic/2sxc-ui/blob/master/src/inpage/commands/commands.definitions.js). These are the currently available actions and their parameters:




<table border="0" cellpadding="0" cellspacing="0" width="650" style="border-collapse:
 collapse;table-layout:fixed;width:488pt">
 <colgroup><col width="130" style="mso-width-source:userset;mso-width-alt:4754;width:98pt">
 <col width="84" style="mso-width-source:userset;mso-width-alt:3072;width:63pt">
 <col width="436" style="mso-width-source:userset;mso-width-alt:15945;width:327pt">
 </colgroup><tbody><tr height="20" style="height:15.0pt">
  <td height="20" class="xl6622490" align="left" width="130" style="height:15.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:700;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  border-top:.5pt solid black;border-right:none;border-bottom:.5pt solid black;
  border-left:none">Action Name</td>
  <td class="xl6622490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:700;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;border-top:.5pt solid black;
  border-right:none;border-bottom:.5pt solid black;border-left:none">Purpose</td>
  <td class="xl6622490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:700;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;border-top:.5pt solid black;
  border-right:none;border-bottom:.5pt solid black;border-left:none">Description
  and Parameters</td>
 </tr>
 <!-- <tr height="180" style="height:135.0pt">
  <td height="180" class="xl6522490" align="left" width="130" style="height:135.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">new</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Open the edit-dialog for a new content-item. <br>
    * contentType<br>
    <br>
    Then it needs either the ID...:<br>
    * entityId<br>
    <br>
    ...or it needs the position within the list:<br>
    * useModuleList: true <br>
    * sortOrder: [number] (important so it knows the position</td>
 </tr>
 <tr height="80" style="height:60.0pt">
  <td height="80" class="xl6522490" align="left" width="130" style="height:60.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">add</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Adds a content-item to the
  current list of items, right below the item where it was clicked.<br>
    * useModuleList: true (required to be true for it to work)<br>
    * sortOrder: [number] (important so it knows the position)</td>
 </tr>
 <tr height="80" style="height:60.0pt">
  <td height="80" class="xl6522490" align="left" width="130" style="height:60.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">add-existing</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">New in 11.01. Adds a content-item to the
  current list of items, right below the item where it was clicked. But to do this, it shows the user a list of existing items.<br>
 </tr> -->
 <!-- <tr height="160" style="height:120.0pt">
  <td height="160" class="xl6522490" align="left" width="130" style="height:120.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">edit</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Opens the edit-dialog. If the item is module-content it may
  also open the presentation-item as well. <br>
    It needs either the ID...:<br>
    * entityId<br>
    <br>
    ...or it needs the position within the list:<br>
    * useModuleList: true <br>
    * sortOrder: [number] (important so it knows the position</td>
 </tr> -->
 <!-- <tr height="20" style="height:15.0pt">
  <td height="20" class="xl6822490" align="left" width="130" style="height:15.0pt;
  width:98pt"><s>dash-view</s></td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">-</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">internal, don't use this</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">app-import</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Manage</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Open the app-import dialog to import a new app.<br>
    * [no parameters]</td>
 </tr> -->
 <tr height="20" style="height:15.0pt">
  <td height="20" class="xl6522490" align="left" width="130" style="height:15.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">metadata</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">todo - more documentation</td>
 </tr>
 <!-- <tr height="80" style="height:60.0pt">
  <td height="80" class="xl6722490" align="left" width="130" style="height:60.0pt;
  width:98pt;font-size:11.0pt;color:#0563C1;font-weight:400;text-decoration:
  underline;text-underline-style:single;text-line-through:none;font-family:
  Calibri;background:#D9D9D9;mso-pattern:#D9D9D9 none">
  [delete](xref:JsCode.Commands.Delete)
  </td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">delete (not just remove) a content-item. Needs:<br>
    * entityId<br>
    * entityGuid<br>
    * entityTitle</td>
 </tr> -->
 <!-- <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">remove</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">List</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Removes an item from a list of
  items. <br>
    * useModuleList: true (required to be true for it to work)<br>
    * sortOrder: [number] (important so it knows the position)</td>
 </tr> -->
 <!-- <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">moveup</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">List</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Move a content-item up one position in the list<br>
    * useModuleList: true (required to be true for it to work)<br>
    * sortOrder: [number] (important so it knows the position)</td>
 </tr>
 <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">movedown</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">List</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Move a content-item down one
  position in the list<br>
    * useModuleList: true (required to be true for it to work)<br>
    * sortOrder: [number] (important so it knows the position)</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">instance-list</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">List</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Open a dialog to manually re-order items in a list.<br>
    (note: in older versions was called "sort"</td>
 </tr> -->
 <!-- <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">publish</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Edit</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Tells the system to update a
  content-items status to published. If there was a published and a draft
  before, the draft will replace the previous item.<span style="mso-spacerun:yes">&nbsp;</span></td>
 </tr> -->
 <!-- <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">replace</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Edit Slot</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Only available on module-assigned content items. Will open the
  dialog to assign a different content-item in this slot.<br>
    *…</td>
 </tr> -->
 <!-- <tr height="20" style="height:15.0pt">
  <td height="20" class="xl6522490" align="left" width="130" style="height:15.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">item-history</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Versioning</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Review previous versions of this
  item and restore if necessary.</td>
 </tr> -->
 <!-- <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">layout</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Design</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Opens the in-page dialog to change the layout of the current
  content.<br>
    * [no parameters needed]</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">template-develop</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Develop</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Opens the template-editor dialog
  in a new window.<br>
    (note: in older versions was called "develop")</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">template-query</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Develop</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Opens the pipeline/query-designer in a new window.<br>
    It's invisible on content, and disabled if no pipeline is configured.</td>
 </tr>
 <tr height="20" style="height:15.0pt">
  <td height="20" class="xl6522490" align="left" width="130" style="height:15.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">template-settings</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Develop</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Change settings on the template
  currently used.</td>
 </tr> -->
 <!-- <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6722490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:#0563C1;font-weight:400;text-decoration:
  underline;text-underline-style:single;text-line-through:none;font-family:
  Calibri;background:#D9D9D9;mso-pattern:#D9D9D9 none">
  [contentitems](xref:JsCode.Commands.ContentItems)
  </td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Admin</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Opens the dialog to manage content-items for the current
  template. Will use the settings of the current template to open. <br>
    * contentType (optional) - name of data-type to manage/open</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">contenttype</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Develop</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Opens the dialog to view or
  change the current content-type, meaning you can change what fields it has,
  their types etc.</td>
 </tr> -->
 <!-- <tr height="20" style="height:15.0pt">
  <td height="20" class="xl6522490" align="left" width="130" style="height:15.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">app</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Admin</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Opens the app-admin dialog.</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">app-settings</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Admin</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Opens the edit dialog for the
  app-settings. It's disabled if the app doesn't have setting-values to
  configure.<span style="mso-spacerun:yes">&nbsp;</span></td>
 </tr>
 <tr height="60" style="height:45.0pt">
  <td height="60" class="xl6522490" align="left" width="130" style="height:45.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  background:#D9D9D9;mso-pattern:#D9D9D9 none">app-resources</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Admin</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Opens the edit for app-resources (multi-language texts, labels
  etc.). It's disable if the app doesn't have resource-values to
  configure.<span style="mso-spacerun:yes">&nbsp;</span></td>
 </tr> -->
 <!-- <tr height="20" style="height:15.0pt">
  <td height="20" class="xl6522490" align="left" width="130" style="height:15.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri">zone</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Admin</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri">Opens the manage all apps dialog.</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6722490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:#0563C1;font-weight:400;text-decoration:
  underline;text-underline-style:single;text-line-through:none;font-family:
  Calibri;background:#D9D9D9;mso-pattern:#D9D9D9 none">
  [custom](xref:JsCode.Commands.Code)
  </td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Special</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;background:#D9D9D9;mso-pattern:
  #D9D9D9 none">Execute custom javascript<br>
    * customCode - some JS like "alert('hello');"</td>
 </tr> -->
 <!-- <tr height="40" style="height:30.0pt">
  <td height="40" class="xl6522490" align="left" width="130" style="height:30.0pt;
  width:98pt;font-size:11.0pt;color:black;font-weight:400;text-decoration:none;
  text-underline-style:none;text-line-through:none;font-family:Calibri;
  border-top:none;border-right:none;border-bottom:.5pt solid black;border-left:
  none">more</td>
  <td class="xl6522490" align="left" width="84" style="width:63pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;border-top:none;border-right:none;
  border-bottom:.5pt solid black;border-left:none">Ui</td>
  <td class="xl6522490" align="left" width="436" style="width:327pt;font-size:11.0pt;
  color:black;font-weight:400;text-decoration:none;text-underline-style:none;
  text-line-through:none;font-family:Calibri;border-top:none;border-right:none;
  border-bottom:.5pt solid black;border-left:none">Only needed in toolbars,
  creates a "…" button which flips through the menu-buttons.<span style="mso-spacerun:yes">&nbsp;</span></td>
 </tr> -->
 <!--[if supportMisalignedColumns]-->
 <tr height="0" style="display:none">
  <td width="130" style="width:98pt"></td>
  <td width="84" style="width:63pt"></td>
  <td width="436" style="width:327pt"></td>
 </tr>
 <!--[endif]-->
</tbody></table>





## See also

1. [ContentItems with Filters](xref:JsCode.Commands.ContentItems)
1. [Delete](xref:Api.Js.SxcJs.CommandDeleteParams)
1. [Custom Code](xref:Api.Js.SxcJs.CommandCustomParams)

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
