---
uid: NetCode.Data.Index
---

# Data in 2sxc

2sxc has a lot of powerful features to help you do amazing stuff, but it all starts with data.
This section/guide should help you get familiar with the basics of data in 2sxc.

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-cs { visibility: visible; } </style>
  <style>.context-box-summary .data-all, .context-box-summary .prepare-all { visibility: visible; } </style>
</div>

There is a lot of magic happening in the background to:

1. Ensure that a template (usually Razor) gets the correct data by default
1. Give your code access to all kinds of Settings and Resources
1. Provide APIs to let you retrieve any necessary data


## Best Start with Tutorials

[!include["Razor Tutorials"](~/shared/tutorials/razor.md)]


## Kinds of Data

Typically the system will have these kinds of data:

* Data based on Entities (items from the current App)
* Configuration / Global data such as Settings and Resources
* Context Data such as the current User, the current Page, etc.
* External data retrieved from SQL, CSV, SharePoint, etc.


## Where Data Comes From

Data for your Code can come from various sources. Read about [](xref:NetCode.Data.Origins).


## Data Objects: DynamicEntity, TypedItems and Entity

It helps to understand the difference between [Dynamic Entities and Entities](xref:NetCode.Data.ObjectTypes).


## APIs and Conversion Commands

Read about it in [](xref:NetCode.DynamicCode.Index)


TODO: MORE