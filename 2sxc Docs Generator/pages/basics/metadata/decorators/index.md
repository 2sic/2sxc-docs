---
uid: Basics.Metadata.Decorators.Index
---

<img src="~/assets/features/metadata.svg" class="feature">

# Metadata Decorators - (advanced ⚠)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

**Metadata Decorators** are system [Metadata](xref:Basics.Metadata.Index) which enhance the configuration of something. 

Examples

* the `IsDefault` Decorator can be used to set a view to being the default, even if it's not the first one in alphabetical order
* the `IsShared` marks Apps so they can be inherited in other sites
* the `Requirement` marks the `IsShared` so it's only available if feature & license are enabled

## List of Current Decorators

| Decorator           | Added  | Description                                                     | Remarks |
| ------------------- | ------ | --------------------------------------------------------------- | ------- |
| IsDefault           | 13.00  | Marks an item as default                                        | Primarily used for views
| IsObsolete          | 13.00  | Marks an item as obsolete                                       | Used for InputTypes
| IsRecommended       | 13.00  | Marks an item as recommended                                    | Used for InputTypes
| IsShared            | 13.02  | Marks an App as being shared/global                             | Only for Apps
| Languages           | 13.02  | Special language configuration                                  | Only for ContentTypes
| MetadataExpected    | 13.02  | 
| MetadataFor         | 13.02  | Marks a type as being recommend for a specific target           | Only for ContentTypes
| Note                | WIP    |
| Requirement         | 13.02  | Marks a requirement to use something, like a minimum license    | Only for ContentTypes
| SaveEmpty           | 13.00  | Marks a ContentType to enable saving even if it has no fields   | Only for ContentTypes

## Special Notes

Some decorators have no field, as adding the decorator already contains all the information necessary. 

By default, 2sxc would not save empty data, so to enable this, these Decorators must themselves have a `SaveEmpty` Decorator.

## Discover More

1. [](xref:Basics.Metadata.Index) 

---

## History

1. Introduced in 2sxc v13