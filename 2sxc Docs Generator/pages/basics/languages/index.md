---
uid: Basics.Languages.Index
---

<img src="~/assets/features/multi-language.svg" class="feature">

# 2sxc Languages Overview

2sxc is exceptionally good at multi-language content.

> All content/data is **Multi-Language** by default.

As such, there are different parts that make it work:

1. Multi language principles and data model
1. Manual Content localization / translation / internationalization (i18n)
1. [Automatic Content translation](xref:Basics.Languages.AutoTranslate.Index) (new in v15)
1. Translation Permissions TODO: DOCS
1. UI localization

## Multi-Language Principles

The internal EAV Data Model stores _each value_ with language assignment.
Key facts:

1. There is always a **primary language** which is set by the platform (DNN/Oqtane).
    1. The primary language must always be filled first. Other languages cannot be edited without the primary language having content.
    1. Other languages will inherit the values from the primary language by default.
    1. Changing the primary language can have suprising side-effects, because it can result in scenarios where the primary language is missing.  
      In such scenarios the system will still try the primary language, but if it's empty, will fall back to the first language having any content for a specific field.
1. Values can be for a single language only, or **shared** across languages
    1. In read/write shares, any change made in the value will automatically apply to all languages that use this value
    1. In read-only shares, the value can only be edited in the main language; all other languages just "inherit" the value
    1. In secondary languages which are not translated, they are not translated and will automatically fall back to the primary language

👉🏽 Read more about the [Multilanguage Data Model](xref:Basics.Data.MultiLanguage.Index)

## Edit-UI Translation Features

The Edit-UI can make a field editable in certain languages and not in others. These are the factors that control it:

1. Data is missing in the primary language (then translating it isn't possible yet)
1. Some data is not multi-languages so it's either not editable in other languages, or the changes automatically affect all languages. This specifically affects these two cases:
  1. Related items (which are the same across languages)
  1. Asset-files (which are the same across languages)
1. Field-Configuration disables translation of field (common in url-id-fields)


## Export-Import of Multi-Language Content

This is documented in [](xref:Basics.Data.ExportImport.Index).

## Manual Content Translation

Editors can always unlock any field (or all fields) to manually translate them.
In that case it will copy the original value from the _primary language_.

Users can also link languages together.
This is ideal in scenarios where multiple _secondary_ languages are closely related, such as `de-DE` and `de-CH`.

TODO: SCREENSHOTS?

## Automatic Content Translation

This is a new feature in 2sxc v15 and available to Patrons (people who wish to support the development of 2sxc).

👉🏽 Read more about [Automatic Translation](xref:Basics.Languages.AutoTranslate.Index)


## Translation Permissions

TODO:


## UI Localization

The Edit-UI is localized at two levels:

1. Custom Inputs, Help-Texts etc.
1. System labels (like `Save` buttons)

The Admin UI is not localized, it's English only.

TODO:



---

## History

1. Introduced in 2sxc 2 ca. 2012
1. ...
1. Auto-Translate Content added in v15

Shortlink: <https://go.2sxc.org/translate>
