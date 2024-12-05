---
uid: NetCode.DynamicCode.Objects.Link.Image
---

<img src="~/assets/features/image-resizer.svg" class="feature">

# Link.Image(...) / @Link.Image Method in Dynamic Code

Linking images - especially images which should be automatically resized - can be tricky. This is where `Link.Image(...)` helps. 

> [!TIP]
> 2sxc 13.10 adds a new [ImageService](xref:Basics.Images.Guide.Index) which helps generate the best possible HTML for images. 
> 
> Only use the `Link.Image(...)` where really necessary, because the `IImageService` is usually the better choice.


## Simple Examples

```html
<!-- simple example -->
<img src='@Link.Image(Content.MainPicture)'>

<!-- simple example with resize -->
<img src='@Link.Image(url: "test.jpg", width: 250, height: 700)'>

<!-- simple example with resize and custom quality -->
<img src='@Link.Image(url: "test.jpg", width: 250, height: 700, quality: 75.2)'>
```

## Using Preconfigured Image Sizes

The `Image` method can also use predefined image configuration. This uses the new [Settings System](xref:Basics.Configuration.Index).

```html
<!-- Resize an image to the default of content -->
<img src='@Link.Image(url: "test.jpg", settings: Settings.Images.Content)'>

<!-- Resize an image to the default of lightboxes -->
<img src='@Link.Image(url: "test.jpg", settings: Settings.Images.Lightbox)'>

<!-- Resize an image to the default of screen / backgrounds -->
<img src='@Link.Image(url: "test.jpg", settings: Settings.Images.Screen)'>

<!-- Resize an image to HALF the size of a default content -->
<img src='@Link.Image(url: "test.jpg", settings: Settings.Images.Content, factor: 0.5)'>
```

> [!TIP]
> This is very powerful and is the recommended way to resize images,
> because this way all images follow the same sizes / proportions in all your apps.

## Parameters

To promote long term API stability, we require most parameters to be [named](xref:NetCode.Conventions.NamedParameters) when used. 
This allows us to add further parameters later on, and the calls will still work.

The first three parameters don't need naming, as they will be the most used. They are these in this order:

1. `url` - the only required parameter
2. `settings` - optional, would be an [image-settings configuration](xref:Basics.Configuration.SettingsSystem)
3. `factor` - optional multiplier - eg. 0.5 to be half the size of the preset configuration

All other parameters need to be named:

* `width` width in pixels
* `height` height in pixels
* `quality` a quality factor between 1 and 100; eg. jpgs usually have 50 - 80
* `resizeMode` which can be `max`, `crop`, `pad` etc.
* `scaleMode` which can be `up`, `down` (default) or `both`
* `format` which can be `jpg`, `png`, `gif`
* `aspectRatio` 

So this will work:

```c#
@Link.Image("test.jpg", Settings.Images.Content, 0.5)
@Link.Image(url: "test.jpg", settings: Settings.Images.Content, factor: 0.5)
@Link.Image("test.jpg", width: 200)
```

...and this won't:

```c#
@Link.Image("test.jpg", 200)
```


## Demo App and further links

🎓 [](xref:Tut.Img.LinkImage)

📔 [](xref:Basics.Images.Guide.Index)

## History

1. Introduced in 2sxc 12.04
1. For many cases you should now use the ImageService in 2sxc 13.10+