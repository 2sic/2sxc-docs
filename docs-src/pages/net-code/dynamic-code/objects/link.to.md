---
uid: NetCode.DynamicCode.Objects.Link.To
---

# Link.To(...) / @Link.To(...) Method in Dynamic Code

Basically you can always link around to other pages, websites or views using normal `<a href="...">text</a>` html. 
And often you just want to add some parameters to the current Url like `?id=27` - but the behavior of this can be very different depending on the Dnn settings. 
The `Link.To` method on the [Link](xref:NetCode.DynamicCode.Objects.Link) object helps you handle this. 

_Note:_ Dnn often has a problem with links, because depending on what page you are on, the bbehavior is a bit different. This is especially important on the home page. Use `@Link.To(...)` to make sure everything works no matter what.


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]

## Purpose of Link.To(...)

The Link.To can be used for the following scenarios

1. Linking to another page in the system, of which you know only the page-id
1. Linking to the current page but adding various parameters
1. Linking to an API endpoint, for example an XML RSS feed 


## How to use

Here's a quick example of using the `Link` object in a Razor template: 

```razor
<a href="@Link.To(parameters: "id=" + item.EntityId)">
    @item.Title 
</a>
```

This example creates a link to the current page, adding _either_ `?id=27` _or_ `/id/27`, depending on the Dnn configuration. 

## How it works

The `Link`-object is always available in all Razor-templates. Internally it uses the Dnn and Oqtane APIs to get the correct url. 

## Using @Link.To() for Pages / Parameters

Example:

```Razor
@Link.To(parameters: "id=17")
@Link.To(parameters: "id=403&category=all")

```

## Linking to a target element with an assigned `id`

For reference, see [HTML Link Bookmarks](https://www.w3schools.com/html/html_links_bookmarks.asp)

Example:

Let's assume you've build a target like this

```Razor
    <div id="@("person-" + person.EntityId)">
        ...
    </div>
```

Then to link straight there in the same page

```Razor
    <a href="@Link.To(parameters: "#person-" + person.EntityId)">
```

Or on another page

```Razor
    <a href="@Link.To(pageId: 40, parameters: "#person-" + person.EntityId)">
```

## Linking to APIs ✨ new!

This was introduced in 2sxc 12.02, since APIs are becoming more important. Here's an example from the Blog 5:

```
<a href='@Link.To(api: "api/Blog/Rss", parameters: filteredCategory == null ? "" : "category=" + filteredCategory.Key)' target="_blank">
  <i class="fas fa-rss align-self-center text-white"></i>
</a>
```

## Notes and Clarifications

The Link-Object is of type [](xref:ToSic.Sxc.Services.ILinkService).

### Enforced Parameter Naming

To promote long term API stability, we require all parameters to be [named](xref:NetCode.Conventions.NamedParameters) when used. This allows us to add further parameters later on, and the calls will still work.

```razor
<!-- this will work -->
@Link.To(parameters: "id=17")
@Link.To(parameters: "id=403&category=all")

<!-- new in 2sxc 9.5.1 -->
@Link.To(pageId: 40, parameters: "id=403&category=all")

<!-- this won't work -->
@Link.To("id=17")
```

## Demo App and further links

You should find some code examples in this demo App
* [Blog App](xref:App.Blog)

## History

1. Introduced in 2sxc 8.4
1. Enhanced in 2sxc 9.5.1 with parameter `pageId`
1. Added `api` parameter in v12.02 to allow linking to APIs