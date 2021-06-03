---
uid: NetCode.Search.Index
---

# Customize the Search-Index Results (Dnn ☢ only)

Dnn has a built-in search engine which crawls all the modules asking them for data. 

You can easily modify how data in your modules appear in the Dnn search results. 

> [!TIP]
> Before you start, make sure you understand how the [Search Index and Customizations work](xref:Basics.Cms.Search.Index).


## Evolution of Customizing Search

To better understand your options and existing code out in the wild, it helps to understand how this feature developed.

#### First Implementation in 2sxc 6

The initial versions of 2sxc didn't offer this feature, it was added in v6. 
At that time, the idea was that you would create special functions in your Razor files which contained the logic for customizing the results. 
That mechanism still works and you'll find it in many older apps, but we strongly discourage it's use. 

#### Neutralizing Changes in 2sxc 10

In 2sxc v10 we created a new improved base class for Razor files called [RazorComponent](xref:NetCode.Razor.Component) and used the opportunity to improve the signature of the API because the original implementation used some Dnn objects, and we anticipated that we would make this available for other platforms as well. This was a minor change. It still works today, but we discourage it's use. 

#### Code Behind in 2sxc 11

Razor Files were getting very technical if they had this code, and we decided there must be a better way to do this. 
We invented the concept of [Code Behind](xref:NetCode.Razor.CodeBehind) and let developers place the logic there. This was a major improvement, but still not perfect. We discourage it's use. 

#### Separate Search-Customization in 2sxc 12

When we finally implemented 2sxc for Oqtane we realized that our concept still had weaknesses: 

1. Razor files containing search-customization code were confusing
1. Token templates were not able to customize their search result
1. Search customizations may vary between platforms (and some may not offer search at all)
1. Having the code in the Razor-file actually caused problem when creating hybrid apps
1. Often customize search was used for simply disabling search results - which was overkill and confusing
1. If many Views needed the same customizations it was hard to share the code

Because of this we decided to change the implementation completely. As of 2sxc 12 search customization happens in a special code file which can be anywhere in your App. 

> [!TIP]
> As of 2sxc 12 we only recommend this new approach using the separate code file. 
>
> The previous approach may be disabled some day.








This event is called by the view-engine _after_ calling [CustomizeData](xref:NetCode.Razor.CustomizeData) and before passing the `Data` object to the Dnn Search Indexer. 

You can override this event to change how data is presented to the search, for example by bundling items together, or by giving items different URLs so that search knows that they are to appear on a sub-page. 

> [!TIP]
> 2sxc 11 introduces Code-Behind. You can now place the `CustomizeSearch(...)` method in the [code-behind](xref:NetCode.Razor.OrganizeCode) file.

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
