---
uid: NetCode.Razor.Obsolete.Index
---

# Obsolete, Old APIs in Razor

2sxc has been around since 2012 and therefor has had various things which were redesigned and improved - sometimes making old implementations / APIs obsolete. 

We try very hard to ensure that old APIs still work - so most of the APIs you'll see here will actually continue to work, but you shouldn't use them as they fall into one of these categories:

1. A better solution / API has been created
1. Other new features are not compatible with the old implementation
1. Older implementations may stop working some day

Since you may still have code which uses these APIs you may want to fix something or migrate them to something newer. That's what this page is meant for. 


## Data and Search Customization

This section only applies to Dnn, as Oqtane doesn't have a search index built it yet. 

👉 Read about [Search Customization](xref:NetCode.Search.Index) to discover how it should be done today. 

### Evolution of Customizing Search

Let's begin with the **Evolution of Customizing Search** as it helps to understand how this feature developed.

#### First Implementation in 2sxc 6

The initial versions of 2sxc didn't offer this feature, it was added in v6. 
At that time, the idea was that you would create special functions in your Razor files which contained the logic for customizing the results. 
The methods used were [CustomizeData](xref:NetCode.Razor.CustomizeData) and [CustomizeSearch](xref:NetCode.Razor.CustomizeSearch). 
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

Because of this we decided to change the implementation completely. 
As of 2sxc v12 the search customization happens in a special code file which can be anywhere in your App. 
Your [view is then configured](xref:Basics.Cms.Search.Index) to use that code.

👉 Use the new mechanisms explained in [Search Customizations](xref:NetCode.Search.Index)
