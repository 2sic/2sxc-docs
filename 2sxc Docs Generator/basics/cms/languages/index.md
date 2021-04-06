---
uid: Basics.Cms.Languages.Index
---

# Multi-Language Content

In 2sxc content/data is **Multi-Language** by default. 

Most of this is documented in [](xref:Basics.Data.MultiLanguage.Index).

## Active Languages per Site

Each Site determines what languages are active in this specific site. Here's how:

<iframe src="https://azing.org/2sxc/r/PJLIiqPD?embed=1" width="100%" height="400" frameborder="0" allowfullscreen style="box-shadow: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)"></iframe>


## Edit-UI Translation Features

The Edit-UI can make a field editable in certain languages and not in others. These are the factors that control it:

1. Data is missing in the primary language (then translating it isn't possible yet)
1. Some data is not multi-languages so it's either not editable in other languages, or the changes automatically affect all languages. This specifically affects these two cases:
  1. Related items (which are the same across languages)
  1. Asset-files (which are the same across languages)
1. Field-Configuration disables translation of field (common in url-id-fields)


## Export-Import of Multi-Language Content

This is documented in [](xref:Basics.Data.ExportImport.Index).