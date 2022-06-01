---
uid: Basics.Data.ContentTypes.Shared
---

# App Shared "Ghost" Content-Types (⚠)

[!include["Data"](~/pages/basics/data/_shared-content-types-app.md)]

This explains **App Shared Content-Types** which used to be called **Ghost Content-Type**. For an overview check out [](xref:Basics.Data.Index).

---

> [!WARNING]
> This is a very advanced topic which less than 1% of all developers use. 
> 
> You almost certainly will _not_ need this. So if you start playing around with this, 
> make sure that you really need this. 

## What is an App Shared Content-Type?

**App Shared Content Types** are a [Content Types](xref:Basics.Data.ContentTypes.Index) which are defined in one App and re-used in specific other Apps. 

* They can only be used inside the App which are configured to _share_ the definition
* The App data is in the export/import, but _not_ the **Content-Type Definition**
* If you import an App with such data, the App containing the definition must be imported first.
* These Content-Types are stored in the [SQL database](xref:Basics.Data.ContentTypes.SqlStorage)

You rarely want to use this. 

## How it works

* Shared Content-Types are defined in a **Primary** App which manages this type. 
* Other **Slave** Apps are configured to also use this Content-Type. They automatically inherit every configuration of the primary App even when the schema changes. 

## Why does this Feature exist?

The feature was originally introduced in 2sxc 1.0 because at that time we didn't have [Global Shared Content-Types](xref:Basics.Data.ContentTypes.Global)

It has since been used in various complex sites. An example is a installation which has many Sites, each having the same **News App**. In such scenarios it's hard to keep changes synchronized, so it's usually implemented as follows:

1. A primary App is on a hidden Site which just manages the Content-Types
1. A template App is configured to use thes Content-Types. It usually also uses shared Templates etc.
1. The template App is then exported and imported in each site where needed. 

## Why would you want to use this?

1. If you are creating a complex system with many portals and apps which should share the schema

## Why would you _not_ want to do this?

Using Shared Content-Types is fairly technical, so the developer must understand what this is. 


## History

1. Introduced in 2sxc 1.0
