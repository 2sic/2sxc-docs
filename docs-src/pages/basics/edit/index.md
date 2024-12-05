---
uid: Basics.Browser.Edit.Index
---
# Edit Content or Data in Dnn / 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .browser-edit,
  .context-box-summary .browser-edit-ui { visibility: visible; }
</style>

2sxc has powerful CMS features, most of them just work by magic. 
You can also modify the behavior to fit your needs.

When users edit content they usually use in-page buttons to access edit-dialogs and more. Here is a short overview and links to what you need to know.

## The Standard Edit Dialogs

Editing mostly happens in stand-alone dialogs which are JavaScript based (built using Angular). These dialogs are typically dialogs like

1. edit an item
1. edit a combination of items - like a _content_ item and an assigned _presentation-settings_ item

This is documented in [](xref:Basics.Browser.EditForm.Index)

## In-Page Toolbars and User Experience

The edit UX begins in the page showing the content/data. Things like

* toolbars opening dialogs or performing actions like _publish_, _move up/down_ etc. 
* [quickE (Quick Edit)](xref:Basics.Browser.EditUx.QuickE) to customize the toolbar which adds / deletes modules
* inner-content editing


## Learn More About...

You may want to learn more about:

1. [Customize the Toolbar](xref:Basics.Browser.EditUx.Toolbars.Index) in JavaScript or Razor
1. Call CMS commands from buttons without using the toolbar
1. Show certain HTML to editors only