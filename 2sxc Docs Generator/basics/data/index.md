---
uid: Basics.Data.Index
---

# Understanding Data...


<div class="overlay-container" style="float: right; width: 300px">
  <div class="overlay-box" style="left: 0%; top: 82%; height: 18%; width: 100%"></div>
  <img src="../assets/show-interact-edit.png" align="right" class="float-right" width="300px">
</div>

Data in 2sxc covers various aspects: 

1. **Data** as a developers sees it - as tables of items / Entities
1. **Content** as an editor sees it - basically bundles of text/image shown on a specific page
1. **Content Presentation Settings** which configure how the content should be shown for each item
1. **Settings** at App-Level
1. **Language Resources** at App-level for multilanguage output
1. **Assets** (images, documents) belonging to this each data-item / Entity

This kind of data is usually used to:

1. Show in the browser with HTML 
1. Show in the browser in a JS-application or SPA
1. Edit in the browser
1. Export / import data
1. Combine with other data
1. Use in other sites or mobile apps with a headless backend

This kind of data can be used in many ways - so let's look at how it's processed on the server:

[!include["App browser js"](../../shared/app/app-server-data.md)]

> [!TIP]
> The Edit UIs are automatically generated based on the Content-Type Schema which says what fields each kind of data has. 


You may want to learn more about:

1. Content-Types
    1. Content-Types in General
    1. Field data types
    1. Input fields
1. Entities and Dynamic Entities
1. List of Entities 
1. Using Entities as Content or as Data
1. Assets
1. ADAM - Automatic Digital Asset Management


## More Advanced Topics

1. Visual Query
1. Data Sources
1. Headless APIs
1. Metadata