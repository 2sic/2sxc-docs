---
uid: Abyss.Contribute.Docs.Edit.Images
---

# Working with Images & Lightboxes

## Location for Normal Files

This applies to screenshots and other illustrations such as diagrams, etc.

The principle is that images should be placed near the content which references them.
This makes it easier to understand the context and also makes it easier to maintain the documentation.

> [!TIP]
> Images should usually be placed in a subfolder called `./assets/` near
> the markdown file which references them.

## Location for Re-Used Logos

Use the `/assets` root folder and stick to the structure there:

* `/assets` (contains all the assets)
  * `logos` (contains various logos, for re-use in various versions)
  * `features` (feature logos used in page headers)

If you have any other image/file needs which need different structure, please discuss with Daniel @iJungleboy.

## File Naming

Use lower case, kebab-case file names for images, like `my-image.png`.

## Original Images

Always keep the original images in the repository, in the same folder as the final image.
For example, we have a lot of `.snagx` files (SnagIt) which would allow us to make adjustments like correct arrows etc.


## Insert Images (Markdown vs. HTML)

Images can be added it two ways - using markdown, or the HTML counterpart.
We recommend to always place images in an `assets` folder below
the markdown file you're using the image on.


Use the **Markdown** syntax

```markdown
![alt-text](/assets/path/file.ext)
```

Use the **HTML** syntax which allows to to set `class` and more.

```html
<img src="/assets/path/file.ext" alt="alt-text">
```

We usually prefer the `<img>` syntax, because we often need to add classes or other attributes.


## Lightboxes

These docs were crafted to include Fancybox lightboxes for images.
Images will automatically get a lightbox attached when running in the browser.

This happens automatically because the [technical implementation](xref:Abyss.Contribute.Docs.Implementation.Index)
has a special JS file which will automatically attach the lightbox to all images.

This happens in the `/templates/2sxc/src/images.ts` file.

Note that it only applies this to images which are _not_ logos or other special images.

---


## History

1. Lightbox feature implemented ca. 2018
1. Gallery feature implemented 2024-11
