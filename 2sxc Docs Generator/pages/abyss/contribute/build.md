---
uid: Abyss.Contribute.Build
---

# Build / Compile 2sxc / EAV / JS Parts

_Important: If you only want to USE 2sxc / EAV, then **you do NOT need this**. This is meant for people who want to contribute to the source code of 2sxc and EAV._

> [!TIP]
> This is very new documentation and applies to 2sxc 16.06+

## Concept

2sxc has a few git repositories, each with their own build process.
But in general they all follow the same principles:

1. When you compile a project, it will first compile the standard way, into the `dist` or `bin` folder
1. The build process (WebPack or MSBuild) will then check the current folder and all parent folders for a file `2sxc-build.config.json`
to determine places which it should copy things to...
1. If not found, it will use `2sxc-build-fallback.config.json` which is located in the root of each repository - this is usually empty.

## Use Cases

### Use Case 1: Build a JS Library Copy Manually

Let's assume you just got started and want to try something in JS.
You can just pull the repo, npm-init everything and build.


---

## History

* New in 2023-09 v16.06

