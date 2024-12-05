---
uid: NetCode.DataSources.Use.QueryParameters
---

# Set Parameters for Queries in C#

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .query { visibility: visible; } </style>

If a [Query](xref:Basics.Query.Index) has been configured to use **Parameters** 
then your C# code can set these parameters before running the query. 

This uses the [Params](xref:Abyss.Parts.LookUp.Params) [LookUp](xref:Abyss.Parts.LookUp.Index)

#todoc - explain how it's configured to use parameters


In a Razor or WebApi file, you would write something like this:

```cs
var allPosts = App.Query["AllBlogPosts"];
allPosts.Params("Category", "Web");
var posts = allPosts["Default"];

var dynPosts = AsList(posts);
```

> [!WARNING]
> Query objects are single use - which is an internal optimization for reliable, rapid access. 
> So if you retrieve various streams, the query still only executes once.  
> But if you set a parameter after running the query, you will get an error, unless you call `Reset()` first. 
> See the next example:


```cs
var query = App.Query["AllBlogPosts"];
query.Params("Category", "Web");
var webPosts = AsList(query);

// this would result in an error
// allPosts.Params("Category", "IT");

// this works
query.Reset();
query.Params("Category", "IT");
var itPosts = AsList(query);
```



---

## History

1. Params was introduced in 2sxc 10.22
