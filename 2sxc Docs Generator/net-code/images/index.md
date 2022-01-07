---
uid: NetCode.Images.Index
---
# Responsive Images API in .net

Creating perfect responsive images can be really hard. 


Aspects which are covered

1. Creating `img` tags with perfect `srcset`s
1. Creating `picture` tags with perfect `source` tags for each appropriate format and size
1. Automatically using [Settings] to create the predefined sizes...
1. ...or manually specify other sizes

## Example

TODO: LINK TO EXAMPLES

## How This Works TODO:

FORMAT lookup

Settings lookup

SrcSet automation

generate stuff

RazorBlade Tags



## Guide Basic

### 1. Prepare

Always start by getting the [](xref:ToSic.Sxc.Services.IImageService) - you will usually just get this once per Razor template:

```c#
var imgService = GetService<ToSic.Sxc.Services.IImageService>();
```

If needed, prepare resize settings using the [ResizeSettings(...)](xref:ToSic.Sxc.Services.IImageService.ResizeSettings*). 
This is probably only needed in ca. 10% of all cases, because the defaults are usually what you want to use.
If you want to do this, see further explanations further down. 

### 2. Get the Responsive Object

Get the responsive [Image](xref:ToSic.Sxc.Images.IResponsiveImage) or [Picture](xref:ToSic.Sxc.Images.IResponsivePicture) 
using the [Img(...)](xref:ToSic.Sxc.Services.IImageService.Img*) or [Picture(...)](xref:ToSic.Sxc.Services.IImageService.Picture*).

```c#
// Example for a file in the App folder
var appIconImg = imgService.Img(App.Path + "/app-icon.png");
var appIconPicture = imgService.Picture(App.Path + "/app-icon.png");
// Example for an image on a dynamic-data object
var blogPicImg = imgService.Img(blogPost.Image);
```

### 3. Output

When creating the HTML you have many options. The most basic is just to show the result:

```razor
@appIconImg
@appIconPicture
```

## Guide Advanced

### Resize Settings

If no settings are provided, the `Settings.Images.Content` [see settings](xref:Basics.Configuration.SettingsSystem) will be used automatically.

The most common scenario is that you have a razor template which shows images that are typically half or a third the size of the normal content. 
In such a case you would also supply a factor in various possible formats.
Here some examples:

```c#
var blogPicImgHalf = imgService.Img(blogPost.Image, factor: 0.5);
var blogPicImgThird = imgService.Img(blogPost.Image, factor: "1/3");
var blogPicImg2Thirds = imgService.Img(blogPost.Image, factor: "2:3");
```

You can also use other settings, like `Settings.Images.Screen` for larger settings.
This can also be combined with factor - here's an example:

```c#
var background = imgService.Img(blogPost.Image, settings: Settings.Images.Screen);
var backgroundSmaller = imgService.Img(blogPost.Image, settings: Settings.Images.Screen, factor: 0.9);
```

You can also use custom settings like this:

```c#
var resizeSettings = imgService.ResizeSettings(width: 1000, quality: 75, aspectRatio: "16/9");
var img = imgService.Img(blogPost.Image, settings: resizeSettings);
```

And you can merge standard settings with your custom settings like this:

```c#
var resizeSettings = imgService.ResizeSettings(settings: Settings.Images.Custom, width: 1000, quality: 75, aspectRatio: "16/9");
var img = imgService.Img(blogPost.Image, settings: resizeSettings);
```

### Image `alt` Description or `class` Attribute

These are the most common things you may want to specify, so the `Img(...)` and `Picture(...)` tag support this in the initial call:

```c#
var img = imgService.Img(blogPost.Image, imgAlt: blogPost.Title, imgClass: "some-class-names");
```

Other attributes can be set as well, but it's more complicated. See custom Output below. 


### Custom Output TODO:

In most cases you'll just want to show the image or picture, like this:

```razor
@{
  var img = imgService.Img(blogPost.Image);
  var picture = imgService.Picture(blogPost.Image);
}
@* Now just show them *@
@img
@picture
```

But you may need to customize more what the output shows. 
Let's assume you want to give the `<img>` and `<picture>` tag a special `id` here's what you would do:

```razor
@{
  var img = imgService.Img(blogPost.Image);
  img.ImgTag.Id("mainImg");
  var picture = imgService.Picture(blogPost.Image);
  picture.ImgTag.Id("mainImg");
  picture.PictureTag.Id("mainPic");
}
@* Now just show them *@
@img
@picture
```

The img and picture variables are [](xref:ToSic.Sxc.Images.IResponsiveImage) and [](xref:ToSic.Sxc.Images.IResponsivePicture) objects. 

The `ImgTag` and `PictureTag` properties are [RazorBlade](xref:NetCode.RazorBlade.Index) objects and can be customized using the RazorBlade fluid Tag API.

In case you want even more control over your output, you can also piece it together yourself:

```razor
@{
  var img = imgService.Img(blogPost.Image);
  var picture = imgService.Picture(blogPost.Image);
}
@* Show the Image with some custom changes *@
@img.Id("imgId").Style("width: 33%")

@* Show your own Image tag *@
<img src="@img.Url" srcset="@img.SrcSet" alt="some alt text">

@* Show the picture with some custom changes on the <picture> *@
@picture.PictureTag.Id("picId")

@* Show the picture with some custom changes on the <picture> and <img> *@
@{
  picture.PictureTag.Id("picId");
  picture.ImgTag.Style("width: 30%");
}
@picture

@* Piece together your own responsive picture tag simple option *@
<picture>
  @picture.SourceTags
  @picture.ImgTag.Style("width: 30%")
</picture>

@* Piece together your own responsive picture tag simple option *@
<picture>
  @picture.SourceTags
  <img src="@picture.Url" style="width: 30%">
</picture>

@* Piece together your own responsive picture tag simple option *@
<picture>
  @foreach(var source in picSet.SourceTags){
    @source.Sizes("some-sizes")
  }
  <img src="@picture.Url" style="width: 30%">
</picture>

```


## SrcSet Parameters

The `srcSet` will default to the ones given in the settings, or you can specify your own. 

👉 Read more about [](xref:NetCode.Images.SrcSet)

In cases where you are generating other custom code and need properly created SrcSet values, you can also use:

👉 [](xref:ToSic.Sxc.Services.IImageService.SrcSet*)



## What you Need To Know

1. The (new) API lies in the namespace `ToSic.Sxc.Services` - see [](xref:ToSic.Sxc.Services)
1. The `IImageService` will do all the magic - see [](xref:ToSic.Sxc.Services.IImageService)

TODO:




## Read also

...

## History

1. Introduced in 2sxc 13.01
1. Moved from the static object `Features` to a proper Sxc Service in v13.01
1. Added nameId checks for more readable code in v13.01