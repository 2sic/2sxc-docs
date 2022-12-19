---
uid: Basics.Data.MultiLanguage.Index
---

# Multilanguage Data

[!include[](~/pages/basics/stack/_shared-float-summary.md)]
<style>.context-box-summary .data-all { visibility: visible; } </style>

Data in 2sxc is Multi-Language by default, but the UI will only offer languages which have been activated in the Site settings.

## Multi-Language Attributes

Every **Attribute** (like a `Title`) _can_ be stored in multiple languages. So the data model of some content can look like this:

1. `Title`
    * `en-US`: `Enjoy a Visit to our Headquarters`
    * `de-DE`: `Genießen Sie einen Besuch in unserem Hauptquartier`
    * `de-CH`: `Geniessen Sie einen Besuch in unserem Hauptquartier`
1. `Photo`
    * `*`: `file:7402`
1. `SloganImage`
    * `en-US`: `file:7405`
    * `de-DE`,`de-CH`: `file:7406`
1. `GpsCoordinates`
    * `en-US`: `{ "Long": 74.6020030, "Lat": 53.002030060 }`
1. `Employees` (reference to other entities/items)
    * `*`: `[74, 592, 6030, 39]`

Some things to understand in the above data model:

1. `Title` is translated in 3 languages (Germany/Switzerland only differing with `ß` vs `ss`)
1. The `Photo` has the language `*` which means that it was edited before languages were enabled and doesn't map to any particular language
1. The `GpsCoordinates` are only set in 1 language, so every language will show the same value
1. The `SloganImage` is translated so `en` and `de` have different images
1. The `Employees` relationship to other data is not translatable, and the [order of the items is also preserved](xref:Basics.Data.Relationships.Index)

## Language Assignment and Read/Write State

Each **Attribute** or **Property** like `Title` has one or more **Values**.

* These Values are mapped to the Attribute with **one or more languages**.
* Each language-assignment also stores the read/write state for the UI.

As such, a value can have different internal rules

1. It can be assigned to one language only.
1. It can be assigned to multiple languages and editable in the UI of each language. Changing it would change the value in all the languages.
1. It can be assigned to multiple languages and editable in the UI of some of these languages. Changing it (in one of the editable languages) would change it in all assigned languages. The assigned languages which are not editable would always just show this language, but not enable editing in the UI.

## Relationships Cannot be Translated

[Relationships](xref:Basics.Data.Relationships.Index) are not Translatable.
If a Blog-Post references Tags, [the same tags are referenced in all languages](xref:Basics.Data.Relationships.Index).
Note that related items may again have multi-language properties, so even if the `Authors` list contains the same authors across languages, accessing the `Bio` of a related `Author` will probably return a different value.

## Assets are Multi-Language, but the Files are Shared Across Languages

A link/file-field can have a different value in each language, but the files uploaded will be available to that field in the UI of every language. So a `SloganImage` field would show all the files that were uploaded to this field, but the selected file can be different in each language.

This wil also affect Libraries of files - the libraries will always contain the same files/images in all languages. But if these files have Metadata, then that Metadata can be different in each language.

## Disable Translation for Individual Fields

The UI can be configured to not allow translation of specific fields if this is desired (for example URL-key fields). See also [](xref:Basics.Cms.Languages.Index).

## Internal Functionality

When languages are enabled, this is what happens

1. Every field can be translated individually - or you can translate all fields of an Entity
1. On every Entity the primary language must always be created first
1. The primary language will then serve as the fallback for all languages which have not been translated
1. In addition to translating values you can also _link_ them to other languages, so that editing a value in `de-DE` would automatically affect `de-CH` but not `en-US`


## History

1. Introduced in 2sxc 2.0
2. Non-Translatable fields were made an option in 2sxc 11

