---
uid: Basics.Data.Entities.Index
---
# Entities (Data, Records, Items)

[!include["Data"](../_shared-entities.md)]

This explains **Entities** aka **Data Items**. For an overview check out [](xref:Basics.Data.Index).

---

Every _thing_, _record_ or _object_ in 2sxc is called an **Entity**. So if you have a list of `Book` objects, then each `Book` is an entity. 

> Many other systems use the term _Record_, _Content Item_, _Item_ or _Object_. 

[!include["Before you Start"](~/shared/before-you-start-idynamicentity.md)]

## Data Model: EAV+D = Entity-Attribute-Value + Dimension

> EAV stands for **Entity**, **Attribute**, **Value**
> The D stands for **Dimension**, it says what Dimension (Language) a _Value_ is for


## How it Works

Each _Entity_ has many fields, some containing text, numbers etc. The fields an Entity can have is defined in the [Content-Type](xref:Basics.Data.ContentTypes.Index), so each Entity is like a record of that type. 

This basic principle is used everywhere in 2sxc. For example, all these things are Entities:

* _Simple Content_ items in the _Content-App_ are entities containing a title, body and image
* [View](xref:Basics.App.Views.Index) configurations are entities containing name, thumbnail, template-name etc.
* _Blog_ posts in the [Blog App](https://2sxc.org/en/apps/app/dnn-blog-app-for-dnn-dotnetnuke) are entities containing around 20 fields
* _Tag_ items in the [Blog App](https://2sxc.org/en/apps/app/dnn-blog-app-for-dnn-dotnetnuke) are also entities
* Anything you define in your apps will result in entities

#### Multilanguage Data

Each value can also be [multilanguage](xref:Basics.Data.MultiLanguage.Index), so there are actually many `Descriptions` in a multi-language product Entity. 

#### Relationships

Entities are much more than just records, as they can have [relationships](xref:Basics.Data.Relationships.Index).

#### Input Forms and Fields (like WYSIWYG)

The input mask is automatically generated from the [Content-Type](xref:Basics.Data.ContentTypes.Index). Based on the specifications, it will generate the correct [Input-Field](xref:Basics.Data.Fields.Index) like a simple text field, a multiline text field, a WYSIWYG or even a file-uploader. 


## History

1. Introduced in 2sxc 1.0
