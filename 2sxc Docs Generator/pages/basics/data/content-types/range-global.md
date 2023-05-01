---
uid: Basics.Data.ContentTypes.Global
---

# Global Content-Types (⚠)

[!include["Data"](~/pages/basics/data/_shared-content-types-global.md)]

This explains **Global Content-Types**. For an overview check out [](xref:Basics.Data.Index).

---

> [!WARNING]
> This is a very advanced topic which less than 1% of all developers use.
>
> You almost certainly will _not_ need this. So if you start playing around with this,
> make sure that you really need this.

## What is a Global Content-Type?

**Global Content Types** are a [Content Types](xref:Basics.Data.ContentTypes.Index) which are defined in a central location and available in all Apps of your system.

* These are custom Content-Types which are treated like System Content-Types.
* They can be used inside _every single App_
* The App data is in the export/import, but _not_ the **Content-Type Definition**.
* If you import an App with such data, the **Global Type** must be configured first.
* These Content-Types are stored in the [file system](xref:Basics.Data.ContentTypes.FileStorage)

For most scenarios you don't want to use this.

## How it works

* Global Content-Type are stored in special folders as JSON files and are loaded by the system when it starts. From then on they are automatically available in all apps for use.
* Since the schema is not stored in the SQL database, the Entities cannot use the normal storage system. Instead they are stored as **JSON Entities** in the SQL tables.

## Why does this Feature exist?

2sxc uses this concept for all the internal Content-Types. So any time you edit Field-settings or Visual-Query configurations, they use Global Content-Types.

We also have some really sophisticated solutions which use this feature.


## Why would you want to use this?

1. If you are creating a complex system with many portals and apps which should share the schema

## Why would you _not_ want to do this?

1. If you only want to share the Content-Type across 2-3 Apps, you should prefer [App Shared Types](xref:Basics.Data.ContentTypes.Shared) instead
1. If you have one specific App (like News) which is installed on many Sites you should prefer [App Shared Types](xref:Basics.Data.ContentTypes.Shared) instead

## Important Warnings

Since the data for the **Global Content-Types** is stored as **JSON Entities** there are a few drawbacks you should be aware of:

1. If you plan on using the raw SQL data (not recommended anyhow) then the JSON format used in Global Content-Types adds quite a lot of complexity.
1. If you ever rename fields in the Global Content-Type, the stored data will not follow the rename. From the systems perspective it has lost the old field and gotten a new one.


## Create a Global Content-Type

Assume you really want to do this, here's how:

1. Create the Content-Type in the normal way
1. Export the Content-Type Definition as JSON
1. Store it in your global custom folder (you may need to create these folders)
    1. In Dnn: `[system-root]/DesktopModules/ToSIC_SexyContent/App_Data/system-custom/contenttypes`
    1. In Oqtane: TODO
1. Restart the system

You should now have this Content-Type show up in every App.

## Update a Global Content-Type

1. Make the updates in the original system
1. Re-export the JSON
1. Overwrite the original file
1. Restart your system

## Delete a Global Content-Type

1. Remove the JSON file
1. Restart the system


## Best Practices

From our experience the main use case for Global Content-Types is very technical, so the content-editor usually doesn't need to see this. So we strongly recommend placing it in an own **Scope**.


## History

1. Introduced in 2sxc 9.7
