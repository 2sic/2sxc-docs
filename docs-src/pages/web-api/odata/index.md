---
uid: WebApi.OData
---

# OData Query Options for REST APIs

2sxc supports **OData system query options** to filter, sort, paginate, and select data from both [Data](xref:WebApi.Data.Index) and [Query](xref:WebApi.Query) REST endpoints.

These options are added as **query parameters to your URL**.

> [!TIP]
> OData works on:
>
> - **Data endpoints** → `/app/auto/data/[ContentType]`
> - **Query endpoints** → `/app/auto/query/[QueryName]`

---

## Mental Model

Always think of OData like this:

```text
[BASE URL] + ? + [OData parameters]
```

Example:

```http
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true
```

---

## Quick Working Examples

### Filter + Sort

```http
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$orderby=UrlKey
```

### Pagination (second item)

```http
/app/auto/data/BlogPost?$orderby=UrlKey&$skip=1&$top=1
```

### Query Endpoint

```http
/app/auto/query/BlogPosts?$filter=EntityType eq 'blogpost'&$orderby=Title
```

---

## JavaScript Examples

### Using `fetch`

```js
const url = `/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$top=5`;

const res = await fetch(url);
const data = await res.json();
```

### Using `$2sxc`

```js
const sxc = $2sxc(0);

const data = await sxc.webApi.get(
  "app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$top=5"
);
```

---

## Supported OData Options

### `$filter` — Filter Data

Filter results based on conditions.

#### Supported Operators

- `eq`, `ne`, `gt`, `ge`, `lt`, `le`
- `and`
- `not`

#### Supported Functions

- `contains(field, 'text')`
- `startswith(field, 'text')`

### Examples

```http
/app/auto/data/BlogPost?$filter=Title eq 'Hello World'
```

```http
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true and Rating gt 4
```

```http
/app/auto/data/BlogPost?$filter=contains(Description,'world')
```

```http
/app/auto/data/BlogPost?$filter=not contains(Title,'deprecated')
```

### Not Supported

- `or`
- `endswith`, `tolower`, and many other OData functions
- arithmetic operators such as `add`, `sub`, `mul`, `div`, `mod`

---

### `$orderby` — Sorting

```http
/app/auto/data/BlogPost?$orderby=Title
```

```http
/app/auto/data/BlogPost?$orderby=Created desc
```

```http
/app/auto/data/BlogPost?$orderby=Category asc, Created desc
```

---

### `$top` — Limit

```http
/app/auto/data/BlogPost?$top=10
```

---

### `$skip` — Pagination

```http
/app/auto/data/BlogPost?$skip=20&$top=10
```

---

### `$select` — Select Fields

```http
/app/auto/data/BlogPost?$select=Title,Created,Id
```

```http
/app/auto/data/BlogPost?$select=Title&$filter=ShowOnStartPage eq true
```

### Important Behavior

- `$select` reduces payload size
- Works together with other supported OData options
- Still limits the returned fields when filtering, sorting, skipping, or limiting results

---

## Combining Options

```http
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$orderby=Created desc&$skip=10&$top=5&$select=Title,Created
```

This is typical real-world usage.

---

## Query Endpoint Special Behavior

When using queries:

```http
/app/auto/query/MyQuery/MyStream?$filter=Status eq 'Published'
```

Or:

```http
/app/auto/query/MyQuery?stream=MyStream&$top=10
```

### Key Rules

- If exactly one stream is selected, unprefixed OData parameters are merged into that stream
- If multiple streams are requested, use stream-prefixed parameters

Example:

```http
/app/auto/query/MyQuery?stream=MyStream&MyStream$filter=Status eq 'Published'&$orderby=Title&$select=Field1,Field2
```

---

## `$casing` (2sxc specific)

2sxc supports a special `$casing` option to control output field casing.

```http
/app/auto/data/BlogPost?$casing=camel
```

Example result:

```json
{
  "title": "...",
  "created": "..."
}
```

Note: this was added in v21.02.

---

## URL Encoding

This:

```http
$filter=Title eq 'Hello World'
```

Becomes:

```http
$filter=Title%20eq%20%27Hello%20World%27
```

> [!TIP]
> Most browsers and HTTP libraries handle URL encoding automatically.

---

## Real-World Examples

### Latest Blog Posts

```http
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true and contains(Title,'2sxc')&$orderby=Created desc&$top=5&$select=Title,Created,UrlKey
```

### Paginated Product List

```http
/app/auto/data/Product?$filter=InStock eq true&$orderby=Name&$skip=20&$top=10
```

### Search Results

```http
/app/auto/query/Search?$filter=startswith(Title,'Getting Started')&$select=Title,Description
```

### Single Selected Query Stream with Merged OData

```http
/app/auto/query/MyQuery/MyStream?$select=Field1,Field2&$filter=Status eq 'Published'&$orderby=Title&$top=5
```

---

## Limitations

The following are not currently supported:

- `$expand`
- `$compute`
- `$search`
- `$count`
- logical `or`
- lambda operators such as `any` and `all`
- many advanced string/date/math functions
- deep nested `$select`
- spatial functions
- type casting and `$it` references

---

## Performance Tips

- Use `$select` to return only the fields you need
- Use `$filter` server-side instead of filtering in JavaScript
- Use `$top` to limit result size
- Combine filtering and sorting before pagination for predictable results

---

## Technical Implementation

The OData system is built on:

- **ToSic.Sys.OData** — minimal, permissive parser
- **ODataQueryEngine** — execution engine for the EAV / 2sxc stack
- **DataSource Pipeline** — integration with the [DataSource](xref:NetCode.DataSources.Index) architecture

The parser generates an AST (Abstract Syntax Tree) which is then executed against the data source pipeline.

---

## History

1. OData support introduced in 2sxc 17 with basic `$select`
2. Enhanced OData parser in 2sxc 20.x
3. Added `$filter`, `$orderby`, `$top`, and `$skip` support in 2sxc 21.00
4. Added `$casing` support in 2sxc 21.02

---

## See Also

- [Official OData Documentation](http://www.odata.org/)
- [OData v4 URL Conventions](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html)
