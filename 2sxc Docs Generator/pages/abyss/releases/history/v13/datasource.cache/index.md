---
uid: Abyss.Releases.History.V13.DataSource.Cache
---

# Fix Breaking Change _DataSource.Cache_ in v13

**Keywords:** #Deprecated #DataSource

2sxc v13 cleans up some historic, deprecated functionality. They were not used much, but if you have code which used this, here's how to fix any code in production. 

Specifically, this feature was removed:

1. `ToSic.Sxc.DataSources.IBlockDataSource.Cache`, usually used as `Data.Cache.GetContentType(contentTypeName)` to find a Content-Type

## Reason for Removal

These features were removed because the API was misplaced. 
Unfortunately it was in the original Mobius-Forms so we are giving it a 1 year deprecation, and will be fully removed it v15. 


## Upgrade to Newer functionality

If you look at the Code in Mobius, you will see that the name is the only thing used. This was the code:

```c#
var type = Data.Cache.GetContentType(config.ContentType);
...
App.Data.Create(type.Name, contactFormRequest);
...
files.Add(SaveInAdam(stream: new MemoryStream(data), fileName: file["Name"], contentType: type.Name, guid: guid, field: file["Field"]));
...
```

Because of this, you can actually just skip gotting the content-type, and just use the name directly. 

To fix this, just use the `config.ContentTypeName` instead of the `type.Name` OR upgrade to a newer Mobius. 

If you need the type for other uses, best create an issue on GitHub.

---

Shortlink to here: https://go.2sxc.org/brc-13-datasource-cache