---
uid: Basics.Browser.EditUx.Toolbars.ButtonGroups
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Custom Toolbars: Button Groups

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .browser-edit { visibility: visible; }</style>

Buttons in the Toolbars can be grouped into various sets of buttons. 
This will show the users only a subset of the buttons, and let him access other groups using the ellipsis button. 

You can set them in [C# APIs](xref:ToSic.Sxc.Services.ToolbarBuilder.Ui) as well as [JS APIs](xref:JsCode.Toolbars.Simple).

Since the values and everything applies to both, the possibilities are documented here. 

## Group Names in the `default` Toolbar

The following button groups exist by default. You can target them to add your buttons, or remove them using `-group=name`:

* `default` - the main initial buttons like edit, add etc.
* `list` - anthing having to do with the current list - move-up/down etc.
* `edit-advanced` - advanced, not-recommended buttons like `delete`
* `view` - anything related to the view - edit template etc.
* `app` - app related buttons



## History

1. Introduced custom Toolbars in 2sxc ca. v5
1. Added to 2sxc 10.27 .01 in March 2020
