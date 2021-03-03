---
uid: NetCode.Razor.Component
---
# RazorComponent API

As of 2sxc 10.20, all Razor templates should start with a line like  
`@inherits ToSic.Sxc.Dnn.RazorComponent` 
to make sure that it has all the new features. 

> [!WARNING]
> If you don't specify this first line, your code will inherit from a different class,
> so many features won't work as documented. 

## APIs in Razor Components / Templates

Razor templates / components have all the objects and APIs of [Dynamic Code](xref:NetCode.DynamicCode.Index)

TODO: list all the APIs here

TODO: also list additional commands like @helper


In addition there are a few additional objects & commands which you will usually use, most of which are standard Razor APIs

1. `Code`  
    The object from the Code-Behind - see @NetCode.Razor.CodeBehind
1. `Html.Raw(string)`  
    Standard Razor API to output the HTML in a string instead of showing tags in the visible page
1. `RenderTemplate(path, data)`  
    Standard Razor API - google it if you need it


## Customizing Data & Search

Templates can tell the platform how search results should be treated. This is important for list-details scenarios. It's not documented well, but you can check examples in the Blog App.

* `Overrideable` [CustomizeData](xref:NetCode.Razor.CustomizeData) - is like a "before-data-is-used" of the page, used to change what data is delivered to the page - or to the search.  
  Note that this is an older feature and many things this does can also be done using the visual query designer. But sometimes you will need code, and this is the place to do it.
* `Overridable` [CustomizeSearch](xref:NetCode.Razor.CustomizeSearch)
* `string` [Purpose](xref:NetCode.Razor.Purpose) - tells you if the code is running to render into html, or for another reason like populating the search index - so your code can adapt

