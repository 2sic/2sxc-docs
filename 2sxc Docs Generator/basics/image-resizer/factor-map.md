---
uid: Basics.ImageResizer.FactorMapWIP
---

<img src="~/assets/features/image-resizer.svg" width="100%">

# Image Resizing - Factor Map

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>


TODO!!!

```
1=1320;SrcMap=...
0.75=810;
0.5=600;SrcMap=810
0.33=320

```







2sxc has an awesome Image Resizer built in. 

It's really easy to use - just add url parameters to the image. So instead of `img.jpg` add `img.jpg?w=200` to resize it to 200px width. 

Internally it uses the amazing [ImageResizer.net](https://imageresizing.net/).

> [!TIP]
> 2sic 12.04 introduces a helper command [Link.Image(...)](xref:NetCode.DynamicCode.Objects.Link.Image).
> 
> This can be combined with global image-size settings to create consistent image sizes all across your site. 

The docs here are not ready, but you can find [various examples here](https://2sxc.org/learn-extensions/ImageResizer)


<!-- [!include[](~/assets/features/image-resizer.md)] -->

## Read More

* [](xref:Basics.App.FolderStructure)
* [](xref:Basics.App.Assets)
* [Content Assets / Images](xref:Basics.Content.Assets)

---

## History

1. Introduced in 2sxc 5.03
1. Special Razor API to create links called [Link.Image](xref:NetCode.DynamicCode.Objects.Link.Image) introduced in 12.04