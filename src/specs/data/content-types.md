---
uid: Specs.Data.ContentTypes
---
# Content-Types, aka Schemas/Object-Types

Every _thing_, _record_ or _object_ in 2sxc has a definition of fields it can have. So a `Book` may have fields like Name, Author, Title etc. This definition of the _Type_ is called a **Content-Type** and it contains specs as to the exact fields are used and what their field-types are.

> Other systems may call this _Content Type_, _Schema_, _Object-Type_ or _Table Definition_

[!include["Before you Start"](../../shared/before-you-start-idynamicentity.md)]

## ContentType - The Schema and Field-Definitions

Content-Types are structured as follows:  
 
<br>
<img src="/assets/specs/data/contenttype.png" width="100%">
<br>

## How it Works

Each [Entity](xref:Specs.Data.Entities) has many fields, some containing text, numbers etc. The fields an Entity can have is defined in the **Content-Type**, so each Entity is like a record of that type. The Content-Type will define what fields exist, what is required and what order the fields will appear in when editing the item. 

#### Identity of a Content Type: Name and StaticName

Each content-type has a _Name_, which is nice for a human to read, use and program with. There is a second identifier called _StaticName_ which is usually a GUID, but in rare cases it's a string like `App-Settings`. This identifier is used internally - for example when a View references a Content-Type.

#### Storage
Most Content-Types are stored in the database, including all the Content-Types in your App. 
Special global Content-Types are stored in the file system. These are called [](xref:Specs.Data.FileBasedContentTypes)

#### Metadata of Content-Types and Attributes
Both the Content-Type and Attributes can have _Metadata_ providing more information about them. 

#### Field Types
Each field will be of a simple type like _text/string_, _number_, _boolean (yes/no)_ or other. You can find the list of [types here](xref:Specs.Data.Values.Overview).

#### Relationships
Fields can also be of type [Entity](xref:Specs.Data.Values.Entity) in which case they point to other items. This would then establish a [Relationship](xref:Specs.Data.Relationships)

#### Input Forms and Fields (like WYSIWYG)
The input mask is automatically generated from the [Content-Type](xref:Specs.Data.ContentTypes). Based on the specifications, it will generate the correct [Input-Field](xref:Specs.Data.Inputs.Overview) like a simple text field, a multiline text field, a WYSIWYG or even a file-uploader. 

#### Scopes

Content-Types have a _Scope_. This is like a category for the Content-Type. Normally you only see the Content-Types and Entities of the default Scope. The other Scopes have internal and system Content-Types like `@String`. 

* [Here's the full list of current Scopes](https://azing.org/2sxc/r/LqblhYXD)
* Here are instructions how to [switch Scopes](https://azing.org/2sxc/r/MEa0dtBw) to manage data of other Scopes

## APIs

* @[](xref:ToSic.Eav.Data) Namespace has almost everything you see here
* @[](xref:ToSic.Eav.Data.IContentType) defines what fields exist, it's the ContentType / Schema
* @[](xref:ToSic.Eav.Data.IContentTypeAttribute), [](xref:ToSic.Eav.Data.ContentTypeAttribute)  
	contains the definition of an attribute
* [](xref:ToSic.Eav.Data.ContentTypeMetadata), [](xref:ToSic.Eav.Metadata.MetadataOf`1)  
	contains information about the content-type (like nicer descriptions).
	This is also used for the Attribute-Metadata

## History

1. Introduced in 2sxc 1.0
