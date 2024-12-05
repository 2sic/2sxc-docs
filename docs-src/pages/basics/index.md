---
uid: Basics.Index
---

# 2sxc Basics Overview

In 2sxc most things _just magically work_. These docs give you a deep understanding of how they work so you can figure out really cool stuff.



## The Stack: How Systems and Users Interact

This is what web-systems do from a bird's-eye perspective.

[!include["App stack"](./stack/_shared-raw.md)]


On the top you see what happens in the [browser](xref:Basics.Browser.Index):

1. **Show** content / output using HTML
1. **Interact**ive Content or SPAs where the UI is smart and works with data
1. **Edit**ing content and data works by default, and you can do a lot more

The bottom shows what happens on the [server](xref:Basics.Server.Index):

1. **Awesomeize** is where you template the data and add logic on the [Server](xref:Basics.Server.Index).
1. **[Prepare](xref:Basics.Prepare.Index)** is a layer of data processing where the desired data is selected to be shown, filtered, sorted etc.
1. **[Your Data](xref:Basics.Data.Index)** is the original material - created by an editor in the CMS or it's data coming from SQL, CSV or elsewhere.

## How to Learn the Basics

To learn the basics it's probably best tof first discover [Tutorials](xref:Tut.Razor.Home) and [many example Apps](xref:AppsCatalog)

## The Stack in Detail

<div class="context-box1" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
</div>


Learn more about...

* [](xref:Basics.Browser.Index)
* [](xref:Basics.Server.Index)
* [](xref:Basics.Prepare.Index)
* [](xref:Basics.Data.Index)
