---
uid: Basics.Configuration.Settings.Images.Index
---

<img src="~/assets/features/settings-stack.svg" class="feature">

# Image Resize Settings in 2sxc 

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-configuration { visibility: visible; }</style>

This explains the Settings which will be used by subssystemms which...

1. ...generate links for the Image Resizer using the [Link.Image(...)](xref:ToSic.Sxc.Services.ILinkService.To*) API
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
1. `Advanced` a complex JSON configuration used for advanced tuning of resizing and generation of `img` and `picture` tags.
    It uses the [ImageService](xref:ToSic.Sxc.Services.IImageService).  
    👉 see [](xref:Basics.Configuration.Settings.Images.Recipes)

> [!NOTE]
> We recommend to use `AspectRatio` instead of `Height` to determine the image height, as it often makes a more consistent look and feel.
> If both `Height` and `AspectRatio` are set, then `AspectRatio` takes precendence.

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
| Images.Content       | Advanced             | $ `{...complex...}`  | v13.10 | Sizes to use for SrcSets
| **Images.Lightbox**  |                      |                      | v12.04 | *For Lightbox-Images*
| Images.Lightbox      | Width                | # `2000`             | v12.04 | Full-screen Lightboxes
| Images.Lightbox      | Height               | # `1500`             | v12.04 | 4:3
| Images.Lightbox      | Quality              | # `75`               | v12.04 | Good average jpg/png compression
| Images.Lightbox      | AspectRatio          | # `1.333`            | v12.04 | 4:3
| Images.Lightbox      | ResizeMode           | $ `max`              | v12.04 | Will keep image shape 
| Images.Lightbox      | ScaleMode            | $ `down`             | v12.04 | Only down-scale, never up-scale
| Images.Lightbox      | Advanced             | $ `{...complex...}`  | v13.10 | Sizes to use for SrcSets
| **Images.Screen**    |                      |                      | v12.04 | *For Screen-Size related images like backgrounds*
| Images.Screen        | Width                | # `2000`             | v12.04 | Full-Content-Width images
| Images.Screen        | Height               | # `1500`             | v12.04 | 4:3
| Images.Screen        | Quality              | # `60`               | v12.04 | Stronger jpg/png compression
| Images.Screen        | AspectRatio          | # `1.333`            | v12.04 | 4:3
| Images.Screen        | ResizeMode           | $ `crop`             | v12.04 | Will fill area exactly
| Images.Screen        | ScaleMode            | $ `both`             | v12.04 | Up-scale small images
| Images.Screen        | Advanced             | $ `{...complex...}`  | v13.10 | Sizes to use for SrcSets
| **Images.Section**   |                      |                      | v12.04 | *For Backgrounds in Content-Area*
| Images.Section       | Width                | # `1600`             | v12.04 | Full-Content-Width images
| Images.Section       | Height               | # `1200`             | v12.04 | Based on golden ratio
| Images.Section       | Quality              | # `60`               | v12.04 | Stronger jpg/png compression
| Images.Section       | AspectRatio          | # `1.333`            | v12.04 | 4:3
| Images.Section       | ResizeMode           | $ `crop`             | v12.04 | Will fill area exactly
| Images.Section       | ScaleMode            | $ `both`             | v12.04 | Up-scale small images
| Images.Section       | Advanced             | $ `{...complex...}`  | v13.10 | Sizes to use for SrcSets



---

## History

* Full Settings Stack introduced in v12.04 and includes the here mentioned Image settings
* Advanced Json configuration with [recipes](xref:Basics.Configuration.Settings.Images.Recipes) added in v13.05