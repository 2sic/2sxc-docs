---
uid: Abyss.Contribute.Docs.Edit.LinkTiles
---

# Link Tiles

Starting in 2026-03 (new ⭐) we introduced the feature to add link tiles,
showing an icon/emoji and a title, which link to another page.

Here's an example:

```html
<div docs-tiles>
  <div icon="file-code" title="Read more about GetService in your Code">
    <a href="xref:NetCode.DynamicCode.GetService"></a>
  </div>
  
  <div icon="journal-code" title="Check out the GetService API">
    <a href="xref:Custom.Hybrid.Razor12.GetService*"></a>
  </div>

  <div icon="journal-code" title="Typical 2sxc Services you May Need">
    <a href="xref:ToSic.Sxc.Services"></a>
  </div>

  <div icon="☢️" title="Dependency Injection in Dnn Modules and Skins">
    <a href="xref:NetCode.PlatformApi.Dnn.DependencyInjection"></a>
  </div>

  <div icon="🩸" title="Dependency Injection in Oqtane">
    <a href="xref:NetCode.PlatformApi.Oqtane.DependencyInjection"></a>
  </div>
</div>
```

This will then look like this:

<div docs-tiles>
  <div icon="file-code" title="Read more about GetService in your Code">
    <a href="xref:NetCode.DynamicCode.GetService"></a>
  </div>
  
  <div icon="journal-code" title="Check out the GetService API">
    <a href="xref:Custom.Hybrid.Razor12.GetService*"></a>
  </div>

  <div icon="journal-code" title="Typical 2sxc Services you May Need">
    <a href="xref:ToSic.Sxc.Services"></a>
  </div>

  <div icon="☢️" title="Dependency Injection in Dnn Modules and Skins">
    <a href="xref:NetCode.PlatformApi.Dnn.DependencyInjection"></a>
  </div>

  <div icon="🩸" title="Dependency Injection in Oqtane">
    <a href="xref:NetCode.PlatformApi.Oqtane.DependencyInjection"></a>
  </div>
</div>

## Usage

1. Always start with the wrapper `<div docs-tiles>`.
1. Then add a `<div>` for each tile, with the following attributes:
    - `icon` - the name of the [bootstrap icon](https://icons.getbootstrap.com/) to use, or an emoji
    - `title` - the title to show on the tile
1. Inside the tile div, add an `<a>` tag with the `href` pointing to the page you want to link to.

## Implementation Details

The mechanics behind this are a combination of CSS and JS.

1. The styles have a few classes that make it work, specifically `docs-tiles .card`
1. A JS called `convertDocsTiles` is run at startup to convert the HTML into the final output.

---

## History

1. Gallery feature implemented 2026-03
