---
uid: Basics.Content.Index
---

# Content - Data made Useful

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

Data is just numbers and texts.
Content extends Data to become information.
Since this confuses many people, we must explain it in more depth.

_Important: This document is about the **Concept of Content vs. Data**.
If you're looking for information about the [Content-App go here](xref:Basics.App.ContentApp.Index)._

## Content vs. Data

**Data** in itself is just sets of values without context and meaning.
An Entity containing a `Title`, `Body` and `Image` is Data.
If you would find this in a database, and the title read **Read more about this** it would be fairly meaningless in itself.

> [!TIP]
> A lot of data is managed in terms of lists and details which makes it useful that way.
> A **Catalog** is usually Data-Driven and this makes sense - the list/details templates will then make it useful.

On the other hand we have **Content** placed on a specific page in a specific position, where the reader experiences it in the context and meaning of other stuff on the same page.

> [!TIP]
> Content is created by editors on the page and the editor ensures that it makes sense together with other content on the same page.




<img src="./assets/dikw-pyramid.svg" width="33%" class="float-right">

## Content is Information

The editor gives the Data context and meaning, and as such it becomes more useful.
It becomes **Information**.

So in summary: **Data** + **Context** = **Meaning** = **Information**

The 2sxc/EAV CMS ensures that the editor experiences this as such, and doesn't feel like she's editing **Data** when adding **Content**.

## Content Blocks

2sxc keeps track of the pieces that belong together as [Content Blocks](xref:Basics.Cms.ContentBlocks.Index). When Inner-Content is needed (placing content inside content) it uses [Inner Content](xref:Basics.Cms.ContentBlocks.InnerContent) to keep track of that information.

You may also want to know how [Content Blocks fit into Dnn Modules](xref:Basics.Cms.ContentBlocks.Dnn).

---

You may want to learn more about:

1. [Assets](xref:Basics.Content.Assets)
1. [ADAM - Automatic Digital Asset Management](xref:Basics.Cms.Adam.Index)
