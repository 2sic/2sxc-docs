---
uid: NetCode.DynamicData.DataOrigins
---

# Where Data Comes From

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all, .context-box-summary .prepare-all { visibility: visible; } </style>

From a developer perspective you have three kinds of Data

1. **[App Data](#app-data)**
1. **[Instance Data](#instance-data)**
1. **[Code Retrieved Data](#code-retrieved-data)**

## App Data

The complete **App Data** is _always_ available in these objects:

[!include[""](../dynamic-code/_include-app-objects.md)]


## Instance Data

[!include[""](../dynamic-data/_include-data-origins.md)]


If the [View](xref:Basics.App.Views.Index) is configured for manual content-editing or uses a [Query](xref:Basics.Query.Index) then
**[Instance Data](xref:Basics.Data.Instance.Index)** is automatically [prepared](xref:Basics.Prepare.Index) in these objects:

[!include[""](../dynamic-code/_include-instance-data.md)]


## Code Retrieved Data

Your code can also retrieve data using normal C# code to do things like

1. Get lists of files from ADAM or the file system
1. Read data from SQL
1. Manually parse CSV files or access external Web Services
1. Use [DataSources](xref:NetCode.DataSources.Index) to get SQL, CSV or other data

---


## History

1. Introduced in 2sxc v1
1. App.Data added ca. 2sxc 6
1. App.Query added ca. 2sxc 7