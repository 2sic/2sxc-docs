---
uid: Basics.Query.LookUp.Index
---

<img src="~/assets/features/look-up-system.svg" width="100%">

# LookUp System

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .lookup { visibility: visible; } </style>

Many things in the EAV and 2sxc require it to look up parameters. Examples could be:

1. The current **Page ID**  
  to then find metadata for this page
1. The current **Date**
  to filter out news items which should be published in future
1. An **Id** from the URL Parameters
  to show details about this id

This is done using [Tokens](xref:Abyss.Parts.LookUp.Tokens) which look like `[QueryString:Id]`. 

👉 For more about LookUps, read [](xref:Abyss.Parts.LookUp.Index)