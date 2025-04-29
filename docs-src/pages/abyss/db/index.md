---
uid: Abyss.Db.Index
---

# 2sxc & EAV Database

2sxc build on top of the EAV (Entity-Attribute-Value) data model.
This is a very flexible data model, but it can be complex to understand.

This section should help you understand how data is stored in the SQL database.

> [!NOTE]
> We plan to rename various tables to make more sense, which is the priority of this document.

Things we want to change:

1. Shorter prefix
1. no more `_` underscore in table names
1. always singular table names (e.g. `TsDynDataEntity` instead of `TsDynDataEntities`)
1. Naming more consistent with the API, like `ContentType` instead of `AttributeSet`


| Name till 2sxc 19               | New Name 2sxc v20+            | Description                           |
|---------------------------------|-------------------------------|---------------------------------------|
| ToSIC_EAV_...                   | TsDynData...                  | The prefix convention                 |
| ToSIC_EAV_Apps                  | TsDynDataApp                ⏹️| List of Apps in a Zone                |
| ToSIC_EAV_AssignmentObjectTypes | TsDynDataTargetType         ⏹️| Metadata Target Types                 |
| ToSIC_EAV_Attributes            | TsDynDataAttribute          🔳| Attribute definitions of ContentType  |
| ToSIC_EAV_AttributeSets         | TsDynDataContentType        🔳| ContentType definitions               |
| ToSIC_EAV_AttributesInSets      | _probably drop this_        ⏹️| _should be merged with Attributes_    |
| ToSIC_EAV_AttributeTypes        | TsDynDataAttributeType      🔳| Data types of attributes / values     |
| ToSIC_EAV_ChangeLog             | TsDynDataTransaction        ⏹️| Timestamps of data changes            |
| ToSIC_EAV_ContextInfo           | _probably drop this_        ⏹️| Old workaround for older SQL versions |
| ToSIC_EAV_DataTimeline          | TsDynDataHistory            ⏹️| Data history of entities              |
| ToSIC_EAV_Dimensions            | TsDynDataDimension          🟫| Dimension (language) definitions      |
| ToSIC_EAV_Entities              | TsDynDataEntity             🟫| Entities (content items)              |
| ToSIC_EAV_EntityRelationships   | TsDynDataRelationship       🟫| Relationships between entities        |
| ToSIC_EAV_Values                | TsDynDataValue              🟫| Values of entities attributes         |
| ToSIC_EAV_ValuesDimensions      | TsDynDataValueDimension     🟫| Dimensions assigned to each value     |
| ToSIC_EAV_Zones                 | TsDynDataZone               ⏹️| Zones (like web sites)                |



## History

The following tables have existed at some time, but have been removed:

* ToSIC_EAV_Attachments