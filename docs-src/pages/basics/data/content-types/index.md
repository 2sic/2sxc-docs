---
uid: Basics.Data.ContentTypes.Index
---
# Content-Type (Schema/Object-Type)

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Content-Types**. For an overview check out [](xref:Basics.Data.Index).

## What is a Content-Type?

Every [Entity](xref:Basics.Data.Entities.Index) (_thing_, _record_ or _object_) in 2sxc has a definition of fields it can have. So a `Book` may have fields like Name, Author, Title etc. 
The Content-Type will define what fields exist, what is required and what order the fields will appear in when editing the item. 

> This definition of the _Type_ is called a **Content-Type** and it contains specs as to the exact fields are used and what their field-types are.
> 
> Other systems may call this _Schema_, _Object-Type_, _Object-Structure_ or _Table Definition_

[!include["Before you Start"](~/shared/before-you-start-idynamicentity.md)]

## Where are Content-Types

* [App Content-Types](xref:Basics.Data.ContentTypes.App) - this is the default, these Types are part of an App
* [App Shared Content-Types](xref:Basics.Data.ContentTypes.Shared) - for advanced use cases
* [System Content-Types](xref:Basics.Data.ContentTypes.System) - included in the default installation
* [Global Shared Content-Types](xref:Basics.Data.ContentTypes.Global) - for very advanced use cases

## What's Defined in a Content-Type?


**Content-Types** are a configuration which contains:

1. The list of fields the Content-Type has with the technical name, like `ProfilePhoto`
1. Edit-UI information for the edit form
    1. The order of the fields should be shown in when editing
    1. A user friendly name like `Profile Photo` and editing help texts like `This should only contain head & shoulders`
    1. The **Input-Type** which the UI should show, like `Hyperlink` (which means that it's a link or file)
    1. **Input-Type** configuration, for example `AllowUpload` etc.
1. Optionally some of the Edit-UI information in more languages like `Profilbild` in German
1. Optionally permission information like _May be used in Mobile Apps for read-only_


## Nice to Know: Edit Content-Types

1. Content-Types are configured in the App-Management UIs
1. You can create new Content-Types at any time
1. You can rename a Content-Type at any time
    1. If you change the display-name (like `Blog Post` to `Blog Entry`) then your code doesn't need changes.
    1. If you change the technical name (`BlogPost` to `BlogEntry`) then your code needs to be updated
1. You can delete Content-Types at any time  
    When you delete a Content-Type, all Entities/Items of that type are deleted
1. Content-Types have additional descriptions and help-texts which are shown in the Edit-UI
1. Content-Types can also have an icon, but that's only used in [Content Mode](xref:Basics.Content.Index)


## Nice to Know: Edit Fields of a Content-Type

1. You can always create new fields on a Content-Type  
    When you add new fields, then existing data will have that field, but no values on these fields
1. You can always delete existing fields on a Content-Type  
    When you remove fields, existing data will lose those values
1. You can always rename fields of a Content-Type
    1. When you change the display name of a field (like `Persons Photo` to `Profile Picture`) the technical field name doesn't change, so your code doesn't need modification.
    1. If you change the technical field name (like `ProfilePic` to `ProfilePhoto`) the code must be updated


## Nice to Know: Export / Import Content-Type Definition

1. You can export a Content-Type into a JSON format
1. You can import the Content-Type into another App using upload or drag-n-drop

> [!IMPORTANT]
> Exporting the _Content Type Definition_ exports the schema / fields of that type. 
> 
> Exporting all the _Items of a Content-Type_ is a table-export of all the data. 


---

## Content-Type - More Information

#### Identity of a Content Type: Name and StaticName

Each content-type has a _Name_, which is nice for a human to read, use and program with. There is a second identifier called _StaticName_ which is usually a GUID, but in rare cases it's a string like `App-Settings`. This identifier is used internally - for example when a View references a Content-Type.

#### Storage
Most Content-Types in your App are stored in the [SQL database](xref:Basics.Data.ContentTypes.SqlStorage).
System and global Content-Types are stored in the file system. These are called [](xref:Basics.Data.ContentTypes.FileStorage)

#### Field Types
Each field will be of a simple type like _text/string_, _number_, _boolean (yes/no)_ or other. You can find the list of [types here](xref:Basics.Data.Fields.Index).

#### Relationships
Fields can also be of type [Entity](xref:Basics.Data.Fields.Entity) in which case they point to other items. This would then establish a [Relationship](xref:Basics.Data.Relationships.Index)

#### Input Forms and Fields (like WYSIWYG)
The input mask is automatically generated from the **Content-Type**. Based on the specifications, it will generate the correct [Input-Field](xref:Basics.Data.Fields.Index) like a simple text field, a multiline text field, a WYSIWYG or even a file-uploader. 

#### Scopes

Content-Types have a _Scope_. Read about it [](xref:Basics.Data.Scopes)

## APIs

* [](xref:ToSic.Eav.Data) Namespace has almost everything you see here
* [](xref:ToSic.Eav.Data.IContentType) defines what fields exist, it's the ContentType / Schema
* [](xref:ToSic.Eav.Data.IContentTypeAttribute)
	contains the definition of an attribute
* [](xref:ToSic.Eav.Data.ContentTypeMetadata), [](xref:ToSic.Eav.Metadata.IMetadataOf)  
	contains information about the content-type (like nicer descriptions).
	This is also used for the Attribute-Metadata

## History

1. Introduced in 2sxc 1.0
