---
uid: Basics.Images.Perfection.Index
---

<img src="~/assets/features/image-resizer.svg" class="feature">

# Images Perfection

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>  .context-box-summary .image-resizer    { visibility: visible; } </style>

Perfect images in HTML will have a big impact on User Experience and SEO

1. Pages load faster
1. The browser loads images in the perfect size based on it's screen
1. Google PageSpeed returns a better score
1. Mobile devices are much faster

For perfect images, you must do quite a bit

1. Images should load lazy
1. Images should specify width and if possible, height
1. Images should be resized on the server to match what's needed
1. In most cases, use a `<picture>` tag instead of `img` so you can provide multiple formats such as jpg and webp
1. You should provide the best possible format (often webp)
1. You should provide multiple formats (jpg/webp, png/webp) so browsers can pick
1. You should provide multiple sizes so the browser can pick the best one
1. You should include resolution-factors or screen-factors for the sizes
1. You should include sizes-information so the browser can better select the perfect resolution

All this while still

1. Using images the content-editor added
1. ...with optional custom alt-text adjusting to the editors needs (sometimes it should crop, sometimes not, ...)
1. Automatically behave differently depending on the format (svg, png, jpg, etc.)
1. Automatically behave differently depending on the size that should be shown (like 1/3 of the screen)
1. Automatically give larger images when the screen gets smaller (eg. when a 1/3rd image becomes full-width)

So instead of this...

```html
<img src="/[path]/jellyfish-img-srcset-2000.jpg" />
```

...you should provide this for every image you have:

```html
<picture>
  <source
    type="image/webp"
    srcset="
      /[path]/jellyfish-img-srcset-2000.jpg?w=2460&amp;h=1520&amp;quality=75&amp;mode=crop&amp;scale=both&amp;format=webp 2460w,
      /[path]/jellyfish-img-srcset-2000.jpg?w=1230&amp;h=760&amp;quality=75&amp;mode=crop&amp;scale=both&amp;format=webp  1230w,
      /[path]/jellyfish-img-srcset-2000.jpg?w=922&amp;h=569&amp;quality=75&amp;mode=crop&amp;scale=both&amp;format=webp    922w,
      /[path]/jellyfish-img-srcset-2000.jpg?w=615&amp;h=380&amp;quality=75&amp;mode=crop&amp;scale=both&amp;format=webp    615w
    "
    sizes="(max-width: 1400px) 100vw, 1230px"
  />
  <source
    type="image/jpeg"
    srcset="
      /[path]/jellyfish-img-srcset-2000.jpg?w=2460&amp;h=1520&amp;quality=75&amp;mode=crop&amp;scale=both 2460w,
      /[path]/jellyfish-img-srcset-2000.jpg?w=1230&amp;h=760&amp;quality=75&amp;mode=crop&amp;scale=both  1230w,
      /[path]/jellyfish-img-srcset-2000.jpg?w=922&amp;h=569&amp;quality=75&amp;mode=crop&amp;scale=both    922w,
      /[path]/jellyfish-img-srcset-2000.jpg?w=615&amp;h=380&amp;quality=75&amp;mode=crop&amp;scale=both    615w
    "
    sizes="(max-width: 1400px) 100vw, 1230px"
  />
  <img
    src="/[path]/jellyfish-img-srcset-2000.jpg?w=1230&amp;h=760&amp;quality=75&amp;mode=crop&amp;scale=both"
    loading="lazy"
    class="img-fluid"
    width="1230"
    height="760"
  />
</picture>

```

## Super Easy with Image Service

2sxc 14 introduced the [Image Service](xref:ToSic.Sxc.Services.IImageService).
It will do all of this and more, and is super configurable. So to get the entire code above all you need is this:

```razor
@Kit.Image.Picture(App.Path + "/img/assets/jellyfish-img-srcset-2000.jpg")
```

🎓 See a live example in the [tutorials](https://2sxc.org/dnn-tutorials/en/razor/img106/page)

All of it is fully automated.
By default, you will get the core functionality such as automatic resize etc.

The full scope of features requires a **Patron Perfectionist** licenses for 10 USD/month.
Only then will all the things you see above work.
Otherwise you can still code it yourself 😉.

🦸🏻‍♀️ Learn about [Patron Perfectionist](https://patrons.2sxc.org/features/package/015077bb-9829-4291-bf99-244d8ba3b100)

🦸🏻‍♀️ Learn about [becoming a Patron](xref:Basics.LnF.Index)

## More

Some Tutorials to learn this

* [](xref:Tut.Img.Img)
* [](xref:Tut.Img.Picture)
* [](xref:Tut.Img.Guide)

You can also do some really advanced custom configuration to change how the resizer behaves.

👉🏼 Read more about [Image Settings](xref:Basics.Configuration.Settings.Images.Index)

👉🏼 Read more about [Image Recipes](xref:Basics.Configuration.Settings.Images.Recipes)


---

## History

1. Added in v14
