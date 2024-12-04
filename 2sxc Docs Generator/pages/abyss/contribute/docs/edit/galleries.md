---
uid: Abyss.Contribute.Docs.Edit.Galleries
---

# Image Galleries

All images automatically get a [Lightbox attached](xref:Abyss.Contribute.Docs.Edit.Images),
but you can also create galleries.

Galleries are made by placing a `<div gallery="name">` around a set of images.
This has 2 effects:

1. All images will automatically be sized much smaller, so they appear as thumbnails.
2. The javascript which attaches the lightbox will know that these images belong together.

Here's an example:

```html
<div gallery="gallery4">
  <img src="./assets/existing-inherit-01.jpg">
  <img src="./assets/existing-inherit-02.jpg">
  <img src="./assets/existing-inherit-03.jpg">
</div>
```

## Implementation Details

The mechanics behind this are a combination of Fancybox (a lightbox library) and a custom script which will automatically attach the lightbox to all images and group them together.

---

## History

1. Gallery feature implemented 2024-11
