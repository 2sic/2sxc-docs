---
uid: Basics.Browser.Css
---

# CSS in the Browser

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .show-html { visibility: visible; } </style>

The **Css** which the browser receives can come from multiple sources:

1. **[App Assets](xref:Basics.App.Assets)** located in your App folder
1. **CDN** (Content Delivery Network) - this is often used for common JS / Style libraries

## Recommendations

1. In general you should bundle and pre-optimize any CSS / SASS code using automations such as WebPack for best possible performance. 
1. Use [Asset Optimizations](xref:Basics.Server.AssetOptimization.Index)
1. Where possible, use CDNs for common libraries
1. Try to use deferred loading for JS and CSS where possible
1. ...this is especially important if you use external fonts, which tend to drag down your [](xref:Ext.Google.PageSpeed)

## Use Koi to Detect the CSS Framework of the Theme

If you create Apps for re-distribution, it may run on sites having different Themes than what you used to develop. 

If you plan on handling this scenario you have two options

1. [Polymorphism](xref:Basics.Polymorphism.Index) where you have multiple templates for each kind of CSS framework
1. Use [Koi](xref:NetCode.Koi.Index) to detect the CSS framework and apply different CSS classes based on the CSS Framework


## History

1. Added in 2sxc 1.0