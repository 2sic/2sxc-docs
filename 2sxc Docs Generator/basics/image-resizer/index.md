---
uid: Basics.ImageResizer.Index
---

<img src="~/assets/features/image-resizer.svg" class="feature">

# Image Resizer

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>

2sxc has an awesome Image Resizer built in. 

It's really easy to use - just add url parameters to the image. So instead of `img.jpg` add `img.jpg?w=200` to resize it to 200px width. 

Internally it uses the amazing [ImageFlow](https://www.imageflow.io/) which has the same URL setup as the previous [ImageResizer.net](https://imageresizing.net/).

> [!TIP]
> 2sic 12.04 introduces a helper command [Link.Image(...)](xref:NetCode.DynamicCode.Objects.Link.Image).
> 
> This can be combined with global image-size settings to create consistent image sizes all across your site. 

The docs here are not ready, but you can find [various examples here](https://2sxc.org/learn-extensions/ImageResizer)



---

## History

1. Introduced in 2sxc 5.03
1. Special Razor API to create links called [Link.Image](xref:NetCode.DynamicCode.Objects.Link.Image) introduced in 12.04
1. Introduced [ImageFlow](https://www.imageflow.io/) in v12 for Oqtane
1. Switched to [ImageFlow](https://www.imageflow.io/) in 13.0 for both Dnn and Oqtane
1. Introducing [IImageService](xref:ToSic.Sxc.Services.IImageService) in 13.05 beta, to be released in 13.10