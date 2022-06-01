---
uid: NetCode.DynamicCode.AsAdam
---

# AsAdam(...) Command

[!include["ADAM Summary"](~/pages/basics/cms/adam/_shared-what-is-adam.md)]

When a content-item has a `Library` field (see [](xref:Basics.Data.Fields.Hyperlink-Library)) your code needs to get a list of all the files and folders of that field. For example to show galleries. 
This is where `AsAdam(...)` comes in. It gives you the ADAM parts of this field.

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.AsAdam*).

Basically all you need for `AsAdam(...)` is

1. The Content Item (Entity or DynamicEntity)
1. The field name of which you want the Adam objects

As a result you'll get an [](xref:ToSic.Sxc.Adam.IFolder) object with which you can get all files in the folder or subfolders. 


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Example

This example is taken from the [Fancybox Gallery App](xref:App.FancyBoxGallery)

```razor
@inherits Custom.Hybrid.Razor12
@using ToSic.Razor.Blade;
@using Dynlist = System.Collections.Generic.IEnumerable<dynamic>;

<div class="ga-wrapper">
  <div class="ga-albums row">
    @foreach (var album in AsList(Data)) {
      var images = AsAdam(album, "Images").Files as Dynlist;
      var albumThumbUrl = Text.Has(album.AlbumThumbnail)
        ? album.AlbumThumbnail
        : images.First().Url;

      <div class="ga-album col-12 col-sm-6 col-md-6 col-lg-4" @Edit.TagToolbar(album)>
        <a href='@Tags.SafeUrl(Link.To(parameters: "mid/" + Dnn.Module.ModuleID + "&album=" + album.Path))'>
          <div class="ga-img">
            <div class="overlay">
              <div class="ga-album-title"><h5 class="ga-title">@album.Title</h5></div>
              <div class="ga-files-count"><span class="badge badge-pill badge-dark float-right">@images.Count()</span></div>
            </div>
            <img class="img-fluid" src='@Tags.SafeUrl(albumThumbUrl + "?w=720&h=500&mode=crop&scale=both&quality=80")' alt="@album.Title" />
          </div>
        </a>
      </div>
    }
  </div>
</div>
```

We suggest you check out some apps which use ADAM to see how they work. 

## Also Read

* [](xref:Basics.Cms.Adam.Index)
* [](xref:ToSic.Sxc.Adam)
* check out `AsAdam(...)` in the [](xref:ToSic.Sxc.Dnn.RazorComponent) and [](xref:ToSic.Sxc.Dnn.ApiController)


## History

1. General Tokens introduced in 2sxc 8.0
1. Added extra security switch in 2sxc 9.32
