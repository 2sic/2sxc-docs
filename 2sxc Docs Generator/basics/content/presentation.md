---
uid: Basics.Content.Presentation
---

# Content Presentation Settings

[!include[](../stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

When [Data](xref:Basics.Data.Index) is used as [Content](xref:Basics.Content.Index) it can also have **Presentation** settings. 

## Example

This is important because the _same piece_ of content (like an Address) may need to be visualized different ways depending on how it's used. Let's say we have an Address of 2sic in Switzerland as Data, and we're using it in a few places:

1. In the footer of the website we're just showing it, the template says how it's shown
1. In the _We make Websites Page_ we have a CTA (Call to Action) with two addresses, and the 2sic address is configured to be highlighted using the **Presentation**
1. We have a _Contact Page_ where it's shown in a Google-Maps - there we configured the **Presentation** to use a pink pin

## Available on each Content-Item and on Header

**Presentation** is available on all Content items and also in the Header (if a View is configured to have a List). The [View](xref:Basics.App.Views) configuration determines if there is a **Presentation** setting on Content (or Header) and what Content-Type is to be used. 

## Use in Code

In C# you will usually do things like `@Content.Presentation.Color` or similar. Check the [C# API Docs for this](xref:NetCode.DynamicCode.Content).

In Tokens you will usually do things like `[Content:Presentation:Color]`. Check the [Tokens docs](xref:Basics.Server.Render.Tokens.Index).

## History

1. Introduced in 2sxc v2.0