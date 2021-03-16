---
uid: Basics.Browser.JavaScript
---

# JavaScript in the Browser

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .show-js { visibility: visible; } </style>

The **JavaScript** which the browser receives can come from multiple sources:

1. **[App Assets](xref:Basics.App.Assets)** located in your App folder  
    If you are using this, check out [Asset Optimizations](xref:Basics.Server.Assets.Optimization)
1. **CDN** (Content Delivery Network) - this is often used for common JS libraries

## Recommendations

1. In general you should bundle and pre-optimize any JavaScript / Typescript code using automations such as WebPack for best possible performance. 
1. Where possible, use CDNs for common libraries
1. Try to use deferred loading for JS and CSS where possible

## History

1. Added in 2sxc 1.0