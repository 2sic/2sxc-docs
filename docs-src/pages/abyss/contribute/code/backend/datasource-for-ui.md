---
uid: Abyss.Contribute.Code.Backend.DataSourceForUi
---

# DataSource for UI

[!include["_contributors-only.md"](../_contributors-only.md)]

## Purpose

Use a DataSource to provide data for the UI.
The UI can request this data through the existing `System.SysData` query, so a new list does not need its own WebApi controller and route.
The DataSource handles configuration and output streams, existing backend services still perform the actual work.

This guide describes the internal backend pattern, including the v22 raw-model APIs.
Start with the [backend development setup](xref:Abyss.Contribute.Code.Backend.Index).

## How the Request Works

1. The UI calls `app/auto/query/System.SysData/Default`, supplying `appId`, `SysDataSource`, and any source-specific parameters.
1. The `System.SysData` query uses the `SysData` DataSource to find the requested source in `DataSourceCatalog`.
1. `SysData` checks the source's `DataConfidentiality` against the current user.
1. It creates the source with the current app identity and lookup engine, exposing query-string parameters as configuration values.
1. The requested output streams are evaluated and serialized through the query API.

For example, this relative URL requests the languages of app 42:

```http
GET app/auto/query/System.SysData/Default?appId=42&SysDataSource=System.AppLanguages&$casing=camel
```

The URL is relative to the 2sxc API root and needs the usual platform and authentication context.
Use the existing UI HTTP services to supply that context.
The query response is an object containing stream arrays, even when a source returns only one item.
With `$casing=camel`, the default stream is named `default`.

Use the actual query name **`System.SysData`**.

## Define the DataSource

A typical UI source derives from `CustomDataSource` and has a `[VisualQuery]` attribute.
The attribute supplies both its lookup names and its access classification, even if the source is hidden from VisualQuery.

| Setting | Purpose |
| --- | --- |
| `NameId` | A unique, stable GUID identifying this source. Generate a new one for a new source. |
| `NameIds` | A readable alias such as `System.AppLanguages`, used by `SysDataSource`. Keep aliases unique. |
| `NiceName` and `UiHint` | A readable name and description. |
| `Type = DataSourceType.System` | Classifies this as a system source. |
| `Audience = Audience.System` | Hides an internal UI source from the normal VisualQuery chooser. |
| `DataConfidentiality` | Determines which users may request it through `SysData`. Set this explicitly. |

Use `[PrivateApi]` for internal implementation classes, following the surrounding project conventions.
`Audience` and API-documentation attributes do not grant or restrict data access.

The catalog discovers compiled DataSource types through assembly scanning and resolves their `NameId` and `NameIds`.

## Define the Output Model

For a simple list, define a record implementing `IRawEntityAutoConvert`.
Add `[ContentType]` to describe its generated content type and `[ContentTypeTitle]` to identify the display title.
For example, `ScopeModel` in `ToSic.Eav.DataSources/DataSources.Sys/ScopeModel.cs` contains:

```csharp
[ContentType(
    Name = "Scope",
    Guid = "f134e3c1-f09f-4fbc-85be-de43a64c6eed",
    Description = "Data Scope",
    Scope = "System"
)]
public record ScopeModel : IRawEntityAutoConvert
{
    public required string NameId { get; init; }

    [ContentTypeTitle]
    public required string Name { get; init; }

    public required int TypesTotal { get; init; }
    public required int TypesInherited { get; init; }
    public required int TypesOfApp { get; init; }
}
```

This is an existing model, use your own name and GUID when creating another one.
The conversion creates entities for the query pipeline, it does not save these rows as app content.

Use `ProvideOutRaw` for these models so the DataFactory performs the conversion to `IEntity`.
`IRawEntityAutoConvert` handles automatic property conversion.

Check conversion options when the UI requires more than simple scalar fields:

- `AllowUnknownValueTypes = true` allows values such as nested DTOs to pass through conversion. Use it deliberately and check the resulting JSON.

`AppLanguages` and its `LanguageStatusRaw` model are useful examples of a source with nested permission information.

## Register Lazy Output Streams

Register callbacks in the constructor, and load data inside those callbacks.
The catalog can construct a source just to inspect its stream names, before it has the app configuration needed to load data.

For example, `AppLanguages` registers its default output like this:

```csharp
public AppLanguages(
    Dependencies services,
    LanguagesBackend languagesBackend,
    LazySvc<IAppReaderFactory> appReadersLazy)
    : base(services, logName: "Sxc.AppLangs",
        connect: [languagesBackend, appReadersLazy])
{
    ProvideOutRaw(
        () => GetLanguages(languagesBackend, appReadersLazy),
        options: () => new()
        {
            AutoId = true,
            AllowUnknownValueTypes = true,
        });
}
```

`GetLanguages` obtains the app reader using `AppId`, delegates to `LanguagesBackend`, and returns a list of `LanguageStatusRaw` records.

Without a `name`, `ProvideOutRaw` registers `Default`.
For multiple result sets, register a callback for each named stream.

## Read Request Parameters

Use `[Configuration]` properties and `Configuration.GetThis()` rather than reading HTTP parameters directly.
For example, `SharedFields` declares:

```csharp
[Configuration(Fallback = "0")]
public int AttributeId => Configuration.GetThis(fallback: 0);
```

The UI can supply the value through the same query request:

```http
GET app/auto/query/System.SysData/Default?appId=42&SysDataSource=System.SharedFields&AttributeId=123&$casing=camel
```

`SysDataSource` selects the source; `AttributeId` becomes configuration for that source.
Use `AppId` from the initialized DataSource for app-scoped work.
Give optional settings explicit fallbacks, and validate required values before passing them to backend services.

## Apply Permissions

`SysData` calls `DataSourceInfo.IsAllowed(user)` before constructing the requested source.
The current implementation in `DataConfidentialityHelper` uses these rules:

| `DataConfidentiality` | Required user property |
| --- | --- |
| `Public` | No role requirement at this check |
| `Internal` | `IsContentEditor` |
| `Confidential` | `IsSiteAdmin` |
| `System` | `IsSystemAdmin` |
| `Unknown` (the default) | `IsSystemAdmin` |
| `Never` | Always denied |

These are the source-level checks, in addition to the surrounding query/API permissions.
In particular, `Internal` does not mean any logged-in user.
The classification does not replace those checks or automatically protect every other way of constructing a DataSource.

When migrating an old GET endpoint, review its authorization and output fields before replacing it.

## Call It from the UI

In `eav-ui`, use `SysDataService` to build the request and handle the stream wrapper.
For example, from a service or component where `SysDataService` is already provided:

```typescript
private readonly sysData = inject(SysDataService);

readonly languages = this.sysData.get<LanguageStatus>({
  source: 'System.AppLanguages',
});
```

Here `LanguageStatus` is the UI model matching the returned fields.
The helper supplies `appId`, `SysDataSource`, and `$casing=camel` by default.

- `get<T>()` returns a signal containing the default stream's array.
- `getFirst<T>()` returns a signal containing the first item, or `null`.
- `getMany<T>()` returns the underlying HTTP resource with the stream object, useful for named streams and explicit loading/error handling.
- `params` supplies source configuration; it can also be a signal for reactive requests.
- `fields` sends `$select`, `refresh` triggers reloading, and `streams: '*'` requests all streams.
- `noCamel: true` omits `$casing=camel` for consumers which need the original casing.

---

## History

- Completed DataSource for UI contribution guidelines 2026-09-03
