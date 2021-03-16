---
uid: Basics.Browser.Css
---

# Css in the Browser

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .show-css { visibility: visible; } </style>

The **Css** which the browser receives can come from multiple sources:

1. **[App Assets](xref:Basics.App.Assets)** located in your App folder  
    If you are using this, check out [Asset Optimizations](xref:Basics.Server.Assets.Optimization)
1. **CDN** (Content Delivery Network) - this is often used for common JS / Style libraries

## Recommendations

1. In general you should bundle and pre-optimize any CSS / SASS code using automations such as WebPack for best possible performance. 
1. Where possible, use CDNs for common libraries
1. Try to use deferred loading for JS and CSS where possible
1. ...this is especially important if you use external fonts, which tend to drag down your [](xref:Ext.Google.PageSpeed)

## History

1. Added in 2sxc 1.0