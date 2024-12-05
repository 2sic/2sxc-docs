---
uid: Basics.Server.Index
---

# What Happens on the Server...

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .server-all { visibility: visible; } </style>


You should get an idea of how the system works and all the things you can customize. This overview lets you see the essential parts of any **App** including the main **Content**.

This is what web-systems do from a bird's-eyes perspective. This is what happens on the server:

1. **Awesomeize** - this is where you tell the system how the output should look, what image sizes you want, how the HTML should be built etc.
1. **Prepare** is a layer of data processing where the desired data is selected to be shown, filtered, sorted etc.
    _By default this happens automatically, you don't have to do anything! But you can customize it anyhow you want._
1. **Your Data** is the original material - probably created by an editor using the CMS UI or in advanced cases it's data coming from SQL, CSV or elsewhere. This data could also be combined from multiple sources.
    _By default this just magically works, you don't have to do anything!_

## Awesomeize / Customise

<div class="context-box-process" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-process .process-all { visibility: visible; } </style>
</div>


You may want to learn more about:

1. [Bundling / Optimizing Assets](xref:Basics.Server.AssetOptimization.Index)
1. [Image Resizing](xref:Basics.ImageResizer.Index)
1. [Create App Templates using Razor](xref:NetCode.Index)
1. [Create custom WebApi Controllers](xref:NetCode.WebApi.Index)
1. [The Headless REST API](xref:WebApi.Headless.Index)


## Preparing Data

Something must determine what data should be shown or worked on, which is what happens in the **Prepare** step.

<div class="context-box-prepare" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-prepare .prepare-all { visibility: visible; } </style>
</div>

👉 See [](xref:Basics.Prepare.Index)


## Understanding Data

<div class="context-box-data" width="100%">

[!include[](~/pages/basics/stack/_shared-all.md)]
  <style>.context-box-data .data-all { visibility: visible; } </style>
</div>

👉 Data has it's own chapter in the docs [](xref:Basics.Data.Index)
