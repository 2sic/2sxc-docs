---
uid: Basics.Configuration.Settings.Images.Recipes
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Recipes in Image Resize Settings in 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

Version 13.10 will introduce a new [ImageService](xref:ToSic.Sxc.Services.IImageService)
which can generate advanced multi-resolution `img` and `picture` tags.
As the configuration can be quite complex, it is explained here:

## A Resize Recipe

A resize recipe has the following values, most of which are optional:

* Resize Settings
    1. `variants` (string) - determines which variant resolutions will be provided
    1. `width` (int) size of the initial image before variants are applied
* Restrictions
    1. `forFactor` if set, the rule will only apply to images which should be resized to this factor
    1. `forCss` if set, the rule will only apply to images when the page uses this Css Framework
    1. `forTag` if set, the rule will only apply to this tag type - either `img` or `source`
* Additional Effects
    1. `setWidth` (bool) will add an appropriate `width` attribute to the `img` tag if width is known
    1. `setHeight` (bool) will add an appropriate `height` attribute to the `img` tag if height is known
    1. `attributes` (Dictionary<string, object>) lists additional tag-attributes to apply to the `img` tag

This is an example of a simple resize recipe:

```json
{
  "recipe": {
    // Means the initial image will be 700px wide
    "width": 700,
    // This will generate 3 variants: 700px, 1400px and 350px
    "variants": "1*, 2*, 0.5*",
    "attributes": {
      // This will always add an img-fluid class to the img-tag
      "class": "img-fluid"
    }
  }
}
```

> [!TIP]
> In v14.09 we updated the editor to use a [JSON schema](https://schemas.2sxc.org/image-resize/v13/index.json),
> so you should now get intellisense 😉.

## Variants

`variants` is a string which tells us which variants to generate.
It is comma-separated.
There are three different ways to specify the variants:

1. By multiplier - marked by `*` or no trailing character
    1. `1*` means the original image will be used
    1. `2*` means the image will be resized to 2 times its original size
    1. `0.5*` means the image will be resized to half its original size
1. By Pixel size marked by `w`
    1. `700w` means the image will be resized to 700px wide
    1. `1400w` means the image will be resized to 1400px wide
    1. `350w` means the image will be resized to 350px wide
1. By Screen Pixel Density marked by `x`
    1. `1x` means the image will be used as is, for normal screen pixel density
    1. `2x` means the image will be douled in size for 2x screen pixel density
    1. `3x` means the image will be trippled in size for 3x screen pixel density

> [!WARNING]
> It's tempting to mix these, but only `*` and `w` can be combined.
> Trying to combine `x` (pixel density) with any of the others results in an invalid configuration which the browser cannot handle.
> It will not generate an error, but the browser will usually then just ignore the `x` variants.


## Adding Many Recipes

A perfect resizing system must actually behave differently in many scenarios.
Here are some reasons, why we need many recipes:

1. If we use Bootstrap5 we may want to add the class `img-fluid`, but not if we use Tailwind
1. If we want an image that fits 1/2 the content-area and we have Bootstrap5, then 100% is 1230px, but a 50% image is 600px because of paddings

So a really amazing configuration will need a LOT of recipes - easily 10-20 per CssFramework.
This is how it's done:

```json
{
  // Default Recipe
  "recipe": {
    "width": 1400,
    "variants": "1*, 2*, 0.5*",
    "setWidth": true,
    // Sub-Recipes, which inherit all the settings from main, unless they override it
    "recipes": [
      {
        // This section would only affect Bootstrap5
        "forCss": "bs5",
        "width": 1230,
        "attributes": {
          "class": "img-fluid"
        },
        // Sub-Sub-Recipes, which inherit from the BS5 and from main, unless they override it
        "recipes": [
          { "forFactor": "1", "width": 1230 },
          { "forFactor": "1/2", "width": 600 },
          { "forFactor": "12/3", "width": 400 },
          { "forFactor": "12/4", "width": 300 }
        ]
      },
      {
        // This section would only affect non-Bootstrap5, as that would match first
        "setWidth": false,  // override default to false
        "attributes": {
          "class": "img"
        }
      }
    ]
  }
}
```

> [!TIP]
> Sub-Recipes inherit everything from the parents.
> This is so you are DRY - you don't have to repeat yourself.
>
> It's important to know that at runtime this is flattened to a table.
> So the hierarchy you see in the JSON is purely to make the configuration easier to write.

> [!TIP]
> Attributes are cummulative, so if a parent-node has attributes and a child-node has other attributes,
> they will be merged.
> Child node attributes will replace parent node attributes.
> To reset an attribute which the parent had set already, use `null` on the child node.

---

## History

* Advanced Json configuration with Recipe added in v13.05, to be released v13.10
