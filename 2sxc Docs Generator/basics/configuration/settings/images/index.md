---
uid: Basics.Configuration.Settings.Images.Index
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Image Resize Settings in 2sxc 

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

This explains the Settings which will be used by subssystemms which...

1. ...generate links for the Image Resizer using the [Link.Image(...)](xref:ToSic.Sxc.Web.ILinkHelper.To*) API
1. ...generate `img` and `picture` tags using the [IImageService](xref:ToSic.Sxc.Services.IImageService)

It is part of the [System Settings](xref:Basics.Configuration.SettingsSystem).
Settings seen here start with `System.Images.`...

## Predefined Image Settings - Overview

These are the names of the predefined configurations. 
You can always create your own and give them other names (like `Blog`) or override these settings. 
You can do this at the global, site or app level.

1. `Content` for any kind of images in the normal content of a page
2. `Lightbox` for images which should open in a lightbox - usually almost full-screen
3. `Screen` for images which cover the entire screen, like page-background images
4. `Section` for images used in page sections, like parallax backgrounds

## Configurations on these Settings

Each of these settings have the following properties:

1. `Width` determines how wide an image should be - this should always be set, as it's very important for image resizing
2. `Height` determines how tall an image should be - in most cases this should be empty
1. `AspectRatio` also determines the `height` of the image, but using a factor of the width - so 2:1 means twice as wide
1. `ResizeMode` how images are resized on the server - typically `crop` is what is used
1. `ScaleMode` determines if resizing also happens, if the desired size is larger than the original image (upscaling)
1. `Advanced` a complex JSON configuration used for advanced tuning of resizing and generation of `img` and `picture` tags using the [ImageService](xref:ToSic.Sxc.Services.IImageService)

> [!NOTE]
> We recommend to use `AspectRatio` instead of `Height` to determine the image height, as it often makes a more consistent look and feel.
> If both `Height` and `AspectRatio` are set, then `AspectRatio` takes precendence.

## Advanced Resize Settings ✨ new! / BETA

Version 13.10 will introduce a new [ImageService](xref:ToSic.Sxc.Services.IImageService) 
which can generate advanced multi-resolution `img` and `picture` tags. 
As the configuration can be quite complex, it is explained here:

### A Resize Recipe

A resize recipe has the following values, most of which are optional:

* Resize Settings
    1. `variants` (string) - determines which variant resolutions will be provided
    1. `width` (int) size of the initial image before variants are applied
* Restrictions
    1. `factor` if set, the rule will only apply to images which should be resized to this factor
    1. `cssFramework` if set, the rule will only apply to images when the page uses this Css Framework
    1. `tag` if set, the rule will only apply to this tag type - either `img` or `source`
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

### Adding Many Recipes

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
    // Sub-Recipes, which inherit all the settings from main, unless they override it
    "recipes": [
      {
        // This section would only affect Bootstrap5
        "cssFramework": "bs5",
        "width": 1230,
        "attributes": {
          "class": "img-fluid"
        },
        // Sub-Sub-Recipes, which inherit from the BS5 and from main, unless they override it
        "recipes": [
          { "factor": "1", "width": 1230 },
          { "factor": "1/2", "width": 600 },
          { "factor": "12/3", "width": 400 },
          { "factor": "12/4", "width": 300 }
        ]
      },
      {
        // This section would only affect non-Bootstrap5, as that would match first
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

## Values in the Images Settings of v12.04 and later

| Part                 | Key                  | Value in Default     | Introduced | Comments
| -------------------- | -------------------- | -------------------- | ------ | ---
| **Images.Content**   |                      |                      | v12.04 | *For sizing Content-Images*
| Images.Content       | Width                | # `1400`             | v12.04 | Full-Content-Width images
| Images.Content       | Height               | # `865`              | v12.04 | Based on golden ratio
| Images.Content       | Quality              | # `75`               | v12.04 | Good average jpg/png compression
| Images.Content       | AspectRatio          | # `1.618`            | v12.04 | Golden Ratio
| Images.Content       | ResizeMode           | $ `crop`             | v12.04 | Will fill area exactly
| Images.Content       | ScaleMode            | $ `both`             | v12.04 | Up-scale small images
| Images.Content       | Advanced             | $ `1/1*,3/4*,1/2*,1/4*` | v13.01 | Sizes to use for SrcSets
| **Images.Lightbox**  |                      |                      | v12.04 | *For Lightbox-Images*
| Images.Lightbox      | Width                | # `2000`             | v12.04 | Full-screen Lightboxes
| Images.Lightbox      | Height               | # `1500`             | v12.04 | 4:3
| Images.Lightbox      | Quality              | # `75`               | v12.04 | Good average jpg/png compression
| Images.Lightbox      | AspectRatio          | # `1.333`            | v12.04 | 4:3
| Images.Lightbox      | ResizeMode           | $ `max`              | v12.04 | Will keep image shape 
| Images.Lightbox      | ScaleMode            | $ `down`             | v12.04 | Only down-scale, never up-scale
| Images.Lightbox      | Advanced             | $ `1/1*,3/4*,1/2*,1/4*` | v13.01 | Sizes to use for SrcSets
| **Images.Screen**    |                      |                      | v12.04 | *For Screen-Size related images like backgrounds*
| Images.Screen        | Width                | # `2000`             | v12.04 | Full-Content-Width images
| Images.Screen        | Height               | # `1500`             | v12.04 | 4:3
| Images.Screen        | Quality              | # `60`               | v12.04 | Stronger jpg/png compression
| Images.Screen        | AspectRatio          | # `1.333`            | v12.04 | 4:3
| Images.Screen        | ResizeMode           | $ `crop`             | v12.04 | Will fill area exactly
| Images.Screen        | ScaleMode            | $ `both`             | v12.04 | Up-scale small images
| Images.Screen        | Advanced             | $ `2400,2000,1600,1200,800,400` | v13.01 | Sizes to use for SrcSets
| **Images.Section**   |                      |                      | v12.04 | *For Backgrounds in Content-Area*
| Images.Section       | Width                | # `1600`             | v12.04 | Full-Content-Width images
| Images.Section       | Height               | # `1200`             | v12.04 | Based on golden ratio
| Images.Section       | Quality              | # `60`               | v12.04 | Stronger jpg/png compression
| Images.Section       | AspectRatio          | # `1.333`            | v12.04 | 4:3
| Images.Section       | ResizeMode           | $ `crop`             | v12.04 | Will fill area exactly
| Images.Section       | ScaleMode            | $ `both`             | v12.04 | Up-scale small images
| Images.Section       | Advanced             | $ `2400,2000,1600,1200,800,400` | v13.01 | Sizes to use for SrcSets


---

## History

* Full Settings Stack introduced in v12.04 and includes the here mentioned Image settings
* Advanced Json configuration added in v13.05