---
uid: Abyss.Contribute.Docs.Build.DocfxTheme
---

# Build DocFX Theme and Assets

DocFX includes a default theme which is used to generate the documentation.
In addition to that, we have custom JavaScripts and CSS files which are used to enhance the documentation.
Normally you don't need to build them, as they are already included in the repo.
But in some cases you may want to make changes, so you should understand how to build them.

## Parts that Make it Work

The parts that make it work are

* **NPM** manages the packages and scripts
* **WebPack** compiles the TypeScript and SCSS
* **TypeScript** is used to write the JavaScript
* **SCSS** is used to write the CSS
* **Fancybox** is used for the lightbox
* **HighlightJS** is used for syntax highlighting
* `/templates/2sxc/src` contains the TypeScript and SCSS files

## Setup

Make sure you have node/npm installed.
Then let NPM install all dependencies using continuous-integration.
Run this in the docs folder (ideally just from the VS-Code terminal):

```cmd
npm ci
```

## Build

To build the assets, run this in the docs folder (ideally just from the VS-Code terminal):

```cmd
npm run build
```

...or use `ctrl+shift+b` and select `build`
...or right-click on the `build` task in the VS-Code task-runner.

<div gallery="vs-code">
  <img src="./assets/webpack-build.jpg">
</div>

---

## History

* Updated 2024-12-04 v18.04

<!-- Shortlink: <https://go.2sxc.org/build> -->
