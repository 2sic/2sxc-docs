---
uid: NetCode.Data.Origins
---

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all, .context-box-summary .prepare-all { visibility: visible; } </style>

# Where Data Comes From

From a developer perspective you have three kinds of Data:

1. **[App Data](#app-data)**
1. **[Instance Data](#instance-data)**
1. **[Code Retrieved Data](#code-retrieved-data)**

In addition you have Settings and Resources:

1. **[Configuration & Settings](#configuration-and-settings)**
1. **[Resources](#resources)**

And you have Context information:

* MyContext / CmsContext
* MyPage
* MyUser
* MyView
* etc.

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

## Configuration and Settings

**Configuration** is usually found on specific objects which are configured.
There are three types:

1. View Configuration
1. App Configuration
1. Feature activations

**Settings** usually affect templates / Razor or C# WebAPIs.
They are usually configured at various levels like on the View, App, Site or Global.

C# code will usually get these settings from the `Settings` object which consolidates all the settings.

👉 See [Settings](xref:NetCode.DynamicCode.Objects.Settings)

## Resources

**Resources** are meant to provide translated labels, logos etc.
You can configure them at View, App, Site or Global level.

👉 See [Resources](xref:NetCode.DynamicCode.Objects.Resources)

---


## History

1. Introduced in 2sxc v1
1. App.Data added ca. 2sxc 6
1. App.Query added ca. 2sxc 7
1. Settings and Resources added in 2sxc 12
