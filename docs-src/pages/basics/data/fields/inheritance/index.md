---
uid: Basics.Data.Fields.Inheritance.Index
---

# Field Definition Inheritance

[!include["Data"](~/pages/basics/data/_shared-content-types.md)]

This explains **Field Definition Inheritance**. For an overview check out [](xref:Basics.Data.Index).

---

Most fields are defined once and used once.
For example, a `FirstName` field is defined once and used in one content type `Person`.
But sometimes you want to reuse the same field definition in multiple content types.
For example, you may have an `EventType` string-dropdown field that you want to use in both `Event` and `Calendar` content types.
Having a shared definition allows you to update it in one place, and have the changes reflected everywhere it's used.

> [!TIP]
> Field Definition Inheritance allows you to create a field definition once and reuse it across multiple content types, ensuring consistency and easier maintenance.
>
> It is the foundation for **Content Type Composition**.

🦸🏾‍♂️ Requires Patron feature [ContentTypeFieldsReuseDefinitions](https://patrons.2sxc.org/rf?ContentTypeFieldsReuseDefinitions)

## How It Works

For field definition inheritance to work, you must first define a shared "master" field.
This master field contains all the settings and configurations you want to share.
Once the master field is defined, you can mark it as "inheritable".
By doing this, it will also receive a unique identifier (GUID) that can be referenced by other fields.

To inherit the definition, you must then create a "inheriting" field or convert an existing field to inherit from the master field.
When you do this, the inheriting field will automatically adopt all the settings from the master field.
The link between the master field and the inheriting field is done through the unique identifier (GUID) of the master field.

Internally, both the master field and the inheriting field have a hidden JSON configuration in the database called `SysSettings`.

## How to Set Up Inheritance

1. **Define the Master Field**: Create a new field definition and configure all the settings you want to share.
2. **Mark as Inheritable**: Once the master field is defined, mark it as "inheritable".
3. **Create Inheriting Fields**: Create new fields or convert existing fields to inherit from the master field.

For more, check out [](xref:Basics.Data.ContentTypeComposition.Index) which explains how inheritance is used in content-type composition
with step-by-step instructions.

---

## History

1. Development started ca. 2sxc v16 and used internally
1. Published in 2sxc/EAV v18
1. Docs created for 2sxc v20 - 2025-11
