---
uid: Abyss.Contribute.Docs.Implementation.CSharpCode
---

[!include["many-projects"](../_docs-for-many-projects.md)]

# C# Code Docs Generation

> [!WARNING]
> This is a technical documentation about how the documentation system works.
> It helps the core team understand how to maintain and enhance the documentation system.
>
> It's not meant for most contributors, as it's too technical.

## C# Code Generation and Merging

This process is configured in `docfx.json`.
It is quite tricky as small changes can have big effects.
Important to know:

1. All `/pages/**/*.md` will be normal output pages

1. All C# code from the specified `.csproj` projects will be converted to markdown in the git-excluded `/api-generated` folder...

1. ...and then merged with the `/api-docs` folder which is manually maintained.
    This is needed because auto-generated code cannot have namespace descriptions,
    and sometimes we need much more complex docs for a specific class (which is also in the `/api-docs` folder).

1. The exact behavior is configured in the `docfx.json` file.
    Note that trivial changes can have big effects, so be careful. Example:

    1. a section `{ "src": "api", "files": ["**.yml"] }` will create a different result than...

    1. a section `{ "files": ["api/**.yml"] }`. Such details can cost you a lot of time.

1. We filter out `_*.yml` files as they should not create a page, but are instead used for `!include` statements.
