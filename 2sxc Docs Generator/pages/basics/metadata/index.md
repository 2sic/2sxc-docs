---
uid: Basics.Metadata.Index
---

<img src="~/assets/features/metadata.svg" class="feature">

# Metadata - (advanced ⚠)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata** is Data which describes or adds information _to other data_.
In 2sxc/EAV we talk about Metadata being Data which has a **Target** that it applies to.

The 2sxc-EAV system has had extensive **Metadata** functionality built in since v2 but we haven't talked about it much yet.

## Example: File Metadata

Imagine you have a file system containing images and the file system has standard functionality to store data like `file name`, `path`, `file size` and `created` / `modified`.
Sometimes we need more.
Let's assume you wanted to show a gallery with images and you want to manage additional information like `Tags` and a short `Description`.

In this scenario the File is the **Target** and the additional Tags/Description data is the **Metadata**.

## Example: User Metadata

Let's say you have a system which stores basic user data like `UserId`, `UserName` and `Password` and you want to manage additional information like `Biography`.
IF the platform (Dnn) already offers features to manage such additional info, it _is not Metadata_. But if the information is added _on top_ like with a third-party system (like 2sxc) then this is Metadata.

## How 2sxc/EAV uses Metadata

Most internal configuration of 2sxc works as Metadata.

1. **[Fields](xref:Basics.Data.Fields.Index)** on a Content-Type is stored as just the technical Name (which is used in code).  
    Any additional information for the Edit-UI like description, default-value, etc. is stored as Metadata.
1. **[Content-Types](xref:Basics.Data.ContentTypes.Index)** just have some internal IDs and names.  
    Any additional information like description, icon, help-text etc. is stored as Metadata.
1. **[App Configuration](xref:Basics.App.Configuration)** is treated as Metadata
    and most of the stored values are available on the [App object](xref:NetCode.DynamicCode.Objects.App.Index)
1. Various **Apps** like the [](xref:App.FancyBoxGallery) allow the editor to add more information to uploaded images

## How 2sxc Metadata Works

Every Entity in 2sxc can be assigned to any other **Target** data. This happens through a **Target Identifier** which consists of 2 parts:

1. The **Target ID** which can be a _number_, _guid_ or _string_
1. The **[Target Type](xref:Basics.Metadata.TargetTypes)** which is important to ensure that an ID like `5027` is pointing to the person 5027, not the page 5027

Noteworthy to know

1. most entities don't have **Target Identifiers** so most of the data is not Metadata
1. assigning an entity to a target can only be done when the Entity is created and not later on
1. In the data-lists of the Admin-UI you can see if an item is Metadata - it will have a tag-icon in the ID column


## Discover More

1. [](xref:Basics.Metadata.Create)
1. [](xref:Basics.Metadata.Read)
1. [](xref:Basics.Metadata.TargetTypes)
1. [](xref:ToSic.Eav.Metadata)

## Demo App and further links

* [](xref:App.FancyBoxGallery)


---

## History

1. Introduced in 2sxc v2
1. Continuously improved in 2sxc 7, 8, 10 and 11

Shortlink: <https://go.2sxc.org/metadata>
