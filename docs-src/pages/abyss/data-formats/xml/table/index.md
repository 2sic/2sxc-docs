---
uid: Basics.DataFormats.Xml.Table.Index
---

# Table Data Format in 2sxc (technical)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

You can export/import lists of data for mass-editing in Excel. 

Read about

👉 [](xref:Basics.Data.ExportImport.Index)

👉 [](xref:Basics.App.ExportImport.Index)

## Example

```xml
<SexyContentData>
  <Entity Type="Categories">
    <Guid>9e751a94-4335-48fa-b1f8-44ca97a06ab8</Guid>
    <Language>en-US</Language>
    <Name>AHV de</Name>
    <SortOrder>30</SortOrder>
    <SharepointId>5543</SharepointId>
    <CategoryLanguage>de</CategoryLanguage>
    <GroupName>AHV</GroupName>
  </Entity>
  <Entity Type="Categories">
    <Guid>9e751a94-4335-48fa-b1f8-44ca97a06ab8</Guid>
    <Language>fr-FR</Language>
    <Name>AVS de</Name>
    <SortOrder>[]</SortOrder>
    <SharepointId>[]</SharepointId>
    <CategoryLanguage>[]</CategoryLanguage>
    <GroupName>AVS</GroupName>
  </Entity>
  <Entity Type="Categories">
    <Guid>9e751a94-4335-48fa-b1f8-44ca97a06ab8</Guid>
    <Language>it-IT</Language>
    <Name>AVS de</Name>
    <SortOrder>[]</SortOrder>
    <SharepointId>[]</SharepointId>
    <CategoryLanguage>[]</CategoryLanguage>
    <GroupName>AVS</GroupName>
  </Entity>
<SexyContentData>
```

This format works well to open in Excel and save again. 

## Special notes

1. Each language will have an own row - but each with the same GUID as the other languages of the same item
1. Special translation scenarios have special placeholders so a re-import will preserve that state

## Known Issues

If you have a field called `<Body>` Excel seems to cause trouble. In that case we recommend you temporarily change all the XML nodes in a text-editor with Search-Replace, then edit in Excel and replace back when done. 