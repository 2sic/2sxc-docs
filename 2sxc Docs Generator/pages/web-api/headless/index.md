---
uid: WebApi.Headless.Index
---
<img src="~/assets/features/headless.svg" width="100%">

# Headless WebAPIs in 2sxc

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>
  .context-box-summary .process-headless { visibility: visible; }
</style>

Using a CMS like 2sxc as **Headless** means that the data can be used elsewhere both for showing and editing as needed. 2sxc provides 3 different WebAPIs for this:

1. Built-in [Content WebAPIs](xref:WebApi.Data.Index) which are REST endpoints for CRUD (Create, Read, Update, Delete) operations
1. Built-in [Query WebAPIs](xref:WebApi.Query) which are read-only APIs to query data using VisualQuery
1. [Custom C# WebAPI controllers](xref:NetCode.WebApi.Index) which you create to do anything you want

We always recommend that you first experiment with the tutorials before you do anything else:

[!include["WebApi Tutorials"](~/shared/tutorials/web-api.md)]

## Fine-Tune Serialization of Headless Data

If you use [Queries](xref:Basics.Query.Index) you can now fine-tune how the data will be serialized. [Read more about this](xref:Basics.Query.Serialization.Index).

## Read Also

1. [](xref:WebApi.Index)
1. Various blogs posted on this topic (just google it)


## History

1. Introduced Content-REST API in 2sxc 5.x
1. More added in v7.1
1. Added [in-admin help](xref:WebApi.Help.AdminUiContentRest) to access it in 11.10
