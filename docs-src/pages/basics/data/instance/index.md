---
uid: Basics.Data.Instance.Index
---

# Instance Data (vs. All App Data)

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .server-all, .context-box-summary .data-all { visibility: visible; } </style>

Apps can have a lot of data and the entirety of this data is called the **App Data**. 

Usually every **Instance** (use) of a Template will only work with a _selection_ of this data. 
You could write code to find the parts you need, but usually that work is automatically done by 2sxc. 
This is possible thanks to two common scenarios which determine what data should to be used:

1. An editor added content manually, so this is the data that should be worked with
1. A [Query](xref:Basics.Query.Index) [prepared](xref:Basics.Prepare.Index) data for this Module Instance

> **Instance Data** is data which is pre-selected for one **Module Instance**. 
> Either because it was edited this way or because the [View Configuration](xref:Basics.App.Views.Index) specified a [Query](xref:Basics.Query.Index).


## Common Scenarios for Instance Data

1. Content with text, images etc. which should appear on a Module
1. Lists of Content items which are added/edited individually
1. Views which need a bit of configuration information specific to that instance
1. Views which receive the data to work with from a [Query](xref:Basics.Query.Index) (so the Query defines what Data should be used in this instance)


## Difference Instance-Data and App Data

**Instance Data** is only a _part_ of the **App Data**, while the **App Data** contains everything in the App. 

In your code, **Instance Data** is [prepared](xref:Basics.Prepare.Index) by the engine and available on objects like `Content` _if the editor added content or if a Query was specified_. 

On the other hand the complete **App Data** is available on objects like `App` which are always available even if no Instance Data exists.

Read more about [where data comes from in your code](xref:NetCode.Data.Origins)

---


## History

1. Introduced in 2sxc v1
1. App.Data added ca. 2sxc 6
1. App.Query added ca. 2sxc 7