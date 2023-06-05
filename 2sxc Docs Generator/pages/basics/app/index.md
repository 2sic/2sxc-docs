---
uid: Basics.App.Index
---

# What is an App

An app is a standalone bundle of data and functionality. It contains the green and blue parts of the following diagram + any kind of additional material used to build these parts like  JavaScript frameworks which are bundled in the App:

[!include[](~/pages/basics/stack/_shared-full.md)]

<style>
  .context-box-full .todo,
   { visibility: visible; }
</style>

Everything belonging to the App is stored in these locations

1. The [App folder](xref:Basics.App.FolderStructure) contains all the green parts in the image above, including templates, C# code, JavaScript files etc.
1. The database contains all the data of the app
1. The [ADAM](xref:Basics.Cms.Adam.Index) folder contains the Assets for the App items

> [!Important]
> An App doesn't need all of the parts above. Apps can be really trivial.
>
> For example they may only contain 1 simple `Hello World` template and no data at all. And they may also contain 100'000 data items and complex list/details templates.


## Apps are Installed per Site

The EAV is multi-site capable and each Site in the platform corresponds to a **Zone** in the EAV. A Site corresponds to a _Portal_ in Dnn or a _Site_ in Oqtane.
Each Zone contains at least 1 default app called **Content** and additional Apps as configured.

> [!NOTE]
> The ZoneId is usually different than the Dnn _PortalId_ or the Oqtane _SiteId_,
> so [Dnn has a PortalSetting to connect this](xref:Basics.Cms.ContentBlocks.Dnn) and Oqtane has a matching Setting.

> [!TIP]
> Apps are installed _per Site_. So if your platform has multiple Sites, then each site can have different apps, or the same app may be installed multiple times.


## Types of Apps

Your App can be anything you want it to be. The following types are more to give you a sense of how Apps can be used, but these types are not clearly defined. An App can also be many of these at the same time.


### Data Focused Apps

This is the kind of App a _developer_ usually thinks of - with lots of data and various list/details templates. The core idea of these apps is that the data is one or many shared tables and the output will show parts of this data based on rules, filters etc. Examples of such Apps would be:

1. [News](xref:App.News)
1. [Blog](xref:App.Blog)
1. References
1. [FAQ](xref:App.Faq)
1. [Custom Forms Apps](xref:App.Mobius)


### Content Focused Apps / Site Builder Apps

This is the kind of App an _editor_ usually thinks of. The core ideas is that the editor adds an App to a page, and adds data to that instance. The data _belongs_ to that instance, so even if it's technically in a shared table, the user experience makes it feel like each use is autonomous. Examples of such Apps would be:

1. [_The_ Content App](xref:Basics.App.ContentApp.Index)
1. [Image Sliders / Swipers](xref:App.Swiper)
1. [Galleries](xref:App.FancyBoxGallery)
1. [Image Hotspots](xref:App.ImageHotspots)
1. [Accordions](xref:App.Accordion)
1. [QR Code](xref:App.Qr)


### Page Enhancing Apps

This is an App which does something on every page of the Site. The core idea is that a functionality can be used on every page and the logic and data to ensure this is in the App. This kind of App is usually added to the Skin/Theme of the Site so it's available on all pages by default. Examples of such Apps would be:

1. [Add Script or CSS Snippets](xref:App.Snippets) to a page
1. SEO or Open-Graph Enhancements on each page
1. Page protection systems where a part of the page is overlayed until people subscribe
1. Adding third-party extensions such as [Disqus](xref:App.Disqus), [AddSearch](xref:App.AddSearch) or Google Search/Analytics to a page


### SPA Apps (Single Page Applications)

This is an App which contains a JavaScript SPA which will then be the entire UI for users. The data is usually accessed using either the Headless API or custom C# WebAPIs which are also part of the App. Examples of such Apps would be:

1. Customer management SPA
1. A complex search/filter SPA

You can create such SPAs using any popular JavaScript Framework such as

1. [Angular](xref:JsCode.Angular.Index)
1. React
1. Vue


### The _Content_ App

👉 See [](xref:Basics.App.ContentApp.Index)

### The _Primary_ App

👉 See [](xref:Basics.App.PrimaryApp.Index)

---

You may want to learn more about

1. [The App Folder Structure](xref:Basics.App.FolderStructure)
1. [App Icons](xref:Basics.App.Icons)
1. [Bundling / Optimizing assets](xref:Basics.Server.AssetOptimization.Index)
