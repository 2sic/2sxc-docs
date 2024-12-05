---
uid: Basics.Browser.EditUx.Toolbars.ButtonUi
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Custom Toolbars: Button UI Rules

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .browser-edit { visibility: visible; }</style>

Buttons in the Toolbars can have custom UI parameters.

You can set them in [C# APIs](xref:ToSic.Sxc.Services.ToolbarBuilder.Ui) as well as [JS APIs](xref:JsCode.Toolbars.Simple).

Since the values and everything applies to both, the possibilities are documented here.

## Overview of UI Rules on Button

* [icon](#icon)
* [color](#color)
* [show](#show)
* [classes](#class)
* [title](#title)
* [group](#group)
* [position](#position)

## Icon

* `&icon=icon-class-name` allows you to set an alternate icon

Since v14.07.05 you can also specify an SVG like this:

* `&icon=<svg...`

This would use the specified SVG directly on the button, but there are some caveats:

1. The SVG will need to auto-resize to fit the button. Because of that, your SVG will either need to specify a `viewBox` or it will be auto-calculated for you.
1. Since an SVG usually contains many characters that won't work in a URL, it must be base64 encoded, so it's more like `&icon=base64:PHN2ZyB...`

## Color

* `&color=...` gives the button other colors

Both `settings` and `buttons` can have an `&color=...` parameter. The `...` can be just one color or two, like `&color=red,green` or `&color=brown`.

When specifying colors you can either use standard names like `red` or HEX-codes like `FF0000`. You cannot use the `#` hash symbol, so when specifying hex-colors, always just write the characters. The button rendering system will auto-detect hex color codes.

Note that you can also use semi-transparent hex-codes, like `FF000088`.

## Show

Force show/hide a button. This is only used in cases where show is auto detected, and you wish to override it.

* `&show=true` or `&show=false`

Most common use case is to force-show or hide an existing button. For example, if you think it's ok to show the delete button, just use `delete&show=true`

## Class

Add more classes to your button for custom styling.

* `&class=your-class` add one or more classes to the button to affect styling

## Title

* `&title=some-text` - mouseover message

## Group

This is used in toolbars which have many button groups - either the standard groups or groups you made yourself.
By specifying the `group` you can make sure a button is in another button group.

* `&group=my`

## Position

* `&pos=0` - add the button to the front of the list
* `&pos=-1` - add the button to the end of the list

## Read also

* check out the list of [commands/buttons](xref:JsCode.Commands.Index)



## History

1. Introduced custom Toolbars in 2sxc ca. v5
1. Added to 2sxc 10.27 .01 in March 2020
1. Prefill support added in 10.27 .02 in April 2020
1. SVG Icon Support added in v14.07.05
