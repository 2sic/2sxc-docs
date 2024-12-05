---
uid: NetCode.DataSources.Custom.Guide.Index
---

# Guide Create Custom DataSources

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

There is a lot of information about DataSources, but some of it is outdated, and some of it is hard to understand.
This guide will help you get started and find the right information.

## Start with an Overview

Before you even start it's best to have an overview.
The 2sxc 16 Dynamic DataSources Release Video is a good place to start.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/-1GOv7rAX1Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Step 1: Experience Live Code

Before you read anything else in these docs, you must look at the live tutorials.
This will help you understand what's actually going on.
The remaining documentation assumes you have seen these tutorials.

🚀 first you must review the live samples in our [](xref:Tut.DynamicDataSources)

## Step 2: Review your Understanding

Once you have seen the live code, you should have a basic idea of:

1. What a Custom DataSource is
1. What Data Streams are, and how they are provided using `ProvideOut`
1. How DataSources are made configurable using `[Configuration]` and how they read the configuration using `Configuration.GetThis()` and `Configuration.GetThis<T>()`
1. Use in Razor/WebApi C# Code
    1. How code will create such a DataSource using `Kit.Data.GetSource`
    1. How code can connect DataSources using `attach`
    1. How code can pass in configuration using `parameters:`
1. Use in Visual Query
    1. How DataSources appear in VisualQuery
    1. How they can be configured using the ContentType

> [!TIP]
> The above list of things you should understand is important.
> Make sure you can say yes to each point mentioned above, otherwise go back and review the live tutorials.

## Step 3: Learn the Big Picture

💡 You should read through the [Big Picture of DataSources](xref:NetCode.DataSources.Custom.Guide.BigPicture)


## Step 4: Create your first Dynamic DataSources

Now that you have seen the live tutorials, you should create a few [Dynamic DataSources](xref:NetCode.DataSources.Custom.Dynamic).
You should _not_ start with [Compiled DataSources](xref:NetCode.DataSources.Custom.Dynamic).
They are much more difficult, and each failed try requires a rebuild, redeploy and restart of the website - with takes a long time.

## Step 4: Deepen your Understanding

If you got this far and would like to go even deeper, this is what you probably need:

1. how to _provide_ data in different streams and different data types
1. how to build entities with different property types and relationships as well as RawEntity objects
1. advanced configuration possibilities
1. use data from `In` streams, both the `Default` as well as other streams
1. error handling

## Step 5: Create Compiled DataSources (optional)

Only do this if you really need to, because it's much more complex and requires a lot of knowledge about the internals of the EAV.

The guide stops here, but you can continue on [Compiled DataSources](xref:NetCode.DataSources.Custom.Compiled).

## Demo App and further links

* [Basic DataSources for EAV and 2sxc](https://github.com/2sic/2sxc-eav-tutorial-custom-datasource)
* [Blog about this feature](https://2sxc.org/en/blog/post/tutorial-custom-datasources-for-eav-2sxc-9-13-part-1)
* [Blog post about custom DataSources](xref:Blog.CustomDataSource)

## History

1. Introduced in 2sxc ca. 4 but with a difficult API
1. API strongly enhanced and simplifield in 2sxc 09.13
1. Another API rework ca. 2sxc 10.25 (but we're not exactly sure)
1. Major breaking API changes and improvements in 2sxc 15
1. Dynamic DataSources introduced in 2sxc 16
