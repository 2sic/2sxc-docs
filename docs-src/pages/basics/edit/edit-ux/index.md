---
uid: Basics.Browser.EditUx.Index
---
# Edit User Experience in the Page

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .browser-edit { visibility: visible; }</style>

2sxc has powerful CMS features, most of them just work by magic. 
You can also modify the behavior to fit your needs.

When users edit content they usually use in-page buttons to access edit-dialogs and more. Here is a short overview and links to what you need to know.

## The Standard Edit Dialogs

Editing mostly happens in stand-alone dialogs which are JavaScript based (built using Angular). These dialogs are typically dialogs like

1. edit an item
1. edit a combination of items - like a _content_ item and an assigned _presentation-settings_ item

Note that other edit-actions happen in-page directly, like _move-up/down_ in a list etc.


## All about Toolbars and Editing

1. In-Page Item Edit Toolbars
    1. Most of the concept is explained in [InPage Toolbars](xref:Basics.Browser.EditUx.Toolbars.Index).
    1. You will usually create such toolbars from the Razor templates - read about [Edit.TagToolbar and Edit.Toolbar](xref:NetCode.Razor.Edit.Toolbar)

2. The hovering insert-modules toolbar-system is called [quickE for quick-edit](xref:Basics.Browser.EditUx.QuickE). There you will also see how to customize the editing experience. 


## Customize Toolbars and Buttons

If you want to do more than the default toolbars do, you want to read about:

1. [Html toolbars and buttons](xref:JsCode.Toolbars.Index) to customize the toolbars
2. [Toolbar settings](xref:JsCode.Toolbars.Settings) to configure alignment, hover etc.
3. [Buttons](xref:JsCode.Toolbars.Buttons) to understand in details how buttons work and how to customize them
4. There is also a more technical article if you want to see deeper into the [JavaScript](xref:JsCode.Toolbars.Advanced).
5. [Commands](xref:JsCode.Commands.Index) to understand which commands the CMS can run, and how to call them from normal links
6. [Custom Code Buttons](xref:Api.Js.SxcJs.CommandCodeParams) to create buttons which run your custom code

## Customize QuickE (Quick Edit)

You can also [Customize / Configure QuickE (Quick Edit)](xref:JsCode.QuickE.Index).

## Create Custom Input Fields (in the Edit Form)

1. [How to create Custom Input Fields](xref:JsCode.CustomFields.Index)

## Customize the Inner-Content Editing Behaviors

TODO: Inner Content - edit/config Documentation WIP - so for now just learn about [Inner Content](xref:Basics.Cms.InnerContent.Index)

## Read also

1. Blog post about [Introducing Shake - Mobile Content Editing just turned sexy](http://2sxc.org/en/blog/post/introducing-shake-mobile-content-editing-just-turned-sexy)
2. Blog post about [Toolbars for Designers and Developers](http://2sxc.org/en/blog/post/toolbar-for-designers-and-devs-in-2sxc-8-6)
3. Blog post about [Customize in-page toolbars](http://2sxc.org/en/blog/post/customize-edit-toolbar-hover-alignment-more-button-look-and-feel)
4. Blog post about [Calling commands from links](http://2sxc.org/en/blog/post/create-links-which-run-cms-commands-new-2sxc-8-6)




