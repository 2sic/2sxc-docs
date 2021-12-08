---
uid: Basics.Data.Relationships.Index
---
# Entity Relationships

[!include["Data"](../_shared-entities.md)]

This explains **Entity Relationships**. For an overview check out [](xref:Basics.Data.Index).

---

Data can be related to other data, like when a `Book` belongs to a `Category` and also has an `Author`. Since all data-items are called `Entities` we call this _Entity Relationships_. 

Additionally, there are also Entities which explicitly enhance/describes another _thing_. That kind of relationship is called _Metadata_.

## How Entity-Relationships Work

Each _Entity_ has many fields, some containing text, numbers etc. but some can also point to another item. These kinds of fields are called _Entity Fields_. When configured correctly, an entity-field shows a dropdown of items. So in the case of a book, the `Author` field may show a dropdown of `Person` items.

There are different types of relationships: 

* **1:n** means that one thing can refer to many other things - like a book which points to many categories
* **n:1** means that many things can refer to one thing - like many books pointing to the same author
* **n:n** means that many things can refer to many things - like many blog-posts pointing to many tags (the blog can refer to many tags, and each tag may be pointed to by many blogs)
* **1:1** relationships are when one thing refers to one other thing, and neither are re-used again. This is not often used in CMSs.

## Relationships Preserve Item-Order

Since 2sxc/EAV data is often used for Content-Management it's important to note that:

> Relationships preserve the Order of the Related Items.

This means that an editor adding `Author` relationships to a `Book` can organize them in an order if he/she wishes to do this. 

The output template can then choose to either output these Authors in the order they were managed, or sort them by Title or other property if that would be more appropriate. 

## Relationships are Cross-Language

Values of Entities are multi-language, but relationships-connections apply to all languages. So the list of Authors is the same for all languages. 

## Metadata Relationships

This is a very different concept, where an Entity enriches something else. Read more about it in [metadata](xref:Basics.Metadata.Index).

## Advanced Topics

* [Razor LINQ tutorial showing how to navigate between relationships](https://2sxc.org/dnn-tutorials/en/razor/linq/home)
* [RelationshipFilter Data Source to find items related to another item](xref:ToSic.Eav.DataSources.RelationshipFilter)

## History

1. Introduced in 2sxc 2.0
