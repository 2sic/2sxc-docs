---
uid: Abyss.Contribute.Docs.SourceCode.Namespaces
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# Document Code Namespaces

It's usually very helpful to document what a namespace does.
Using the same mechanism with the `uid:` you can
create markdown files which will show extensive instructions.

The way it's set up is as follows:

1. We have a folder `/api-docs/api/dot-net/` with sub folders
1. These are included for augmentation in the api docs (see `docfx.json` in the `override` section)
1. Files in this folder will not be included but will replace some of the generated content.

> [!WARNING]
> There is a bug in this system. If your markdown contains more than one `---` (triple dash)
> it will break the docfx build.
>
> So make sure you use 6 dashes instead for this, to not confuse the yaml-header parser.
> Use `------` instead of `---` in these **override** markdown files.
>
> See [this issue](https://github.com/dotnet/docfx/issues/11088) for more information.

---

[!include[](~/shared/authors/iJungleboy/_main-author.md)]
