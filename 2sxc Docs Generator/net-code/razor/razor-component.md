---
uid: NetCode.Razor.Component
---
# RazorComponent aka Razor Templates

Razor Components contain both normal HTML intermixed with Razor placeholders like `@Content.FirstName` or longer code blocks usually marked with `@{ ...}`.

All razor Templates derive from the RazorComponent, so the following variables and objects are available for you to work with.

> [!TIP]
> Read about Razor Components/Templas in the [Specs](xref:Specs.Cms.Templates.Razor) or the [API docs](xref:ToSic.Sxc.Dnn.RazorComponent).

[!include["Tip Inherits"](_include-tip-inherits.md)]

## Example
Visit the [App Catalog](xref:AppsCatalog) where almost all apps use Razor. There you can find hundreds of examples. 


## APIs in Razor Components / Templates

Razor templates / components have all the objects and APIs of [Dynamic Code](xref:NetCode.DynamicCode.Index)

In addition there are a few more commands which you will usually use, most of which are standard Razor APIs

1. `Code`  
    Code Behind files - google examples for now, not fully documented (TODO)
1. `Html.Raw(string)`  
    Standard Razor API to output the HTML in a string instead of showing tags in the visible page
1. `RenderPage(path, data)`  
    Standard Razor API - google it if you need it
1. `RenderTemplate(...)`  
    Standard Razor API - google it if you need it


## Customizing Data & Search

Templates can tell the platform how search results should be treated. This is important for list-details scenarios. It's not documented well, but you can check examples in the Blog App.

* `Overrideable` [CustomizeData](xref:NetCode.Razor.CustomizeData) - is like a "before-data-is-used" of the page, used to change what data is delivered to the page - or to the search.  
  Note that this is an older feature and many things this does can also be done using the visual query designer. But sometimes you will need code, and this is the place to do it.
* `Overridable` [CustomizeSearch](xref:NetCode.Razor.CustomizeSearch)
* `string` [Purpose](xref:NetCode.Razor.Purpose) - tells you if the code is running to render into html, or for another reason like populating the search index - so your code can adapt

