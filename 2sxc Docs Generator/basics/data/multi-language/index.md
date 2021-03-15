---
uid: Basics.Data.MultiLanguage.Index
---

# Multilanguage Data

[!include[](~/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

Data in 2sxc is Multi-Language by default, but the UI will only offer languages which have been activated in the Site settings. 

When languages are enabled, this is what happens

1. On every Entity the primary language must always be created first
1. The primary language will then serve as the fallback for all languages which have not been translated
1. Every field can be translated individually - or you can translate all fields
1. In addition to translating values you can also link them to other languages, so that editing a value in `de-DE` would automatically affect `de-CH` but not `en-US`

## Relationships cannot be Translated

[Relationships](xref:Basics.Data.Relationships.Index) are not translatable, so if a Blog-Post references Tags, the same tags are referenced in all languages. 

## Disable Translation for Individual Fields

The UI can be configured to not allow translation of specific fields if this is desired (for example URL-key fields). 

## History

1. Introduced in 2sxc 2.0
2. Non-Translatable fields were made an option in 2sxc 11

