---
uid: Basics.Data.ContentTypes.FileStorage
---

# File-Stored Content-Types

[!include["Data"](../../_shared-content-types-global.md)]

This section explains **File-Stored Content-Types**. For an overview check out [](xref:Basics.Data.Index).

---

Usually [Content-Types](xref:Basics.Data.ContentTypes.Index) are stored in the [database](xref:Basics.Data.ContentTypes.SqlStorage).
For a special use case, content-type definitions can also stored in a json-file.
This is used for [System Content-Types](xref:Basics.Data.ContentTypes.System) and [Global Content-Types](xref:Basics.Data.ContentTypes.Global).
Examples of such types are:

1. configurations of data-sources (like the SqlDataSource in 2sxc 9.8)
2. any kind of input-configuration types (like string-dropdown, etc. starting in 2sxc 9.10)
3. any kind of global types like view metadata etc.

## Overview

Basically the app-repository is a folder which contains content-type definitions in a _contenttype_ sub folder.

The format is the [json-format V1](xref:Basics.DataFormats.JsonV1.ContentType)

### Storage of System Content-Types

This is located in: `/desktopmodules/ToSIC_SexyContent/App_Data/system/contenttypes/`

### Storage of Custom Global Shared Content-Types

This is located in: `/desktopmodules/ToSIC_SexyContent/App_Data/system-custom/contenttypes/`


### Storage of Content-Types which are Part of a Dnn-Extension

Dnn Extensions can include content-types, for example to configure a DataSource which is part of that Dnn Extension.

These files can be anywhere in the system, but the DLL will have to tell 2sxc to load them.


## Limitation: No GUI

As of now the system will pick up the content-types stored there and everything works. BUT there is no built-in UI to edit these. We (2sic) can easily create content-types in a normal 2sxc and export them to json for this purpose, but as of now there is no GUI to do so.

This should not affect you, as it's not meant to be managed by anybody else than us as of now.

## When To Use

You will almost never need these, except for 2 important scenarios:

1. Shared Content-Types across _all_ Apps (similar to [Shared Content-Types](xref:Basics.Data.ContentTypes.Shared))
1. When you create a [custom data-source](xref:NetCode.DataSources.Custom.Index), and want to distribute the Configuration Content-Type along with your DLL

## Future Features & Wishes

1. _App level_ content-types. This would dramatically enhance our ability to upgrade existing apps, as it's easier to detect type-changes.

## History

1. Added in 2sxc 9.7

