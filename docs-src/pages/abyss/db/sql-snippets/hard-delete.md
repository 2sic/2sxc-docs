---
uid: Abyss.Db.SqlSnippets.HardDelete
---

# Hard-Delete Entity, Content-Type, or App with SQL

These emergency SQL Server scripts permanently delete current EAV records from 2sxc 20 and newer.
Use the 2sxc UI/API for normal deletions because it handles versioning and cache invalidation.

> [!WARNING]
> Direct SQL deletion is unsupported and irreversible after commit.
> Stop the site, make a full database backup, and run the script with `@SimulateOnly = 1` first.
> Verify the selected App, Content-Type, or Entity before changing it to `0`.

The scripts intentionally keep `TsDynDataHistory` and `TsDynDataTransaction`.
This matches the hard-delete behavior in the EAV repository and preserves the shared audit trail.
Restart the site after a commit so no deleted data remains in application caches.

## Hard-Delete One Entity

This deletes all published/draft rows with the Entity's GUID, recursively attached metadata Entities,
Values, Value-Dimensions, and inbound/outbound Relationships.

```sql
SET NOCOUNT ON;
SET XACT_ABORT ON;

-- Keep 1 for a rollback-only test. Change to 0 only after verifying the preview.
DECLARE @SimulateOnly bit = 1;
DECLARE @AppId int = 0;
DECLARE @EntityId int = 0;

IF @AppId <= 0 OR @EntityId <= 0
    THROW 50001, 'Set @AppId and @EntityId to positive IDs.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM dbo.TsDynDataEntity
    WHERE AppId = @AppId AND EntityId = @EntityId
)
    THROW 50002, 'The Entity does not exist in the specified App.', 1;

-- Preview the exact root Entity before anything is changed.
SELECT EntityId, EntityGuid, AppId, ContentTypeId, ContentType,
    IsPublished, TransDeletedId
FROM dbo.TsDynDataEntity
WHERE AppId = @AppId AND EntityId = @EntityId;

BEGIN TRANSACTION;
BEGIN TRY
    CREATE TABLE #EntitiesToDelete
    (
        EntityId int NOT NULL PRIMARY KEY,
        EntityGuid uniqueidentifier NOT NULL
    );

    -- Include all published/draft rows sharing the root Entity GUID.
    INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
    SELECT EntityId, EntityGuid
    FROM dbo.TsDynDataEntity
    WHERE AppId = @AppId
      AND EntityGuid = (
          SELECT EntityGuid
          FROM dbo.TsDynDataEntity
          WHERE AppId = @AppId AND EntityId = @EntityId
      );

    -- Include metadata attached to the Entity or to metadata already selected.
    WHILE 1 = 1
    BEGIN
        INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
        SELECT DISTINCT candidate.EntityId, candidate.EntityGuid
        FROM dbo.TsDynDataEntity AS candidate
        INNER JOIN #EntitiesToDelete AS target
            ON candidate.EntityGuid = target.EntityGuid
            OR (candidate.TargetTypeId = 4 AND candidate.KeyGuid = target.EntityGuid)
        WHERE candidate.AppId = @AppId
          AND NOT EXISTS (
              SELECT 1
              FROM #EntitiesToDelete AS found
              WHERE found.EntityId = candidate.EntityId
          );

        IF @@ROWCOUNT = 0
            BREAK;
    END;

    SELECT COUNT(*) AS EntitiesIncludingMetadata
    FROM #EntitiesToDelete;

    DELETE vd
    FROM dbo.TsDynDataValueDimension AS vd
    INNER JOIN dbo.TsDynDataValue AS v ON v.ValueId = vd.ValueId
    INNER JOIN #EntitiesToDelete AS selected ON selected.EntityId = v.EntityId;

    DELETE v
    FROM dbo.TsDynDataValue AS v
    INNER JOIN #EntitiesToDelete AS selected ON selected.EntityId = v.EntityId;

    DELETE r
    FROM dbo.TsDynDataRelationship AS r
    INNER JOIN #EntitiesToDelete AS selected ON selected.EntityId = r.ParentEntityId;

    DELETE r
    FROM dbo.TsDynDataRelationship AS r
    INNER JOIN #EntitiesToDelete AS selected ON selected.EntityId = r.ChildEntityId;

    DELETE e
    FROM dbo.TsDynDataEntity AS e
    INNER JOIN #EntitiesToDelete AS selected ON selected.EntityId = e.EntityId;

    IF @SimulateOnly = 1
    BEGIN
        PRINT 'Simulation only: rolling back.';
        ROLLBACK TRANSACTION;
    END
    ELSE
    BEGIN
        PRINT 'Committing permanent Entity deletion.';
        COMMIT TRANSACTION;
    END;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
```

## Hard-Delete One Content-Type

This deletes the Content-Type, its Attributes, all its Entities and their data, and metadata attached
to the Content-Type, Attributes, Entities, or their metadata.
It stops if another Content-Type inherits from the selected Content-Type.

```sql
SET NOCOUNT ON;
SET XACT_ABORT ON;

-- Keep 1 for a rollback-only test. Change to 0 only after verifying the preview.
DECLARE @SimulateOnly bit = 1;
DECLARE @AppId int = 0;
DECLARE @ContentTypeId int = 0;
DECLARE @ContentTypeStaticName nvarchar(150);

IF @AppId <= 0 OR @ContentTypeId <= 0
    THROW 50001, 'Set @AppId and @ContentTypeId to positive IDs.', 1;

SELECT @ContentTypeStaticName = StaticName
FROM dbo.TsDynDataContentType
WHERE AppId = @AppId AND ContentTypeId = @ContentTypeId;

IF @ContentTypeStaticName IS NULL
    THROW 50002, 'The Content-Type does not exist in the specified App.', 1;

-- Preview the exact Content-Type before anything is changed.
SELECT ContentTypeId, StaticName, Name, Scope, AppId, TransDeletedId
FROM dbo.TsDynDataContentType
WHERE AppId = @AppId AND ContentTypeId = @ContentTypeId;

IF EXISTS (
    SELECT 1
    FROM dbo.TsDynDataContentType
    WHERE InheritContentTypeId = @ContentTypeId
)
BEGIN
    SELECT ContentTypeId, StaticName, Name, AppId
    FROM dbo.TsDynDataContentType
    WHERE InheritContentTypeId = @ContentTypeId;

    THROW 50003, 'Deletion stopped: other Content-Types inherit from this Content-Type.', 1;
END;

BEGIN TRANSACTION;
BEGIN TRY
    CREATE TABLE #AttributesToDelete
    (
        AttributeId int NOT NULL PRIMARY KEY
    );

    CREATE TABLE #EntitiesToDelete
    (
        EntityId int NOT NULL PRIMARY KEY,
        EntityGuid uniqueidentifier NOT NULL
    );

    INSERT INTO #AttributesToDelete (AttributeId)
    SELECT AttributeId
    FROM dbo.TsDynDataAttribute
    WHERE ContentTypeId = @ContentTypeId;

    -- Include the type's Entities plus metadata for the type and its Attributes.
    -- TargetTypeId 2 = Attribute, 4 = Entity, 5 = Content-Type.
    INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
    SELECT DISTINCT e.EntityId, e.EntityGuid
    FROM dbo.TsDynDataEntity AS e
    WHERE e.AppId = @AppId
      AND (
          e.ContentTypeId = @ContentTypeId
          OR (e.TargetTypeId = 5 AND e.KeyString = @ContentTypeStaticName)
          OR (
              e.TargetTypeId = 4
              AND e.KeyGuid = TRY_CONVERT(uniqueidentifier, @ContentTypeStaticName)
          )
          OR (
              e.TargetTypeId = 2
              AND EXISTS (
                  SELECT 1
                  FROM #AttributesToDelete AS selected
                  WHERE selected.AttributeId = e.KeyNumber
              )
          )
      );

    -- Include metadata attached to any Entity already selected.
    WHILE 1 = 1
    BEGIN
        INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
        SELECT DISTINCT candidate.EntityId, candidate.EntityGuid
        FROM dbo.TsDynDataEntity AS candidate
        INNER JOIN #EntitiesToDelete AS target
            ON candidate.EntityGuid = target.EntityGuid
            OR (candidate.TargetTypeId = 4 AND candidate.KeyGuid = target.EntityGuid)
        WHERE candidate.AppId = @AppId
          AND NOT EXISTS (
              SELECT 1
              FROM #EntitiesToDelete AS found
              WHERE found.EntityId = candidate.EntityId
          );

        IF @@ROWCOUNT = 0
            BREAK;
    END;

    SELECT
        (SELECT COUNT(*) FROM #EntitiesToDelete) AS EntitiesIncludingMetadata,
        (SELECT COUNT(*) FROM #AttributesToDelete) AS Attributes;

    DELETE vd
    FROM dbo.TsDynDataValueDimension AS vd
    INNER JOIN dbo.TsDynDataValue AS v ON v.ValueId = vd.ValueId
    WHERE EXISTS (
        SELECT 1 FROM #EntitiesToDelete AS selected WHERE selected.EntityId = v.EntityId
    ) OR EXISTS (
        SELECT 1 FROM #AttributesToDelete AS selected WHERE selected.AttributeId = v.AttributeId
    );

    DELETE v
    FROM dbo.TsDynDataValue AS v
    WHERE EXISTS (
        SELECT 1 FROM #EntitiesToDelete AS selected WHERE selected.EntityId = v.EntityId
    ) OR EXISTS (
        SELECT 1 FROM #AttributesToDelete AS selected WHERE selected.AttributeId = v.AttributeId
    );

    DELETE r
    FROM dbo.TsDynDataRelationship AS r
    WHERE EXISTS (
        SELECT 1 FROM #EntitiesToDelete AS selected WHERE selected.EntityId = r.ParentEntityId
    ) OR EXISTS (
        SELECT 1 FROM #EntitiesToDelete AS selected WHERE selected.EntityId = r.ChildEntityId
    ) OR EXISTS (
        SELECT 1 FROM #AttributesToDelete AS selected WHERE selected.AttributeId = r.AttributeId
    );

    DELETE e
    FROM dbo.TsDynDataEntity AS e
    INNER JOIN #EntitiesToDelete AS selected ON selected.EntityId = e.EntityId;

    DELETE a
    FROM dbo.TsDynDataAttribute AS a
    INNER JOIN #AttributesToDelete AS selected ON selected.AttributeId = a.AttributeId;

    DELETE FROM dbo.TsDynDataContentType
    WHERE AppId = @AppId AND ContentTypeId = @ContentTypeId;

    IF @SimulateOnly = 1
    BEGIN
        PRINT 'Simulation only: rolling back.';
        ROLLBACK TRANSACTION;
    END
    ELSE
    BEGIN
        PRINT 'Committing permanent Content-Type deletion.';
        COMMIT TRANSACTION;
    END;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
```

## Hard-Delete One App by App ID

This mirrors the server-side delete order in `DbApp`: Value-Dimensions, Values, Relationships,
Entities (including JSON Entities), Attributes, Content-Types, and finally the App record.

```sql
SET NOCOUNT ON;
SET XACT_ABORT ON;

-- Keep 1 for a rollback-only test. Change to 0 only after verifying the preview.
DECLARE @SimulateOnly bit = 1;
DECLARE @AppId int = 0;

IF @AppId <= 0
    THROW 50001, 'Set @AppId to a positive ID.', 1;

IF NOT EXISTS (SELECT 1 FROM dbo.TsDynDataApp WHERE AppId = @AppId)
    THROW 50002, 'The App does not exist.', 1;

-- Preview the exact App and affected record counts before anything is changed.
SELECT AppId, ZoneId, Name, SysSettings, TransDeletedId
FROM dbo.TsDynDataApp
WHERE AppId = @AppId;

SELECT
    (SELECT COUNT(*) FROM dbo.TsDynDataEntity WHERE AppId = @AppId) AS Entities,
    (SELECT COUNT(*) FROM dbo.TsDynDataContentType WHERE AppId = @AppId) AS ContentTypes,
    (
        SELECT COUNT(*)
        FROM dbo.TsDynDataAttribute AS a
        INNER JOIN dbo.TsDynDataContentType AS ct ON ct.ContentTypeId = a.ContentTypeId
        WHERE ct.AppId = @AppId
    ) AS Attributes;

-- Do not silently break Content-Types in another App which inherit from this App's types.
IF EXISTS (
    SELECT 1
    FROM dbo.TsDynDataContentType AS child
    INNER JOIN dbo.TsDynDataContentType AS parent
        ON parent.ContentTypeId = child.InheritContentTypeId
    WHERE parent.AppId = @AppId AND child.AppId <> @AppId
)
BEGIN
    SELECT child.ContentTypeId, child.StaticName, child.Name, child.AppId
    FROM dbo.TsDynDataContentType AS child
    INNER JOIN dbo.TsDynDataContentType AS parent
        ON parent.ContentTypeId = child.InheritContentTypeId
    WHERE parent.AppId = @AppId AND child.AppId <> @AppId;

    THROW 50003, 'Deletion stopped: Content-Types in another App inherit from this App.', 1;
END;

BEGIN TRANSACTION;
BEGIN TRY
    DELETE vd
    FROM dbo.TsDynDataValueDimension AS vd
    INNER JOIN dbo.TsDynDataValue AS v ON v.ValueId = vd.ValueId
    INNER JOIN dbo.TsDynDataEntity AS e ON e.EntityId = v.EntityId
    WHERE e.AppId = @AppId;

    DELETE v
    FROM dbo.TsDynDataValue AS v
    INNER JOIN dbo.TsDynDataEntity AS e ON e.EntityId = v.EntityId
    WHERE e.AppId = @AppId;

    DELETE r
    FROM dbo.TsDynDataRelationship AS r
    INNER JOIN dbo.TsDynDataEntity AS e ON e.EntityId = r.ParentEntityId
    WHERE e.AppId = @AppId;

    DELETE r
    FROM dbo.TsDynDataRelationship AS r
    INNER JOIN dbo.TsDynDataEntity AS e ON e.EntityId = r.ChildEntityId
    WHERE e.AppId = @AppId;

    DELETE e
    FROM dbo.TsDynDataEntity AS e
    WHERE e.AppId = @AppId;

    DELETE a
    FROM dbo.TsDynDataAttribute AS a
    INNER JOIN dbo.TsDynDataContentType AS ct ON ct.ContentTypeId = a.ContentTypeId
    WHERE ct.AppId = @AppId;

    DELETE ct
    FROM dbo.TsDynDataContentType AS ct
    WHERE ct.AppId = @AppId;

    DELETE FROM dbo.TsDynDataApp
    WHERE AppId = @AppId;

    IF @SimulateOnly = 1
    BEGIN
        PRINT 'Simulation only: rolling back.';
        ROLLBACK TRANSACTION;
    END
    ELSE
    BEGIN
        PRINT 'Committing permanent App deletion.';
        COMMIT TRANSACTION;
    END;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0
        ROLLBACK TRANSACTION;
    THROW;
END CATCH;
```

---

## History

* 2026-08-31 added hard-delete scripts for Entity, Content-Type, and App
