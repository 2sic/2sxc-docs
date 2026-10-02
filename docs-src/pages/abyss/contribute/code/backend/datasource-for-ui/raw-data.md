---
uid: Abyss.Contribute.Code.Backend.DataSourceForUi.RawData
---

# Raw Data Returned by DataSources

[!include["_contributors-only.md"](../../_contributors-only.md)]

Most DataSources should return simple **raw objects**.
2sxc then converts these objects into entities for the query and the UI.

> [!TIP]
> In most cases, create a small record which implements `IRawEntityAutoConvert`.

The APIs on this page were introduced as work-in-progress APIs for v22.
The correct interface name is `IRawEntityAutoConvert`, not `IRawAutoConvert`.

## The Normal Way: `IRawEntityAutoConvert`

Create a record containing the values the UI needs:

```csharp
using ToSic.Eav.Data.ContentTypes;
using ToSic.Eav.Data.Raw;

[ContentType(
    Name = "MetadataTargetTypes",
    Guid = "52c96a68-c791-439f-a154-7c46c1bfa0d9",
    Description = "Metadata target type",
    Scope = "System"
)]
internal sealed record MetadataTargetTypeRaw(
    int Id,
    [property: ContentTypeTitle] string Title,
    string NameId
) : IRawEntityAutoConvert;
```

Then return these records from the DataSource:

```csharp
public MetadataTargetTypes(Dependencies services)
    : base(services, logName: "Ds.MetaTg")
{
    ProvideOutRaw(GetList);
}

private IEnumerable<MetadataTargetTypeRaw> GetList() =>
    service.GetItems()
        .Select(item => new MetadataTargetTypeRaw(
            Id: item.Id,
            Title: item.Title,
            NameId: item.NameId
        ));
```

That is all that is needed in the common case.

## What Happens During Conversion

When the stream is requested:

1. `GetList()` loads the raw records.
1. `ProvideOutRaw(...)` passes them to the data factory.
1. Public properties such as `Title` and `NameId` become entity fields.
1. The resulting entities are returned through the query API.

The entities are temporary query results.
They are not saved as app content.

Some property names have a special meaning:

| Property | What happens |
| --- | --- |
| `Id` | Used as the entity ID |
| `Guid` | Used as the entity GUID |
| `Created` | Used as the creation date |
| `Modified` | Used as the modification date |

These properties do not appear again as normal fields.
If no ID is supplied, the factory normally creates one automatically.

## Creating a Good Raw Model

Use these simple rules:

1. Prefer an `internal sealed record`.
1. Implement `IRawEntityAutoConvert`.
1. Add `[ContentType]` with a new, stable GUID.
1. Mark the main display property with `[ContentTypeTitle]`.
1. Only add properties that should be returned to the UI.
1. Only provide an ID or GUID when the source has a meaningful one.

For positional records, use `[property: ContentTypeTitle]` as shown above.

Keep the values simple: strings, numbers, booleans, dates, and similar scalar values.
Nested objects are not converted recursively.

If a nested object must be included in the JSON, allow it explicitly and test the resulting response:

```csharp
ProvideOutRaw(
    GetList,
    options: () => new()
    {
        AllowUnknownValueTypes = true,
    });
```

## Other Ways to Return Raw Data

There are three less common alternatives.

### `new RawEntity()`

Use `RawEntity` when the field names are dynamic or the values are already in a dictionary:

```csharp
new RawEntity
{
    Id = app.Id,
    Values = new Dictionary<string, object?>
    {
        ["Name"] = app.Name,
        ["Folder"] = app.Folder,
        ["IsHidden"] = app.IsHidden,
    },
};
```

In this case, the DataSource often supplies the type and title names:

```csharp
ProvideOutRaw(
    GetApps,
    options: () => new()
    {
        TypeName = "App",
        TitleField = "Name",
    });
```

### A Custom `IRawEntity`

You can create your own class implementing `IRawEntity`.
It must provide `Id`, `Guid`, `Created`, `Modified`, and a `Values` dictionary.

This is rarely necessary because `RawEntity` already implements it.

### `IRawEntityConvertible`

Use `IRawEntityConvertible` when conversion needs custom logic, for example:

- removing or renaming fields;
- only adding an expensive value when requested;
- creating relationships between returned entities;
- performing a highly optimized conversion.

Its `GetConverter()` method returns a converter which creates a `RawEntity`.
Keep this method as an explicit interface implementation so it does not appear in the serialized model.

See `AppStackDataRaw` and `UserModelRaw` in the examples below.

## Which Type Should I Choose?

| Situation | Use |
| --- | --- |
| Normal typed record | `IRawEntityAutoConvert` |
| Dynamic dictionary of fields | `new RawEntity()` |
| Reusable custom raw container | `IRawEntity` |
| Special conversion logic or relationships | `IRawEntityConvertible` |

`IRawData` is only the shared marker interface.
Do not implement only `IRawData`, because it does not explain how the object should be converted.

## Output Streams

`ProvideOutRaw(GetList)` creates the default stream.
Use `name` for additional streams:

```csharp
ProvideOutRaw(GetItems);
ProvideOutRaw(GetWarnings, name: "Warnings");
```

The callback remains lazy: `GetItems()` is called when the stream is requested, not while the DataSource is constructed.

A very simple DataSource can instead override its default output:

```csharp
protected override IEnumerable<IRawData> GetDefault() => service.GetItems();
```

## Real Examples

| What to see | Example |
| --- | --- |
| Recommended auto-converted record | [`MetadataTargetTypeRaw`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/DataSources.Sys/MetadataTargetTypeRaw.cs) and [`MetadataTargetTypes`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/DataSources.Sys/MetadataTargetTypes.cs) |
| Auto-converted language records | [`AppLanguageState`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.Context/Context/Sys/Languages/AppLanguageState.cs) and [`AppLanguages`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/DataSources.Sys/AppLanguages.cs) |
| Multiple named streams | [`SystemInfo`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.WebApi/WebApi.Sys/Admin/SystemInfo.cs) |
| Direct `new RawEntity()` | [`Apps`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/DataSources.Sys/Apps.cs) and [`CodeGenerators`](https://github.com/2sic/2sxc/blob/master/Src/Sxc/ToSic.Sxc.Code.Generate/DataSources/CodeGenerators.cs) |
| Custom conversion | [`AppStackDataRaw`](https://github.com/2sic/eav-server/blob/master/ToSic.Eav.DataSources/DataSources.Sys/Stack/AppStackDataRaw.cs) |
| Custom conversion with relationships | [`UserModelRaw`](https://github.com/2sic/2sxc/blob/master/Src/Sxc/ToSic.Sxc.Cms/Cms/Users/Sys/UserModelRaw.cs) |

The core raw-conversion code is in `eav-server/ToSic.Eav.Data.Build/Data.Raw/`.

---

## History

- Documented raw DataSource return conventions 2026-10-02
