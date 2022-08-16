---
uid: JsCode.Toolbars.Settings
---

<img src="~/assets/features/toolbar.svg" class="feature">

# Toolbar Settings

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .edit-custom { visibility: visible; } </style>

Each in page toolbar can have some settings which control how it works and how it's shown. 

👉 Best start with the [](xref:Tut.Toolbar)

These Settings control how the Toolbar works

1. `autoAddMore` determines _where_ the ellipsis "more" button is added when the toolbar has many button-groups
1. `hover` determines where the toolbar appears when the mouse hovers over the area
1. `follow` tells the toolbar to follow the mouse - ideal for large content blocks 
1. `show` determines if th toolbar is always visible, or only on hover
1. `classes` let you add classes for custom styling

## How to Use in Razor

This example uses the [simple TagToolbar](xref:NetCode.Razor.Edit.Toolbar) API:

```razor
<div @Edit.TagToolbar(Content, toolbar: new[] { 
  "settings&hover=left&autoAddMore=start"
})>
  Stuff inside the div - hover over this would show the toolbar
</div>
```

Here's another example where it uses the explicit `settings` parameter:

```razor
<div id='tagWithToolbar1' @Edit.TagToolbar(
  toolbar: new [] { "toolbar=empty", "+new?contentType=UiEmptyHelloWorld" },
  settings: new { hover = "left", show = "always" } )>
  Float over this box to get a (+) button. 
</div>
```

## How to Use in JavaScript

If you are writing code that doesn't have Razor (for example in a JS-SPA scenario) you would write the following (which is actually what the above sample creates):

```html
<div sxc-toolbar='["settings&hover=left&autoAddMore=start"]'>
  Stuff inside the div - hover over this would show the toolbar
</div>
```

## Settings and Values

1. string `autoAddMore`: **(null)** | `start` | `end`  
will automatically add a "..." (more) button if multiple button groups are detected. Default is `end`
1. string `hover`: **"right"** | "left" | "none"  ("center" ist still beta)
determines where the toolbar appears when the mouse hovers over the area (usually a DIV) with the class `sc-element`
1. string `follow` _new in 11.06_ **"none"** | "initial" | "scroll" | "always"  
tells the toolbar to follow the mouse - ideal for large content blocks where you need the toolbar even if otherwise it would be off-screen. _Note: this used to default to `scroll` on the `TagToolbar` but was changed to `none` in 2sxc 11.06 because it caused too many UX issues._
1. string `show`: **"hover"** | "always"  
by default any toolbar inside an element with a `sc-element` class will appear on hover
1. string `classes`: **(null)** | _any kind of string_   


## Old use Cases _not Recommended_

Here's a quick example of how it used to be done - not recommended any more:

```Html
<div style="height: 100px" class="sc-element">
    100px tall area to show alignments floating left with more to the left
    <ul class="sc-menu" data-toolbar='' settings='{ "hover": "left", "align": "left" }'></ul>
</div>
```

The above example will hover the toolbar when the mouse moves over this DIV but place it to the left `hover: "left"` and place the _more_ button on the left side as well `align: "left"`.


## Demo App and further links

* [](xref:Tut.Toolbar)
* [old! blog post on using toolbar settings](http://2sxc.org/en/blog/post/customize-edit-toolbar-hover-alignment-more-button-look-and-feel)

## History

1. Introduced in 2sxc 8.06
2. `follow` introduced in 11.06

