---
uid: NetCode.Razor.FileNames
---

# Razor File Names

Topics

* [Underscore Prefix](#underscore-prefix)
* [Spaces](#spaces-in-file-names)
* [Casing](#casing)
* [Partial Files](#naming-partial-files)

## Underscore Prefix

### No More Underscore in v15

Previously our recommendation was to stick to the conventions of prefixing Razor files with an underscore `_`.

In 2sxc v15 we are changig this recommendation, to _not_ use an undescore.
It is simply not relevant and adds a technical feeling to it, which simply is not necessary.

> [!TIP]
> Starting in 2sxc v15, the default for Razor files is not to use an underscore.

### Old Convention with Underscore

There is an official convention to prefix all razor files with an underscore `_`.
This would result in files such as `_Default.cshtml`.

This is because IIS will not run any razor files with an underscore, so if a user (or an attacker) would try:

```text
https://yourdomain.com/_default.cshtml
```

...the code would not run. Basically IIS does not run any Razor files with a leading underscore.
In addition to that, such files would not be added to the page-tree when creating menus in asp.net MVC.
This makes sense in asp.net MVC.

### Underscore not Relevant for 2sxc

In 2sxc the Razor files themselves cannot be accessed.

1. DNN doesn't have a handler for `.cshtml` files
1. Oqtane has the files in a protected location which is not publicly available
1. All 2sxc Razor files inherit from a custom class, which makes them unusable if called directly




## Spaces in File Names

You can use spaces in file names.
All of the following are valid:

* `I Like Spaces.cshtml`
* `IDontLikeSpaces.cshtml`
* `I-Would-Rather-use-dashes.cshtml`

> [!TIP]
> The 2sxc Recommendation for Razor files is to use spaces.
> We believe it makes the files/folders easier to skim in a code editor.


## Casing

You can use any casing you prefer.
All of the following are valid:

* `My Razor File.cshtml`
* `myrazorfile.cshtml`
* `MyRazorFile.cshtml`

> [!TIP]
> The 2sxc Recommendation for Razor files is to start with upper case.
>
> If you do not use spaces in your file names, you should use PascalCase.


## Naming Partial Files

Partial Razor files are called by other files to render parts.
A common use case is a sub-template for a complex item in a list.

You can name this anyhow you want.
But we recommend that parts are named in a way that makes it obvious...

* ... that they are a part
* ... if they are shared, or just used by a single other Razor

> [!TIP]
> The 2sxc Recommendation is to use the term `Part` for partial files.
>
> * We suggest `Part User Info.cshtml` for parts which are used by many files
> * We suggest `[originalfile].part.cshtml` for parts which are only used by a single file
