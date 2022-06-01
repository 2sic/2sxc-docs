---
uid: Basics.Browser.Images
---

# Images in the Browser

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>

**Images** which the browser receives and shows usually come from these sources:

1. **[App Assets](xref:Basics.App.Assets)** located in your App folder  
1. [Content / ADAM Assets](xref:Basics.Content.Assets)
1. Icon-fonts from the App-Assets or CDNs

## Recommendations

1. Use the [Image Resizer](xref:Basics.ImageResizer.Index) as much as possible
1. If you can, use `<picture>` tags and provide multiple sizes/formats based on what the browser needs
1. Be careful with Icon-Fonts, they can hurt your [](xref:Ext.Google.PageSpeed)

## History

1. Added in 2sxc 1.0