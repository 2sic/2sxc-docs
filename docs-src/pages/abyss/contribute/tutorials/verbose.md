---
uid: Abyss.Contribute.Tutorials.Verbose
---

# Contribute

## Snippets and Snippet Metadata

Snippets need additional metadata, such as the title, description, and tags.
This metadata is stored in a Entity of the type `TutorialSnippet`.
As of 2025-07 there are about 365 such snippets.

Snippet Metadata is connected to the snippet by a path, which is the folder where the snippet is stored.
For example, a snippet on [this page](https://app-dev.2sxc.org/tutorial-razor/Home/tut/code-context)
may have a `TutorialId` of `context-system-platform`.
This would reference the path `/tutorials/context-system/Snip-platform.cshtml`.
The first two segments of the `TutorialId` (in this case `context-system`) are the **category** and **sub-category**
which represent the folder structure where the snippet is stored.

> [!TIP]
> Snippets can exist in multiple editions, for example using older APIs or newer APIs.
> Because of this, the above `Snip-Platform.cshtml` may exist, but it may also not exist.
> Instead, there are files such as `Snip-Platform.Dyn.cshtml` and `Snip-Platform.Typed.cshtml`.
> The rendering system will detect which one to show based on what the user has selected in the UI.

## Tutorial Pages showing Snippets

The same Snippet can be shown on **multiple** pages.
For example, a snippet demonstrating variables can be shown in the Quick-Reference as well in the Razor Basics section.

Because of this, the UI structure is data-driven.
Each virtual page is defined in a content type `TutorialGroup` of which there are about 180.

> [!TIP]
> The TutorialGroup can be a **virtual page** or just a **group of Snippets**.
> Groups of Snippets can be used on pages and would then be grouped together in an accordion.

By convention, all virtual pages have a `NameId` ending with `-page`.
For example, the `NameId` `code-context-page` is [used here](https://app-dev.2sxc.org/tutorial-razor/Home/tut/code-context).

The virtual page uses a `/tut/[NameId]` parameter to find the page to show; note that the suffix `-page` is dropped.

The contents is built from the `Accordions` field, which contains a list of `TutorialGroup` items.
It can also have a `Sections` field, containing a list of `TutorialSnippet` items.
The final output is a combination of the data in these fields.

## Tutorial Page Navigation

### Home

The primary navigation starts on the [Razor Tutorials Home](xref:Tut.Razor.Home) page.
The data there is a single Entity of the type `TutorialSequence`.
It contains a list of `TutorialGroup` in the `Sections` field.

These will be used to render the home page.

### Sub-Pages

Every page has previous / next buttons on the top and bottom of each page.
Internally it uses the `TutorialSequence` to determine the next and previous pages.

## Snippet Variants

Snippets can have multiple variants, which are different versions of the same snippet.
For example, a snippet may have a variant for the old API and a variant for the new API.

This has special handling both at the code level as well as in the UI, for example supporting texts etc.
The main idea is that a snippet is by default for all variants (since the code is often the same),
but it can be different.

### Snippet Code Variants

Code variants are the same file, but with a `.Dyn` or `.Typed` suffix.

This is how it behaves:

1. If the user selected a special code variant (e.g. `Dyn` or `Typed`), then the system will look for a file with that suffix.
1. If it's not found, it will try to find the file without a suffix.
1. If it's not found, it will not show the snippet at all (except to admins, who may be creating the snippet and need to see that it's missing).

### Snippet Metadata Variants

In addition, the Snippet Metadata has different fields to describe different variants.
It uses the same principle, having description fields which are for every variant, and then specific fields for each variant.
In this case though, the shared field is always shown, so to only show variant-specific fields,
you must leave the shared field empty.

## Snippet Special Features

Snippets have to serve a lot of different purposes, so they have some special features.
Note that the implementation is often a bit hacky,
because the final result must either be valid Razor which should run,
or it should not run - so it uses various tricks to comment out markers and still execute hidden code.

TODO

1. Initialization
1. Formulas
1. Activate JS / Page Features
1. Toolbar behavior

## Snippet Metadata

1. Screenshots
1. ...

## Instructions TODO

1. Modify a snippet - how to find the source code
1. Re-use a snippet on another page
1. How to add a new snippet
1. How to add a new page
1. How to add a new category
