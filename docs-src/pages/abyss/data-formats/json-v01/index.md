---
uid: Basics.DataFormats.JsonV1.Index
---

# JSON Format V1

JSON based data storage is used to persist data into a text (JSON) format. In 2sxc 9.4 we introduced it to store entities in the history (for version rollback). Since then it has found many new applications. 

## JSON Package
The Json format has a minimal header like this:

```json
{
  "_": { "V": 1 }
}
```

which just contains the version. Future non-breaking enhancements will leave the version on 1 and optionally add more header information. 

In addition to that, the basic package can contain

1. [`ContentType` node](xref:Basics.DataFormats.JsonV1.ContentType)
1. an [`Entity` node](xref:Basics.DataFormats.JsonV1.Entity)
1. a Query - which is actually also an [Entity](xref:Basics.DataFormats.JsonV1.Entity) with lots of [Metadata](xref:Basics.DataFormats.JsonV1.Metadata)
1. a View - which is an [Entity](xref:Basics.DataFormats.JsonV1.Entity) with [Metadata](xref:Basics.DataFormats.JsonV1.Metadata) and [Assets](xref:Basics.DataFormats.JsonV1.Assets)

This could then look like this: 

```json
{
  "_": { "V": 1 },
  "ContentType": {
    "Id": "|Config ToSic.Eav.DataSources.SqlDataSource",
    "Name": "|Config ToSic.Eav.DataSources.SqlDataSource",
    ...
  }
}
```

## Special Stuff about the JSON Format

#### All values have language information

As we're usually working with real-life content-items, multi-language is always a concern. Because of this, every value is multi-language by default. If the language code is *, that means that this value is the default/fallback value for all languages. See [](xref:Basics.DataFormats.JsonV1.Value)

#### Metadata is a Recursive List of Entities

2sxc and the EAV is all about real-life content-management. As such, many pieces of information have more information attached, called Metadata. Metadata-items could themselves have their own Metadata, which is then of course attached as well. See [](xref:Basics.DataFormats.JsonV1.Metadata)


## Limitations

As of now (2sxc 9.7) such a package can only contain 1 root item (a content-type or an entity). Future versions may enhance this.  

## Read also

* [Format: Json V1 Content-types](xref:Basics.DataFormats.JsonV1.ContentType)
* [Concepts: file provided content-types](xref:Basics.Data.ContentTypes.FileStorage)

## History

1. Added in v9.4
1. Enhanced with Content-Types in v9.7
1. Extended to support attachments so Views can include templates and icons in 2sxc ca. v11.10
