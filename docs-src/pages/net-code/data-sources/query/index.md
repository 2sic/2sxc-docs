---
uid: NetCode.DataSources.Query.Index
---

# Using Queries in your Code

In a Razor or WebApi file, you can always write something like this

```cs
var query = App.Query["AllBlogPosts"];
var posts = query["Default"];

// you could now work with the data, or you could cast all results into dynamic objects, like...
var categories = AsList(query["Categories"]);

// if all you need is the "Default" stream as dynamic, you can write
var posts = AsList(query);
```

Now you can loop through the data as you would otherwise, for example: 

```cs
<ol>
    @foreach(var person in AsList(query["Persons"]))
    {
        <li>@person.FullName</li>
    }
</ol>
```

## Technical Implementation

The data which defines a query is stored as IEntity data.

* So there is a header IEntity which is read through an [](xref:ToSic.Eav.DataSource.Query.QueryDefinition).
* It contains the name, and a bunch of metadata IEntity items which are read as `QueryPartDefinition`s
* It also contains a list of [Connections](xref:ToSic.Eav.DataSources.Queries.Connection) which define how the DataSources pass data from one source to another.
* There are also test-parameters on such a query, which are only used for testing in the [VisualQuery Designer](xref:Basics.Query.VisualQuery.Index)

## Read also

* [](xref:Basics.Query.Parameters.Index)
* [Blog Posts about VisualQuery Designer](https://2sxc.org/en/blog/tag/visual-query-designer)
* [](xref:NetCode.DataSources.DataSource)


## History

1. Introduced in 2sxc 07.00

