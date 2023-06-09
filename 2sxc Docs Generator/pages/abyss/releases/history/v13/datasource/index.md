---
uid: Abyss.Releases.History.V13.DataSource
---

# Fix Breaking Change _DataSource_ in v13

**Keywords:** #Deprecated #DataSource

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production.

Specifically, this feature was removed:

1. `ToSic.Eav.DataSource` to create DataSources

## Reason for Removal

These features were removed because they relied on objects which need Dependency Injection, and calling this object directly cannot give us DI.
These features were almost never used, and newer mechanisms are much more appropriate than that old stuff.

## History - How it Used to Work

2sxc V7 (ca. 2016) introduced this to create DataSources in code. Typically it would have looked like this:

```csharp

var dsMaker = new ToSic.Eav.DataSource();
var ds = dsMaker.GetDataSource<Sql>();
```

## Upgrade to Newer functionality

In Razor and WebApi there are always built-in methods to get data sources, specifically:

1. `CreateSource(...)`
1. `CreateSource<T>(...)`

See [docs](xref:ToSic.Sxc.Code.DynamicCode.CreateSource*)

If you need this in a DLL then these will be missing. For that, please ensure your classes also use DependencyInjection and are created from code which uses DI.

Then, just put a dependency on the new `ToSic.Eav.DataSources.DataSourceFactory` to get the same functionality.

---

Shortlink to here: <https://go.2sxc.org/brc-13-datasource>
