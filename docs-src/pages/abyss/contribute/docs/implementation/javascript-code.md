---
uid: Abyss.Contribute.Docs.Implementation.JsCode
---
[!include["many-projects"](../_docs-for-many-projects.md)]

# JavaScript Code Docs Generation

> [!WARNING]
> This is a technical documentation about how the documentation system works.
> It helps the core team understand how to maintain and enhance the documentation system.
>
> It's not meant for most contributors, as it's too technical.

2sxc has some JavaScript APIs such as:

1. `$2sxc` on the page for doing things such as data access or opening dialogs

1. `formula` APIs for working with formulas in the edit UI

These are published in the docs under [JS & TS API](xref:JsCode.Index).

This is one of the most challenging parts of the system.
Reason is that DocFx doesn't really have a good way to merge JavaScript code with the documentation.

## Overall Process

> [!WARNING]
> We haven't done this in a while, so the following steps / docs are
> possibly outdated. Please check with the core team before proceeding.

1. In each JS project, there are some special commands to run from the `package.json` which will generate the necessary files. This usually happens in 2-3 steps such as:
    1. Generate standalone type files (like `2sxc.d.ts`) which contain only the documentation
    1. Generate YAML files into the docs-folder which contain the actual documentation.
    This usually goes to `/import/api.js.sxcjs/docfx` or similar.

1. When DocFx builds, these folders are also included...

1. ...and merged with ??? (not sure, check with core team) when building the documentation.

# Import $2sxc JavaScript Types and Docs

The npm task **import** is an optional step,
used only when there is a need to prepare JavaScript-related files for inclusion in the documentation.

To execute this task, navigate to the `2sxc Docs Generator` directory and run the **import** task with npm. Here are the necessary commands:

```cmd
cd "C:\Projects\2sxc\2sxc-docs\2sxc Docs Generator"
npm run import
```

This command will execute the **import** task defined in your **package.json** file, preparing your 2sxc JavaScript related files for documentation generation.


