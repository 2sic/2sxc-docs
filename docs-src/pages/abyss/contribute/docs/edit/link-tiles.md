---
uid: Abyss.Contribute.Docs.Edit.LinkTiles
---

# Link Tiles

Starting in 2026-03 (new ⭐) we introduced the feature to add link tiles,
showing an icon/emoji and a title, which link to another page.

## Here's an example

The easiest way to create link tiles is using a Markdown list with links and an icon declaration.

```md
* [Read more about GetService in your Code](xref:NetCode.DynamicCode.GetService){title="icon:file-code"}
    this is a subtitle
* [Check out the GetService API](xref:Custom.Hybrid.Razor12.GetService*){title="icon:journal-code"}
* [Typical 2sxc Services you May Need](xref:ToSic.Sxc.Services){title="icon:journal-code"}
* [Dependency Injection in Dnn Modules and Skins](xref:NetCode.PlatformApi.Dnn.DependencyInjection){title="icon:☢️"}
* [Dependency Injection in Oqtane](xref:NetCode.PlatformApi.Oqtane.DependencyInjection){title="icon:🩸"}
```

This will automatically be converted to tiles like this:

* [Read more about GetService in your Code](xref:NetCode.DynamicCode.GetService){title="icon:file-code"}
    this is a subtitle
* [Check out the GetService API](xref:Custom.Hybrid.Razor12.GetService*){title="icon:journal-code"}
* [Typical 2sxc Services you May Need](xref:ToSic.Sxc.Services){title="icon:journal-code"}
* [Dependency Injection in Dnn Modules and Skins](xref:NetCode.PlatformApi.Dnn.DependencyInjection){title="icon:☢️"}
* [Dependency Injection in Oqtane](xref:NetCode.PlatformApi.Oqtane.DependencyInjection){title="icon:🩸"}

## How it works

Each list item contains:

1. A **link**
2. An icon declaration in the link `title` attribute

**Example:**

```md
[Title](link){title="icon:file-code"}
```

The prefix `icon:` tells the converter which icon to use.

**Supported icons:**

* Bootstrap Icons

  Example: `icon:file-code`

* Emoji

  Example: `icon:☢️`

See:
[Bootstrap Icons](https://icons.getbootstrap.com/)

## Optional Subtitle / Description

If you add text **directly under the link without an empty line**, it will become a subtitle inside the tile.

**Example:**

```md
* [Read more about GetService in your Code](xref:NetCode.DynamicCode.GetService){title="icon:file-code"}
    this is a subtitle
```

**Result:**

* [Read more about GetService in your Code](xref:NetCode.DynamicCode.GetService){title="icon:file-code"}
    this is a subtitle

If no additional text is provided, the tile will only show the title.



## History

1. Gallery feature implemented 2026-03
2. Markdown list converter added for simpler authoring 2026-03
