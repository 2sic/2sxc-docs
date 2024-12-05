---
uid: Guides.Wysiwyg.Index
---

# Wysiwyg - Guide

This guide will help you understand how to use the Wysiwyg editor and output it in 2sxc.

## What is Wysiwyg?

2sxc has various fields and input types.
[String](xref:Basics.Data.Fields.String) fields can have a [WYSIWYG](xref:Basics.Data.Fields.String-Wysiwyg) input type.
When content is edited this way, it will be stored as a string containing HTML.

## Types of Wysiwyg

As of v15.0x there are two core types of Wysiwyg content.
The main difference is how the edit UI provides special features and adds styling to the content.

1. **Standard wysiwyg** (the only option before v15)
    * In standard mode the editor is limited in what he/she can do, and styling (eg. image size or alignment) is applied directly to the HTML as `style` attributes.
    * Since the HTML contains everything, you simply have to output it as raw HTML.
    * Use `@Html.Raw(item.FieldName)` to output it.
1. **Text wysiwyg** (new v15)
    * In text mode the editor is limited in what he/she can do, for example (WIP) they can't add images
    * Since the HTML contains everything, you simply have to output it as raw HTML.
    * Use `@Html.Raw(item.FieldName)` to output it.
1. **Rich wysiwyg** (new in v15)
    * In rich mode the editor can do more, and styling is applied as CSS **classes**.
    * An important difference is that images are _not_ inside `p` tags, but always outside of them.
    * Since the HTML only specifies classes, these classes must be defined in your CSS to have an effect.
    * Use `@Cms.Show(item.Field("FieldName"))` to output it, which also ensures that the default CSS is added to the page. You can set more parameters on `Show(...)` for finer control.

> [!NOTE]
> As we'll improve the features, the differences in the editor will become more apparent.
> We plan to also introduce lightweight **Text** modes which prevent image uploading and more.

TODO: how to select these modes

## Rich Wysiwyg Classes

The following should explain the various features in **Rich** mode so you have an idea of their purpose and how they are applied.
When using the `@Cms.Show(...)` method, it will create a wrapper with a `wysiwyg` classes, so it will look ca. like this:

```html
...
<div class='wysiwyg-container'>
  ...
  <img class='wysiwyg-left wysiwyg-50' src='...'>
  <hr class='wysiwyg-splitter wysiwyg-spacer-s'>
  <img class='wysiwyg-right wysiwyg-33' src='...'>
</div>
```

> [!TIP]
> You can of course specify a different tag than `div` and also change other defaults.

The CSS that is automatically added will do some magic:

* the main `wysiwyg-container` will receive a `container-type` of `inline-size` - see [mdn docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)


### Image Alignment

todo

Classes

* `wysiwyg-left`
* `wysiwyg-right`
* `wysiwyg-center`

In the standard implementation, alignments apply to large, desktop/ipad-sized containers.
This means that if final HTML is shown on a wide div, the alignments will be applied.
However, if the final HTML is shown in a narrow div, the alignment will be ignored.

Your skin or module CSS can override this behavior - see below.

### Image Size

Sizes in rich mode are meant to be responsive, so they are not absolute pixel sizes, but relative sizes.
The ratios like `33` (1 of 3) are what desktop users should see, and the built-in CSS will adjust the size for mobile devices.

Classes

* `wysiwyg-100` - full width
* `wysiwyg-50` - half width
* `wysiwyg-33` - 1/3 width
* `wysiwyg-66` - 2/3 width
* `wysiwyg-25` - 1/4 width
* `wysiwyg-75` - 3/4 width

In the standard implementation, alignments apply to large, desktop/ipad-sized containers.
This means that if final HTML is shown on a wide div, the alignments will be applied.
However, if the final HTML is shown in a narrow div, the alignment will be ignored.


### Splitters and Spacers

Splitters break the page into sections, so that the content following a splitter is freshly aligned.
This is important to ensure that aligned content doesn't get stacked, but starts anew below the previous content.
Splitters are implemented as `<hr>` tags with special CSS classes (see below).

Spacers are splitters with additional CSS classes which determine the height of the gap.
This allows the editor to add standardized space between content.

Classes

* `wysiwyg-splitter`
* `wysiwyg-spacer-0`
* `wysiwyg-spacer-s`
* `wysiwyg-spacer-m`
* `wysiwyg-spacer-l`

## What Cms.Show does

todo: link to Cms...

