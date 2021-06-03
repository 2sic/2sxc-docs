---
uid: NetCode.Razor.Purpose
---
# Property _Purpose_ on a Razor page

> [!WARNING]
> This is an older way to customize the Dnn search index. 
> 
> It is deprecated. 
>
> Use the new mechanisms explained in [Search Customizations](xref:NetCode.Search.Index)


To let your code know, if it's running to produce HTML or if it's running to fill the search-index.


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How to use

in most cases you'll use this within the [CustomizeData](xref:NetCode.Razor.CustomizeData) event, in case you want to provide different data to the template than to the search. 

In most cases you'll also want to override [CustomizeSearch](xref:NetCode.Razor.CustomizeSearch).  

Note that it's of the type `Purposes` which is an enum containing
* WebView,
* IndexingForSearch,
* PublishData

```cs
@using ToSic.Sxc.Blocks;
@if(Purpose == Purposes.IndexingForSearch){
    // code which should only run when indexing
}

```

## Not run code, which can't run while indexing

Sometimes you also have code which requires a user to be visiting a page - like a permission check. Since the indexer doesn't have an HTTP session or a user, this will fail. So you could do something like:

```cs
@using ToSic.Sxc.Blocks;
@if(Purpose != Purposes.IndexingForSearch){
    // code which should only run when really viewing 
    // like something if(userIsLoggedIn) { ... }
}

```

## Demo App or further links
* [Docs on 2sxc.org](http://2sxc.org/en/Docs-Manuals/Feature/feature/2687)

## History

* 2sxc 10.20 - changed to `Purpose` from `InstancePurpose` - old code still works
