---
uid: Basics.Browser.EditForm.Index
---
# Edit Content or Data in Dnn / 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .browser-edit-ui { visibility: visible; } </style>

Editing mostly happens in stand-alone dialogs which are JavaScript based (built using Angular). These dialogs are typically dialogs like

1. edit an item
1. edit a combination of items - like a _content_ item and an assigned _presentation-settings_ item

The configuration of these edit-dialogs happens in the **Content Type** configuration, which automatically generates the correct dialog for the user. To understand this better, you may want to research

1. **[Content-Types](xref:Basics.Data.ContentTypes.Index)** which define what fields exist in the edit-dialog
1. **[Field Data Types](xref:Basics.Data.Fields.Index)** which determine what options a field has and how it's stored
1. **[Custom input types](http://2sxc.org/en/Blog/post/custom-input-type-advanced-dynamic-data)** for special input types not provided by default
1. **[Presentation Settings](http://2sxc.org/en/docs/Separate-Presentation-Settings-from-Real-Content)** which tell the view how an item is to be shown, check also the [content/data differences](http://2sxc.org/en/blog/post/12-differences-when-templating-data-instead-of-content/source/dnnsoftware)
1. **[View/Template configuration](xref:Basics.App.Views.Index)** which assigns certain content-types to Templates - check out this [tutorial](https://2sxc.org/en/Learn/Getting-started-with-creating-stuff/First-Content-Template)
1. **[Difference between Content and Data](http://2sxc.org/en/blog/post/12-differences-when-templating-data-instead-of-content)** and how it affects the in-page editing features


## Learn More About...

1. [How to create Custom Input Fields](xref:JsCode.CustomFields.Index)
1. Advanced fields like the [GPS-picker](xref:Basics.Data.Fields.CustomGps)
1. Configuration like Enable-A-Field, Can-be-Translated, Default-values
