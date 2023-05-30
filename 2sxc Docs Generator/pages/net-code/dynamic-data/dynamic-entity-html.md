---
uid: NetCode.DynamicData.DynamicEntityHtml
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

# DynamicEntity / TypedItem .Html(...) Method _new v16.01_

The `Html` method is a new feature in 2sxc 16.01 which allows you to render a property/field as HTML.
The main purpose is to allow you to render a rich-text field as HTML, but it can also be used to render other fields.

Simple example assuming a blog-post with a `Body` field:

```razor
@post.Html("Body")
```

## Behavior / Features of the Html Method

1. Return an `IHtmlTag` object which can be rendered as HTML directly
1. Wrap the value in a `<div>` tag by default (but you can change this)
1. Sometimes automatically add an edit-toolbar for this specific field
1. Automatically do some optimizations on certain field types, such as `string-wysiwyg`

### Default Behavior

By default it will just do this

1. Wrap in a `<div>` tag
1. Output the value

So by default it will not add a toolbar, and it will not do any special processing.

### Behavior on Rich, string-wysiwyg fields

If the field is a `string-wysiwyg` field which has been configured to be of the new `Rich` type, it will automatically do the following:

1. Wrap in a `<div>` tag
1. Add some helper classes to the `<div>` tag to ensure proper styling
1. Add a toolbar to edit the field
1. Change all the images in the wysiwyg to be responsive, lazy-loaded and multiple resolutions
1. Automatically process [InnerContent](xref:Basics.Cms.InnerContent.Index) just like the [IRenderService](xref:ToSic.Sxc.Services.IRenderService)

> [!TIP]
> In future, other field types will also receive special treatment,
> so for now, you should only use this on fields where you expect the special treatment.

## Container

By default, it will always add a `div` tag around the value.
This is to ensure that the contents is properly styled and to allow adding a toolbar.
To change this, you can specify the `container` parameter to be one of the following:

1. `null` - default, the default `div` container will be added
1. `""` - empty string, no container will be added
1. `"tagname"` - any tag name like `p`, `span`, `h1` etc. will be added
1. `IHtmlTag` - any `IHtmlTag` object will be added, usually created using `Kit.HtmlTags.TagName()`

Examples:

```razor
@* default, will wrap in a div *@
@post.Html("Body")
@post.Html("Body", container: null)

@* don't wrap in any container *@
@post.Html("Body", container: "")

@* will warp in a <p> or <h1> tag *@
@post.Html("Body", container: "p")
@post.Html("Body", container: "h1")

@* will warp in a <div class='my-class'> tag *@
@post.Html("Body", container: Kit.HtmlTags.Div().Class("my-class"))
```

## Toolbar

By default, it will not add a toolbar, unless it's a `string-wysiwyg` field.
To change this, you can specify the `toolbar` parameter to be one of the following:

1. `null` - default, the default behavior will apply
1. `false` - enforce no toolbar
1. `true` - enforce a toolbar to edit just this field

For any other custom behavior, use `toolbar: false` and add your own toolbar to the container.

Examples:

```razor
@* default, normal fields will not have a toolbar *@
@post.Html("Title")
@post.Html("Title", toolbar: false)

@* normal fields can enable the field-toolbar *@
@post.Html("Title", toolbar: true)

@* string-wysiwyg fields will have a toolbar *@
@post.Html("Body")
@post.Html("Body", toolbar: true)

@* string-wysiwyg fields can disable the toolbar *@
@post.Html("Body", toolbar: false)

```

## Image Resize Settings

If the field is a `string-wysiwyg` field which has been configured to be of the new `Rich` type, it will automatically replace all images with a responsive, lazy-loaded version.

To do this, it uses the [resize configuration](xref:Basics.Configuration.Settings.Images.Index) called `Wysiwyg`.
This is different from `Content` as it doesn't enforce a specific height.

To change this, you can do various things:

1. Reconfigure the `Wysiwyg` image settings on the App, Site or entire System
1. Specify another word such as `Content` in the `imageSettings` parameter
1. Specify another configuration object in the `imageSettings` parameter

## Debug

Especially in the case of `string-wysiwyg` fields, it can be very helpful to see what's going on.
To make this possible, there is a parameter `debug` which can be set to true.

👉🏽 Read more in the [Rich WYSIWYG docs](xref:Basics.Data.Fields.String-Wysiwyg-Rich)


---

## History

1. Introduced in 2sxc 16.01 for the new Rich-Text field type
