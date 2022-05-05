---
uid: Basics.Images.Guide.Index
---

<img src="~/assets/features/image-resizer.svg" class="feature">

# Images Guide (Best Practices & Code) TODO

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>

Images are a crucial part of every website and CMS. We want to be sure that:

1. Perfect Editing
    1. Editors can easily add images
    1. Editors can give titles to images
    1. Editors can have some control over how the image is shown - but not too much, it must be within the restrictions of the design
1. Perfect Output
    1. Images look great no matter what the editor does
    1. Images are accessible (for people with disabilities, etc.)
    1. Images use the latest possible file formats
    1. Images load quickly - which also requires images to be the best-possible size
1. Perfect SEO & Page Speed
    1. Images are optimized for search engines
    1. Images are optimized for page speed, especially mobile page speed
1. Pefect Control by the Designer
    1. The designer determines how images should look in various scenarios

> [!TIP]
> This guide should help you understand the big &lt;picture&gt; 😏. 
>
> For every detail there is much more technical documentation, which will be linked here. 

## The Parts that Make this Possible

TODO:

1. Edit UI / UX (edit dialog and toolbars)
1. Razor Templates created by the Designer
1. Helpers like the ImageService
1. Automatic image resizing on the server and caching of resized images


TODO: we're still working on these docs

---

---

## History

1. Introduced in 2sxc 5.03
1. Special Razor API to create links called [Link.Image](xref:NetCode.DynamicCode.Objects.Link.Image) introduced in 12.04
1. Introduced [ImageFlow](https://www.imageflow.io/) in v12 for Oqtane
1. Switched to [ImageFlow](https://www.imageflow.io/) in 13.0 for both Dnn and Oqtane
1. Introducing [IImageService](xref:ToSic.Sxc.Services.IImageService) in 13.05 beta, to be released in 13.10