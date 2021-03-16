---
uid: Basics.Data.Metadata.Index
---

# Metadata - (advanced ⚠)

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata** is Data which describes or adds information _to other data_. 
In 2sxc/EAV we talk about Metadata being Data which has a **Target** that it applies to. 

The 2sxc-EAV system has had extensive **Metadata** functionality built in since v2 but we haven't talked about it much yet.

## Examples

### Example: File Metadata

Imagine you have a file system containing images and the file system has standard functionality to store data like `file name`, `path`, `file size` and `created` / `modified`. 
Sometimes we need more. 
Let's assume you wanted to show a gallery with images and you want to manage additional information like `Tags` and a short `Description`. 

In this scenario the File is the **Target** and the additional Tags/Description data is the **Metadata**. 

### Example: User Metadata

Let's say you have a system which stores basic user data like `UserId`, `UserName` and `Password` and you want to manage additional information like `Biography`. 
IF the platform (DNN) already offers features to manage such additional info, it _is not Metadata_. But if the information is added _on top_ like with a third-party system (like 2sxc) then this is Metadata.

## How 2sxc/EAV uses Metadata

Most internal configuration of 2sxc works as Metadata. 

1. **[Fields](xref:Basics.Data.Fields.Index)** on a Content-Type is stored as just the technical Name (which is used in code).  
    Any additional information for the Edit-UI like description, default-value, etc. is stored as Metadata. 
1. **[Content-Types](xref:Basics.Data.ContentTypes.Index)** just have some internal IDs and names.  
    Any additional information like description, icon, help-text etc. is stored as Metadata.
1. **[App Configuration](xref:Basics.App.Configuration)** is treated as Metadata 
    and most of the stored values are available on the [App object](xref:NetCode.DynamicCode.Objects.App.Index)


## How Apps & Content use Metadata

Various Apps like the [](xref:App.FancyBoxGallery) allow the editor to add more information to uploaded images. 

## How 2sxc Metadata Works

Every Entity in 2sxc can be assigned to any other **Target** data. This happens through a **Target Identifier** which consists of 2 parts:

1. The **Target ID** which can be a _number_, _guid_ or _string_ 
1. The **[Target Type](xref:Basics.Data.Metadata.TargetTypes)** which is important to ensure that an ID like `5027` is pointing to the person 5027, not the page 5027

Noteworthy to know

1. most entities don't have **Target Identifiers** so most of the data is not Metadata
1. assigning an entity to a target can only be done when the Entity is created and not later on
1. In the data-lists of the Admin-UI you can see if an item is Metadata - it will have a tag-icon in the ID column


## Create Metadata

Metadata can be created in 3 ways

1. Through the **Edit-UI**: If the toolbar which opens a `new` dialog adds metadata information, then the newly created item will be stored as metadata
1. In the **REST WebAPI**: the REST calls for creating new data can contain target information
1. In the [App.Data.Create(...)](xref:NetCode.DynamicCode.Objects.App.Index): The `Create(...)` command can include target information 

## Access / Read Metadata

Many standard 2sxc object have a property **Metadata** to quickly access all Metadata of that object. You can find the docs in [](xref:ToSic.Eav.Metadata.IMetadataOf). This applies to all kinds of objects like

1. Entities
1. Content-Types
1. Apps
1. ADAM files and folders

To read Metadata for non-2sxc objects you must request it from the **App.Data.Metadata** or from the [AppState](xref:ToSic.Eav.Apps.AppState).MetadataSource object. Both are a a [](xref:ToSic.Eav.Metadata.IMetadataSource). Use commands like `GetMetadata<T>(...)` to access the metadata you need. 




## Opening the Dialog for Metadata #todoc


## How to use #todoc

Introtext - then code:

```cs
    // Some Code

```
Short explanation for the code

```javascript
    // maybe more code

```
More explanations 


## Read also #todoc


## Demo App and further links #todoc


## History

1. Introduced in 2sxc v2
2. 

