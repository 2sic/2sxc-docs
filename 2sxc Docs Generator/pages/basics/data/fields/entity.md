---
uid: Basics.Data.Fields.Entity
---

# Field Data Type: Entity (List of Entity-Items)

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Entity Fields**. For an overview check out [](xref:Basics.Data.Index).

---


**Entity** or **Item** data is a basic [data type](xref:Basics.Data.Fields.Index) and is used to mark item-relationships, like books-to-authors or blog-to-tags. 

## Features 

The basic **entity** field simply allows you to select items of a specific type, with various add/remove/create/delete features.  

## Sub-Types of Entity Fields

1. [entity-default](xref:Basics.Data.Fields.Entity-Default) - standard selector with type, add/remove, one/multi, delete, etc.
1. [entity-query](xref:Basics.Data.Fields.Entity-Query) for picking entities which were pre-processed in a query

## Shared Settings

All Entity-Field Types have the following settings:

<img src="./assets/entity.png" width="50%" class="float-right">

* Basic
  * **Entity Type**
* Advanced UI Settings
  * **Multiple Items**
  * **Enable Edit**
  * **Enable Create New**
  * **Enable Add Existing**
  * **Enable Remove**
  * **Enable Delete**


---

## Specials of the Entity type: 

The entity-type has these specials it's good to know about

1. It's always a list
1. It preserves the relationship order

### Special #1: It's always a List

Since it could contain 1 or many items (and the configuration can change whenever you want), reading it always means reading a list. So you'll always use something like this (C#):

```cs
// full name of author
var fn = Book.Author[0].FullName; 

// in case you're not sure if the author was added or null, you can do
var fn2 = (Book.Author.Any() ? Book.Author[0].FirstOrDefault : "");

// This will also work in newer versions of C#
// making fullName either the name, or a null
var fn3 = Book.Author.FirstOrDefault()?.FullName;

// the following won't work!
var wontWork = Book.Author.FullName; // this won't work
```

Or the same in JavaScript:
```javascript
var fn = Book.Author[0].FullName;

// in case you're not sure if it has any
// this uses the JS-syntax which returns the last-value of an && condition  
var fn = Book.Author && Book.Author[0].FullName;
```

### Special #2: It preserves Order

If the user said a book has 2 authors:
1. Daniel
2. Abraham

Then it's sometimes useful to preserve the order - in this case Daniel was probably the _main author_ and Abraham helped out a bit. To allow for this, the **Entity** field will keep the order of items as they were added. 

Side-effect: Sometimes you want to have an A-Z order when showing items. As the order is not auto-sorted, you will have to do this yourself if you want to have them sorted. Use [LINQ](xref:NetCode.Data.Linq.Index) to do that. 

---

## Technical Information

### Storage in the SQL Database in the EAV-Model

This is stored in a special relationships-table, so internally the current DB IDs are used to track relationships. 

### Storage in the SQL Database in the JSON-Model

This is stored as an array of strings, which contain the GUIDs of the related information. 


## Null Values not Possible

These fields will never return a null. If there is no content, you'll just get an empty list.

## Read also

* [Razor LINQ Tutorials](https://2sxc.org/dnn-tutorials/en/razor/linq/home)

## History

1. Introduced in EAV 1.0 / 2sxc 1.0
2. Changed in EAV 3.0 / 2sxc 6.0 (it used to have many configuration fields for all kinds of uses, which were then moved to sub-types)
3. Enhanched in EAV 4 / 2sxc 7 when item-delete was introduced, to allow for "private" items