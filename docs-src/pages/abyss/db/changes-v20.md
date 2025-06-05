---
uid: Abyss.Db.ChangesV20
---

# 2sxc & EAV Database Changes in v20

> [!NOTE]
> In 2sxc v20, we are cleaning/renaming many tables to make them more consistent and easier to understand.

Things we changed:

1. Shorter, clearer prefix without underscores (from `ToSIC_EAV_` to `TsDynData`)
1. always singular table names (e.g. `TsDynDataEntity` instead of `TsDynDataEntities`)
1. Naming more consistent with the API, like `ContentType` instead of `AttributeSet`
1. Some tables were removed or merged
1. Confusing names were renamed, like `DataTimeline` to `History`
1. Fields were renamed to be more consistent, like `TransCreatedId` instead of `ChangeLogCreated`


| Name till 2sxc 19               | New Name 2sxc v20+            | Description                           |
|---------------------------------|-------------------------------|---------------------------------------|
| ToSIC_EAV_...                   | TsDynData...                  | The prefix convention                 |
| ToSIC_EAV_Apps                  | TsDynDataApp                  | List of Apps in a Zone                |
| ToSIC_EAV_AssignmentObjectTypes | TsDynDataTargetType           | Metadata Target Types                 |
| ToSIC_EAV_Attributes            | TsDynDataAttribute            | Attribute definitions of ContentType  |
| ToSIC_EAV_AttributeSets         | TsDynDataContentType          | ContentType definitions               |
| ToSIC_EAV_AttributesInSets      | _dropped_                     | _Merged with Attributes_              |
| ToSIC_EAV_AttributeTypes        | TsDynDataAttributeType        | Data types of attributes / values     |
| ToSIC_EAV_ChangeLog             | TsDynDataTransaction          | Timestamps of data changes            |
| ToSIC_EAV_ContextInfo           | _dropped_                     | _completely removed_                  |
| ToSIC_EAV_DataTimeline          | TsDynDataHistory              | Data history of entities              |
| ToSIC_EAV_Dimensions            | TsDynDataDimension            | Dimension (language) definitions      |
| ToSIC_EAV_Entities              | TsDynDataEntity               | Entities (content items)              |
| ToSIC_EAV_EntityRelationships   | TsDynDataRelationship         | Relationships between entities        |
| ToSIC_EAV_Values                | TsDynDataValue                | Values of entities attributes         |
| ToSIC_EAV_ValuesDimensions      | TsDynDataValueDimension       | Dimensions assigned to each value     |
| ToSIC_EAV_Zones                 | TsDynDataZone                 | Zones (like web sites)                |

## Removed Tables

The following tables have existed at some time, but have been removed:

* ToSIC_EAV_Attachments (this was probably removed a long time ago, but some developers still have it)
* ToSIC_EAV_AttributesInSets (this was merged with Attributes, so it no longer exists)
* ToSIC_EAV_ContextInfo (this was a workaround for old SQL versions, but is no longer needed)

## Enhanced Indexes

We have also enhanced the indexes to improve performance.

## Final Structure

This diagram shows the final structure of the database, with all tables and their relationships:

<img src="./assets/db-schema-eav-v20.webp" width="100%" class="full-width">
