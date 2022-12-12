---
uid: NetCode.Razor.Component
---
# RazorComponent API

For current best-practices, all Razor templates should start with a line like  
`@inherits Custom.Hybrid.Razor14` to make sure that it has all the new features.
If you really need DNN features such as the `.Dnn` object use `@inherits Custom.Dnn.Razor12`.


> [!WARNING]
> If you don't specify this first line, your code will inherit from a different class,
> so many features won't work as documented.


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## APIs in Razor Components / Templates

> [!TIP]
> Most of these APIs can be seen live in action with source code in the [](xref:Tut.Razor.Home)

### Standard Dynamic Code API

Razor templates / components have all the objects and APIs of [Dynamic Code](xref:NetCode.DynamicCode.Index)


### Additional Razor Component APIs

In addition there are a few additional objects & commands which you will usually use, most of which are standard Razor APIs

1. [Edit](xref:NetCode.Razor.Edit)  
    Helper providing you with various edit-functionality like `@Edit.TagToolbar(...)`
1. ~~[Code](xref:NetCode.Razor.CodeBehind)~~ (deprecated)  
    The object from the Code-Behind

### Common Standard Razor APIs and Keywords

1. `Html.Raw(string)`  
    Standard Razor API to output the HTML in a string instead of showing tags in the visible page
1. `RenderPage(path, data)`  
    Standard Razor API - google it if you need it or read about [splitting code in Razor](xref:NetCode.Razor.OrganizeCode)

The following keywords are normal in any Razor system, but it's good if you know them. Google them to learn more.

* `@functions`
* `@helpers`

## Customizing Data & Search

Templates can tell the platform how search results should be treated. This is important for list-details scenarios. It's not documented well, but you can check examples in the Blog App. It needs these evens / properties:

* [CustomizeData](xref:NetCode.Razor.CustomizeData) - is like a "before-data-is-used" of the page, used to change what data is delivered to the page - or to the search.  
  Note that this is an older feature and many things this does can also be done using the [VisualQuery](xref:Basics.Query.VisualQuery.Index) designer. But sometimes you will need code, and this is the place to do it.
* [CustomizeSearch](xref:NetCode.Razor.CustomizeSearch)
* [Purpose](xref:NetCode.Razor.Purpose) - tells you if the code is running to render into html, or for another reason like populating the search index - so your code can adapt

