---
uid: NetCode.DataSources.Custom.TutorialBasic.Index
---

[!include[](_obsolete-docs.md)]

# Custom DataSources - Basic Tutorial

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style> .context-box-summary .datasource-custom { visibility: visible; } </style>

We've re-created our Tutorial for the Custom DataSources to match features of 2sxc 11.13. It has 3 DataSources:

1. **Basic** which just provides information about todays Date
1. **BasicList** which generates similar information for a list of 7 dates
1. **ConfigurableDateTime** which shows just about everything you will ever need

Here's what you should look into:

1. The VisualStudio project located here: [DataSources Github Project](https://github.com/2sic/datasource-tutorial-basic)
1. The **companion Demo App** ([Git](https://github.com/2sic/app-tutorial-datasource-basic) | [Downloads](https://github.com/2sic/app-tutorial-datasource-basic/releases) | [App-Catalog](https://2sxc.org/en/apps/app/tutorial-use-a-custom-developed-datasource)) containing some Demo Queries and the Content-Type

## Installing

Just install the ZIP as a Dnn package from the [Git Releases](https://github.com/2sic/datasource-tutorial-basic/releases). 
This will add the DLLs containing the DataSources and the Configuration Content-Type to Dnn as a Library.

Now you can use this DataSource in any 2sxc App. 

You can also install the Demo App which already has some Queries #Todo demonstrating them. 

## Discover the Code

Download the [Git-Repo](https://github.com/2sic/datasource-tutorial-basic) and look at the Code. Next we'll explain the highlights: 

### Level 1: The most `Basic` DataSource

👉 [](xref:NetCode.DataSources.Custom.TutorialBasic.Basic)


### Level 2: A `BasicList`  DataSource

👉 [](xref:NetCode.DataSources.Custom.TutorialBasic.BasicList)

### Level 3: A Configurable, Error-Aware Data-Source `ConfigurableDateTime`

👉 [](xref:NetCode.DataSources.Custom.TutorialBasic.Configurable)

---

## History

1. Created 2017 for 2sxc 7
1. Completely rebuilt for 2sxc 11.13 and [VisualQuery](xref:Basics.Query.VisualQuery.Index) 3

