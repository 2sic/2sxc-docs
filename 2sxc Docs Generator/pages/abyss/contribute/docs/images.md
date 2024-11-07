---
uid: Abyss.Contribute.Docs.Images
---

# Working with Images, Lightboxes and Galleries

## File Handling

### Location for Normal Content

This applies to screenshots and other illustrations such as diagrams, etc.

The principle is that images should be placed near the content which references them.
This makes it easier to understand the context and also makes it easier to maintain the documentation.

> [!TIP]
> Images should usually be placed in a subfolder called `./assets/` near
> the markdown file which references them.

### Location for Re-Used Logos

Use the `/assets` root folder and stick to the structure there:

* `/assets` (contains all the assets)
  * `logos` (contains various logos, for re-use in various versions)
  * `features` (feature logos used in page headers)

If you have any other image/file needs which need different structure, please discuss with Daniel @iJungleboy.

### File Naming

Use lower case, kebab-case file names for images, like `my-image.png`.

### Original Images

Always keep the original images in the repository, in the same folder as the final image.
For example, we have a lot of `.snagx` files (SnagIt) which would allow us to make adjustments like correct arrows etc.


## Insert Images (Markdown vs. HTML)

Images can be inserted in two ways:

1. **Markdown**: Use the markdown syntax `![alt-text](/assets/path/file.ext)`
2. **HTML**: Use the HTML `<img src="/assets/path/file.ext" alt="alt-text">`

We usually prefer the `<img>` syntax, because we often need to add classes or other attributes.


## Lightboxes & Galleries

## Lightboxes

These docs were crafted to include Fancybox lightboxes for images.
Images will automatically get a lightbox attached when running in the browser.

This happens automatically because the [technical implementation](xref:Abyss.Contribute.Docs.Implemtation)
has a special JS file which will automatically attach the lightbox to all images.

This happens in the `/templates/2sxc/src/images.ts` file.

Note that it only applies this to images which are _not_ logos or other special images.

## Galleries

Galleries are made by placing a `<div gallery="name">` around a set of images.
This has 2 effects:

1. All images will automatically be sized much smaller, so they appear as thumbnails.
2. The javascript which attaches the lightbox will know that these images belong together.

Here's an example:

```html
<div gallery="existing-inherit">
  <img src="./assets/existing-inherit-01.jpg">
  <img src="./assets/existing-inherit-02.jpg">
  <img src="./assets/existing-inherit-03.jpg">
</div>
```

---

## History

1. Lightbox feature implemented ca. 2018
1. Gallery feature implemented 2024-11
