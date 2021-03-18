---
uid: NetCode.DynamicCode.Header
---

# Header / @Header Object

The **Header** is a [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity) in all Dynamic Code (Razor and WebAPI). 

It's used on Views which are configured to have lists - and allows you to add information for the header or similar. So basicall List-Views have 0 or 1 **Header** and 0 or many [Content](xref:NetCode.DynamicCode.Content) items. 

If the View is not a list, the Header will not be available. 

⚡ The [official API docs](xref:ToSic.Sxc.Code.IDynamicCode.Header).

Since it's a Dynamic Entity it carries all values as properties, like `Header.Link` etc. 


[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Example Razor Code

```razor
<h2>
  @Header.Title
</h2>
```

## Header.Presentation

Depending on the view configuration the **Header** can carry additional presentation information, for example how to format the title etc. This is available on `Header.Presentation`. The **Presentation** object is also a [Dynamic Entity](xref:NetCode.DynamicData.DynamicEntity). 

```razor
<h2 class="@Header.Presentation.Highlight">
  @Header.Title
</h2>
```

## Demo Data

Note that the View can be configured to contain demo data for both the **Header** as well as the **Header.Presentation**. In this case your template will receive data to show even if the editor has not added anything. 

## History

1. Introduced in 2sxc 1.0 under the name `List` which was confusing
1. Changed to `Header` in ca. V10 (but List still works for compatibility)
1. Presentation added in this documented form ca. 2sxc 8