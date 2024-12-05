---
uid: NetCode.Search.Index
---

# Customize the Search-Index Results (Dnn ☢️ only)

Dnn has a built-in search engine which crawls all the modules asking them for data. 

You can easily modify how data in your modules appear in the Dnn search results. 

> [!TIP]
> Before you start, make sure you understand how the [Search Index and Customizations work](xref:Basics.Cms.Search.Index).


> [!NOTE]
> This document applies to 2sxc 12.02+. As of 2sxc 12 we only recommend this new approach using the separate code file. 
>
> Previous versions used another mechanism which is deprecated. If you need to know more, read the [Obsolete Razor](xref:NetCode.Razor.Obsolete.Index#data-and-search-customization) docs.


## Programming a Search Mapper 

Here's an example of a `SearchMapper.cs`: 

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using ToSic.Sxc.Context;
using ToSic.Sxc.Search;
/*
Custom code which views use to customize how dnn search treats data of that view.
It's meant for customizing the internal indexer of the platform, _not_ for Google Search.

To use it, create a custom code (.cs) file which implements ICustomizeSearch interface.
You can also inherit from a DynamicCode base class (like Code12) if you need more functionality.

For more guidance on search customizations, see https://go.2sxc.org/customize-search
*/
public class SearchMapper : Custom.Hybrid.Code12, ICustomizeSearch
{
    /// <summary>
    /// Populate the search
    /// </summary>
    /// <param name="searchInfos">Dictionary containing the streams and items in the stream for this search.</param>
    /// <param name="moduleInfo">Module information with which you can find out what page it's on etc.</param>
    /// <param name="beginDate">Last time the indexer ran - because the data you will get is only what was modified since.</param>
    public void CustomizeSearch(Dictionary<string, List<ISearchItem>> searchInfos, IModule moduleInfo, DateTime beginDate)
    {
        // Set this to true if you want to see logs of this search in the insights
        // Only do this while developing, otherwise you'll flood the logs and never see the important parts
        Log.Preserve = false;
        
        foreach (var si in searchInfos["AllPosts"])
        {
            var entity = AsDynamic(si.Entity);
            si.Title = "Title: " + entity.Title;
            si.QueryString = "details=" + entity.UrlKey;
        }

        // Remove not needed streams
        var keys = searchInfos.Keys.ToList();
        foreach (var key in keys)
        {
            if (key != "AllPosts")
            {
                searchInfos.Remove(key);
            }
        }
    }
}
```

## Basics to get Right

1. The File name can be anything you want, but the class name must match it. 
1. Your code can be a simple C# class, but we recommend it inherits from `Custom.Hybrid.Code12`
    1. ...because you then also get more objects like [`App`](xref:NetCode.DynamicCode.Objects.App.Index) or [`CmsContext`](xref:NetCode.DynamicCode.CmsContext) 
    1. You can also inherit from `Custom.Dnn.Code12` which would give you the [`Dnn` object](xref:NetCode.DynamicCode.Dnn) but we don't suggest it, because you should use the [`CmsContext`](xref:NetCode.DynamicCode.CmsContext) where possible.
1. Your class must implement `ToSic.Sxc.Search.ICustomizeSearch` to inform the compiler that it can help with search mapping
1. You must then implement `public void CustomizeSearch(...)` as shown in the example

## Understanding Search-Mapping

Your code will receive the data which would otherwise just be passed to the Dnn Indexer. You can then modify it as you want and make changes like:

1. Remove streams from the dictionary `streamInfos` - thereby dropping entire sets of Entities
1. Remove Entities in a specific stream
1. Change properties like the Title
1. Change properties like the QueryString - this is great on list views where data is indexed in the list, but the link in the search results should go to a details page.


## Develop Search Customizations

To create your search indexing code you'll probably need to tweak and test a few times. Note that the [2sxc Blog App](xref:App.Blog) shows you a real-life example of Search-Customizations. 

So once you've [configured a View to use a custom Search-Mapper](xref:Basics.Cms.Search.Index#custom-search-index-using-code) your work will usually consist of doing the following

1. Making some changes
1. Going into the Dnn Admin and flushing the search-index
1. Then run the indexer and wait till it's completed
1. Check the results or debug issues using the Dnn Events-Log or 2sxc Insights (see below)


## Debugging Search Indexing

Two tools will help you to debug issues

#### 1. Dnn Events Log

Really bad issues (like if your code cannot compile) will be logged in the Dnn Events. So if your code isn't even running, check that. 

#### 2. 2sxc Insights

[2sxc Insights](xref:NetCode.Debug.Insights.Index) will help you see what's happening exactly in your code when you need it. 

> [!WARNING]
> By default the search index will not log its work in the Insights, because it would flood the logs and you wouldn't find the occurances which you need. 
>
> Because of this, logging is disabled by default, and your code can activate it using `Log.Preserve = true;`

Remember to add a bunch of logging like `Log.Add("Got to here");` etc. to verify everything works step-by-step. 


## Common Issues

#### Already Indexed Data is not Reindexed

Often when you're playing with indexing customizations you'll re-run the indexer and expect to see the changed results - but it's still what was there before. 
This is because each Entity has a modified timestamp and only changed entities will be re-indexed. 
This is great for performance, but challenging when making changes. 

👉 Remember to flush the Dnn Search Index before re-indexing to really see if your code worked. 


#### Search Index and Multilanguage (i18n)

It's important to know that on multi-language sites, the module is indexed multiple times for each language. So just be aware of that. 

This event is called by the view-engine _after_ calling [CustomizeData](xref:NetCode.Razor.CustomizeData) and before passing the `Data` object to the Dnn Search Indexer. 

You can override this event to change how data is presented to the search, for example by bundling items together, or by giving items different URLs so that search knows that they are to appear on a sub-page. 

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## How to use

In your razor page (.cshtml file) you can add a script block implementing this, as follows:

```cs
@using ToSic.Eav.Run;
@using ToSic.Sxc.Dnn.Run;
@using ToSic.Sxc.Search;
@functions
{
    // this method is optional - your code wouldn't need it, but it's in here to show how it would work together
    // the CustomizeData would be called first, and potentially modify what is in the Data-object
    public override void CustomizeData()
    {
        // Don't customize anything, nothing to customize in this case
    }

    /// <summary>
    /// Populate the search - ensure that each entity has an own url/page
    /// </summary>
    /// <param name="searchInfos"></param>
    /// <param name="moduleInfo"></param>
    /// <param name="startDate"></param>
    public override void CustomizeSearch(Dictionary<string, List<ISearchItem>> searchInfos, IContainer moduleInfo, DateTime beginDate)
    {
        foreach (var si in searchInfos["Default"])
        {
            // tell the search system what url it should use in the result
            si.QueryString = "mid="+ (moduleInfo as DnnContainer).Id + "&feature=" + si.Entity.EntityId;
        }
    }
}

```
The code above will skip customizing any data (but often you would want that too), then CustomizeSearch modifies the list of search-items before they are indexed. 

## How it works
In general everything will work automatically. This is what happens:

1. 2sxc will retrieve the data added to this module
2. 2sxc will call the [CustomizeData()](xref:NetCode.Razor.CustomizeData) event if the template has such an event. In this event, your code can add more data to the module as needed.
    1. Note that during the search index, no Request-variables exist.
    1. So your method will cause an error if it does something like var x = Request["Category"].
    1. In case of an error, the index will still continue to work, but your changes to the data will fail
    1. To help you with this, a new property called Purpose was added. It tells you if this view/template was created for displaying or for indexing.
1. 2sxc will then use the data and create SearchItems, ready to index.
    1. Each entity will be turned into a SearchItem
    1. Each Content-Type will have an own list (so you can differentiate between all the SearchItems for the Categories and the SearchItems for the Questions)
    1. Multi-Language is handled correctly, so the English index will contain the English content, etc.
1. 2sxc will then call a CustomizeSearch() event, so your code could provide changes.
    1. A common scenario is to say that each entity (say each question) has a different URL (say a details-page).
    1. So even though all entities belong to the module (and Dnn only knows of this one module), the module can say that each entity has an own details page.
1. One this is done, the SearchItems are converted to official SearchDocument-objects and handed over to Dnn


## Read also
* [Purpose](xref:NetCode.Razor.Purpose) - which tells you why the current code is running so you could change the data added
* [CustomizeData](xref:NetCode.Razor.CustomizeData)

## Demo App and further links
You should find some code examples in this demo App
* [FAQ with Categories](http://2sxc.org/en/apps/app/faq-with-categories-and-6-views)

More links: [Description of the feature on 2sxc docs](http://2sxc.org/en/Docs-Manuals/Feature/feature/2683)


## History
1. Introduced in 2sxc 6.2
2. Added support for newer Dnn versions at a later time - not sure when
1. Easier standalone `.cs` implementation introduced in 2sxc 12