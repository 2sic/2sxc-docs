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

1. **Awesomeize**: this is where you template the data and add logic.  
1. **Prepare** is a layer of data processing where the desired data is selected to be shown, filtered, sorted etc.  
1. **[Your Data](xref:Basics.Data.Index)** is the original material - created by an editor in the CMS or it's data coming from SQL, CSV or elsewhere. 

## How to Learn the Basics

To learn the basics it's probably best to:

1. First discover [Tutorials](xref:Tut.Razor.Home) and [many example Apps](xref:AppsCatalog)
1. Then learn about [Data](xref:Basics.Data.Index)
1. Then learn about [](xref:Basics.Server.Index)
1. And finally learn about [](xref:Basics.Browser.Index)

## Deep Dive into the Client (Show, Interact, Edit)

[!include["App browser"](../shared/app/app-browser-raw.md)]

## Deep Dive into the Server (Data, Prepare, Awesomeize)

Here's a diagram of what an App can have, and which parts you control:

[!include["App diagram"](../shared/app/app-server-raw.md)]

## Deep Dive into Data (Content, Data, Lists, Assets, Images)

[!include["App browser js"](../shared/app/app-server-data.md)]

_Click on the image to zoom or visit [](xref:Basics.Data.Index) to learn more_