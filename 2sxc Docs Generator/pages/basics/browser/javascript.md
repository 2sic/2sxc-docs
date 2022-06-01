---
uid: Basics.Browser.JavaScript
---

# JavaScript in the Browser

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .show-js { visibility: visible; } </style>

The **JavaScript** which the browser receives can come from multiple sources:

1. **[App Assets](xref:Basics.App.Assets)** located in your App folder  
1. **CDN** (Content Delivery Network) - this is often used for common JS libraries

## Asset Recommendations

1. In general you should bundle and pre-optimize any JavaScript / Typescript code using automations such as WebPack for best possible performance. 
1. Use [Asset Optimizations](xref:Basics.Server.AssetOptimization.Index)
1. Where possible, use CDNs for common libraries
1. Try to use deferred loading for JS and CSS where possible

## JavaScript Recommendations

1. [Point your JS to target the HTML DOM you created in your templates](xref:JsCode.Tips.Index)
1. Create dynamic JavaScript or Styles based on values in the data #todoc
1. Pass [CMS data](xref:Basics.Browser.JsonData) (content-items) to scripts
    1. using inline JSON
    1. using HTML attributes
    1. using REST APIs to get data / content-items
    1. the JSON format of data in the APIs #todoc



## History

1. Added in 2sxc 1.0