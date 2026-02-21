---
uid: Abyss.Contribute.Code.Frontend.Index
---

# Contribute to 2sxc / EAV Frontend Experience

[!include["_contributors-only.md"](../_contributors-only.md)]

## Prerequisites

➡️ Make sure you prepared your local development environment according to the instructions in [](xref:Abyss.Contribute.Code.Index).

## Main Repositories and Principles

The front-end is in these 2 repositories containing various JS projects:

1. `c:\projects\2sxc\2sxc-ui\` - the in-page UI for 2sxc, which extends the EAV UI with more field types, configuration and other JS.
2. `c:\projects\2sxc\eav-ui\` - the main edit/admin UIs, which are used by both 2sxc and EAV.

Each of these repositories contains many JS projects, which are built using Webpack and Vite.
For unit tests, we use **Vitest**.

A few things to keep in mind:

1. When you open a project the first time, you will need to run `npm ci` to install the dependencies, which may take a while.
1. To ensure that the built files are copied to DNN/Oqtane, make sure you have the [`2sxc-build.config.json`](xref:Abyss.Contribute.Code.Build) file.

---

## 2sxc UI

This repo (usually located in `c:\projects\2sxc\2sxc-ui\`)
contains the in-page edit experience, such as the toolbar, quick-dialog, etc.
It also contains some shared code and NPM packages which are used by both 2sxc and EAV.

1. `\` (root) - shared building code and some shared NPM commands
1. `\packages\` - shared building code, also used by the EAV UI
1. `\projects\$2sxc\` - the `$2sxc` JS library
1. `\projects\cms\` - some CSS used for very rich text (image sizing, positioning, etc.)
1. `\projects\code-editor-snippets\` - various code-snippets (as JSON) to enhance the code editor experience in 2sxc
1. `\projects\inpage\` - the in-page edit experience, such as the toolbar
1. `\projects\quick-dialog\` - the Angular UI which appears from the bottom, to select templates, Apps, etc.
1. `\projects\sxc-angular\` - NPM package for using 2sxc in Angular, deployed to NPM as `@2sxc/sxc-angular`
1. `\projects\sxc-typings\` - NPM package for TypeScript typings, deployed to NPM as `@2sxc/sxc-typings`
1. `\turnOn\` - a copy of the `dist` of the turnOn dependency which is in a [separate repository](xref:Repo.turnOn).

### [2sic UI Root Project](#tab/2sxc-ui-root)

The root project is mainly used to build **everything** but not ideal to work in specific projects.

This repo also manages the primary version in the `package.json` file, which is used for all the sub-projects.
This version must be updated before a release, and should be in sync with the eav-ui and the C# repos.

> [!TIP]
> In `2sxc-ui` there are about 10 projects, each which would need an `npm ci` to install dependencies.
>
> To save time, you can run `npm run ci-all` in the root of `2sxc-ui`,
> which will run `npm ci` in all the sub-projects for you.

This repo contains various NPM scripts to build the projects.
The main one is `npm run release-all` which will build all the projects and copy the built files to DNN/Oqtane according to the `2sxc-build.config.json` file.
It does not contain any `watch` scripts, since these are usually run in the individual projects, which is more efficient.

> [!TIP]
> To build everything in one go, just run `npm run release-all`.

### [2sxc UI Projects](#tab/2sxc-ui-projects)

Each project has its own `package.json` file, which contains the dependencies and the build scripts for that project.
The main build script is usually `npm run release`, which will build the project and copy the built files to DNN/Oqtane according to the `2sxc-build.config.json` file.
Most projects also contain a `watch` script, which will watch for changes and automatically rebuild and copy the files to DNN/Oqtane, which is very useful for development.

For example, to work in the `$2sxc` code, do the following:

1. Open the subfolder in Visual Studio Code (`c:\projects\2sxc\2sxc-ui\projects\$2sxc\`)
1. Run `npm ci` to install the dependencies (only needed the first time)
1. Run `npm run watch` to start the watch process, which will automatically build and copy the files to DNN/Oqtane when you make changes.

> [!TIP]
> Each project may have slightly different build scripts.
> Make sure to check the `package.json` file of the project you're working in for the exact commands.

---

## Projects in the EAV UI

1. `\projects\eav-ui` - the main EAV UI, containing the entire admin / edit experience.
1. `\projects\field-custom-wysiwyg` - the WYSIWYG input field, as a standalone project
1. `\projects\field-custom-gps` - the GPS input field, as a standalone project



---

## History

* Created Frontend docs 2026-02-12
