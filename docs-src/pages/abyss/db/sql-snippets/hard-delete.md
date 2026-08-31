---
uid: Abyss.Db.SqlSnippets.HardDelete
---

# Hard-Delete Entity, Content-Type, or App with SQL

These reusable SQL Server procedures permanently delete current EAV records from the `TsDynData*`
database schema used by 2sxc 20 and newer.
They require SQL Server 2017 or newer (DNN 10+ req).
Use the 2sxc UI/API for normal deletions because it handles versioning and cache invalidation.

> [!WARNING]
> These are unrestricted database-administration utilities.
> They do not protect system Apps or check dependencies outside the selected data.
> Making a full database backup before any deletion is strongly recommended and is the
> administrator's responsibility. The administrator is also responsible for selecting the correct
> IDs and ensuring that the transaction log has enough space.

Stop the site while executing a deletion and restart it afterwards so no deleted data remains in
application caches. The procedures intentionally keep `TsDynDataHistory` and
`TsDynDataTransaction`, matching the hard-delete behavior in the EAV repository.

## Install or Update the Procedures

Run this script once in the 2sxc database. It creates three public procedures and one shared core:

1. `dbo._TsDynData_HardDeleteEntity`
1. `dbo._TsDynData_HardDeleteContentType`
1. `dbo._TsDynData_HardDeleteApp`
1. `dbo._TsDynData_HardDelete_Core` - used internally by the three public procedures

The public procedures delete one target per call. `@Execute = 0` is the default and only returns a
read-only preview. Use `@Execute = 1` to permanently delete the selected target.

```sql
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- Shared implementation for the three public hard-delete procedures below.
-- @Scope controls the complete target set:
--   Entity      = one logical Entity, all published/draft rows, and recursive metadata
--   ContentType = one Content-Type, its Attributes, Entities, data, and recursive metadata
--   App         = every Entity, Attribute, and Content-Type in the App, then the App itself
-- @Execute = 0 only builds and returns the target summary; @Execute = 1 performs the deletion.
-- Delete execution is atomic. The procedure owns its transaction unless the caller supplied one.
-- TsDynDataHistory and TsDynDataTransaction are intentionally not selected or deleted.
CREATE OR ALTER PROCEDURE dbo._TsDynData_HardDelete_Core
    @Scope varchar(20),
    @AppId int,
    @TargetId int = NULL,
    @Execute bit = 0
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF @Scope IS NULL OR @Scope NOT IN ('Entity', 'ContentType', 'App')
        THROW 50001, 'Scope must be Entity, ContentType, or App.', 1;

    IF ISNULL(@AppId, 0) <= 0
        THROW 50002, 'AppId must be a positive ID.', 1;

    IF @Scope <> 'App' AND ISNULL(@TargetId, 0) <= 0
        THROW 50003, 'TargetId must be a positive ID.', 1;

    IF @Execute IS NULL
        THROW 50004, 'Execute must be 0 or 1.', 1;

    DECLARE @InitialTransactionCount int = @@TRANCOUNT;
    DECLARE @SavepointCreated bit = 0;
    DECLARE @TargetName nvarchar(450);
    DECLARE @ResultTargetId int = @TargetId;
    DECLARE @ContentTypeStaticName nvarchar(150);
    DECLARE @EntityGuid uniqueidentifier;
    DECLARE @EntityCount int;
    DECLARE @AttributeCount int;
    DECLARE @ContentTypeCount int;

    BEGIN TRY
        -- Preview needs no transaction. Execution either starts one or creates a savepoint in
        -- the caller's transaction so all selected data is handled as one operation.
        IF @Execute = 1
        BEGIN
            IF @InitialTransactionCount = 0
                BEGIN TRANSACTION;
            ELSE
            BEGIN
                SAVE TRANSACTION TsDynDataHardDelete;
                SET @SavepointCreated = 1;
            END;
        END;

        -- Resolve the root target and the stable name shown in the result summary.
        IF @Scope = 'Entity'
        BEGIN
            SELECT @EntityGuid = EntityGuid
            FROM dbo.TsDynDataEntity
            WHERE AppId = @AppId AND EntityId = @TargetId;

            IF @EntityGuid IS NULL
                THROW 50005, 'The Entity does not exist in the specified App.', 1;

            SET @TargetName = CONVERT(nvarchar(36), @EntityGuid);
        END;

        IF @Scope = 'ContentType'
        BEGIN
            SELECT
                @ContentTypeStaticName = StaticName,
                @TargetName = StaticName
            FROM dbo.TsDynDataContentType
            WHERE AppId = @AppId AND ContentTypeId = @TargetId;

            IF @ContentTypeStaticName IS NULL
                THROW 50006, 'The Content-Type does not exist in the specified App.', 1;
        END;

        IF @Scope = 'App'
        BEGIN
            SELECT @TargetName = Name
            FROM dbo.TsDynDataApp
            WHERE AppId = @AppId;

            IF @TargetName IS NULL
                THROW 50007, 'The App does not exist.', 1;

            SET @ResultTargetId = @AppId;
        END;

        -- These working sets drive both the preview counts and every DELETE statement below.
        CREATE TABLE #AttributesToDelete
        (
            AttributeId int NOT NULL PRIMARY KEY
        );

        CREATE TABLE #EntitiesToDelete
        (
            EntityId int NOT NULL PRIMARY KEY,
            EntityGuid uniqueidentifier NOT NULL
        );

        IF @Scope = 'ContentType'
        BEGIN
            INSERT INTO #AttributesToDelete (AttributeId)
            SELECT AttributeId
            FROM dbo.TsDynDataAttribute
            WHERE ContentTypeId = @TargetId;

            -- TargetTypeId 2 = Attribute, 4 = Entity, 5 = Content-Type.
            INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
            SELECT DISTINCT e.EntityId, e.EntityGuid
            FROM dbo.TsDynDataEntity AS e
            WHERE e.AppId = @AppId
              AND (
                  e.ContentTypeId = @TargetId
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
        END;

        IF @Scope = 'Entity'
        BEGIN
            -- Include all published/draft rows sharing the root Entity GUID.
            INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
            SELECT EntityId, EntityGuid
            FROM dbo.TsDynDataEntity
            WHERE AppId = @AppId AND EntityGuid = @EntityGuid;
        END;

        IF @Scope = 'App'
        BEGIN
            INSERT INTO #AttributesToDelete (AttributeId)
            SELECT a.AttributeId
            FROM dbo.TsDynDataAttribute AS a
            INNER JOIN dbo.TsDynDataContentType AS ct ON ct.ContentTypeId = a.ContentTypeId
            WHERE ct.AppId = @AppId;

            -- This includes regular and JSON Entities.
            INSERT INTO #EntitiesToDelete (EntityId, EntityGuid)
            SELECT EntityId, EntityGuid
            FROM dbo.TsDynDataEntity
            WHERE AppId = @AppId;
        END;

        -- App scope already contains every Entity in the App. For the narrower scopes,
        -- recursively include metadata and all published/draft rows sharing its GUID.
        IF @Scope <> 'App'
        BEGIN
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
        END;

        SELECT @EntityCount = COUNT(*) FROM #EntitiesToDelete;
        SELECT @AttributeCount = COUNT(*) FROM #AttributesToDelete;
        SELECT @ContentTypeCount = COUNT(*)
        FROM dbo.TsDynDataContentType
        WHERE (@Scope = 'App' AND AppId = @AppId)
           OR (@Scope = 'ContentType' AND AppId = @AppId AND ContentTypeId = @TargetId);

        IF @Execute = 0
        BEGIN
            SELECT
                N'Preview' AS [Action],
                @Scope AS TargetType,
                @AppId AS AppId,
                @ResultTargetId AS TargetId,
                @TargetName AS TargetName,
                @EntityCount AS EntitiesIncludingMetadata,
                @AttributeCount AS Attributes,
                @ContentTypeCount AS ContentTypes;
            RETURN;
        END;

        -- Delete dependent rows before their Entity and Attribute parents.
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

        -- Entity scope ends above. Wider scopes also remove the selected schema definitions.
        IF @Scope IN ('ContentType', 'App')
        BEGIN
            DELETE a
            FROM dbo.TsDynDataAttribute AS a
            INNER JOIN #AttributesToDelete AS selected ON selected.AttributeId = a.AttributeId;
        END;

        IF @Scope = 'ContentType'
        BEGIN
            DELETE FROM dbo.TsDynDataContentType
            WHERE AppId = @AppId AND ContentTypeId = @TargetId;
        END;

        IF @Scope = 'App'
        BEGIN
            DELETE FROM dbo.TsDynDataContentType
            WHERE AppId = @AppId;

            DELETE FROM dbo.TsDynDataApp
            WHERE AppId = @AppId;
        END;

        IF @InitialTransactionCount = 0
            COMMIT TRANSACTION;

        SELECT
            CASE
                WHEN @InitialTransactionCount = 0 THEN N'Deleted'
                ELSE N'Delete executed in caller transaction'
            END AS [Action],
            @Scope AS TargetType,
            @AppId AS AppId,
            @ResultTargetId AS TargetId,
            @TargetName AS TargetName,
            @EntityCount AS EntitiesIncludingMetadata,
            @AttributeCount AS Attributes,
            @ContentTypeCount AS ContentTypes;
    END TRY
    BEGIN CATCH
        -- Roll back only work owned by this procedure. An uncommittable caller transaction is
        -- left for its owner to roll back after the error is rethrown.
        IF XACT_STATE() <> 0
        BEGIN
            IF @InitialTransactionCount = 0
                ROLLBACK TRANSACTION;
            ELSE IF XACT_STATE() = 1 AND @SavepointCreated = 1
                ROLLBACK TRANSACTION TsDynDataHardDelete;
        END;

        THROW;
    END CATCH;
END;
GO

CREATE OR ALTER PROCEDURE dbo._TsDynData_HardDeleteEntity
    @AppId int,
    @EntityId int,
    @Execute bit = 0
AS
BEGIN
    SET NOCOUNT ON;

    EXEC dbo._TsDynData_HardDelete_Core
        @Scope = 'Entity',
        @AppId = @AppId,
        @TargetId = @EntityId,
        @Execute = @Execute;
END;
GO

CREATE OR ALTER PROCEDURE dbo._TsDynData_HardDeleteContentType
    @AppId int,
    @ContentTypeId int,
    @Execute bit = 0
AS
BEGIN
    SET NOCOUNT ON;

    EXEC dbo._TsDynData_HardDelete_Core
        @Scope = 'ContentType',
        @AppId = @AppId,
        @TargetId = @ContentTypeId,
        @Execute = @Execute;
END;
GO

CREATE OR ALTER PROCEDURE dbo._TsDynData_HardDeleteApp
    @AppId int,
    @Execute bit = 0
AS
BEGIN
    SET NOCOUNT ON;

    EXEC dbo._TsDynData_HardDelete_Core
        @Scope = 'App',
        @AppId = @AppId,
        @Execute = @Execute;
END;
GO
```

## Delete an Entity

This deletes every published/draft row sharing the Entity GUID, recursively attached metadata,
Values, Value-Dimensions, and inbound/outbound Relationships.

```sql
-- Read-only preview.
EXEC dbo._TsDynData_HardDeleteEntity
    @AppId = 0,
    @EntityId = 0;

-- Permanent deletion.
EXEC dbo._TsDynData_HardDeleteEntity
    @AppId = 0,
    @EntityId = 0,
    @Execute = 1;
```

## Delete a Content-Type

This deletes the Content-Type, its Attributes, all its Entities and their data, and metadata attached
to the Content-Type, Attributes, Entities, or their metadata.

```sql
-- Read-only preview.
EXEC dbo._TsDynData_HardDeleteContentType
    @AppId = 0,
    @ContentTypeId = 0;

-- Permanent deletion.
EXEC dbo._TsDynData_HardDeleteContentType
    @AppId = 0,
    @ContentTypeId = 0,
    @Execute = 1;
```

## Delete an App by App ID

This mirrors the server-side delete order in `DbApp`: Value-Dimensions, Values, Relationships,
Entities including JSON Entities, Attributes, Content-Types, and finally the App record.

```sql
-- Read-only preview.
EXEC dbo._TsDynData_HardDeleteApp
    @AppId = 0;

-- Permanent deletion.
EXEC dbo._TsDynData_HardDeleteApp
    @AppId = 0,
    @Execute = 1;
```

## Call the App Procedure for a Custom Selection

Keep custom filtering outside the deletion procedure. Review the selection, then call the App
procedure once for each result. Each call has its own transaction unless the caller already opened
one.

```sql
SELECT AppId, ZoneId, Name
INTO #AppsToDelete
FROM dbo.TsDynDataApp
WHERE /* custom filtering criteria */ 1 = 0;

-- Always review the final selection.
SELECT AppId, ZoneId, Name
FROM #AppsToDelete
ORDER BY AppId;

DECLARE @AppId int;
DECLARE apps CURSOR LOCAL FAST_FORWARD FOR
    SELECT AppId FROM #AppsToDelete ORDER BY AppId;

OPEN apps;
FETCH NEXT FROM apps INTO @AppId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Keep 0 for previews. Change to 1 for permanent deletion.
    EXEC dbo._TsDynData_HardDeleteApp
        @AppId = @AppId,
        @Execute = 0;

    FETCH NEXT FROM apps INTO @AppId;
END;

CLOSE apps;
DEALLOCATE apps;
```

## Remove the Procedures

These procedures are manually installed administration utilities and are not managed by 2sxc
upgrades. Run this only when you want to remove them from the database.

```sql
DROP PROCEDURE IF EXISTS
    dbo._TsDynData_HardDeleteEntity,
    dbo._TsDynData_HardDeleteContentType,
    dbo._TsDynData_HardDeleteApp,
    dbo._TsDynData_HardDelete_Core;
GO
```

---

## History

* 2026-08-31 added hard-delete scripts for Entity, Content-Type, and App (reusable `_TsDynData_*` procedures)
