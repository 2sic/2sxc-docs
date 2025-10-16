---
uid: WebApi.OData
---

# OData Query Options for REST APIs

2sxc supports **OData system query options** to filter, sort, paginate, and select data from both [Data](xref:WebApi.Data.Index) and [Query](xref:WebApi.Query) REST endpoints. This allows you to append standard OData parameters to your URLs for powerful data querying.

> [!TIP]
> OData query options work on both:
>
> - **Data endpoints**: `.../app/auto/data/[ContentType]`
> - **Query endpoints**: `.../app/auto/query/[QueryName]`

## Quick Examples

Filter and sort blog posts:

```url
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$orderby=UrlKey
```

Get the second blog post (pagination):

```url
/app/auto/data/BlogPost?$orderby=UrlKey&$skip=1&$top=1
```

Query with filter and sort:

```url
/app/auto/query/nameOfQuery?$filter=EntityType eq 'blogpost' and ShowOnStartPage eq true&$orderby=UrlKey
```

## How OData Works with 2sxc Endpoints

### Data Endpoint with OData

The [Data REST API](xref:WebApi.Data.Index) endpoint lets you query content-types directly:

```url
[root-path]/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$orderby=Created desc&$top=10
```

This returns the 10 most recent blog posts where `ShowOnStartPage` is true.

### Query Endpoint with OData

The [Query REST API](xref:WebApi.Query) endpoint lets you query [VisualQuery](xref:Basics.Query.VisualQuery.Index) pipelines:

```url
[root-path]/app/auto/query/BlogPostsFiltered?$orderby=Title&$skip=20&$top=10
```

This executes your predefined query and then applies additional OData filtering/sorting on top of the results.

## Supported OData System Query Options

2sxc uses the **ToSic.Sys.OData** parser which supports a practical subset of OData v4 system query options.

### $filter - Filter Data

Filter results based on conditions.

**Supported Operators:**

- Comparison: `eq` (equals), `ne` (not equals), `gt` (greater than), `ge` (greater or equal), `lt` (less than), `le` (less or equal)
- Logical: `and` (combine conditions)
- Negation: `not` (negate an expression)

**Supported Functions:**

- `contains(field, 'text')` - check if field contains text
- `startswith(field, 'text')` - check if field starts with text

**Examples:**

Simple equality:

```odata
$filter=Title eq 'Hello World'
```

Multiple conditions:

```odata
$filter=EntityType eq 'blogpost' and ShowOnStartPage eq true
```

Contains function:

```odata
$filter=contains(Description, 'world')
```

Starts with function:

```odata
$filter=startswith(Name, 'Acme')
```

Negated contains:

```odata
$filter=not contains(Description, 'deprecated')
```

Numeric comparison:

```odata
$filter=Rating gt 4 and Rating le 5
```

> [!IMPORTANT]
> **Not Currently Supported:**
>
> - Logical `or` operator (only `and` is supported)
> - Arithmetic operators (`add`, `sub`, `mul`, `div`, `mod`)
> - Complex nested expressions with mixed `and`/`or`
> - Many OData functions like `endswith`, `indexof`, `tolower`, etc.

### $orderby - Sort Results

Sort results by one or more fields.

**Syntax:** `$orderby=Field1 [asc|desc], Field2 [asc|desc]`

**Examples:**

Sort by single field ascending (default):

```odata
$orderby=Title
```

Sort descending:

```odata
$orderby=Created desc
```

Sort by multiple fields:

```odata
$orderby=Category asc, Created desc
```

### $top - Limit Results

Limit the number of results returned.

**Syntax:** `$top=number`

**Examples:**

Get first 10 items:

```odata
$top=10
```

Combine with ordering:

```odata
$orderby=Created desc&$top=5
```

### $skip - Skip Results (Pagination)

Skip a specified number of results (useful for pagination).

**Syntax:** `$skip=number`

**Examples:**

Skip first 20 items:

```odata
$skip=20
```

Pagination (page 2 with 10 items per page):

```odata
$skip=10&$top=10
```

### $select - Select Specific Fields

Return only specific fields instead of all entity data.

**Syntax:** `$select=Field1,Field2,Field3`

**Examples:**

Select specific fields:

```odata
$select=Title,Created,Id
```

Select with filter:

```odata
$select=Title,Description&$filter=ShowOnStartPage eq true
```

**Special Field Aliases:**

2sxc provides convenient aliases for common system fields:

- `Id` or `EntityId` - Entity ID
- `Guid` or `EntityGuid` - Entity GUID
- `Created` - Creation date
- `Modified` - Last modified date
- `Title` - Title field

### Combining Multiple Options

You can combine multiple OData options in a single request:

```url
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true&$orderby=Created desc&$skip=10&$top=5&$select=Title,Created,UrlKey
```

This example:

1. Filters for posts where `ShowOnStartPage` is true
2. Sorts by `Created` date descending
3. Skips the first 10 results
4. Returns the next 5 results
5. Returns only `Title`, `Created`, and `UrlKey` fields

## Real-World Examples

### Example 1: Latest Published Blog Posts

```url
/app/auto/data/BlogPost?$filter=ShowOnStartPage eq true and contains(Title,'2sxc')&$orderby=Created desc&$top=5&$select=Title,Created,UrlKey
```

This returns the 5 most recent blog posts that:

- Have `ShowOnStartPage` set to true
- Contain "2sxc" in the title
- Returns only Title, Created date, and UrlKey

### Example 2: Paginated Product List

```url
/app/auto/data/Product?$filter=InStock eq true&$orderby=Name&$skip=20&$top=10
```

This returns products 21-30 (page 3 with 10 per page) that are in stock, sorted by name.

### Example 3: Search Results

```url
/app/auto/query/SearchResults?$filter=startswith(Title,'Getting Started')&$orderby=Title&$select=Title,Description,Url
```

This executes a predefined query and then filters for items starting with "Getting Started".

## URL Encoding

When using OData query options in URLs, special characters must be URL-encoded:

| Character | Encoded |
|-----------|---------|
| Space     | `%20`   |
| `'` (single quote) | `%27` |
| `eq`      | (no encoding needed) |

**Example with encoding:**

```url
/app/auto/data/BlogPost?$filter=Title eq 'Hello World'
```

Becomes:

```url
/app/auto/data/BlogPost?$filter=Title%20eq%20%27Hello%20World%27
```

> [!TIP]
> Most HTTP libraries and browsers handle URL encoding automatically.

## Limitations and Not Supported

The 2sxc OData implementation focuses on practical, commonly-used features. The following are **not currently supported**:

### Not Parsed/Not Executed

- `$expand` - Expanding related entities
- `$compute` - Computed properties
- `$search` - Free-text search
- `$count` - Inline count
- Logical `or` operator in `$filter`
- Arithmetic operators in `$filter` (`add`, `sub`, `mul`, `div`, `mod`)
- Lambda operators (`any`, `all`)
- OData functions: `endswith`, `indexof`, `substring`, `toupper`, `tolower`, `length`, `trim`, `concat`, `year`, `month`, `day`, `hour`, `minute`, `second`, `date`, `time`, etc.
- Spatial/geographic functions
- Type casting and `$it` references
- Deep `$select` with nested options

### Technical Notes

- The parser is permissive and syntax-oriented; it doesn't perform semantic validation
- The execution engine supports a pragmatic subset for stable, predictable behavior
- Filter expressions expect: attribute identifier on the left, literal/value on the right

## Performance Considerations

- **Use $select** to return only needed fields (reduces payload size)
- **Filter early** using `$filter` rather than retrieving all data and filtering client-side
- **Limit results** with `$top` to avoid large responses

## Technical Implementation

The OData system is built on:

- **ToSic.Sys.OData** - Minimal, permissive parser based on OASIS OData ABNF
- **ODataQueryEngine** - Execution engine for the EAV/2sxc data stack
- **DataSource Pipeline** - Integrates with 2sxc's [DataSource](xref:NetCode.DataSources.Index) architecture

The parser generates an AST (Abstract Syntax Tree) which is then executed against the data source pipeline.

## History

1. OData support introduced in 2sxc 17 (basic select)
1. Enhanced OData parser in 2sxc 20.x

---

## See Also

- [Official OData Documentation](http://www.odata.org/)
- [OData v4 URL Conventions](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html)
