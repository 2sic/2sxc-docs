---
uid: NetCode.DynamicCode.Content
---

# Content / @Content Object

The **Content** is a [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity) in all Dynamic Code (Razor and WebAPI). 

It contains the content-item assigned to this template. If the View is a list, then **Content** contains the first item in the list. Note that if the View is configured to be a list, then it may also have a [Header](xref:NetCode.DynamicCode.Header).

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.Content).

Since it's a Dynamic Entity it carries all values as properties, like `Content.Link` etc. 


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Example Razor Code

```razor
<div>
  @Content.Name
</div>
```

## Content.Presentation

Depending on the view configuration the **Content** can carry additional presentation information, for example how to format the title etc. This is available on `Content.Presentation`. The **Presentation** object is also a [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity). 

```razor
<div class="@Content.Presentation.Highlight">
  @Content.Name
</div>
```

## Demo Data

Note that the View can be configured to contain demo data for both the **Content** as well as the **Content.Presentation**. In this case your template will receive data to show even if the editor has not added anything. 

## History

1. Introduced in 2sxc 1.0
1. Presentation added in this documented form ca. 2sxc 8