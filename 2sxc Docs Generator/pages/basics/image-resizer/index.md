---
uid: Basics.ImageResizer.Index
---

<img src="~/assets/features/image-resizer.svg" class="feature">

# Image Resizer

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>

2sxc has an awesome Image Resizer built in.

It's really easy to use - just add url parameters to the image. So instead of `img.jpg` add `img.jpg?w=200` to resize it to 200px width.

Internally it uses the amazing [ImageFlow](https://www.imageflow.io/) which has the same URL setup as the previous [ImageResizer.net](https://imageresizing.net/).

## How to Use

You can learn about the url parameters in the [](xref:Tut.Img.Parameters)

But normally you won't use them directly, because it's better to use APIs which will set these parameters for you.
Your best options are:

1. The [IImageService](xref:ToSic.Sxc.Services.IImageService) with `.Img(...)` or `.Picture(...)` which will create the best possible _HTML_ for you
1. The [Link.Image(...)](xref:NetCode.DynamicCode.Objects.Link.Image) which will create the best possible _URL_ for you

In most scenarios you will prefer the `IImageService`.
In cases where you need exactly 1 url (like in `background-url` CSS) you will probably use the `Link.Image(...)`.

---

## History

1. Introduced in 2sxc 5.03
1. Special Razor API to create links called [Link.Image](xref:NetCode.DynamicCode.Objects.Link.Image) introduced in 12.04
1. Introduced [ImageFlow](https://www.imageflow.io/) in v12 for Oqtane
1. Switched to [ImageFlow](https://www.imageflow.io/) in 13.0 for both Dnn and Oqtane
1. Introducing [IImageService](xref:ToSic.Sxc.Services.IImageService) in 13.05 beta, to be released in 13.10

Shortlink: <https://r.2sxc.org/resize>
